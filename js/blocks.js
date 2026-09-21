/* =============================================================================
   blocks.js — quiz, video and reflection renderers.
   Same two rules as activities.js: save on every interaction, and reveal the
   real coaching point on completion.
   ========================================================================== */
(function (global) {
  'use strict';
  var U = global.ActivityUtil, esc = U.esc, el = U.el;
  var B = {};

  /* ======================================================================
     CHECK FOR UNDERSTANDING / GRADED QUIZ
     mode 'cfu'   — immediate feedback, retry, not graded
     mode 'graded'— answer all, submit once, score recorded, retake allowed
     ================================================================== */
  B.quiz = function (cfg, mode) {
    mode = mode || 'cfu';
    var saved = Store.quizState(cfg.id) || {};
    var picks = saved.picks || {};
    var submitted = !!saved.submitted;

    var root = el(
      '<section class="act" id="q-' + cfg.id + '">' +
      '<div class="act-h"><div class="ico">✓</div><div class="tt"><b>' + esc(cfg.title) + '</b>' +
      '<span>' + cfg.questions.length + ' question' + (cfg.questions.length === 1 ? '' : 's') + '</span></div>' +
      '<div class="badge">' + (mode === 'graded' ? 'Graded' : 'Check') + '</div></div>' +
      '<div class="act-b">' +
      (cfg.blurb ? '<p class="act-task">' + cfg.blurb + '</p>' : '') +
      '<div data-score></div><div data-qs></div>' +
      '<p class="act-status" data-status></p>' +
      '<div class="btn-row"><button class="btn" data-submit></button>' +
      '<button class="btn sec" data-retry hidden>Retake</button></div>' +
      '</div></section>');

    var qs = root.querySelector('[data-qs]');
    var scoreBox = root.querySelector('[data-score]');
    var submitBtn = root.querySelector('[data-submit]');
    var retryBtn = root.querySelector('[data-retry]');

    function save() { Store.saveQuiz(cfg.id, { picks: picks, submitted: submitted, score: score(), best: best() }); }
    function score() {
      var n = 0;
      cfg.questions.forEach(function (q, i) { if (picks[i] === q.a) n++; });
      return n;
    }
    function best() {
      var prev = (Store.quizState(cfg.id) || {}).best || 0;
      return submitted ? Math.max(prev, score()) : prev;
    }

    function render() {
      qs.innerHTML = '';
      cfg.questions.forEach(function (q, i) {
        var d = document.createElement('div');
        d.className = 'quiz-q';
        d.innerHTML = '<p class="qt"><span class="qn">' + (i + 1) + '</span>' + q.q + '</p><div class="opts"></div><div data-fb></div>';
        var wrap = d.querySelector('.opts');
        q.opts.forEach(function (o, oi) {
          var lab = document.createElement('label');
          lab.className = 'opt';
          lab.innerHTML = '<input type="radio" name="' + cfg.id + '-' + i + '" value="' + oi + '"' +
            (picks[i] === oi ? ' checked' : '') + (submitted ? ' disabled' : '') + '><span>' + o + '</span>';
          lab.querySelector('input').addEventListener('change', function () {
            picks[i] = oi; save();
            if (mode === 'cfu') mark(i, d);
            setButtons();
          });
          wrap.appendChild(lab);
        });
        qs.appendChild(d);
        if (submitted || (mode === 'cfu' && picks[i] !== undefined)) mark(i, d);
      });
    }

    function mark(i, d) {
      var q = cfg.questions[i], fb = d.querySelector('[data-fb]');
      d.querySelectorAll('.opt').forEach(function (lab, oi) {
        lab.classList.remove('right', 'wrong', 'miss');
        if (picks[i] === undefined) return;
        if (oi === q.a) lab.classList.add(picks[i] === q.a ? 'right' : 'miss');
        else if (oi === picks[i]) lab.classList.add('wrong');
      });
      if (picks[i] === undefined) { fb.innerHTML = ''; return; }
      var good = picks[i] === q.a;
      fb.innerHTML = '<p class="qfb ' + (good ? 'good' : 'bad') + '"><b>' + (good ? 'Correct. ' : 'Not quite. ') + '</b>' + q.fb + '</p>';
    }

    function paintScore() {
      var s = score(), t = cfg.questions.length, pct = Math.round(s / t * 100);
      if (!submitted) { scoreBox.innerHTML = ''; return; }
      var pass = pct >= ((global.getCourseData && getCourseData().passMark) || 70);
      scoreBox.innerHTML = '<div class="scorebox' + (pass ? ' pass' : '') + '">' +
        '<div><div class="big">' + pct + '%</div><div class="lbl">' + s + ' of ' + t + ' correct</div></div>' +
        '<p style="margin:0;flex:1 1 220px;min-width:0" class="muted">' +
        (pass ? 'Pass — this score is recorded on your certificate.' : 'Below the ' + ((global.getCourseData && getCourseData().passMark) || 70) + '% pass mark. Review the feedback and retake — your best score is the one that counts.') +
        '</p></div>';
    }

    function setButtons() {
      if (mode === 'cfu') {
        var answered = cfg.questions.filter(function (_, i) { return picks[i] !== undefined; }).length;
        var allRight = score() === cfg.questions.length;
        submitBtn.hidden = true; retryBtn.hidden = !answered;
        retryBtn.textContent = 'Clear answers';
        U.status(root, answered + ' of ' + cfg.questions.length + ' answered' + (allRight ? ' — all correct.' : '.'), allRight ? 'good' : '');
        if (allRight) { Store.saveAct(cfg.id, { done: true }); global.App && App.refreshProgress(); }
      } else {
        submitBtn.hidden = submitted;
        submitBtn.textContent = 'Submit answers';
        retryBtn.hidden = !submitted; retryBtn.textContent = 'Retake';
        var answered = cfg.questions.filter(function (_, i) { return picks[i] !== undefined; }).length;
        if (!submitted) U.status(root, answered + ' of ' + cfg.questions.length + ' answered.', '');
        else U.status(root, '', '');
      }
    }

    submitBtn.addEventListener('click', function () {
      var missing = [];
      cfg.questions.forEach(function (_, i) { if (picks[i] === undefined) missing.push(i + 1); });
      if (missing.length) {
        U.status(root, 'Answer every question first — still to do: ' + missing.join(', ') + '.', 'bad');
        return;
      }
      submitted = true; save(); render(); paintScore(); setButtons();
      Store.saveAct(cfg.id, { done: true });
      global.App && App.refreshProgress();
      root.scrollIntoView({ block: 'start', behavior: 'smooth' });
    });

    retryBtn.addEventListener('click', function () {
      picks = {}; submitted = false;
      Store.saveQuiz(cfg.id, { picks: {}, submitted: false, score: 0, best: best() });
      if (mode === 'cfu') Store.saveAct(cfg.id, { done: false });
      render(); paintScore(); setButtons(); global.App && App.refreshProgress();
    });

    render(); paintScore(); setButtons();
    return root;
  };

  /* ======================================================================
     VIDEO — embed, plus an opt-out for networks that block YouTube.
     The opt-out checkbox swaps the embed for a text summary. Completion is a
     SEPARATE explicit "I have reviewed this" confirmation either way, so
     ticking the opt-out never by itself marks the block complete.
     ================================================================== */
  B.video = function (cfg) {
    var saved = Store.actState(cfg.id) || {};
    var optOut = !!saved.optOut, reviewed = !!saved.reviewed;

    var src = 'https://www.youtube-nocookie.com/embed/' + cfg.yt + (cfg.start ? '?start=' + cfg.start : '');
    var root = el(
      '<section class="act" id="v-' + cfg.id + '">' +
      '<div class="act-h"><div class="ico">▶</div><div class="tt"><b>' + esc(cfg.title) + '</b>' +
      '<span>' + esc(cfg.by) + '</span></div><div class="badge">Video</div></div>' +
      '<div class="act-b">' +
      '<p class="act-task"><b>Watch for:</b> ' + esc(cfg.watch) + '</p>' +
      '<div class="video-wrap" data-media></div>' +
      '<div class="optout"><input type="checkbox" id="oo-' + cfg.id + '" data-optout' + (optOut ? ' checked' : '') + '>' +
      '<label for="oo-' + cfg.id + '">My network blocks YouTube — show me the text summary instead' +
      '<span>Swaps the player for a written summary covering the same material. You still need to confirm below.</span></label></div>' +
      '<div class="confirm" data-confirmwrap><input type="checkbox" id="rv-' + cfg.id + '" data-reviewed' + (reviewed ? ' checked' : '') + '>' +
      '<label for="rv-' + cfg.id + '" data-rvlabel></label></div>' +
      '<div data-debrief></div>' +
      '<p class="act-status" data-status></p>' +
      '</div></section>');

    var media = root.querySelector('[data-media]');
    var oo = root.querySelector('[data-optout]');
    var rv = root.querySelector('[data-reviewed]');
    var rvLabel = root.querySelector('[data-rvlabel]');
    var cw = root.querySelector('[data-confirmwrap]');

    function paint() {
      if (optOut) {
        media.innerHTML = '<div class="video-alt"><h4>' + esc(cfg.summary.head) + '</h4>' + cfg.summary.html + '</div>';
      } else {
        media.innerHTML = '<div class="video-frame"><iframe src="' + src + '" title="' + esc(cfg.title) +
          '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ' +
          'referrerpolicy="strict-origin-when-cross-origin" allowfullscreen loading="lazy"></iframe></div>' +
          '<div class="video-alt" style="padding:12px 16px"><p style="margin:0;font-size:.85rem;color:var(--muted)">' +
          'Nothing playing above? Tick the box below to read the text summary instead. ' +
          '<a href="https://youtu.be/' + cfg.yt + '" target="_blank" rel="noopener">Open on YouTube</a></p></div>';
      }
      rvLabel.innerHTML = optOut
        ? 'I have read the text summary.'
        : 'I have watched the video.';
      cw.classList.toggle('done', reviewed);
      root.querySelector('[data-debrief]').innerHTML = reviewed && cfg.debrief
        ? '<div class="coach"><div class="coach-h">★ Take this into your next client call</div><div class="coach-b"><ul>' +
          cfg.debrief.map(function (d) { return '<li>' + esc(d) + '</li>'; }).join('') + '</ul></div></div>'
        : '';
      U.status(root, reviewed ? 'Complete.' : 'Confirm above once you have ' + (optOut ? 'read the summary' : 'watched it') + '.', reviewed ? 'good' : '');
    }

    oo.addEventListener('change', function () {
      optOut = oo.checked;
      reviewed = false; rv.checked = false;            // switching mode re-asks for confirmation
      Store.saveAct(cfg.id, { optOut: optOut, reviewed: false, done: false });
      paint(); global.App && App.refreshProgress();
    });
    rv.addEventListener('change', function () {
      reviewed = rv.checked;
      Store.saveAct(cfg.id, { optOut: optOut, reviewed: reviewed, done: reviewed });
      paint(); global.App && App.refreshProgress();
    });

    paint();
    return root;
  };

  /* ======================================================================
     REFLECTION — free text, saved as the learner types (debounced).
     ================================================================== */
  B.reflect = function (cfg) {
    var root = el(
      '<section class="act" id="r-' + cfg.id + '">' +
      '<div class="act-h"><div class="ico">✎</div><div class="tt"><b>' + esc(cfg.title) + '</b>' +
      '<span>Saved to this device as you type</span></div><div class="badge">Reflection</div></div>' +
      '<div class="act-b"><div data-fields></div>' +
      '<p class="act-status" data-status></p>' +
      '<div class="btn-row" data-actions></div><div data-model></div><div data-coach></div></div></section>');

    var fields = root.querySelector('[data-fields]');
    var actions = root.querySelector('[data-actions]');

    cfg.prompts.forEach(function (p) {
      var key = cfg.id + '.' + p.id;
      var d = document.createElement('div');
      d.className = 'refl';
      d.innerHTML = '<p class="q">' + p.q + '</p>' + (p.hint ? '<p class="h">' + esc(p.hint) + '</p>' : '') +
        '<textarea data-k="' + key + '" rows="' + (p.rows || 4) + '" aria-label="' + esc(p.q.replace(/<[^>]+>/g, '')) + '"></textarea>' +
        '<p class="fielderr" data-err>Write something here before continuing.</p>' +
        '<p class="wc" data-wc></p>';
      var ta = d.querySelector('textarea');
      ta.value = Store.reflection(key) || '';
      var wc = d.querySelector('[data-wc]');
      var t = null;
      function count() {
        var w = ta.value.trim() ? ta.value.trim().split(/\s+/).length : 0;
        wc.textContent = w + (w === 1 ? ' word' : ' words');
      }
      ta.addEventListener('input', function () {
        count();
        d.querySelector('[data-err]').classList.remove('on');
        ta.classList.remove('err');
        clearTimeout(t);
        t = setTimeout(function () { Store.saveReflection(key, ta.value); check(); }, 400);
      });
      ta.addEventListener('blur', function () { Store.saveReflection(key, ta.value); check(); });
      count();
      fields.appendChild(d);
    });

    function filled() {
      return cfg.prompts.every(function (p) { return (Store.reflection(cfg.id + '.' + p.id) || '').trim().length > 0; });
    }

    function check() {
      var n = cfg.prompts.filter(function (p) { return (Store.reflection(cfg.id + '.' + p.id) || '').trim().length > 0; }).length;
      U.status(root, n + ' of ' + cfg.prompts.length + ' answered.' + (n === cfg.prompts.length ? ' Saved.' : ''), n === cfg.prompts.length ? 'good' : '');
      if (n === cfg.prompts.length && !cfg.model) {
        Store.saveAct(cfg.id, { done: true });
        if (cfg.coach && !root.querySelector('[data-coach]').firstChild) {
          root.querySelector('[data-coach]').appendChild(el(U.coachHTML(cfg.coach)));
        }
        global.App && App.refreshProgress();
      }
    }

    /* When a model answer exists, the learner must write theirs first —
       the point of the exercise is the attempt, not the reading.           */
    if (cfg.model) {
      var btn = document.createElement('button');
      btn.className = 'btn'; btn.textContent = 'Reveal the model answer';
      btn.addEventListener('click', function () {
        if (!filled()) {
          cfg.prompts.forEach(function (p) {
            var ta = root.querySelector('[data-k="' + cfg.id + '.' + p.id + '"]');
            if (!ta.value.trim()) { ta.classList.add('err'); ta.closest('.refl').querySelector('[data-err]').classList.add('on'); }
          });
          U.status(root, 'Write your own answer first — that is where the learning is.', 'bad');
          var firstErr = root.querySelector('textarea.err');
          if (firstErr) firstErr.focus();
          return;
        }
        root.querySelector('[data-model]').innerHTML =
          '<div class="callout key" style="margin-top:18px"><h4>' + esc(cfg.model.title) + '</h4>' + cfg.model.html + '</div>';
        if (cfg.coach && !root.querySelector('[data-coach]').firstChild) {
          root.querySelector('[data-coach]').appendChild(el(U.coachHTML(cfg.coach)));
        }
        btn.disabled = true; btn.textContent = 'Model answer shown';
        Store.saveAct(cfg.id, { done: true, revealed: true });
        global.App && App.refreshProgress();
      });
      actions.appendChild(btn);
      var st = Store.actState(cfg.id) || {};
      if (st.revealed && filled()) btn.click();
    }

    check();
    return root;
  };

  global.Blocks = B;
})(window);
