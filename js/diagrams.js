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

  /* -------------------------------------------------- Expectation gap ---- */
  D.gap = function () {
    /* viewBox coordinates; the SVG scales, the labels are real HTML below it */
    return '<div class="dg dg-gap">' +
      '<svg viewBox="0 0 640 260" role="img" aria-label="Chart: the client’s expectation line stays flat while delivery drifts later each month, opening a widening expectation gap." preserveAspectRatio="xMidYMid meet">' +
      '<defs><linearGradient id="gapfill" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="#8C3030" stop-opacity=".22"/><stop offset="100%" stop-color="#8C3030" stop-opacity=".03"/>' +
      '</linearGradient></defs>' +
      '<line x1="60" y1="215" x2="610" y2="215" stroke="#C8D1D1" stroke-width="1.5"/>' +
      '<line x1="60" y1="30" x2="60" y2="215" stroke="#C8D1D1" stroke-width="1.5"/>' +
      '<path d="M60 70 L610 70" stroke="#266F8B" stroke-width="3" stroke-linecap="round"/>' +
      '<path d="M60 70 L243 70 L243 108 L426 108 L426 150 L610 150 Z M610 150 L610 70 Z" fill="url(#gapfill)"/>' +
      '<path d="M60 70 L243 108 L426 150 L610 190" stroke="#8C3030" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke-dasharray="7 5"/>' +
      '<circle cx="60" cy="70" r="5.5" fill="#266F8B"/><circle cx="243" cy="108" r="5.5" fill="#8C3030"/>' +
      '<circle cx="426" cy="150" r="5.5" fill="#8C3030"/><circle cx="610" cy="190" r="5.5" fill="#8C3030"/>' +
      '<text x="70" y="58" font-size="15" font-weight="700" fill="#266F8B">What the client expects — the 5th</text>' +
      '<text x="250" y="212" font-size="14" fill="#8C3030" font-weight="600">7th</text>' +
      '<text x="433" y="212" font-size="14" fill="#8C3030" font-weight="600">7th</text>' +
      '<text x="560" y="212" font-size="14" fill="#8C3030" font-weight="600">9th</text>' +
      '<text x="330" y="245" font-size="14" fill="#5A696B" text-anchor="middle">Month 1 → Month 4</text>' +
      '<text x="12" y="125" font-size="13" fill="#5A696B" transform="rotate(-90 16 125)" text-anchor="middle">Later →</text>' +
      '</svg>' +
      '<p class="dg-cap"><b>The gap, not the result.</b> Delivery drifted two days, then two more. Performance never changed — the expectation did, and the client reset to it silently each time.</p>' +
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
