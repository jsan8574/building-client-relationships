/* =============================================================================
   diagrams.js — every framework drawn as HTML/CSS + inline SVG.
   No images, no chart library. Each returns an HTML string; a few register an
   init() for interactivity. All are built to reflow to a single column.
   ========================================================================== */
(function (global) {
  'use strict';
  var D = {};

  /* ------------------------------------------------- Jobs To Be Done ----- */
  D.jtbd = function () {
    var rows = [
      ['so', 'Social job', 'How they need to be seen', 'Be seen as the leader who made the right vendor decision.', 'var(--c-cyan)'],
      ['em', 'Emotional job', 'How they need to feel', 'Feel confident presenting results to their board. Sleep at night.', 'var(--c-green)'],
      ['fn', 'Functional job', 'What has to move', 'Reduce denial rate, improve cash flow, reduce AR days.', 'var(--c-blue)']
    ];
    return '<div class="dg dg-jtbd">' +
      '<p class="dg-cap">Clients don’t buy RCM services — they hire your team to make progress on a job. Most managers deliver only the bottom layer.</p>' +
      rows.map(function (r) {
        return '<div class="jt-row" style="--a:' + r[4] + '">' +
          '<div class="jt-bar"></div>' +
          '<div class="jt-b"><b>' + r[1] + '</b><span class="jt-sub">' + r[2] + '</span><p>' + r[3] + '</p></div></div>';
      }).join('') +
      '</div>';
  };

  /* ------------------------------------------------ Listening levels ----- */
  D.listening = function () {
    var L = [
      ['1', 'Surface listening', 'You hear the words.', '“Our denial rate is too high.” You schedule a fix.'],
      ['2', 'Deep listening', 'You hear the concern beneath the words.', '“They’re worried about a board presentation next week — this is about credibility, not just the rate.”'],
      ['3', 'Strategic listening', 'You hear what they haven’t said yet.', '“If this keeps happening they’ll start looking for alternatives. I need to get ahead of this now.”']
    ];
    return '<div class="dg dg-listen">' + L.map(function (l, i) {
      return '<div class="ls-step" style="--i:' + i + '">' +
        '<div class="ls-n">' + l[0] + '</div>' +
        '<div class="ls-b"><b>' + l[1] + '</b><span>' + l[2] + '</span><p>' + l[3] + '</p></div></div>';
    }).join('') + '</div>';
  };

  /* ------------------------------------------------- Trust Equation ------ */
  D.trusteq = function () {
    var top = [
      ['Credibility', 'Know your stuff'],
      ['Reliability', 'Do what you say'],
      ['Intimacy', 'They feel heard']
    ];
    return '<div class="dg dg-trust">' +
      '<div class="te-frac">' +
        '<div class="te-num">' +
          top.map(function (t, i) {
            return (i ? '<span class="te-op">+</span>' : '') +
              '<div class="te-cell"><b>' + t[0] + '</b><span>' + t[1] + '</span></div>';
          }).join('') +
        '</div>' +
        '<div class="te-bar"><span>÷</span></div>' +
        '<div class="te-den"><div class="te-cell den"><b>Self-Orientation</b><span>Whose outcome are you serving?</span></div></div>' +
      '</div>' +
      '<div class="te-eq">=</div>' +
      '<div class="te-out"><b>TRUST</b><span>Retention</span></div>' +
      '</div>';
  };

  /* ---------------------------------------------- Radical Candor 2x2 ----- */
  var CQ = {
    rc: { n: 'Radical Candor', c: 'var(--ok)', bg: 'var(--green-15)',
      d: '<b>Care personally AND challenge directly.</b><p>You call the client before they call you — even with bad news. You name the denial spike, own it, and solve it in the same breath.</p>' },
    re: { n: 'Ruinous Empathy', c: '#8A5A12', bg: 'var(--warn-bg)',
      d: '<b>Care without challenging.</b><p>The most common trap for relational managers. You soften the message so far the client never registers there is a problem — until it is too big to soften. “A few challenges this month” instead of “88% against a 94% baseline.”</p>' },
    oa: { n: 'Obnoxious Aggression', c: 'var(--bad)', bg: 'var(--bad-bg)',
      d: '<b>Challenge without caring.</b><p>The facts are right and the client feels blamed. Common under pressure: “This is a documentation problem on your side.” True, and it costs you the relationship.</p>' },
    mi: { n: 'Manipulative Insincerity', c: 'var(--plum-25)', bg: 'var(--plum-10)',
      d: '<b>Neither caring nor challenging.</b><p>Vague reassurance, managed messaging, nothing real said. The client senses it immediately — and this is where self-orientation lives.</p>' }
  };
  D.candor = function () {
    function cell(k) {
      return '<button type="button" class="cq-cell" data-cq="' + k + '" style="--c:' + CQ[k].c + ';--bg:' + CQ[k].bg + '">' +
        '<span>' + CQ[k].n + '</span></button>';
    }
    return '<div class="dg dg-candor">' +
      '<div class="cq-wrap">' +
        '<div class="cq-yl">Care personally ↑</div>' +
        '<div class="cq-grid">' + cell('re') + cell('rc') + cell('mi') + cell('oa') + '</div>' +
        '<div class="cq-xl">Challenge directly →</div>' +
      '</div>' +
      '<div class="cq-detail" id="cq-detail" role="status"><em>Select a quadrant to see how it shows up in a client relationship.</em></div>' +
      '</div>';
  };
  D.candor.init = function (root) {
    var out = root.querySelector('#cq-detail');
    root.querySelectorAll('.cq-cell').forEach(function (b) {
      b.addEventListener('click', function () {
        root.querySelectorAll('.cq-cell').forEach(function (x) { x.classList.toggle('on', x === b); });
        var q = CQ[b.getAttribute('data-cq')];
        out.innerHTML = '<h4 style="color:' + q.c + '">' + q.n + '</h4>' + q.d;
      });
    });
  };

  /* -------------------------------------------------- Expectation gap ----
     Read as a calendar: one shared day-scale, one row per month. The agreed day
     is the blue marker, the day it actually landed is the red one, and the bar
     between them IS the gap. The third row is the point of the whole diagram —
     the client's expectation has quietly moved to the 7th, so the same two-day
     slip now lands on the 9th.                                               */
  D.gap = function () {
    var DAY0 = 5, DAYN = 10;                       // scale runs 5th -> 10th
    function pos(d) { return ((d - DAY0) / (DAYN - DAY0)) * 100; }

    var rows = [
      { lbl: 'What you agreed',  sub: 'Reporting by the 5th', exp: 5, got: null, tone: 'ok' },
      { lbl: 'Month 1',          sub: 'Two days late',        exp: 5, got: 7,    tone: 'warn' },
      { lbl: 'Month 2',          sub: 'Two days late again',  exp: 5, got: 7,    tone: 'warn' },
      { lbl: 'Month 3',          sub: 'Two days late \u2014 from the NEW baseline', exp: 7, got: 9, tone: 'bad',
        note: 'The client has silently reset to the 7th. You are now late against a date you never agreed to.' }
    ];

    var scale = '';
    for (var d = DAY0; d <= DAYN; d++) {
      scale += '<span class="gp-tick" style="left:' + pos(d) + '%">' + d + '</span>';
    }

    return '<div class="dg dg-gap">' +
      '<div class="gp">' +
        '<div class="gp-row gp-head"><div class="gp-lbl gp-cap-lbl">Day of the month</div>' +
          '<div class="gp-track gp-scale">' + scale + '</div></div>' +
        rows.map(function (r) {
          var a = pos(r.exp), b = r.got === null ? null : pos(r.got);
          return '<div class="gp-row ' + r.tone + '">' +
            '<div class="gp-lbl"><b>' + r.lbl + '</b><span>' + r.sub + '</span></div>' +
            '<div class="gp-track">' +
              '<span class="gp-rule"></span>' +
              (b === null ? '' :
                '<span class="gp-bar" style="left:' + a + '%;width:' + (b - a) + '%"></span>' +
                '<span class="gp-chip" style="left:' + ((a + b) / 2) + '%">+2 days</span>') +
              '<span class="gp-dot exp" style="left:' + a + '%" title="Expected"></span>' +
              (b === null ? '' : '<span class="gp-dot got" style="left:' + b + '%" title="Delivered"></span>') +
            '</div>' +
            (r.note ? '<p class="gp-note">' + r.note + '</p>' : '') +
            '</div>';
        }).join('') +
        '<div class="gp-key">' +
          '<span><i class="k exp"></i>Expected</span>' +
          '<span><i class="k got"></i>Actually delivered</span>' +
          '<span><i class="k bar"></i>The expectation gap</span>' +
        '</div>' +
      '</div>' +
      '<p class="dg-cap"><b>Manage the gap, not the result.</b> Your delivery was two days late every single time \u2014 it never got worse. ' +
      'What changed is the line you are being measured against, and the client moved it without telling you.</p>' +
      '</div>';
  };

  /* ------------------------------------------------------ Loyalty ladder - */
  D.ladder = function () {
    var R = [
      ['Partner', 'They co-create with you. They defend your contract internally.', 'Co-author strategic reviews. Become part of their planning cycle.', 'var(--c-cyan)'],
      ['Advocate', 'They refer you to peers. They speak well of you unprompted.', 'Ask for a case study or testimonial. Invite to an industry panel.', 'var(--c-green)'],
      ['Supporter', 'They renew. They defend you in internal conversations.', 'Quarterly business insight reports. Proactive risk flagging.', 'var(--c-blue)'],
      ['Client', 'They use the service. Satisfied but not committed.', 'Exceptional onboarding. Consistent delivery. First QBR within 60 days.', 'var(--c-slate)'],
      ['Customer', 'They have a contract. No emotional connection yet.', 'Personalised welcome. Assign a named manager from day one.', 'var(--c-sage)']
    ];
    return '<div class="dg dg-ladder">' + R.map(function (r, i) {
      return '<div class="ld-row" style="--a:' + r[3] + ';--w:' + (100 - i * 3) + '%">' +
        '<div class="ld-h"><b>' + r[0] + '</b><span>' + r[1] + '</span></div>' +
        '<div class="ld-m"><span class="ld-arrow">→</span>' + r[2] + '</div></div>';
    }).join('') +
    '<p class="dg-cap">Most RCM relationships are stuck at <b>Client</b>. Every upward move is something you give before it is asked for.</p></div>';
  };

  global.Diagrams = D;
})(window);
