/* =============================================================================
   export.js — "Download PDF of my answers".
   Compiles every free-text reflection and every activity result into one PDF
   via jsPDF from CDN. The CDN script is only fetched when the learner clicks,
   so a blocked or offline network costs nothing until then — and if it fails
   we fall back to a plain-text download rather than leaving them with nothing.
   ========================================================================== */
(function (global) {
  'use strict';
  var CDN = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
  var loading = null;

  function loadJsPDF() {
    if (global.jspdf && global.jspdf.jsPDF) return Promise.resolve(global.jspdf.jsPDF);
    if (loading) return loading;
    loading = new Promise(function (res, rej) {
      var s = document.createElement('script');
      s.src = CDN; s.async = true;
      s.onload = function () {
        if (global.jspdf && global.jspdf.jsPDF) res(global.jspdf.jsPDF);
        else rej(new Error('jsPDF did not initialise'));
      };
      s.onerror = function () { rej(new Error('Could not load jsPDF from the CDN')); };
      document.head.appendChild(s);
    });
    return loading;
  }

  /* ---------------------------------------------------- gather everything */
  function collect() {
    var DATA = App.data(), out = [], p = Store.profile();
    out.push({ t: 'meta', name: p.name || '(no name saved)', role: p.role || '',
      time: Store.fmtTime(Store.elapsed()), date: new Date().toLocaleString() });

    DATA.modules.forEach(function (m) {
      var sec = { t: 'module', num: m.num, title: m.title, items: [] };
      m.blocks.forEach(function (b) {
        if (b.k === 'reflect') {
          b.prompts.forEach(function (pr) {
            sec.items.push({ kind: 'reflection', q: strip(pr.q), a: Store.reflection(b.id + '.' + pr.id) || '' });
          });
        } else if (b.k === 'activity') {
          sec.items.push({ kind: 'activity', q: b.title, a: activityResult(b) });
        } else if (b.k === 'video') {
          var v = Store.actState(b.id) || {};
          sec.items.push({ kind: 'video', q: b.title,
            a: v.reviewed ? ('Reviewed — ' + (v.optOut ? 'read the text summary (YouTube opt-out)' : 'watched the video')) : 'Not yet confirmed' });
        } else if (b.k === 'quiz') {
          sec.items.push({ kind: 'quiz', q: b.title, a: quizResult(b) });
        }
      });
      out.push(sec);
    });

    var kc = App.kcState(), kcs = Store.quizState(DATA.knowledgeCheck.id) || {};
    var kcSec = { t: 'module', num: '⚑', title: 'Final Knowledge Check', items: [] };
    kcSec.items.push({ kind: 'quiz', q: 'Result',
      a: kc.submitted ? (kc.best + ' of ' + kc.total + ' correct — ' + kc.pct + '% (pass mark ' + DATA.passMark + '%)') : 'Not yet submitted' });
    DATA.knowledgeCheck.questions.forEach(function (q, i) {
      var pick = (kcs.picks || {})[i];
      kcSec.items.push({ kind: 'q', q: 'Q' + (i + 1) + '. ' + strip(q.q),
        a: (pick === undefined ? 'Not answered' : 'Your answer: ' + strip(q.opts[pick]) + (pick === q.a ? '  [correct]' : '  [incorrect]')) +
           (pick !== undefined && pick !== q.a ? '\nCorrect answer: ' + strip(q.opts[q.a]) : '') });
    });
    out.push(kcSec);
    return out;
  }

  function strip(s) { return String(s).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(); }

  function activityResult(b) {
    var s = Store.actState(b.id) || {};
    if (!s || (!s.done && !s.placed && !s.order && !s.links && !s.seen && !s.pick && !s.step)) return 'Not started';
    switch (b.type) {
      case 'bucket':
        return (s.done ? 'Completed — all ' + b.items.length + ' sorted correctly.\n' : 'In progress.\n') +
          b.items.map(function (it) {
            var got = (s.placed || {})[it.id];
            var lbl = function (id) { var x = b.buckets.filter(function (k) { return k.id === id; })[0]; return x ? x.label : '—'; };
            return '  • ' + strip(it.text) + '  →  ' + (got ? lbl(got) : 'unplaced') + (got && got !== it.b ? '  (correct: ' + lbl(it.b) + ')' : '');
          }).join('\n');
      case 'sequence':
        return (s.done ? 'Completed — correct order.\n' : 'In progress.\n') +
          (s.order || []).map(function (id, i) {
            var it = b.items.filter(function (x) { return x.id === id; })[0];
            return '  ' + (i + 1) + '. ' + (it ? it.title : id) + (b.order[i] === id ? '' : '  (should be: ' +
              (b.items.filter(function (x) { return x.id === b.order[i]; })[0] || {}).title + ')');
          }).join('\n');
      case 'flip':
        return (s.seen || []).length + ' of ' + b.cards.length + ' cards explored' + (s.done ? ' — complete.' : '.');
      case 'match':
        return (s.done ? 'Completed — all pairs correct.\n' : 'In progress.\n') +
          b.left.map(function (l) {
            var got = (s.links || {})[l.id];
            var r = b.right.filter(function (x) { return x.id === got; })[0];
            return '  • ' + strip(l.title) + '  →  ' + (r ? strip(r.text) : 'unpaired') + (got && got !== l.id ? '  (incorrect)' : '');
          }).join('\n');
      case 'hunt':
        var row = b.rows.filter(function (r) { return r.id === s.pick; })[0];
        return s.pick ? ('Selected: ' + row.cells[0] + (row.answer ? '  [correct]' : '  [not the highest risk]')) : 'No selection';
      case 'sim':
        var first = (s.results || []).filter(function (r) { return r && r.attempts === 1; }).length;
        return (s.done ? 'Completed. ' : 'In progress — at step ' + ((s.step || 0) + 1) + ' of ' + b.steps.length + '. ') +
          first + ' of ' + b.steps.length + ' decisions right first time.';
      default: return s.done ? 'Completed' : 'In progress';
    }
  }

  function quizResult(b) {
    var s = Store.quizState(b.id) || {}, picks = s.picks || {};
    var n = 0;
    b.questions.forEach(function (q, i) { if (picks[i] === q.a) n++; });
    var answered = b.questions.filter(function (_, i) { return picks[i] !== undefined; }).length;
    if (!answered) return 'Not attempted';
    return n + ' of ' + b.questions.length + ' correct\n' + b.questions.map(function (q, i) {
      var pk = picks[i];
      return '  • ' + strip(q.q) + '\n    Your answer: ' + (pk === undefined ? 'not answered' : strip(q.opts[pk]) + (pk === q.a ? ' [correct]' : ' [incorrect — correct: ' + strip(q.opts[q.a]) + ']'));
    }).join('\n');
  }

  /* ----------------------------------------------------------- build PDF */
  function build(jsPDF) {
    var doc = new jsPDF({ unit: 'pt', format: 'a4' });
    var M = 54, W = doc.internal.pageSize.getWidth(), H = doc.internal.pageSize.getHeight();
    var y = 0, sections = collect(), meta = sections.shift();
    var DATA = App.data();

    function page() { doc.addPage(); y = M; }
    function need(h) { if (y + h > H - 56) page(); }
    function text(s, size, style, color, indent) {
      doc.setFont('helvetica', style || 'normal'); doc.setFontSize(size);
      doc.setTextColor(color || '#1B1A23');
      var lines = doc.splitTextToSize(String(s), W - M * 2 - (indent || 0));
      lines.forEach(function (ln) {
        need(size * 1.35);
        doc.text(ln, M + (indent || 0), y);
        y += size * 1.35;
      });
    }

    /* cover band */
    doc.setFillColor(27, 26, 35); doc.rect(0, 0, W, 132, 'F');
    doc.setFillColor(51, 148, 186); doc.rect(0, 132, W, 5, 'F');
    doc.setTextColor('#9AD3D9'); doc.setFont('helvetica', 'bold'); doc.setFontSize(9);
    doc.text(PROGRAM.title.toUpperCase() + '  ·  MODULE ' + COURSE.num, M, 48);
    doc.setTextColor('#FFFFFF'); doc.setFontSize(20);
    doc.text('My Answers — ' + DATA.title, M, 76, { maxWidth: W - M * 2 });
    doc.setFont('helvetica', 'normal'); doc.setFontSize(10); doc.setTextColor('#CDDBE6');
    doc.text(meta.name + (meta.role ? '  ·  ' + meta.role : ''), M, 102);
    doc.text('Time invested: ' + meta.time + '   ·   Exported ' + meta.date, M, 118);

    y = 176;

    sections.forEach(function (sec) {
      need(58);
      doc.setFillColor(244, 248, 250);
      doc.roundedRect(M - 10, y - 16, W - M * 2 + 20, 30, 5, 5, 'F');
      text('Module ' + sec.num + '  ·  ' + sec.title, 13, 'bold', '#194A5D');
      y += 10;
      if (!sec.items.length) { text('Nothing recorded.', 10, 'italic', '#7A8C8F'); y += 8; return; }
      sec.items.forEach(function (it) {
        need(40);
        text(it.q, 10.5, 'bold', '#1B1A23');
        y += 2;
        var a = (it.a || '').trim();
        text(a || '(left blank)', 10, a ? 'normal' : 'italic', a ? '#37414A' : '#8A8F94', 14);
        y += 12;
      });
      y += 8;
    });

    /* page numbers */
    var n = doc.internal.getNumberOfPages();
    for (var i = 1; i <= n; i++) {
      doc.setPage(i);
      doc.setFont('helvetica', 'normal'); doc.setFontSize(8); doc.setTextColor('#7A8C8F');
      doc.text(DATA.title + '  ·  ' + meta.name, M, H - 26);
      doc.text(i + ' / ' + n, W - M, H - 26, { align: 'right' });
    }
    return doc;
  }

  function fallbackText() {
    var sections = collect(), meta = sections.shift(), out = [];
    out.push('MY ANSWERS — ' + App.data().title);
    out.push(PROGRAM.title + ' · Module ' + COURSE.num);
    out.push(meta.name + (meta.role ? ' · ' + meta.role : ''));
    out.push('Time invested: ' + meta.time + ' · Exported ' + meta.date);
    out.push('');
    sections.forEach(function (s) {
      out.push(''); out.push('=== Module ' + s.num + ' · ' + s.title + ' ===');
      s.items.forEach(function (i) { out.push(''); out.push(i.q); out.push((i.a || '(left blank)')); });
    });
    return out.join('\n');
  }

  function filename(ext) {
    var p = Store.profile();
    return (p.name ? p.name.replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-') + '-' : '') +
      'Module-' + COURSE.num + '-My-Answers.' + ext;
  }

  function wire(btn, hint) {
    if (!btn) return;
    btn.addEventListener('click', function () {
      btn.disabled = true;
      var old = btn.textContent; btn.textContent = 'Building…';
      if (hint) { hint.textContent = ''; hint.classList.remove('on'); }
      loadJsPDF().then(function (jsPDF) {
        build(jsPDF).save(filename('pdf'));
        if (hint) { hint.textContent = 'Downloaded.'; hint.classList.add('on'); }
        App.toast('Answer PDF downloaded');
      }).catch(function (e) {
        var blob = new Blob([fallbackText()], { type: 'text/plain;charset=utf-8' });
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob); a.download = filename('txt');
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
        if (hint) { hint.textContent = 'PDF library blocked — downloaded as text instead.'; hint.classList.add('on'); }
      }).then(function () { btn.disabled = false; btn.textContent = old; });
    });
  }

  global.Export = { wire: wire, collect: collect, build: build };
})(window);
