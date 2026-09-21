/* =============================================================================
   app.js — hash router, page assembly, sidebar, progress roll-up.
   Hash routing works on GitHub Pages with no server rewrites.
   ========================================================================== */
(function (global) {
  'use strict';
  var U = global.ActivityUtil, esc = U.esc, el = U.el;
  var DATA = null;

  /* ---------------------------------------------------------- unit index --
     Every completable thing in the course, so progress, the sidebar and the
     certificate all count the same set.                                      */
  function units(mod) {
    var out = [];
    mod.blocks.forEach(function (b) {
      if (b.k === 'activity') out.push({ id: b.id, kind: b.type });
      else if (b.k === 'quiz') out.push({ id: b.id, kind: 'quiz' });
      else if (b.k === 'video') out.push({ id: b.id, kind: 'video' });
      else if (b.k === 'reflect') out.push({ id: b.id, kind: 'reflect' });
    });
    return out;
  }
  function modProgress(mod) {
    var u = units(mod), d = u.filter(function (x) { return Store.actDone(x.id); }).length;
    return { done: d, total: u.length, complete: u.length > 0 && d === u.length };
  }
  function allUnits() {
    var t = 0, d = 0;
    DATA.modules.forEach(function (m) { var p = modProgress(m); t += p.total; d += p.done; });
    return { done: d, total: t };
  }
  function kcState() {
    var s = Store.quizState(DATA.knowledgeCheck.id) || {};
    var total = DATA.knowledgeCheck.questions.length;
    var best = s.best || 0;
    return { submitted: !!s.submitted, best: best, total: total, pct: Math.round(best / total * 100) };
  }

  /* --------------------------------------------------------------- chrome */
  function topbar() {
    var p = Store.profile();
    document.getElementById('tname').textContent = p.name || '';
    document.getElementById('tgreet').hidden = !p.name;
    document.getElementById('tdiv2').hidden = !p.name;
    document.getElementById('ttime').hidden = false;
    document.getElementById('tclock').textContent = Store.fmtTime(Store.elapsed());
  }

  function refreshProgress() {
    var a = allUnits();
    var pct = a.total ? Math.round(a.done / a.total * 100) : 0;
    var bar = document.getElementById('pbar');
    if (bar) bar.style.width = pct + '%';
    DATA.modules.forEach(function (m) { Store.setModuleDone(m.id, modProgress(m).complete); });
    sidebar();
    topbar();
  }

  function sidebar() {
    var host = document.getElementById('sidebar');
    if (!host) return;
    var route = location.hash || '#/';
    var kc = kcState();
    host.innerHTML =
      '<div class="side-h">' + esc(DATA.title) + '</div>' +
      '<ul class="side-list">' +
      DATA.modules.map(function (m) {
        var p = modProgress(m);
        return '<li><a href="#/m/' + m.id + '" class="' + (route === '#/m/' + m.id ? 'on ' : '') + (p.complete ? 'done' : '') + '">' +
          '<span class="sn"><span>' + m.num + '</span></span>' +
          '<span>' + esc(m.title) + '</span></a></li>';
      }).join('') +
      '<li><a href="#/check" class="' + (route === '#/check' ? 'on ' : '') + (kc.submitted ? 'done' : '') + '">' +
      '<span class="sn"><span>⚑</span></span><span>Knowledge Check</span></a></li>' +
      '<li><a href="#/certificate" class="' + (route === '#/certificate' ? 'on' : '') + '">' +
      '<span class="sn"><span>★</span></span><span>Certificate</span></a></li>' +
      '</ul>' +
      '<div class="side-foot">' + allUnits().done + ' of ' + allUnits().total + ' activities complete' +
      (kc.submitted ? '<br>Knowledge check: <b>' + kc.pct + '%</b>' : '') +
      '</div>';
  }

  /* ----------------------------------------------------------------- home */
  function renderHome() {
    var p = Store.profile();
    var a = allUnits(), kc = kcState();
    var mins = DATA.modules.reduce(function (s, m) { return s + m.mins; }, 0);

    var h =
      '<div class="hero"><div class="hero-in">' +
      '<p class="kicker">' + esc(PROGRAM.title) + ' · Module ' + COURSE.num + '</p>' +
      '<h1>' + esc(DATA.title) + '</h1>' +
      '<p>' + esc(DATA.blurb) + '</p>' +
      '<div class="chip-row" style="margin-top:18px">' +
      '<span class="chip">Self-paced</span><span class="chip">' + esc(DATA.audience) + '</span>' +
      '<span class="chip">≈ ' + mins + ' minutes</span><span class="chip">Certificate on completion</span></div>' +
      '<div class="hero-stats">' +
      '<div class="hstat"><b>' + DATA.modules.length + '</b><span>Modules</span></div>' +
      '<div class="hstat"><b>' + a.total + '</b><span>Activities</span></div>' +
      '<div class="hstat"><b>' + DATA.knowledgeCheck.questions.length + '</b><span>Graded questions</span></div>' +
      '<div class="hstat"><b>' + (a.total ? Math.round(a.done / a.total * 100) : 0) + '%</b><span>Complete</span></div>' +
      '</div></div></div>' +

      '<div class="wrap" style="padding-top:30px;padding-bottom:70px">' +

      '<div class="card" id="startcard">' +
      '<p class="eyebrow">Before you start</p>' +
      '<h2 style="margin-bottom:6px">Your name for the certificate</h2>' +
      '<p class="muted tiny" style="margin-bottom:16px">Stored only in this browser. Nothing is sent anywhere — there is no account and no server.</p>' +
      '<div class="namebox"><div class="f"><label class="fl" for="nm">Full name</label>' +
      '<input type="text" id="nm" value="' + esc(p.name || '') + '" placeholder="e.g. Alex Fernandez" autocomplete="name"></div>' +
      '<div class="f"><label class="fl" for="rl">Role (optional)</label>' +
      '<input type="text" id="rl" value="' + esc(p.role || '') + '" placeholder="e.g. Account Manager"></div>' +
      '<button class="btn" id="savename">Save</button></div>' +
      '<p class="fielderr" id="nmerr">Enter your name so it can be printed on your certificate.</p>' +
      '<p class="savehint" id="nmhint"></p>' +
      '</div>' +

      '<h2 style="margin-top:34px">What you will cover</h2>' +
      '<div class="grid g3" style="margin-bottom:26px">' +
      DATA.modules.map(function (m) {
        var mp = modProgress(m);
        return '<a class="modcard" href="#/m/' + m.id + '">' +
          '<span class="n">' + esc(m.tag) + ' · ' + m.mins + ' min</span>' +
          '<h3>' + esc(m.title) + '</h3><p>' + esc(m.summary) + '</p>' +
          '<span class="meta">' + (mp.complete ? '<span class="chip ok">Complete</span>' : mp.total ? mp.done + ' / ' + mp.total + ' activities' : 'Reading') + '</span></a>';
      }).join('') +
      '</div>' +

      '<div class="grid g2">' +
      '<div class="card"><p class="eyebrow">Assessment</p><h3>Final Knowledge Check</h3>' +
      '<p class="muted tiny">' + DATA.knowledgeCheck.questions.length + ' graded questions drawn from all five parts. Pass mark ' + DATA.passMark + '%. Your best score is recorded on your certificate.</p>' +
      (kc.submitted ? '<p><span class="chip ok">Best score ' + kc.pct + '%</span></p>' : '') +
      '<div class="btn-row"><a class="btn sec" href="#/check">Go to knowledge check</a></div></div>' +
      '<div class="card"><p class="eyebrow">When you finish</p><h3>Certificate &amp; answer export</h3>' +
      '<p class="muted tiny">Download a certificate with your name, total time invested and knowledge-check score — plus a PDF compiling every reflection and activity result.</p>' +
      '<div class="btn-row"><a class="btn sec" href="#/certificate">Go to certificate</a></div></div>' +
      '</div>' +

      '<div class="card" style="margin-top:26px"><p class="eyebrow">Part of a series</p>' +
      '<h3>' + esc(PROGRAM.title) + '</h3>' +
      '<div class="grid g2" style="margin-top:12px">' +
      PROGRAM.courses.map(function (c) {
        if (c.state === 'active') {
          return '<div class="modcard" style="cursor:default"><span class="n">Module ' + c.num + ' · You are here</span>' +
            '<h3>' + esc(c.title) + '</h3><p>' + esc(c.blurb) + '</p></div>';
        }
        return '<a class="modcard" href="' + c.href + '" target="_blank" rel="noopener">' +
          '<span class="n">Module ' + c.num + '</span><h3>' + esc(c.title) + '</h3>' +
          '<p>' + esc(c.blurb) + '</p><span class="meta">Open in a new tab ↗</span></a>';
      }).join('') +
      '</div></div>' +

      '<div class="card" style="margin-top:26px"><p class="eyebrow">Your data</p>' +
      '<h3>Everything stays in this browser</h3>' +
      '<p class="muted tiny">Progress, answers and reflections are saved in this browser’s local storage on this device. Clearing site data, or opening the course in a different browser or a private window, starts you fresh.</p>' +
      '<div class="btn-row"><button class="btn sec" id="resetall">Reset all my progress</button></div></div>' +

      '</div>';

    var host = document.getElementById('view');
    host.innerHTML = h;

    function saveName() {
      var n = document.getElementById('nm').value.trim();
      var r = document.getElementById('rl').value.trim();
      var err = document.getElementById('nmerr');
      if (!n) {
        err.classList.add('on'); document.getElementById('nm').classList.add('err');
        document.getElementById('nm').focus();
        return;
      }
      err.classList.remove('on'); document.getElementById('nm').classList.remove('err');
      Store.setProfile({ name: n, role: r });
      var hint = document.getElementById('nmhint');
      hint.textContent = 'Saved.'; hint.classList.add('on');
      topbar();
    }
    document.getElementById('savename').addEventListener('click', saveName);
    document.getElementById('nm').addEventListener('keydown', function (e) { if (e.key === 'Enter') saveName(); });
    document.getElementById('nm').addEventListener('input', function () {
      this.classList.remove('err'); document.getElementById('nmerr').classList.remove('on');
    });
    document.getElementById('resetall').addEventListener('click', function () {
      if (!confirm('This erases your name, every answer, all reflections and your time on this device. It cannot be undone.\n\nReset everything?')) return;
      Store.resetAll(); location.hash = '#/'; location.reload();
    });
  }

  /* --------------------------------------------------------------- module */
  function renderModule(id) {
    var mod = DATA.modules.filter(function (m) { return m.id === id; })[0];
    if (!mod) { location.hash = '#/'; return; }
    var idx = DATA.modules.indexOf(mod);
    var host = document.getElementById('view');

    host.innerHTML =
      '<div class="shell">' +
      '<aside class="sidebar" id="sidebar"></aside>' +
      '<div class="content" id="content"></div>' +
      '</div>';

    var c = document.getElementById('content');
    c.appendChild(el(
      '<div class="mod-head">' +
      '<div class="mod-head-img" style="background-image:url(\'' + mod.img + '\')">' +
      '<div class="t"><div class="n">' + esc(mod.tag) + ' · Module ' + mod.num + ' of ' + DATA.modules.length + ' · ' + mod.mins + ' min</div>' +
      '<h1>' + esc(mod.title) + '</h1></div></div>' +
      '<div class="mod-head-body"><p class="lede" style="margin:0">' + esc(mod.summary) + '</p></div></div>'));

    mod.blocks.forEach(function (b) {
      var node = null;
      switch (b.k) {
        case 'lede':     node = el('<div class="card"><p class="lede" style="margin:0">' + b.html + '</p></div>'); break;
        case 'h':        node = el('<h2 class="sech"><span class="dot"></span>' + esc(b.text) + '</h2>'); break;
        case 'p':        node = el('<div class="card"><p style="margin:0">' + b.html + '</p></div>'); break;
        case 'src':      node = el('<p class="src">' + esc(b.text) + '</p>'); break;
        case 'callout':
          node = el('<div class="callout ' + (b.tone === 'warn' ? 'warnbox' : b.tone === 'warnbox' ? 'warnbox' : b.tone || '') + '">' +
            (b.title ? '<h4>' + esc(b.title) + '</h4>' : '') +
            (b.tone === 'quote' ? '<p>' + b.html + '</p>' : b.html) + '</div>');
          break;
        case 'list':
          node = el('<div class="card">' + (b.title ? '<h3>' + esc(b.title) + '</h3>' : '') +
            '<ul class="deflist">' + b.items.map(function (i) {
              return '<li><span class="k">' + esc(i.n) + '</span><div><b>' + i.title + '</b><p>' + i.text + '</p></div></li>';
            }).join('') + '</ul></div>');
          break;
        case 'diagram':
          node = el('<div class="card">' + Diagrams[b.name]() + '</div>');
          if (Diagrams[b.name].init) setTimeout(function () { Diagrams[b.name].init(node); }, 0);
          break;
        case 'activity': node = Activities[b.type](b); break;
        case 'quiz':     node = Blocks.quiz(b, 'cfu'); break;
        case 'video':    node = Blocks.video(b); break;
        case 'reflect':  node = Blocks.reflect(b); break;
      }
      if (node) c.appendChild(node);
    });

    var prev = DATA.modules[idx - 1], next = DATA.modules[idx + 1];
    c.appendChild(el('<div class="modnav">' +
      (prev ? '<a class="btn sec" href="#/m/' + prev.id + '">← ' + esc(prev.title) + '</a>' : '<a class="btn sec" href="#/">← Course home</a>') +
      (next ? '<a class="btn" href="#/m/' + next.id + '">' + esc(next.title) + ' →</a>'
            : '<a class="btn" href="#/check">Final knowledge check →</a>') +
      '</div>'));

    refreshProgress();
  }

  /* ------------------------------------------------------ knowledge check */
  function renderCheck() {
    var host = document.getElementById('view');
    host.innerHTML = '<div class="shell"><aside class="sidebar" id="sidebar"></aside><div class="content" id="content"></div></div>';
    var c = document.getElementById('content');
    var a = allUnits();

    c.appendChild(el('<div class="mod-head"><div class="mod-head-img" style="background-image:url(\'assets/closing.jpg\')">' +
      '<div class="t"><div class="n">Assessment · pass mark ' + DATA.passMark + '%</div><h1>Final Knowledge Check</h1></div></div>' +
      '<div class="mod-head-body"><p class="lede" style="margin:0">' + esc(DATA.knowledgeCheck.blurb) + '</p></div></div>'));

    if (a.done < a.total) {
      c.appendChild(el('<div class="callout warnbox"><h4>You have ' + (a.total - a.done) + ' activit' +
        (a.total - a.done === 1 ? 'y' : 'ies') + ' still open</h4>' +
        '<p>You can take the check now — but the questions draw on every part, so it will go better after you have worked through them.</p></div>'));
    }

    c.appendChild(Blocks.quiz(DATA.knowledgeCheck, 'graded'));
    c.appendChild(el('<div class="modnav"><a class="btn sec" href="#/m/' + DATA.modules[DATA.modules.length - 1].id + '">← Back to the last module</a>' +
      '<a class="btn" href="#/certificate">Certificate →</a></div>'));
    refreshProgress();
  }

  /* ---------------------------------------------------------- certificate */
  function renderCert() {
    var host = document.getElementById('view');
    host.innerHTML = '<div class="shell"><aside class="sidebar" id="sidebar"></aside><div class="content" id="content"></div></div>';
    Certificate.render(document.getElementById('content'), {
      data: DATA, allUnits: allUnits(), kc: kcState(), modProgress: modProgress
    });
    refreshProgress();
  }

  /* -------------------------------------------------------------- routing */
  function route() {
    var h = location.hash || '#/';
    window.scrollTo({ top: 0, behavior: 'auto' });
    if (h.indexOf('#/m/') === 0) renderModule(h.slice(4));
    else if (h === '#/check') renderCheck();
    else if (h === '#/certificate') renderCert();
    else renderHome();
    document.getElementById('backhome').hidden = (h === '#/');
    topbar();
  }

  function toast(msg) {
    var t = document.getElementById('toast');
    t.textContent = msg; t.classList.add('on');
    clearTimeout(toast._t); toast._t = setTimeout(function () { t.classList.remove('on'); }, 1800);
  }

  function init() {
    DATA = getCourseData();
    document.title = DATA.title + ' — Module ' + COURSE.num;
    document.getElementById('brandtitle').textContent = DATA.title;
    Store.startClock();
    Store.on('tick', function () { document.getElementById('tclock').textContent = Store.fmtTime(Store.elapsed()); });
    if (!Store.available) {
      document.body.insertBefore(el('<div class="callout warnbox" style="margin:0;border-radius:0;text-align:center">' +
        '<p style="margin:0"><b>This browser is blocking local storage</b> — usually a private window. ' +
        'The course works, but nothing will be saved when you close the tab.</p></div>'), document.body.firstChild);
    }
    global.addEventListener('hashchange', route);
    route();
  }

  global.App = { refreshProgress: refreshProgress, toast: toast, units: units, modProgress: modProgress, kcState: kcState, allUnits: allUnits, data: function () { return DATA; } };
  document.addEventListener('DOMContentLoaded', init);
})(window);
