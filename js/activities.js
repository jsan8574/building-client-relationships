/* =============================================================================
   activities.js — one renderer per activity type.

   Two rules hold across every type:
   1. State is written to storage on EVERY interaction, not on completion, so a
      mid-activity refresh restores the learner exactly where they were.
   2. Completion reveals a "Coaching key points" callout carrying the actual
      pedagogical point from the facilitator notes.

   Interaction model: click-to-select then click-to-place is the primary
   mechanism (it works identically with a mouse, a finger and a keyboard).
   HTML5 drag-and-drop is layered on top as an enhancement for pointer devices.
   ========================================================================== */
(function (global) {
  'use strict';

  var A = {};
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]; }); }
  function el(html) { var t = document.createElement('div'); t.innerHTML = html.trim(); return t.firstChild; }
  function shuffle(a, seed) {
    var arr = a.slice(), s = seed || 7;
    for (var i = arr.length - 1; i > 0; i--) {
      s = (s * 9301 + 49297) % 233280;
      var j = Math.floor((s / 233280) * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }

  function frame(cfg, bodyHTML) {
    return '<section class="act" id="act-' + cfg.id + '">' +
      '<div class="act-h"><div class="ico">' + (cfg.icon || '✦') + '</div>' +
      '<div class="tt"><b>' + esc(cfg.title) + '</b><span>' + esc(cfg.sub || '') + '</span></div>' +
      '<div class="badge">' + esc(cfg.badge || 'Activity') + '</div></div>' +
      '<div class="act-b">' +
      (cfg.task ? '<p class="act-task">' + cfg.task + '</p>' : '') +
      bodyHTML +
      '<p class="act-status" data-status></p>' +
      '<div data-coach></div>' +
      '</div></section>';
  }

  function coachHTML(c) {
    return '<div class="coach"><div class="coach-h">★ ' + esc(c.title || 'Coaching key points') + '</div>' +
      '<div class="coach-b">' + c.html + '</div></div>';
  }

  function finish(root, cfg, ok) {
    var slot = root.querySelector('[data-coach]');
    if (ok && cfg.coach && !slot.firstChild) slot.appendChild(el(coachHTML(cfg.coach)));
    if (ok) { Store.saveAct(cfg.id, { done: true }); global.App && App.refreshProgress(); }
  }

  function status(root, msg, tone) {
    var s = root.querySelector('[data-status]');
    s.textContent = msg; s.className = 'act-status' + (tone ? ' ' + tone : '');
  }

  /* ======================================================================
     BUCKET SORT — N items into fixed categories.
     Used wherever the correct label repeats across items, which is exactly
     the case one-to-one matching cannot express unambiguously.
     ================================================================== */
  A.bucket = function (cfg) {
    var saved = Store.actState(cfg.id) || {};
    var placed = saved.placed || {};

    var html =
      '<p class="dnd-hint">Tap an item to pick it up, then tap a category — or drag it. Tap a placed item to send it back.</p>' +
      '<div class="dnd-pool" data-pool></div>' +
      '<div class="dnd-buckets">' +
      cfg.buckets.map(function (b) {
        return '<div class="dnd-bucket" data-b="' + b.id + '"><div class="bh">' + esc(b.label) + '</div>' +
          '<div class="bs">' + esc(b.sub || '') + '</div><div class="dnd-drop" data-drop="' + b.id + '"></div></div>';
      }).join('') +
      '</div>' +
      '<div class="btn-row"><button class="btn" data-check>Check my answers</button>' +
      '<button class="btn sec" data-reset>Start over</button></div>';

    var root = el(frame(cfg, html));
    var pool = root.querySelector('[data-pool]');
    var sel = null;

    function itemEl(it) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'dnd-item'; b.textContent = it.text;
      b.setAttribute('data-i', it.id); b.draggable = true;
      b.addEventListener('click', function () {
        if (root.dataset.locked === '1') return;
        if (b.parentNode !== pool) { pool.appendChild(b); delete placed[it.id]; save(); render(); return; }
        if (sel === b) { sel = null; b.classList.remove('sel'); return; }
        if (sel) sel.classList.remove('sel');
        sel = b; b.classList.add('sel');
      });
      b.addEventListener('dragstart', function (e) {
        if (root.dataset.locked === '1') { e.preventDefault(); return; }
        e.dataTransfer.setData('text/plain', it.id); e.dataTransfer.effectAllowed = 'move';
        setTimeout(function () { b.classList.add('drag'); }, 0);
      });
      b.addEventListener('dragend', function () { b.classList.remove('drag'); });
      return b;
    }

    function save() { Store.saveAct(cfg.id, { placed: placed }); }

    function place(id, bucket) {
      placed[id] = bucket; sel = null; save(); render();
      status(root, '', '');
    }

    function render() {
      pool.innerHTML = '';
      root.querySelectorAll('[data-drop]').forEach(function (d) { d.innerHTML = ''; });
      shuffle(cfg.items, 31).forEach(function (it) {
        var node = itemEl(it);
        var b = placed[it.id];
        if (b && root.querySelector('[data-drop="' + b + '"]')) root.querySelector('[data-drop="' + b + '"]').appendChild(node);
        else pool.appendChild(node);
      });
    }

    root.querySelectorAll('.dnd-bucket').forEach(function (bk) {
      var id = bk.getAttribute('data-b');
      bk.addEventListener('click', function (e) {
        if (root.dataset.locked === '1') return;
        if (e.target.closest('.dnd-item')) return;
        if (sel) place(sel.getAttribute('data-i'), id);
      });
      bk.addEventListener('dragover', function (e) { e.preventDefault(); bk.classList.add('over'); });
      bk.addEventListener('dragleave', function () { bk.classList.remove('over'); });
      bk.addEventListener('drop', function (e) {
        e.preventDefault(); bk.classList.remove('over');
        var id = e.dataTransfer.getData('text/plain');
        if (id) place(id, bk.getAttribute('data-b'));
      });
    });
    pool.addEventListener('dragover', function (e) { e.preventDefault(); });
    pool.addEventListener('drop', function (e) {
      e.preventDefault();
      var id = e.dataTransfer.getData('text/plain');
      if (id) { delete placed[id]; save(); render(); }
    });

    root.querySelector('[data-check]').addEventListener('click', function () {
      var total = cfg.items.length, done = 0, right = 0;
      cfg.items.forEach(function (it) {
        var node = root.querySelector('[data-i="' + it.id + '"]');
        node.classList.remove('right', 'wrong');
        if (!placed[it.id]) return;
        done++;
        if (placed[it.id] === it.b) { right++; node.classList.add('right'); }
        else node.classList.add('wrong');
      });
      if (done < total) { status(root, (total - done) + ' item' + (total - done === 1 ? '' : 's') + ' still to place.', 'bad'); return; }
      if (right === total) {
        status(root, 'All ' + total + ' correct.', 'good');
        root.dataset.locked = '1';
        finish(root, cfg, true);
      } else {
        status(root, right + ' of ' + total + ' correct. Tap a red item to send it back and try again.', 'bad');
      }
    });
    root.querySelector('[data-reset]').addEventListener('click', function () {
      placed = {}; sel = null; root.dataset.locked = '';
      root.querySelector('[data-coach]').innerHTML = '';
      Store.saveAct(cfg.id, { placed: {}, done: false });
      status(root, '', ''); render(); global.App && App.refreshProgress();
    });

    render();
    if (saved.done) { root.querySelector('[data-check]').click(); }
    return root;
  };

  /* ======================================================================
     SEQUENCE — N unique steps in one correct order.
     ================================================================== */
  A.sequence = function (cfg) {
    var saved = Store.actState(cfg.id) || {};
    var order = (saved.order && saved.order.length === cfg.items.length) ? saved.order : shuffle(cfg.items.map(function (i) { return i.id; }), 13);
    var byId = {}; cfg.items.forEach(function (i) { byId[i.id] = i; });

    var root = el(frame(cfg,
      '<ol class="seq" data-seq></ol>' +
      '<div class="btn-row"><button class="btn" data-check>Check the order</button>' +
      '<button class="btn sec" data-reset>Shuffle again</button></div>'));
    var list = root.querySelector('[data-seq]');

    function save() { Store.saveAct(cfg.id, { order: order }); }

    function render() {
      list.innerHTML = '';
      order.forEach(function (id, idx) {
        var it = byId[id];
        var li = document.createElement('li');
        li.setAttribute('data-id', id); li.draggable = true;
        li.innerHTML = '<span class="pos">' + (idx + 1) + '</span>' +
          '<span class="txt"><b>' + esc(it.title) + '</b><span>' + esc(it.text) + '</span></span>' +
          '<span class="mv"><button type="button" data-up aria-label="Move up"' + (idx === 0 ? ' disabled' : '') + '>▲</button>' +
          '<button type="button" data-dn aria-label="Move down"' + (idx === order.length - 1 ? ' disabled' : '') + '>▼</button></span>';
        li.querySelector('[data-up]').addEventListener('click', function () { move(idx, idx - 1); });
        li.querySelector('[data-dn]').addEventListener('click', function () { move(idx, idx + 1); });
        li.addEventListener('dragstart', function (e) {
          if (root.dataset.locked === '1') { e.preventDefault(); return; }
          e.dataTransfer.setData('text/plain', id); li.classList.add('drag');
        });
        li.addEventListener('dragend', function () { li.classList.remove('drag'); });
        li.addEventListener('dragover', function (e) { e.preventDefault(); li.classList.add('over'); });
        li.addEventListener('dragleave', function () { li.classList.remove('over'); });
        li.addEventListener('drop', function (e) {
          e.preventDefault(); li.classList.remove('over');
          var from = order.indexOf(e.dataTransfer.getData('text/plain'));
          var to = order.indexOf(id);
          if (from > -1 && to > -1 && from !== to) move(from, to);
        });
        list.appendChild(li);
      });
    }
    function move(from, to) {
      if (root.dataset.locked === '1') return;
      if (to < 0 || to >= order.length) return;
      var x = order.splice(from, 1)[0]; order.splice(to, 0, x);
      save(); render(); status(root, '', '');
    }

    root.querySelector('[data-check]').addEventListener('click', function () {
      var right = 0;
      order.forEach(function (id, i) {
        var li = list.children[i];
        li.classList.remove('right', 'wrong');
        if (cfg.order[i] === id) { right++; li.classList.add('right'); } else li.classList.add('wrong');
      });
      if (right === order.length) {
        status(root, 'Correct order.', 'good'); root.dataset.locked = '1'; finish(root, cfg, true);
      } else {
        status(root, right + ' of ' + order.length + ' in the right position. Move the red ones.', 'bad');
      }
    });
    root.querySelector('[data-reset]').addEventListener('click', function () {
      order = shuffle(cfg.items.map(function (i) { return i.id; }), Math.floor(Math.random() * 999) + 1);
      root.dataset.locked = ''; root.querySelector('[data-coach]').innerHTML = '';
      Store.saveAct(cfg.id, { order: order, done: false });
      status(root, '', ''); render(); global.App && App.refreshProgress();
    });

    render(); save();
    if (saved.done) root.querySelector('[data-check]').click();
    return root;
  };

  /* ======================================================================
     FLIP CARDS — explore N independent concepts.
     ================================================================== */
  A.flip = function (cfg) {
    var saved = Store.actState(cfg.id) || {};
    var seen = saved.seen || [];
    var root = el(frame(cfg, '<div class="flipgrid" data-grid></div>'));
    var grid = root.querySelector('[data-grid]');

    cfg.cards.forEach(function (c, i) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'flip'; b.setAttribute('aria-label', c.title + ' — flip for detail');
      b.innerHTML = '<span class="flip-in">' +
        '<span class="flip-f"><span class="lt" style="background:' + c.color + ';color:#10232B">' + c.letter + '</span>' +
        '<h4>' + esc(c.title) + '</h4><p class="sub">' + esc(c.sub) + '</p><span class="cue">Tap to flip</span></span>' +
        '<span class="flip-bk">' + c.back + '<span class="cue">Tap to flip back</span></span></span>';
      if (seen.indexOf(c.letter) > -1) b.classList.add('seen');
      b.addEventListener('click', function () {
        b.classList.toggle('on');
        if (seen.indexOf(c.letter) < 0) {
          seen.push(c.letter); b.classList.add('seen');
          Store.saveAct(cfg.id, { seen: seen });
          check();
        }
      });
      grid.appendChild(b);
    });

    function check() {
      var n = seen.length, total = cfg.cards.length;
      if (n >= total) { status(root, 'All ' + total + ' explored.', 'good'); finish(root, cfg, true); }
      else status(root, n + ' of ' + total + ' explored.', '');
    }
    check();
    return root;
  };

  /* ======================================================================
     MATCHING WITH CONNECTOR LINES — genuine 1:1, both sides distinct.
     Below 760px the two columns collapse to one, at which point connector
     geometry is meaningless: the SVG is suppressed and pairing is shown by
     a numbered tag on each linked card instead.
     ================================================================== */
  A.match = function (cfg) {
    var saved = Store.actState(cfg.id) || {};
    var links = saved.links || {};                       // leftId -> rightId
    var rights = shuffle(cfg.right, 17);

    var root = el(frame(cfg,
      '<div class="match">' +
        '<div class="match-cols">' +
          '<div class="match-col" data-left><span class="match-col-h">The pillar</span></div>' +
          '<div class="match-mid"><svg class="match-svg" data-svg aria-hidden="true"></svg></div>' +
          '<div class="match-col" data-right><span class="match-col-h">The failure it prevents</span></div>' +
        '</div>' +
      '</div>' +
      '<div class="btn-row"><button class="btn" data-check>Check my pairs</button>' +
      '<button class="btn sec" data-reset>Clear pairs</button></div>'));

    var L = root.querySelector('[data-left]'), R = root.querySelector('[data-right]');
    var svg = root.querySelector('[data-svg]');
    var selLeft = null;

    cfg.left.forEach(function (l) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'match-item'; b.setAttribute('data-l', l.id);
      b.innerHTML = '<b>' + esc(l.title) + '</b>' + esc(l.text) + '<span class="match-tag"></span>';
      b.addEventListener('click', function () {
        if (root.dataset.locked === '1') return;
        if (links[l.id]) { delete links[l.id]; save(); paint(); return; }
        selLeft = (selLeft === l.id) ? null : l.id;
        paint();
      });
      L.appendChild(b);
    });
    rights.forEach(function (r) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'match-item'; b.setAttribute('data-r', r.id);
      b.innerHTML = esc(r.text) + '<span class="match-tag"></span>';
      b.addEventListener('click', function () {
        if (root.dataset.locked === '1') return;
        var owner = null;
        for (var k in links) if (links[k] === r.id) owner = k;
        if (owner) { delete links[owner]; save(); paint(); if (!selLeft) return; }
        if (!selLeft) { status(root, 'Pick a pillar on the left first.', ''); return; }
        links[selLeft] = r.id; selLeft = null; save(); paint(); status(root, '', '');
      });
      R.appendChild(b);
    });

    function save() { Store.saveAct(cfg.id, { links: links }); }

    function paint() {
      var n = 0, num = {};
      Object.keys(links).forEach(function (lid) { num[lid] = ++n; });
      root.querySelectorAll('[data-l]').forEach(function (b) {
        var id = b.getAttribute('data-l');
        b.classList.toggle('sel', selLeft === id);
        b.classList.toggle('linked', !!links[id]);
        b.querySelector('.match-tag').textContent = links[id] ? num[id] : '';
      });
      root.querySelectorAll('[data-r]').forEach(function (b) {
        var id = b.getAttribute('data-r'), owner = null;
        for (var k in links) if (links[k] === id) owner = k;
        b.classList.toggle('linked', !!owner);
        b.querySelector('.match-tag').textContent = owner ? num[owner] : '';
      });
      lines();
    }

    /* connector lines: drawn only while the two-column layout is real */
    function lines() {
      svg.innerHTML = '';
      if (global.matchMedia('(max-width:760px)').matches) return;
      var host = root.querySelector('.match-cols').getBoundingClientRect();
      var mid = root.querySelector('.match-mid').getBoundingClientRect();
      svg.setAttribute('viewBox', '0 0 ' + Math.max(1, mid.width) + ' ' + Math.max(1, mid.height));
      svg.setAttribute('preserveAspectRatio', 'none');
      Object.keys(links).forEach(function (lid) {
        var a = root.querySelector('[data-l="' + lid + '"]');
        var b = root.querySelector('[data-r="' + links[lid] + '"]');
        if (!a || !b) return;
        var ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
        var y1 = ra.top + ra.height / 2 - mid.top, y2 = rb.top + rb.height / 2 - mid.top;
        var w = mid.width;
        var ok = a.classList.contains('right');
        var bad = a.classList.contains('wrong');
        var col = ok ? '#316757' : (bad ? '#8C3030' : '#3394BA');
        var p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        p.setAttribute('d', 'M0 ' + y1 + ' C ' + (w * 0.45) + ' ' + y1 + ', ' + (w * 0.55) + ' ' + y2 + ', ' + w + ' ' + y2);
        p.setAttribute('fill', 'none'); p.setAttribute('stroke', col); p.setAttribute('stroke-width', '2');
        p.setAttribute('vector-effect', 'non-scaling-stroke');
        svg.appendChild(p);
      });
    }
    var raf = null;
    function relines() { if (raf) cancelAnimationFrame(raf); raf = requestAnimationFrame(lines); }
    global.addEventListener('resize', relines);

    root.querySelector('[data-check]').addEventListener('click', function () {
      var total = cfg.left.length, made = Object.keys(links).length, right = 0;
      if (made < total) { status(root, (total - made) + ' pair' + (total - made === 1 ? '' : 's') + ' still to make.', 'bad'); return; }
      cfg.left.forEach(function (l) {
        var a = root.querySelector('[data-l="' + l.id + '"]');
        var b = root.querySelector('[data-r="' + links[l.id] + '"]');
        a.classList.remove('right', 'wrong'); if (b) b.classList.remove('right', 'wrong');
        var good = links[l.id] === l.id;             // right-hand ids carry the id of their pillar
        if (good) right++;
        a.classList.add(good ? 'right' : 'wrong');
        if (b) b.classList.add(good ? 'right' : 'wrong');
      });
      lines();
      if (right === total) { status(root, 'All ' + total + ' pairs correct.', 'good'); root.dataset.locked = '1'; finish(root, cfg, true); }
      else status(root, right + ' of ' + total + ' correct. Tap a red pair to break it and try again.', 'bad');
    });
    root.querySelector('[data-reset]').addEventListener('click', function () {
      links = {}; selLeft = null; root.dataset.locked = '';
      root.querySelectorAll('.match-item').forEach(function (b) { b.classList.remove('right', 'wrong'); });
      root.querySelector('[data-coach]').innerHTML = '';
      Store.saveAct(cfg.id, { links: {}, done: false }); status(root, '', ''); paint();
      global.App && App.refreshProgress();
    });

    setTimeout(function () { paint(); if (saved.done) root.querySelector('[data-check]').click(); }, 60);
    return root;
  };

  /* ======================================================================
     ANNOTATION / SCAVENGER HUNT — find the one row that matters.
     ================================================================== */
  A.hunt = function (cfg) {
    var saved = Store.actState(cfg.id) || {};
    var pick = saved.pick || null;

    var root = el(frame(cfg,
      '<div class="hunt"><table class="hunt-t"><thead><tr>' +
      cfg.cols.map(function (c) { return '<th scope="col">' + esc(c) + '</th>'; }).join('') +
      '</tr></thead><tbody data-body></tbody></table></div>' +
      '<p class="hunt-scroll-note">Scroll the table sideways to see every column.</p>' +
      '<div class="btn-row"><button class="btn" data-check>Lock in my answer</button>' +
      '<button class="btn sec" data-reset>Choose again</button></div>'));

    var body = root.querySelector('[data-body]');
    cfg.rows.forEach(function (r) {
      var tr = document.createElement('tr');
      tr.setAttribute('data-row', r.id);
      tr.innerHTML = r.cells.map(function (c, i) {
        return '<td>' + (i === 0 ? '<button type="button">' + esc(c) + '</button>' : '<button type="button" tabindex="-1">' + esc(c) + '</button>') + '</td>';
      }).join('');
      tr.addEventListener('click', function () {
        if (root.dataset.locked === '1') return;
        pick = r.id; Store.saveAct(cfg.id, { pick: pick }); paint(); status(root, '', '');
      });
      body.appendChild(tr);
    });

    function paint() {
      root.querySelectorAll('[data-row]').forEach(function (tr) {
        tr.classList.toggle('sel', tr.getAttribute('data-row') === pick && root.dataset.locked !== '1');
      });
    }

    root.querySelector('[data-check]').addEventListener('click', function () {
      if (!pick) { status(root, 'Select an account first.', 'bad'); return; }
      var row = cfg.rows.filter(function (r) { return r.id === pick; })[0];
      var tr = root.querySelector('[data-row="' + pick + '"]');
      root.querySelectorAll('[data-row]').forEach(function (x) { x.classList.remove('sel', 'right', 'wrong'); });
      if (row.answer) {
        tr.classList.add('right'); status(root, 'Correct — ' + row.cells[0] + '.', 'good');
        root.dataset.locked = '1'; finish(root, cfg, true);
      } else {
        tr.classList.add('wrong');
        status(root, 'Not the highest risk — look again.', 'bad');
        var slot = root.querySelector('[data-coach]');
        slot.innerHTML = '<div class="sim-fb bad"><b>' + esc(row.cells[0]) + '</b>' + (cfg.wrongFb[pick] || '') + '</div>';
      }
    });
    root.querySelector('[data-reset]').addEventListener('click', function () {
      pick = null; root.dataset.locked = '';
      root.querySelectorAll('[data-row]').forEach(function (x) { x.classList.remove('sel', 'right', 'wrong'); });
      root.querySelector('[data-coach]').innerHTML = '';
      Store.saveAct(cfg.id, { pick: null, done: false }); status(root, '', '');
      global.App && App.refreshProgress();
    });

    paint();
    if (saved.done) { root.querySelector('[data-check]').click(); }
    return root;
  };

  /* ======================================================================
     BRANCHING SIMULATION — pick a response, get feedback, retry if wrong,
     continue if right. The workshop role play, rebuilt for one learner.
     ================================================================== */
  A.sim = function (cfg) {
    var saved = Store.actState(cfg.id) || {};
    var step = saved.step || 0;
    var results = saved.results || [];          // per step: {attempts:n}

    var root = el(frame(cfg,
      (cfg.scenario ? '<div class="callout"><h4>The scenario</h4><p>' + cfg.scenario + '</p></div>' : '') +
      '<div class="sim-track" data-track></div>' +
      '<div data-stage></div>' +
      '<div class="btn-row" data-nav></div>'));

    var stage = root.querySelector('[data-stage]');
    var nav = root.querySelector('[data-nav]');

    function save() { Store.saveAct(cfg.id, { step: step, results: results }); }

    function track() {
      root.querySelector('[data-track]').innerHTML = cfg.steps.map(function (_, i) {
        return '<i class="' + (i < step ? 'done' : (i === step ? 'on' : '')) + '"></i>';
      }).join('');
    }

    function render() {
      track();
      nav.innerHTML = '';
      if (step >= cfg.steps.length) { done(); return; }
      var s = cfg.steps[step];
      if (!results[step]) results[step] = { attempts: 0 };
      stage.innerHTML =
        '<div class="sim-stage"><div class="who">' + esc(s.who) + '</div><p class="said">' + s.said + '</p></div>' +
        '<p class="act-task"><b>' + esc(s.prompt) + '</b></p>' +
        '<div class="sim-opts" data-opts></div><div data-fb></div>';
      var opts = stage.querySelector('[data-opts]');
      var fb = stage.querySelector('[data-fb]');

      shuffle(s.opts.map(function (o, i) { return i; }), 23 + step * 7).forEach(function (i) {
        var o = s.opts[i];
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'sim-opt'; b.innerHTML = o.t;
        b.addEventListener('click', function () {
          results[step].attempts++;
          if (o.ok) {
            opts.querySelectorAll('.sim-opt').forEach(function (x) { x.disabled = true; if (x !== b) x.classList.add('dim'); });
            b.classList.add('picked-good');
            fb.innerHTML = '<div class="sim-fb good">' + o.fb + '</div>';
            save();
            nav.innerHTML = '';
            var next = document.createElement('button');
            next.className = 'btn';
            next.textContent = (step === cfg.steps.length - 1) ? 'Finish the call' : 'Continue →';
            next.addEventListener('click', function () { step++; save(); render(); root.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); });
            nav.appendChild(next);
          } else {
            b.classList.add('picked-bad'); b.disabled = true;
            fb.innerHTML = '<div class="sim-fb bad">' + o.fb + '<br><br><b style="display:inline">Try another response.</b></div>';
            save();
          }
        });
        opts.appendChild(b);
      });
    }

    function done() {
      var first = results.filter(function (r) { return r && r.attempts === 1; }).length;
      stage.innerHTML = '<div class="scorebox pass"><div><div class="big">' + first + '/' + cfg.steps.length + '</div>' +
        '<div class="lbl">decisions right first time</div></div>' +
        '<p class="muted" style="margin:0;flex:1 1 200px;min-width:0">You worked the call through to the end. Read the coaching below — it is the part that transfers to a real client.</p></div>';
      status(root, 'Simulation complete.', 'good');
      nav.innerHTML = '';
      var again = document.createElement('button');
      again.className = 'btn sec'; again.textContent = 'Run it again';
      again.addEventListener('click', function () {
        step = 0; results = []; Store.saveAct(cfg.id, { step: 0, results: [], done: false });
        root.querySelector('[data-coach]').innerHTML = ''; status(root, '', ''); render();
        global.App && App.refreshProgress();
      });
      nav.appendChild(again);
      finish(root, cfg, true);
    }

    render();
    return root;
  };

  global.Activities = A;
  global.ActivityUtil = { esc: esc, el: el, frame: frame, coachHTML: coachHTML, status: status, finish: finish, shuffle: shuffle };
})(window);
