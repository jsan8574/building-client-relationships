/* =============================================================================
   data/m2.js — Module 2: Building Client Relationships

   Content restructured from the facilitator deck (25 slides, 20 with notes).
   Wherever the slide and the speaker notes disagreed on depth, the NOTES won:
   they carry the model answers, the coaching language and the sources.
   Facilitator-only staging ("split into 4 groups", "3 min silent writing")
   has been rewritten for a learner working alone.
   ========================================================================== */
window.M2_DATA = {
  id: 'm2',
  title: 'Building Client Relationships',
  subtitle: 'From vendor to strategic partner',
  blurb: 'Most managers deliver the functional job and wonder why clients still leave. This module is about the other two jobs — and the trust, expectation management and loyalty work that keeps an account when a quarter goes badly.',
  audience: 'Account Managers & Managers',
  passMark: 70,

  modules: [

  /* ======================================================================= */
  {
    id: 'audit',
    num: 1,
    title: 'The Relationship Audit',
    tag: 'Opening',
    mins: 10,
    img: 'assets/collaboration.jpg',
    summary: 'Before any framework — an honest look at the relationships you actually hold.',
    blocks: [
      { k: 'lede', html: 'We lose clients before we know we’re losing them. Most managers never audit their relationships — they audit their metrics. That gap is where this module starts.' },

      { k: 'h', text: 'Why start here' },
      { k: 'p', html: 'A strong relationship and a fragile one can produce identical dashboards. Clean claim rate, AR days, cash collected — all green, and the client still leaves. The difference almost never shows up in performance data, because the difference is <b>communication</b>, not delivery.' },
      { k: 'p', html: 'Write your honest answers below. They are saved to this device as you type, and everything you write here comes back in your downloadable answer sheet at the end.' },

      { k: 'reflect', id: 'r-audit', title: 'Your relationship audit', prompts: [
        { id: 'a1', q: 'Name your most valuable client relationship right now. What makes it strong?', hint: 'Be concrete. "Good rapport" is not an answer — what specifically happens in that relationship that doesn’t happen in the others?' },
        { id: 'a2', q: 'Name one client relationship that feels fragile. What is the single biggest reason?', hint: 'Notice whether your reason is about performance or about communication. For most managers it turns out to be communication.' },
        { id: 'a3', q: 'In the last 30 days — did you reach out to a client proactively, or only when they reached out to you?', hint: 'Count the actual contacts. If every one of them was triggered by the client, that is the finding.' }
      ],
        coach: {
          title: 'Coaching key points',
          html: '<p><b>A strong relationship feels different from a transactional one because of frequency and direction of contact, not quality of delivery.</b> In a transactional relationship, every contact is initiated by the client and every contact is a request or a complaint.</p>' +
                '<p>Most people discover the fragile relationship is fragile for a communication reason — not a performance one. The team is hitting targets; the client still feels unattended.</p>' +
                '<p><b>If you only reach out when there’s a problem, you have taught your client that your name on their screen means bad news.</b> That is the signal you are sending, whether you intend it or not.</p>' +
                '<p>Keep these three answers in mind — the frameworks in the next four modules are tools for the specific relationships you just named.</p>'
        }
      },

      { k: 'quiz', id: 'q-audit', title: 'Check for understanding', questions: [
        { q: 'A client’s dashboard is green across every KPI, yet the relationship feels fragile. What does this most likely indicate?',
          opts: [
            'The KPIs are being measured incorrectly and need re-baselining',
            'The fragility is a communication problem, not a performance problem',
            'The client is preparing to renegotiate pricing',
            'Nothing — green KPIs mean the relationship is secure'
          ], a: 1,
          fb: 'Performance and relationship health are separate systems. Green metrics tell you the work is getting done; they tell you nothing about whether the client feels attended to.' },
        { q: 'Over the last 30 days, every single contact with a client was initiated by the client. What have you taught that client?',
          opts: [
            'That your team is efficient and doesn’t need to over-communicate',
            'That you respect their time by not interrupting them',
            'That contact from you means something has gone wrong',
            'Nothing — response time is what matters, not who initiates'
          ], a: 2,
          fb: 'Purely reactive contact trains the client to associate your name with problems. Proactive contact is what breaks that association — and it has to happen before the crisis, not during it.' }
      ]}
    ]
  },

  /* ======================================================================= */
  {
    id: 'depth',
    num: 2,
    title: 'Understanding Your Client at Depth',
    tag: 'Part 1',
    mins: 25,
    img: 'assets/collaboration.jpg',
    summary: 'Beyond account names — the job they hired you for, the style they speak in, and the question behind the question.',
    blocks: [
      { k: 'lede', html: 'Clients don’t buy RCM services. They hire your team to solve a specific problem in a specific context. Understanding the <b>job</b> — not just the contract — is what separates trusted advisors from vendors.' },

      { k: 'h', text: 'Jobs To Be Done' },
      { k: 'p', html: 'Clayton Christensen’s framing is that every purchase is a <i>hire</i>. Your client hired your team to make progress on something. That something has three layers, and most managers only ever deliver the first.' },
      { k: 'diagram', name: 'jtbd' },
      { k: 'callout', tone: 'key', title: 'The point most managers miss', html: '<p>Most RCM managers deliver only the functional job. The managers who become genuinely irreplaceable deliver on all three.</p><p>Ask yourself: <b>does your client feel confident presenting your results to their CFO — or do they have to explain, qualify and defend them?</b> If they are explaining, you have not done the emotional job.</p>' },
      { k: 'callout', tone: 'warn', title: 'Same KPI, different job', html: '<p>A client whose denial rate is 6% but who has a board presentation next week has a <b>completely different job</b> from a client whose denial rate is 12% during a financial crisis. Identical metric conversation, entirely different assignment.</p>' },
      { k: 'src', text: 'Christensen, C. (2016). Competing Against Luck. Harper Business.' },

      { k: 'activity', type: 'bucket', id: 'a-jtbd',
        title: 'Which job is this?',
        sub: 'Sort 9 client statements into the three JTBD layers',
        icon: '\u{1F9E9}', badge: 'Drag & drop',
        task: 'Each statement below came from a real client conversation. Drag it into the layer of the job it belongs to. Several statements sound operational but are not.',
        buckets: [
          { id: 'fn', label: 'Functional job', sub: 'The measurable work: what has to move.' },
          { id: 'em', label: 'Emotional job', sub: 'How they need to feel: confidence, safety, sleep.' },
          { id: 'so', label: 'Social job', sub: 'How they need to be seen by others.' }
        ],
        items: [
          { id: 'j1', text: 'Get our 90+ AR under 20%.', b: 'fn' },
          { id: 'j2', text: '“I need to not be blindsided in front of my board again.”', b: 'em' },
          { id: 'j3', text: '“I championed this vendor decision internally. I need it to look right.”', b: 'so' },
          { id: 'j4', text: 'Reduce the denial rate from 12% to under 7%.', b: 'fn' },
          { id: 'j5', text: '“I want to stop checking the dashboard at 11pm.”', b: 'em' },
          { id: 'j6', text: '“My CFO should hear about our improvement from me, not from finance.”', b: 'so' },
          { id: 'j7', text: 'Shorten days in AR by eight days before year end.', b: 'fn' },
          { id: 'j8', text: '“I need to walk into the ops meeting already knowing the bad news.”', b: 'em' },
          { id: 'j9', text: '“I’d like to present this as a case study at the regional forum.”', b: 'so' }
        ],
        coach: {
          title: 'Coaching key points',
          html: '<p>The functional items are easy — they are the ones with numbers in them. The distinction that matters is between <b>emotional</b> and <b>social</b>.</p>' +
                '<ul><li><b>Emotional</b> is inward-facing: how the client feels when no one is watching. Sleep, confidence, the absence of dread.</li>' +
                '<li><b>Social</b> is outward-facing: how the client is perceived by their board, their CFO, their peers. Reputation, credibility, being right in public.</li></ul>' +
                '<p>“I need to not be blindsided in front of my board” looks social because a board is mentioned — but the job is the <i>feeling of safety</i>. “I championed this vendor decision” is social, because the job is <i>being seen to have chosen well</i>.</p>' +
                '<p><b>Why it matters operationally:</b> you satisfy an emotional job with early warning and proactive contact. You satisfy a social job by giving the client something they can present — a clean narrative, a quotable number, a slide they didn’t have to build.</p>'
        }
      },

      { k: 'h', text: 'Client communication styles — A·R·D·V' },
      { k: 'p', html: 'The job matters, but so does <i>how</i> the client wants to receive information. Four tendencies show up repeatedly in RCM client relationships. Flip each card for how to work with that style — and what loses them.' },
      { k: 'callout', tone: 'warn', title: 'This is a tendency map, not a box', html: '<p>Most clients show a blend, and the same person can lead with a different style under pressure. The goal is awareness, not labelling. Never say any of these words to a client.</p>' },
      { k: 'activity', type: 'flip', id: 'a-ardv',
        title: 'The four styles',
        sub: 'Flip all four to continue',
        icon: '\u{1F0CF}', badge: 'Flip cards',
        task: 'Before you flip: think of your most challenging client right now. Which style do you think they lead with?',
        cards: [
          { letter: 'A', color: 'var(--c-blue)', title: 'Analytical', sub: 'Data-first · Logic-driven · Detail-oriented',
            back: '<p><b>In RCM:</b> lead with denial trend data. Provide written summaries. Never make a claim without a number behind it.</p><p><b>⚠ Loses trust fast</b> if you’re vague or can’t back up your position.</p>' },
          { letter: 'R', color: 'var(--c-green)', title: 'Relational', sub: 'People-first · Collaborative · Slow to decide',
            back: '<p><b>In RCM:</b> open every call with a personal moment. Frame updates around “how this helps your team.” Give them time.</p><p><b>⚠ Shuts down</b> when they feel you’re transactional or rushing them.</p>' },
          { letter: 'D', color: 'var(--c-azure)', title: 'Driver', sub: 'Results-first · Direct · Fast-moving',
            back: '<p><b>In RCM:</b> lead with the single most important metric. Never waste their time with process detail they didn’t ask for.</p><p><b>⚠ Disengages instantly</b> if you ramble or hedge.</p>' },
          { letter: 'V', color: 'var(--c-cyan)', title: 'Visionary', sub: 'Big-picture · Future-focused · Strategic',
            back: '<p><b>In RCM:</b> translate operational wins into strategic outcomes. “We improved FPRR by 4% — here’s what that enables for value-based care.”</p><p><b>⚠ Loses interest</b> in operational detail. Pitch the story, not the data.</p>' }
        ],
        coach: {
          title: 'Coaching key points',
          html: '<p><b>The biggest mistake managers make is communicating in their own style, not the client’s.</b> A Driver manager working with a Relational client will bulldoze the relationship without ever knowing it happened.</p>' +
                '<p>Most people are natural Relational or Analytical communicators. They struggle with <b>Driver</b> (being that brief feels rude) and <b>Visionary</b> (being that abstract feels like fluff). That discomfort is normal — and it is not a reason to default back to your own style.</p>' +
                '<p>Notice which card you had to read twice. That is usually the style you under-serve.</p>'
        }
      },

      { k: 'activity', type: 'bucket', id: 'a-style',
        title: 'Style Match Challenge',
        sub: 'The same bad news, four ways to open',
        icon: '\u{1F3AD}', badge: 'Drag & drop',
        task: '<b>The situation — identical for all four clients:</b> your client’s 90+ AR has risen from 24% to 31% over three weeks. Root cause is a documentation gap on high-value procedure codes, found by your QA team. You have already started a fix — but you haven’t told the client yet.<br><br>Drag each opening line to the client style it was written for.',
        buckets: [
          { id: 'A', label: 'Analytical client', sub: 'Lead with data. Give root cause. Show the fix timeline.' },
          { id: 'R', label: 'Relational client', sub: 'Warm open. Acknowledge the relationship. Frame around partnership.' },
          { id: 'D', label: 'Driver client', sub: 'One headline. Bottom line. Action. Done in 60 seconds.' },
          { id: 'V', label: 'Visionary client', sub: 'Connect the fix to their long-term revenue cycle vision.' }
        ],
        items: [
          { id: 's1', text: '“90+ AR moved 24% to 31% across three weeks. Driver is documentation on high-value codes — here is the week-by-week breakdown.”', b: 'A' },
          { id: 's2', text: '“Before anything else — how did the go-live weekend land for your team? I know they were carrying a lot.”', b: 'R' },
          { id: 's3', text: '“90+ AR is up seven points. Cause found, fix already running, resolved by Thursday. Two minutes on the detail if you want it.”', b: 'D' },
          { id: 's4', text: '“This one matters for the automated-capture programme we mapped for next year — it is the same documentation dependency.”', b: 'V' },
          { id: 's5', text: '“I want to walk you through the variance analysis line by line so you can see exactly which code families moved.”', b: 'A' },
          { id: 's6', text: '“I wanted you to hear this from me first, because I’d rather we work through it together than have you find it in a report.”', b: 'R' },
          { id: 's7', text: '“Headline: seven-point AR movement. It is contained. Here is the one decision I need from you.”', b: 'D' },
          { id: 's8', text: '“Fixing this now is what makes the Q4 predictive-denials build viable — it is a step toward it, not a setback.”', b: 'V' }
        ],
        coach: {
          title: 'Coaching key points',
          html: '<p>Every one of these eight openings delivers the <b>same facts</b>. The facts were never the variable.</p>' +
                '<ul><li><b>Analytical</b> openings name the numbers and offer the working. Notice neither of them apologises — an Analytical client reads hedging as weak data.</li>' +
                '<li><b>Relational</b> openings buy the relationship a moment before spending it. “I wanted you to hear this from me first” is doing relationship work and disclosure work in one sentence.</li>' +
                '<li><b>Driver</b> openings put the conclusion in the first six words and hand back control (“one decision I need from you”).</li>' +
                '<li><b>Visionary</b> openings reframe an operational problem as a step inside a strategy the client already believes in.</li></ul>' +
                '<p><b>The trap:</b> delivering in your style to a client who wants a different one. The content is right, the delivery is wrong, and the client concludes you don’t understand their business.</p>'
        }
      },

      { k: 'h', text: 'Knowing what your client actually needs' },
      { k: 'p', html: 'Voice of the Client work turns on one distinction: <b>most managers answer the question that was asked, not the question behind it.</b> There are three levels you can listen at.' },
      { k: 'diagram', name: 'listening' },
      { k: 'callout', tone: 'key', title: 'Worked example', html: '<p>A client says your team is slow on follow-up.</p><p><b>Level 1</b> response: assign more staff.<br><b>Level 2</b> response: ask what specific follow-up felt slow, and what impact it had.<br><b>Level 3</b> response: recognise they are about to miss a monthly close target and their CFO is asking questions — and get ahead of it.</p>' },
      { k: 'list', title: 'High-impact questions that unlock deeper listening', items: [
        { n: '1', title: '“What does success look like for you in six months?”', text: 'Strategic future pull — surfaces the job they haven’t articulated yet.' },
        { n: '2', title: '“What’s keeping you up at night on the revenue cycle right now?”', text: 'Emotional job — gets past the reporting layer to the fear layer.' },
        { n: '3', title: '“If nothing changes in 90 days, what’s the consequence?”', text: 'Stakes clarity — tells you whether this is urgent to them or only to you.' }
      ]},
      { k: 'src', text: 'Adapted from Otto Scharmer’s Theory U listening levels and Voice of the Customer practice in Six Sigma / Lean.' },

      { k: 'quiz', id: 'q-depth', title: 'Check for understanding', questions: [
        { q: 'A client’s JTBD has three layers. Which layer is satisfied by giving them a clean narrative and a quotable number they can present themselves?',
          opts: ['Functional', 'Emotional', 'Social', 'All three equally'], a: 2,
          fb: 'Social is outward-facing — how the client is perceived. You satisfy it by giving them something presentable that they did not have to build.' },
        { q: 'Your client is a Driver style and you have bad news about a billing delay. How do you open the call?',
          opts: [
            'Warm personal check-in first, then ease into the issue',
            'Headline first: the problem, the cause, the fix date — no preamble',
            'Walk through the full variance analysis so they see the working',
            'Connect the delay to their long-term revenue cycle strategy'
          ], a: 1,
          fb: '“We have a billing delay affecting 47 accounts. Root cause identified. Fix in place by Thursday. Here’s the plan.” A Driver disengages during the preamble — by the time you reach the point, they have stopped listening.' },
        { q: 'A client says, “Your team needs to improve follow-up.” What is the <i>strategic</i> listen?',
          opts: [
            'They want more staff assigned to follow-up',
            'They want a written follow-up SLA added to the contract',
            'They are about to miss a close deadline or board presentation, and the real issue is the impact on their internal credibility',
            'They are testing whether you will push back on scope'
          ], a: 2,
          fb: 'Level 3 hears what has not been said yet. The surface issue is follow-up; the real issue is what the delay is costing them in front of other people — and it is a churn signal if you leave it at Level 1.' }
      ]}
    ]
  }
  ]
};

/* ------------------------------------------------------------------ Part 2 */
window.M2_DATA.modules.push(
  {
    id: 'trust',
    num: 3,
    title: 'Building Trust That Lasts',
    tag: 'Part 2',
    mins: 25,
    img: 'assets/video-candor.jpg',
    summary: 'The equation behind client trust, the candour that protects it, and the four moves that rebuild it.',
    blocks: [
      { k: 'lede', html: 'Trust in a client relationship is not a feeling you earn once. It behaves like a ratio — and it has a denominator that can collapse the whole thing overnight.' },

      { k: 'h', text: 'The Trust Equation' },
      { k: 'diagram', name: 'trusteq' },
      { k: 'callout', tone: 'key', title: 'Everything turns on the denominator', html: '<p>Even if your Credibility, Reliability and Intimacy are all high — if you come across as <b>self-oriented</b>, talking about your process, your team’s effort, your metrics — the whole ratio collapses.</p><p>Clients can smell self-orientation immediately. You can be the most credible, most reliable person on the call and still lose trust in a second if the client senses you are managing your own numbers rather than their outcomes.</p>' },
      { k: 'src', text: 'Maister, D., Green, C. & Galford, R. (2000). The Trusted Advisor. Free Press.' },

      { k: 'h', text: 'Radical Candor' },
      { k: 'p', html: 'Kim Scott’s model sets two independent axes: how much you <b>care personally</b>, and how directly you are willing to <b>challenge</b>. Only one quadrant builds trust. Select each quadrant to see how it shows up in a client relationship.' },
      { k: 'diagram', name: 'candor' },
      { k: 'callout', tone: 'key', title: 'Radical Candor in RCM', html: '<p><b>The most trusted managers are the ones who call their client before the client calls them — even with bad news.</b></p><p>Radical Candor means you don’t hide the denial spike. You name it, own it, and solve it in the same breath.</p><p>The most common trap for relational-style managers is <b>Ruinous Empathy</b>: softening the message so far that the client does not register that there is a problem at all — until it is too large to soften.</p>' },
      { k: 'src', text: 'Scott, K. (2017). Radical Candor. St. Martin’s Press.' },

      { k: 'video', id: 'v-candor',
        title: 'How to lead with radical candor',
        by: 'Kim Scott · TEDxPortland',
        yt: 'O9hDTLo5rLA',
        poster: 'assets/video-candor.jpg',
        watch: 'Watch for three things: does she acknowledge before explaining? Is she specific or vague about the problem? And what does she do when she is pushed back on?',
        summary: {
          head: 'Text summary — How to lead with radical candor (Kim Scott, TEDxPortland)',
          html: '<p>Scott opens with her own failure: a direct report named Bob whom she liked enormously. Bob’s work was poor, and for ten months she said nothing that would land, because she did not want to upset him. When she finally had to let him go, Bob asked why nobody had told him. Her kindness had cost him his job.</p>' +
                '<ul>' +
                '<li><b>Two independent axes.</b> <i>Care personally</i> (treat people as whole humans, not functions) and <i>challenge directly</i> (say the thing that is actually true). They are not a trade-off; most people assume they are.</li>' +
                '<li><b>Radical Candor</b> is both at once — caring enough about someone to tell them the truth clearly.</li>' +
                '<li><b>Ruinous Empathy</b> is caring without challenging. It is the most common failure, and the most expensive, because it feels like kindness while the problem compounds.</li>' +
                '<li><b>Obnoxious Aggression</b> is challenging without caring — blunt criticism that lands as contempt.</li>' +
                '<li><b>Manipulative Insincerity</b> is neither: back-channel politics, faint praise, saying nothing real.</li>' +
                '<li><b>Praise in the same frame.</b> Vague praise (“good job”) is as useless as vague criticism. Both need to be specific enough to act on.</li>' +
                '<li><b>Solicit it before you give it.</b> Ask for criticism of yourself first and listen to the answer without defending — that is what makes it safe for the other person to hear yours.</li>' +
                '</ul>' +
                '<p><b>Applied to a client relationship:</b> the AM who softens a denial spike into “a few challenges this month” is practising Ruinous Empathy on a client. The client does not learn there is a problem, cannot help solve it, and discovers the truth later from someone else — which is when trust is actually lost.</p>'
        },
        debrief: [
          'What was the moment that made you trust her — or not?',
          'How would a Ruinous Empathy approach have gone differently?',
          'Where in your client interactions do you hold back the truth to protect the relationship — and what does that actually cost you?'
        ]
      },

      { k: 'h', text: 'A → T → O → R: the repair sequence' },
      { k: 'p', html: 'When something has gone wrong, there is an order that works and an order that doesn’t. The single most common mistake is explaining before acknowledging — which the client hears as a defence, not an answer.' },
      { k: 'activity', type: 'sequence', id: 'a-ator',
        title: 'Put the repair sequence in order',
        sub: 'Four steps · one correct order',
        icon: '\u{1F517}', badge: 'Sequence',
        task: 'Drag the steps — or use the arrows — into the order you should run them on a call where something has gone wrong.',
        items: [
          { id: 'A', title: 'Acknowledge', text: 'Name what happened — directly, without hedging.' },
          { id: 'T', title: 'Be transparent', text: 'Give the real reason, not the polished version.' },
          { id: 'O', title: 'Offer a solution', text: 'Bring the fix before they ask for it.' },
          { id: 'R', title: 'Reinforce the partnership', text: 'Close by connecting back to the relationship.' }
        ],
        order: ['A', 'T', 'O', 'R'],
        coach: {
          title: 'Coaching key points',
          html: '<p><b>Acknowledge must come first, and it is the step people skip under pressure.</b> Opening with “So what happened was…” is explaining. The client has not yet heard you say that the thing that happened was real and it was yours.</p>' +
                '<ul><li><b>Transparent</b> means the real reason. A polished reason is detectable, and being caught polishing costs more than the original problem.</li>' +
                '<li><b>Offer</b> must be specific: “by Thursday”, not “as soon as possible”. Vague commitments create a second expectation gap on top of the first.</li>' +
                '<li><b>Reinforce</b> is the step most people drop when the call has gone well — they solve the problem and hang up. The relationship close is what converts an incident into deepened trust rather than a survived crisis.</li></ul>' +
                '<p>Watch your pronouns throughout. “We” signals ownership; “I” on the fix and “they” on the cause signals a manager distancing themselves from their own team.</p>'
        }
      },

      { k: 'h', text: 'Simulation: The Trust Rebuild' },
      { k: 'p', html: 'This is the live role play from the workshop, rebuilt as a decision simulation. You play the Account Manager. Wrong choices are recoverable — you will see why they cost you, and get another attempt.' },
      { k: 'activity', type: 'sim', id: 'a-rebuild',
        title: 'The Trust Rebuild',
        sub: 'Four decisions · retry on a wrong turn',
        icon: '\u{1F3AD}', badge: 'Simulation',
        scenario: '<b>Your client</b> is a VP of Revenue Integrity at a 300-bed hospital. They have just received their month-end report: clean claim rate dropped from 94% to 88%.<br><br>They did not call you. They called your manager’s manager. You have been asked to get on a call with them within the hour.',
        steps: [
          {
            who: 'VP of Revenue Integrity',
            said: '“I’ll be honest with you. I had to hear about a six-point drop from my own finance team, and then I had to call your boss to find out what was going on. So — I want to understand what happened.”',
            prompt: 'How do you open?',
            opts: [
              { t: '“So what happened was our QA team identified a documentation gap on high-complexity procedure codes, and that fed through into the clean claim rate…”',
                ok: false, fb: '<b>You explained before you acknowledged.</b> Everything you said is true and it will still land as a defence, because the client has not yet heard you say that the drop was real and it was yours. Acknowledge is step A for a reason — and under pressure it is the step people skip first.' },
              { t: '“You’re right, and I want to start by owning the part that matters most: you found out from someone other than me. The rate dropped six points, and I should have called you before your finance team did.”',
                ok: true, fb: '<b>Acknowledge — and you named the right failure.</b> The six points are the visible problem; being told by someone else is the one that actually damaged trust. Naming the harder of the two signals you understand what this call is really about.' },
              { t: '“I completely understand your frustration. Let me reassure you that this is well within normal variance and we have it fully under control.”',
                ok: false, fb: '<b>Ruinous Empathy, with a side of minimising.</b> “Normal variance” tells a client who has just been embarrassed internally that their concern is disproportionate. You have softened the message so far that you have contradicted them — and “fully under control” is a claim you have not yet earned.' }
            ]
          },
          {
            who: 'VP of Revenue Integrity',
            said: '“Alright. I appreciate that. But I still need to know why. My CFO is going to ask me, and ‘documentation issues’ is not going to survive that conversation.”',
            prompt: 'What do you give them?',
            opts: [
              { t: '“There were some process gaps on our side during a high-volume period. We’re tightening the controls and I don’t expect it to recur.”',
                ok: false, fb: '<b>That is the polished version.</b> It is vague enough to be unusable in front of a CFO — which is exactly the job the client just told you they have. A client who cannot repeat your explanation has not been given one.' },
              { t: '“It’s a documentation gap on high-complexity procedure codes — specifically the ones requiring operative-note detail. Our QA team caught it on the 14th. It affected 59 claims. It got past us because the pre-submission check didn’t cover that code family.”',
                ok: true, fb: '<b>Transparent — and repeatable.</b> Specific code family, specific date, specific count, and an honest statement of why the control failed. That is a CFO-proof answer, which means you have just done the client’s <i>social job</i> as well as answering the question.' },
              { t: '“Honestly, we’ve had a couple of people out and the coding team has been stretched. It’s been a difficult month on our side.”',
                ok: false, fb: '<b>That is self-orientation.</b> Your staffing pressure is your problem to solve, not context the client can use. Watch the Trust Equation denominator here: the moment the call becomes about your team’s difficulty, the ratio collapses.' }
            ]
          },
          {
            who: 'VP of Revenue Integrity',
            said: '“Okay. That I can work with. So what happens now?”',
            prompt: 'Make the offer.',
            opts: [
              { t: '“We’re on it as a priority and I’ll get you an update as soon as we have one.”',
                ok: false, fb: '<b>Vague commitment.</b> “As soon as possible” creates a second expectation gap stacked on the first — and the client now has nothing to tell their CFO about timing. A non-specific offer is barely an offer.' },
              { t: '“What would you like us to do?”',
                ok: false, fb: '<b>You handed the fix back to the client.</b> Asking a client to design the remediation after you caused the problem adds work to the person you just let down. Bring the fix <i>before</i> they ask for it — then invite their input on it.' },
              { t: '“Three things. The pre-submission check now covers that code family — live since Tuesday. 47 of the 59 claims are resubmitted; the remaining 12 go out by Thursday. And I’ll send you a written summary today so you have something to hand your CFO.”',
                ok: true, fb: '<b>Offer — specific, dated, and already in motion.</b> Note the third item: the written summary is not about the claims at all. It exists so the client can walk into their CFO conversation prepared. That is the emotional and social job being handled alongside the functional one.' }
            ]
          },
          {
            who: 'VP of Revenue Integrity',
            said: '“That’s what I needed. Send the summary over.”',
            prompt: 'How do you close?',
            opts: [
              { t: '“Great, I’ll get that to you within the hour. Thanks for your time.”',
                ok: false, fb: '<b>You solved the problem and hung up.</b> This is the step people drop precisely when the call has gone well. You have survived an incident; you have not converted it. Nothing in that close makes the next month feel different.' },
              { t: '“I’ll have it with you within the hour. And I want to change one thing going forward: from now on you hear movement like this from me first, before it reaches a report. I’ll set up a short Friday check-in so there’s a standing place for it — does that work for how you’d like to be kept in the loop?”',
                ok: true, fb: '<b>Reinforce — and you fixed the actual breach.</b> The clean claim rate was the presenting problem; finding out from someone else was the real one. You closed the loop on both, committed to a mechanism rather than an intention, and asked them to shape it — which makes them a co-designer of the fix rather than its recipient.' },
              { t: '“Within the hour. And again, I’m really sorry about all of this — it won’t happen again, I promise.”',
                ok: false, fb: '<b>Over-apologising, and a promise you cannot keep.</b> Repeated apology after the client has moved on pulls the call back into your discomfort. “It won’t happen again” is unfalsifiable until it does — at which point you have spent credibility you will need.' }
            ]
          }
        ],
        coach: {
          title: 'Coaching key points',
          html: '<p><b>The client who called your manager is not angry about the 88%. They are afraid.</b> Afraid they made a bad vendor decision, and afraid of how that looks internally.</p>' +
                '<p>Your job on that call is not to fix the metric — it is to restore their confidence in the partnership. The metric fix comes after, and it is the easy part.</p>' +
                '<ul><li><b>Acknowledge before you explain.</b> Every wrong first option in this simulation was factually accurate. Accuracy delivered in the wrong order still reads as defence.</li>' +
                '<li><b>Name the real breach.</b> The drop is visible; being told by someone else is what broke trust. Managers who only address the visible problem leave the relationship damaged and don’t know it.</li>' +
                '<li><b>Specific beats sincere.</b> “By Thursday” outperforms “as a priority” every time. Dates are the currency of reliability.</li>' +
                '<li><b>Close on a mechanism, not an intention.</b> “I’ll keep you better informed” is an intention. A standing Friday check-in is a mechanism — and the client can hold you to it.</li></ul>' +
                '<p>On a real call under pressure, the step almost everyone skips first is <b>Acknowledge</b>, and the step they skip when it’s going well is <b>Reinforce</b>.</p>'
        }
      },

      { k: 'quiz', id: 'q-trust', title: 'Check for understanding', questions: [
        { q: 'The Trust Equation has a denominator. What is it — and why does it collapse the whole ratio?',
          opts: [
            'Reliability — because a missed commitment cancels out any goodwill you had',
            'Self-Orientation — because if the client senses you are serving your own metrics rather than their outcomes, high credibility, reliability and intimacy stop counting',
            'Intimacy — because a client who does not feel heard will not accept data',
            'Credibility — because being wrong once undermines everything else'
          ], a: 1,
          fb: 'Credibility, Reliability and Intimacy sit on top of the line. Self-Orientation sits underneath it — so it divides everything else. This is why a call that becomes about your team’s staffing difficulties costs you more than the incident did.' },
        { q: 'What is the difference between Radical Candor and Ruinous Empathy in a client conversation?',
          opts: [
            'Radical Candor is direct and impersonal; Ruinous Empathy is warm and personal',
            'Radical Candor challenges without caring; Ruinous Empathy cares without challenging',
            'Radical Candor means caring personally AND challenging directly; Ruinous Empathy means caring so much you soften the message until the client does not realise there is a problem',
            'They are two names for the same behaviour at different levels of seniority'
          ], a: 2,
          fb: 'Caring and challenging are independent axes, not a trade-off. Ruinous Empathy feels like kindness in the moment, which is exactly why it is the most expensive of the four quadrants.' },
        { q: 'On a call where something has gone wrong, which step do managers most commonly skip under pressure?',
          opts: ['Acknowledge', 'Be transparent', 'Offer a solution', 'Reinforce the partnership'], a: 0,
          fb: 'Under pressure the instinct is to explain — which means jumping straight to T. The client has not yet heard you say the thing was real and it was yours, so everything after it reads as a defence.' }
      ]}
    ]
  },

  /* ======================================================================= */
  {
    id: 'expect',
    num: 4,
    title: 'Managing Expectations & Difficult Moments',
    tag: 'Part 3',
    mins: 20,
    img: 'assets/collaboration.jpg',
    summary: 'The expectation gap, the five pillars that close it, and how to rewrite a message that damages trust.',
    blocks: [
      { k: 'lede', html: 'The expectation gap — the distance between what the client expects and what they get — is where relationships break down. Manage the gap, not just the result.' },

      { k: 'h', text: 'The expectation gap' },
      { k: 'diagram', name: 'gap' },
      { k: 'callout', tone: 'warn', title: 'How a strong month becomes a trust problem', html: '<p>A client expects monthly reporting by the 5th. You deliver on the 7th — twice. They now expect the 7th. You deliver on the 9th.</p><p><b>You now have a trust problem, even though your actual performance metrics are strong.</b> Nothing about your delivery changed. Only the gap did.</p>' },
      { k: 'callout', tone: 'key', title: 'The mistake underneath it', html: '<p>Managers manage the <b>outcome</b>, not the <b>expectation</b>. They focus hard on getting the metric right, and never set clear expectations about <i>when</i>, <i>how</i>, and <i>in what format</i> the client will hear about it.</p><p>Positive gaps build loyalty. Negative gaps destroy trust. Both are gaps — and both are managed the same way, in advance.</p>' },

      { k: 'h', text: 'The five pillars' },
      { k: 'p', html: 'Each pillar exists to prevent one specific failure. Match each pillar to the failure it is there to stop.' },
      { k: 'activity', type: 'match', id: 'a-pillars',
        title: 'Five pillars, five failures',
        sub: 'Each pillar prevents exactly one of these',
        icon: '\u{1F9F1}', badge: 'Matching',
        task: 'Select a pillar on the left, then the failure it prevents on the right. Each pairing is one-to-one.',
        left: [
          { id: 'p1', title: '1 · Define scope clearly at the start', text: 'What is in and out of scope. What you will and won’t own.' },
          { id: 'p2', title: '2 · Set realistic timelines — then beat them', text: 'Under-promise, over-deliver.' },
          { id: 'p3', title: '3 · Communicate before they ask', text: 'Weekly updates — brief, structured, proactive.' },
          { id: 'p4', title: '4 · Name changes as they happen', text: 'When scope changes, tell them immediately.' },
          { id: 'p5', title: '5 · Clarify the definition of success', text: 'Ask what a 10/10 looks like at the end of the quarter.' }
        ],
        right: [
          { id: 'p3', text: 'The client who never hears from you is already mentally shopping for a replacement.' },
          { id: 'p1', text: 'An argument six months in about whether a task was ever yours to own.' },
          { id: 'p5', text: 'Hitting every number in the contract and still being told the engagement underdelivered.' },
          { id: 'p2', text: 'A client who expected 15 days and got 18 — unhappier than one who expected 30 and got 22.' },
          { id: 'p4', text: 'A client discovering a change after the fact and concluding it was hidden from them.' }
        ],
        coach: {
          title: 'Coaching key points',
          html: '<p>Read them as a set and the logic is one idea in five places: <b>every pillar is a mechanism for setting an expectation before you need to rely on it.</b></p>' +
                '<ul><li><b>Pillar 2 is counter-intuitive and worth sitting with.</b> Expectation is relative, not absolute. 22 days beats 18 days when 30 was promised against 15. The client is not measuring your speed — they are measuring the gap.</li>' +
                '<li><b>Pillar 4 is a relationship skill, not an admin task.</b> Managers file change notifications; leaders deliver them. A change the client finds out about afterwards is never received as a change — it is received as concealment.</li>' +
                '<li><b>Pillar 5 is the one almost nobody does.</b> “What does a 10/10 look like for you at the end of Q3?” and then build the work around that answer. Without it you can hit every contractual number and still be judged to have underdelivered.</li></ul>' +
                '<p>The failure mode to watch for in yourself: you told the client, but you never confirmed they understood. Telling is not pre-wiring. If they were surprised, it did not land.</p>'
        }
      },

      { k: 'h', text: 'Your expectation audit' },
      { k: 'reflect', id: 'r-expect', title: 'Part A — audit one live account', prompts: [
        { id: 'e1', q: 'What has your client explicitly agreed to expect from you — written down, not just discussed?', hint: 'If you cannot point to where it is written, it is an informal expectation, not an agreed one.' },
        { id: 'e2', q: 'What do you think they expect that was never formally agreed?', hint: 'These informal expectations are almost always the source of client friction.' },
        { id: 'e3', q: 'Where is the expectation gap most likely to cause a problem in the next 60 days?', hint: 'Name the account, the expectation, and roughly when it will surface.' }
      ],
        coach: {
          title: 'Coaching key points',
          html: '<p>The second question is the one that matters. <b>Informal expectations are where relationships actually break</b> — the standing report the client assumes is coming, the turnaround time they inferred from the first three weeks of the engagement, the escalation path they think exists.</p>' +
                '<p>None of it is written anywhere, all of it is real to them, and you will be held to it.</p>' +
                '<p>The fix is not to argue about what was agreed. It is to surface the informal expectation, name it out loud, and either adopt it deliberately or renegotiate it early — while it is still a conversation rather than a complaint.</p>'
        }
      },

      { k: 'h', text: 'Part B — the difficult message rewrite' },
      { k: 'callout', tone: 'warnbox', title: 'The message that was actually sent', html: '<p style="font-style:italic">“Hi John, just a heads-up that we had some challenges this month with a few accounts. Things are being looked into and we will update you soon. Let me know if you have questions.”</p>' },
      { k: 'reflect', id: 'r-rewrite', title: 'Rewrite it', model: true, prompts: [
        { id: 'w1', q: 'Rewrite the message above applying all five pillars: specific issue · root cause · action taken · timeline · what John can expect next.', hint: 'Write it as you would actually send it. The model answer unlocks once you have written yours.', rows: 8 }
      ],
        model: {
          title: 'Model rewrite',
          html: '<p style="font-style:italic">“Hi John — I want to give you a direct update on this month’s performance before you see the report. Our clean claim rate came in at 88%, below our 94% baseline. The root cause is a documentation gap on high-complexity procedure codes that our QA team identified this week. We’ve already implemented a pre-submission checklist and resubmitted 47 affected claims — the remaining 12 go out by Thursday. I’ll send a written summary today and check in with you on Friday to confirm everything is on track. You have my full attention on this.”</p>'
        },
        coach: {
          title: 'Coaching key points',
          html: '<p><b>Both versions deliver the same bad news. Only one protects the relationship.</b></p>' +
                '<ul><li><b>“Before you see the report”</b> — the first seven words establish that you got there first. That single clause is doing more relationship work than the rest of the message.</li>' +
                '<li><b>Numbers instead of adjectives.</b> “Some challenges” becomes 88% against a 94% baseline. “A few accounts” becomes 47 resubmitted and 12 remaining. John can now repeat this to someone else — the original left him nothing to say.</li>' +
                '<li><b>A named cause, not a passive one.</b> “Things are being looked into” has no subject. Somebody has to be doing something, and the original carefully avoids saying who.</li>' +
                '<li><b>Dates on both the fix and the next contact.</b> Thursday for the claims, Friday for the check-in. The original’s “soon” is an expectation gap waiting to open.</li>' +
                '<li><b>“Let me know if you have questions” became a scheduled follow-up.</b> The original puts the work of chasing on the client. The rewrite takes it back.</li></ul>' +
                '<p>Reading the original, John does not know whether to worry. Reading the rewrite, he knows exactly how worried to be — and that somebody is holding it. <b>Ambiguity is what frightens clients, not bad news.</b></p>'
        }
      },

      { k: 'quiz', id: 'q-expect', title: 'Check for understanding', questions: [
        { q: 'You promised monthly reporting by the 5th and have delivered on the 7th twice. Your performance metrics are strong. What is the risk?',
          opts: [
            'None — two days is within reasonable tolerance',
            'The client has silently reset their expectation to the 7th, so your next slip starts from a worse baseline and reads as a pattern',
            'The client will raise it formally at the next QBR',
            'Your team will normalise late delivery internally'
          ], a: 1,
          fb: 'Expectations reset quietly and they never reset in your favour. The trust problem arrives while every performance metric is still strong — which is why managers are blindsided by it.' },
        { q: 'Which pillar is the one most managers skip entirely?',
          opts: [
            'Define scope clearly at the start',
            'Set realistic timelines',
            'Communicate before they ask',
            'Clarify the definition of success — asking what a 10/10 actually looks like for them'
          ], a: 3,
          fb: 'Without it you can hit every number in the contract and still be judged to have underdelivered, because you optimised against your definition of success rather than theirs.' },
        { q: 'A client is surprised by something you are certain you told them. What most likely went wrong?',
          opts: [
            'They forgot — resend the original email',
            'You told them but never confirmed they understood; telling is not pre-wiring',
            'The information was sent to the wrong stakeholder',
            'The expectation was unreasonable to begin with'
          ], a: 1,
          fb: 'Delivery is not receipt. If the client was surprised, the communication did not land — regardless of whether you can produce the email proving you sent it.' }
      ]}
    ]
  }
);

/* ------------------------------------------------------------------ Part 3 */
window.M2_DATA.modules.push(
  {
    id: 'loyalty',
    num: 5,
    title: 'Retention, Loyalty & Growing the Account',
    tag: 'Part 4',
    mins: 20,
    img: 'assets/video-ladder.jpg',
    summary: 'The loyalty ladder, the vendor/advisor split, and the QBR that moves an account up a rung.',
    blocks: [
      { k: 'lede', html: 'A vendor reports the work. A trusted advisor explains what it means and recommends what to do next. <b>Same report. Different value.</b>' },

      { k: 'h', text: 'The Loyalty Ladder' },
      { k: 'diagram', name: 'ladder' },
      { k: 'callout', tone: 'key', title: 'Where most RCM relationships actually sit', html: '<p>Most client relationships are stuck at <b>CLIENT</b> level — the client uses the service and is satisfied, but they are not committed. One bad quarter and they leave.</p><p>The goal is not to make every client a Partner; that is not scalable. The goal is a <b>deliberate strategy per client</b>: where are they now, where do you want them in six months, and what specific action moves them one rung up?</p>' },
      { k: 'callout', tone: 'warnbox', title: 'The NPS rule', html: '<p>A Promoter (9–10) generates roughly <b>2.5× the revenue</b> of a Passive (7–8).</p><p>And a client who gives you a 7 is <b>not satisfied — they are neutral</b>. A neutral client is one competitor call away from leaving. Moving one client up one rung is usually your highest-ROI action of the quarter.</p>' },
      { k: 'src', text: 'Loyalty Ladder adapted from Payne & Martin, Relationship Marketing (1991). NPS: Reichheld, F. (2003), “The One Number You Need to Grow”, Harvard Business Review / Bain & Company.' },

      { k: 'activity', type: 'sequence', id: 'a-ladder',
        title: 'Climb the ladder',
        sub: 'Five rungs · lowest commitment at the bottom',
        icon: '\u{1FA9C}', badge: 'Sequence',
        task: 'Order the five rungs from the <b>lowest</b> commitment at the top of the list to the <b>highest</b> at the bottom — the order a relationship climbs.',
        items: [
          { id: 'cu', title: 'Customer', text: 'They have a contract. No emotional connection yet.' },
          { id: 'cl', title: 'Client', text: 'They use the service. Satisfied but not committed.' },
          { id: 'su', title: 'Supporter', text: 'They renew. They defend you in internal conversations.' },
          { id: 'ad', title: 'Advocate', text: 'They refer you to peers. They speak well of you unprompted.' },
          { id: 'pa', title: 'Partner', text: 'They co-create with you. They defend your contract internally.' }
        ],
        order: ['cu', 'cl', 'su', 'ad', 'pa'],
        coach: {
          title: 'Coaching key points',
          html: '<p>The rungs are not degrees of satisfaction — they are degrees of <b>commitment</b>, and the two are independent. A Client can be perfectly satisfied and still leave.</p>' +
                '<p>Each rung has its own move:</p>' +
                '<ul><li><b>Customer → Client:</b> personalised welcome, a named manager from day one.</li>' +
                '<li><b>Client → Supporter:</b> quarterly business insight reports and proactive risk flagging — before they ask. This is the rung most of your book is stuck on.</li>' +
                '<li><b>Supporter → Advocate:</b> ask for the case study or testimonial. Invite them onto an industry panel. Advocacy has to be requested; it rarely volunteers itself.</li>' +
                '<li><b>Advocate → Partner:</b> co-author the strategic review. Get inside their planning cycle rather than reporting into it.</li></ul>' +
                '<p>Notice the pattern: <b>every upward move is something you give before it is asked for.</b> Reactive delivery, however excellent, holds a relationship exactly where it is.</p>'
        }
      },

      { k: 'video', id: 'v-ladder',
        title: 'From vendor to strategic partner',
        by: 'The client relationship pyramid',
        yt: 'Izye15_Bon0',
        start: 68,
        poster: 'assets/video-ladder.jpg',
        watch: 'Watch for how the relationship moves from transactional to strategic — and what changes in what the supplier talks about at each level.',
        summary: {
          head: 'Text summary — From vendor to strategic partner',
          html: '<p>The clip lays out a six-level pyramid of supplier relationships. Every level does competent work; what changes is the <b>conversation</b> the supplier is trusted to have.</p>' +
                '<ol>' +
                '<li><b>Peddler</b> — pushes whatever they have. The client screens the calls.</li>' +
                '<li><b>Vendor</b> — fulfils orders accurately. Judged on price and accuracy; replaceable by anyone cheaper.</li>' +
                '<li><b>Solution Provider</b> — solves the stated problem well. Still working from the client’s brief.</li>' +
                '<li><b>Consultant</b> — diagnoses the problem behind the brief. Now shaping the question, not just answering it.</li>' +
                '<li><b>Trusted Advisor</b> — consulted before decisions are made, including ones outside the contract. Access to the client’s thinking, not just their requirements.</li>' +
                '<li><b>Business Partner</b> — shares the client’s goals and some of their risk. Inside the planning cycle.</li>' +
                '</ol>' +
                '<p><b>The dividing line</b> sits between Solution Provider and Consultant: below it you respond to what the client asks for; above it you tell them what they have not thought to ask. Moving up is not earned by better delivery — every level delivers. It is earned by bringing perspective the client did not request.</p>' +
                '<p><b>In RCM terms:</b> a vendor sends the month-end report. A trusted advisor sends the month-end report with the payer trend the client has not spotted, what it means for their Q4, and a recommendation.</p>'
        },
        debrief: [
          'What is one behaviour that moves you from “here’s the update” to “here’s what this means for you”?',
          'Which level are your top three accounts actually at — not which would you like them to be at?'
        ]
      },

      { k: 'activity', type: 'bucket', id: 'a-mindset',
        title: 'Vendor or trusted advisor?',
        sub: 'Eight behaviours · two mindsets',
        icon: '⚖️', badge: 'Drag & drop',
        task: 'Drag each behaviour into the mindset it belongs to. These are behaviours, not attitudes — every one of them is observable on a call.',
        buckets: [
          { id: 'v', label: 'Vendor mindset', sub: 'Reports the work.' },
          { id: 'a', label: 'Trusted advisor mindset', sub: 'Explains what it means and what to do next.' }
        ],
        items: [
          { id: 'm1', text: 'Waits for instructions', b: 'v' },
          { id: 'm2', text: 'Thinks ahead', b: 'a' },
          { id: 'm3', text: 'Reports completed tasks', b: 'v' },
          { id: 'm4', text: 'Explains impact', b: 'a' },
          { id: 'm5', text: 'Answers only what is asked', b: 'v' },
          { id: 'm6', text: 'Flags risks early', b: 'a' },
          { id: 'm7', text: 'Focuses on activity', b: 'v' },
          { id: 'm8', text: 'Recommends next steps', b: 'a' }
        ],
        coach: {
          title: 'Coaching key points',
          html: '<p>Line the two columns up and the distinction is <b>timing and direction</b>, not effort. The vendor behaviours are all <i>backward-looking and client-triggered</i>: what happened, what was asked. The advisor behaviours are all <i>forward-looking and self-triggered</i>: what is coming, what you should know.</p>' +
                '<p><b>“Focuses on activity” is the one worth dwelling on.</b> It is the most defensible-sounding vendor behaviour — reporting how much work you did feels like accountability. But activity is your input, not their outcome. A client does not buy 3,200 worked claims; they buy cash and predictability.</p>' +
                '<p>Concrete moves that shift you across the line:</p>' +
                '<ul><li>Explain the “so what” behind the update, every time.</li>' +
                '<li>Share risks before the client asks.</li>' +
                '<li>Recommend a next step — not options, a recommendation.</li>' +
                '<li>Connect the update to a goal the client has stated.</li>' +
                '<li>Speak with ownership, not compliance.</li></ul>' +
                '<p><b>Vendors give information. Trusted advisors give perspective.</b></p>'
        }
      },

      { k: 'h', text: 'Read the portfolio' },
      { k: 'activity', type: 'hunt', id: 'a-portfolio',
        title: 'Which account is at the highest risk of leaving?',
        sub: 'Five accounts · one is quietly in trouble',
        icon: '\u{1F50D}', badge: 'Find the signal',
        task: 'Here is your book of business at the end of Q3. All five accounts are current and none has complained this quarter. Select the account you would treat as the <b>highest churn risk</b>.',
        cols: ['Account', 'Ladder position', 'NPS', 'Clean claim rate', 'QBRs held (12 mo)', 'Last proactive contact'],
        rows: [
          { id: 'h1', cells: ['Northfield Regional', 'Supporter', '9 · Promoter', '91%', '3', '11 days ago'] },
          { id: 'h2', cells: ['St. Alder Health', 'Client', '7 · Passive', '96%', '0', 'None on record'], answer: true },
          { id: 'h3', cells: ['Cranbrook Medical', 'Customer', '4 · Detractor', '88%', '2', '4 days ago'] },
          { id: 'h4', cells: ['Lakeshore Physicians', 'Advocate', '9 · Promoter', '93%', '4', '6 days ago'] },
          { id: 'h5', cells: ['Mercy Point', 'Supporter', '8 · Passive', '90%', '3', '19 days ago'] }
        ],
        wrongFb: {
          h1: 'Northfield is a Promoter at Supporter level with recent proactive contact. This is a healthy account — your growth opportunity, not your risk.',
          h3: 'Cranbrook is the tempting answer: a detractor at 4 with the weakest delivery. But look again — two QBRs held, contact four days ago, and the relationship is being actively worked. <b>A detractor you are talking to is a problem. A passive you are not talking to is a risk.</b>',
          h4: 'Lakeshore is an Advocate and a Promoter with the most QBRs on the book. If anything, this account is under-asked — it is a Partner candidate.',
          h5: 'Mercy Point is worth watching — a Passive at 8 and nineteen days since contact. But it is at Supporter level with a QBR cadence in place. There is a more exposed account here.'
        },
        coach: {
          title: 'Coaching key points',
          html: '<p><b>St. Alder Health has the best clean claim rate on the entire book — and is the account most likely to leave.</b></p>' +
                '<p>Every signal that matters is a relationship signal, and every one of them is bad: stuck at CLIENT level, a neutral 7, zero QBRs in twelve months, and no proactive contact on record. Delivery is flawless. Nobody has ever given them a reason to be committed.</p>' +
                '<p><b>Why Cranbrook is the decoy.</b> A detractor at 4 is loud, visible and already owned — two QBRs, contact four days ago, a live remediation. Loud problems get resourced. Quiet ones get missed, and St. Alder is quiet precisely <i>because</i> the delivery is good.</p>' +
                '<p>This is the module’s whole argument in one table: <b>a green dashboard is not a retained client.</b> The client who never calls is not satisfied — they are unengaged, and they are one competitor call away.</p>' +
                '<p>The move on St. Alder is not an operational one. Nothing needs fixing. It is a Client→Supporter move: a quarterly business insight report with proactive risk flagging, delivered before anybody asks for it.</p>'
        }
      },

      { k: 'h', text: 'Build the QBR that moves them up a rung' },
      { k: 'p', html: '<b>Your context:</b> you have a QBR next week with a client currently at <b>CLIENT</b> level. Your clean claim rate is 92% against a 94% target, cash collected is above target, and you have identified a payer trend that could affect their Q4 revenue. Your goal is to move them toward <b>SUPPORTER</b> by the end of the call.' },
      { k: 'reflect', id: 'r-qbr', title: 'Your 2-minute QBR opening', model: true, prompts: [
        { id: 'q1', q: '1 · One leading indicator — not the clean claim rate. What predicts next month?', hint: 'Lagging indicators report the past. What in your data tells the client what is coming?' },
        { id: 'q2', q: '2 · The 92% — framed strategically, not defensively. Anchor it to the starting point.', hint: 'Compare "we were slightly below target but…" with "we’re at 92%, up from 88% last quarter — here’s what’s driving it."' },
        { id: 'q3', q: '3 · One proactive insight they did not ask for — the payer trend, connected to their Q4 outlook.', hint: 'It has to be RCM-specific and tied to their actual business risk, not a generic industry observation.' },
        { id: 'q4', q: '4 · One question that invites partnership — something that makes them a co-creator, not a recipient.', hint: '"Do you have any questions for us?" is performative. What would a genuinely curious question sound like?' }
      ],
        model: {
          title: 'What strong answers look like',
          html: '<p><b>1 · Leading indicator:</b> “First-pass resolution on our highest-volume payer has moved from 84% to 89% over six weeks. That is the number that tells us what October cash looks like — the clean claim rate tells us what September was.”</p>' +
                '<p><b>2 · The 92%:</b> “We’re at 92% against a 94% target, up from 88% at the start of the quarter. The four points came from the pre-submission check on high-complexity codes. The remaining two are a payer-specific documentation rule, and here is the plan for it.”</p>' +
                '<p><b>3 · Proactive insight:</b> “One thing you didn’t ask about. Your second-largest commercial payer has quietly tightened medical-necessity documentation on two of your highest-volume service lines. We’ve seen the first denials come through. Left alone it is a Q4 revenue exposure for you — we’re already adjusting, and I wanted you to know before it shows up anywhere.”</p>' +
                '<p><b>4 · Partnership question:</b> “What is your biggest concern for Q4 that we are not currently working on?” or “If we could fix one thing for you next quarter that isn’t in our contract, what would it be?”</p>'
        },
        coach: {
          title: 'Coaching key points',
          html: '<p><b>The QBR is not a reporting event. It is a relationship-deepening event.</b> The number on the slide is the excuse to have the conversation — not the content of it.</p>' +
                '<ul><li><b>On the 92%:</b> defensive framing (“we were slightly below but…”) invites the client to audit you. Strategic framing anchors to the starting point and hands them the trajectory. Same number, opposite conversation.</li>' +
                '<li><b>On the leading indicator:</b> anyone can report last month. Telling a client what next month looks like is the single clearest signal that you are thinking on their behalf.</li>' +
                '<li><b>On the proactive insight:</b> this is the element that actually moves the rung, and it has to cost you something — it should be information they could not have got without you. Generic industry commentary does not count.</li>' +
                '<li><b>On the partnership question:</b> “Do you have any questions for us?” is performative and every client knows it. A real question is one where you do not already know the answer and where the answer might change your plan.</li></ul>' +
                '<p>Read your four answers back. If a competitor could have written any of them about any client, that element is not yet doing partnership work.</p>'
        }
      },

      { k: 'quiz', id: 'q-loyalty', title: 'Check for understanding', questions: [
        { q: 'Your client is at CLIENT level on the loyalty ladder. What is the single highest-impact action to move them to SUPPORTER?',
          opts: [
            'Reduce their fees at renewal',
            'Increase reporting frequency from monthly to weekly',
            'A quarterly business insight report with proactive risk flagging — delivered before they ask for it',
            'Ask them for a testimonial or case study'
          ], a: 2,
          fb: 'Proactive value delivery creates loyalty that reactive delivery never can — however excellent the reactive delivery is. The testimonial ask belongs a rung higher, at Supporter→Advocate.' },
        { q: 'A client scores you 7 on NPS. How should you read that?',
          opts: [
            'Satisfied — comfortably above the midpoint',
            'Neutral, not satisfied — and one competitor call away from leaving',
            'A detractor requiring immediate escalation',
            'Statistically indistinguishable from a 9'
          ], a: 1,
          fb: '7–8 is Passive. A Promoter at 9–10 generates roughly 2.5× the revenue of a Passive, and passives leave quietly — they never complain first.' },
        { q: 'Which of these is a vendor behaviour rather than a trusted advisor behaviour?',
          opts: ['Flags risks early', 'Explains impact', 'Focuses on activity', 'Recommends next steps'], a: 2,
          fb: 'Reporting volume of work done feels like accountability, but activity is your input, not the client’s outcome. Clients buy cash and predictability, not worked claims.' }
      ]}
    ]
  },

  /* ======================================================================= */
  {
    id: 'commit',
    num: 6,
    title: 'Your 30-Day Action Plan',
    tag: 'Closing',
    mins: 10,
    img: 'assets/closing.jpg',
    summary: 'Three commitments, written specifically enough that someone could hold you to them.',
    blocks: [
      { k: 'lede', html: 'The difference between this being a good module and this changing how you work with clients is what you do on Monday morning.' },
      { k: 'p', html: 'Write honest answers, not aspirational ones. These save to your device and appear in your downloadable answer sheet, so you can send them to a colleague as an accountability check.' },

      { k: 'reflect', id: 'r-commit', title: 'Your three commitments', prompts: [
        { id: 'c1', q: '1 · One client I will reach out to THIS WEEK — proactively, before they contact me.', hint: 'Be specific: name the client. What will you say?' },
        { id: 'c2', q: '2 · One habit I will stop that I know damages client trust or confidence.', hint: 'Be honest, not aspirational. What do you actually do that you shouldn’t?' },
        { id: 'c3', q: '3 · One thing I will do in my next client QBR that I have never done before.', hint: 'It should come from this module. Be specific enough that someone could hold you to it.' }
      ],
        coach: {
          title: 'Coaching key points',
          html: '<p><b>Commitment 2 is the one that does the work</b>, and it is the one people write softly. “Communicate more” is not a habit you can stop. “Stop waiting until I have the full picture before I tell a client something has slipped” is.</p>' +
                '<p><b>Build an accountability mechanism now, not later.</b> Send commitment 3 to a peer today and ask them to check in with you in 30 days. A commitment with a named witness and a date behaves completely differently from one that lives in a training file.</p>' +
                '<p>Come back to your Module 1 relationship audit in 30 days. The fragile relationship you named at the start is the one to measure this against — not the strong one.</p>'
        }
      },

      { k: 'callout', tone: 'quote', html: 'Clients don’t leave because of one bad month. They leave because no one made them feel like a priority.' },
      { k: 'p', html: 'The proactive call before the crisis. The email you send before they ask. The QBR where you bring something they didn’t expect. The moment you say the hard thing clearly because you care about the relationship enough to. <b>That is what builds the kind of client loyalty that survives a bad quarter.</b>' },
      { k: 'callout', tone: 'quote', html: 'The strongest client relationships are built in the moments no one is watching. That’s the work. That’s the standard.' },

      { k: 'h', text: 'Your one-page reference card' },
      { k: 'list', title: '', items: [
        { n: 'J', title: 'JTBD — three layers', text: 'Functional (the metric) · Emotional (how they feel) · Social (how they are seen).' },
        { n: 'A', title: 'A·R·D·V styles', text: 'Analytical (data) · Relational (people) · Driver (headline) · Visionary (strategy).' },
        { n: 'T', title: 'Trust Equation', text: '(Credibility + Reliability + Intimacy) ÷ Self-Orientation. Watch the denominator.' },
        { n: 'R', title: 'A → T → O → R', text: 'Acknowledge · Be transparent · Offer a solution · Reinforce the partnership. In that order.' },
        { n: '5', title: 'Five pillars', text: 'Scope · timelines you beat · communicate first · name changes · define success in their words.' },
        { n: 'L', title: 'Loyalty ladder', text: 'Customer → Client → Supporter → Advocate → Partner. Every rung is given before it is asked for.' }
      ]}
    ]
  }
);

/* ============================ graded knowledge check ===================== */
window.M2_DATA.knowledgeCheck = {
  id: 'kc',
  title: 'Final Knowledge Check',
  blurb: 'Twelve questions drawn from all five parts. Your score is recorded on your certificate. You can retake it as many times as you like — your best score is the one that counts.',
  questions: [
    { q: 'A client’s JTBD has three layers. Which set names them correctly?',
      opts: ['Contractual, operational, strategic', 'Functional, emotional, social', 'Stated, implied, latent', 'Financial, clinical, reputational'], a: 1,
      fb: 'Functional (reduce denials), Emotional (feel confident presenting to their CFO), Social (be seen as the leader who made the right vendor decision).' },
    { q: 'Two clients have identical denial rates of 9%. One has a board presentation next week; the other is mid-way through a financial restructure. What does JTBD say about them?',
      opts: [
        'They have the same job — the metric is the metric',
        'They have different jobs, so the same metric conversation should be delivered differently',
        'Only the board-presentation client has an emotional job',
        'Neither has a social job until they ask for one'
      ], a: 1,
      fb: 'Same KPI, different job. One is hiring you for presentable confidence; the other for stability. Identical data, two different assignments.' },
    { q: 'You are delivering bad news to a Driver-style client. What does the first sentence contain?',
      opts: ['A personal check-in', 'The headline — problem, cause, fix date', 'The full root-cause analysis', 'An apology'], a: 1,
      fb: 'One headline, bottom line, action. A Driver disengages during the preamble, so anything before the point is spent budget.' },
    { q: 'A client says, “Your team needs to improve follow-up.” What is the strategic listen?',
      opts: [
        'Assign more staff to follow-up',
        'Ask which specific follow-up felt slow and what the impact was',
        'They are about to miss a close deadline or board presentation — the real issue is the impact on their internal credibility',
        'Add a follow-up SLA to the contract at renewal'
      ], a: 2,
      fb: 'Level 1 answers the words, Level 2 the concern beneath them, Level 3 what has not been said yet — which is where churn signals live.' },
    { q: 'What is the denominator in the Trust Equation?',
      opts: ['Reliability', 'Intimacy', 'Self-Orientation', 'Credibility'], a: 2,
      fb: 'Because it divides everything above the line, high self-orientation collapses the ratio no matter how strong the other three are.' },
    { q: 'On a client call, which of these most clearly signals high self-orientation?',
      opts: [
        '“Here is the specific code family that failed and the date we caught it.”',
        '“We’ve had people out and the coding team has been stretched — it’s been a difficult month on our side.”',
        '“I should have called you before your finance team did.”',
        '“47 claims are resubmitted; the remaining 12 go out by Thursday.”'
      ], a: 1,
      fb: 'Your staffing pressure is your problem to solve, not context the client can use. The moment the call becomes about your team’s difficulty, the denominator does its damage.' },
    { q: 'What is Ruinous Empathy?',
      opts: [
        'Challenging directly without caring personally',
        'Caring so much you soften the message until the client does not realise there is a problem',
        'Avoiding both caring and challenging — saying nothing real',
        'Caring personally and challenging directly at the same time'
      ], a: 1,
      fb: 'It is the most common failure and the most expensive, because it feels like kindness while the problem compounds.' },
    { q: 'Something has gone wrong and you are on the call. What must come first?',
      opts: [
        'Explaining the root cause so they understand it was not negligence',
        'Acknowledging what happened, directly and without hedging',
        'Offering the fix so they know it is handled',
        'Reinforcing how much you value the partnership'
      ], a: 1,
      fb: 'Explaining before acknowledging reads as a defence, however accurate it is. Acknowledge is the step people skip under pressure.' },
    { q: 'Which offer is stronger at the “O” step of A→T→O→R?',
      opts: [
        '“We’re treating this as a priority and I’ll update you as soon as I can.”',
        '“What would you like us to do?”',
        '“47 claims resubmitted, 12 more by Thursday, written summary to you today.”',
        '“I can assure you this has our full attention.”'
      ], a: 2,
      fb: 'Dates are the currency of reliability. A vague commitment opens a second expectation gap on top of the first — and asking the client to design the fix adds work to the person you just let down.' },
    { q: 'You promised reporting by the 5th and have delivered on the 7th twice, with strong performance metrics throughout. What has happened?',
      opts: [
        'Nothing material — two days is within tolerance',
        'The client has silently reset their expectation to the 7th, so the next slip reads as a pattern',
        'The client will formally raise it at the next QBR',
        'The contract needs renegotiating'
      ], a: 1,
      fb: 'Expectations reset quietly and never in your favour. This is how a trust problem arrives while every metric is still green.' },
    { q: 'A client is at CLIENT level on the loyalty ladder. What is the highest-impact move to SUPPORTER?',
      opts: [
        'Ask for a testimonial or case study',
        'Co-author their strategic review',
        'Quarterly business insight reports with proactive risk flagging — before they ask',
        'Assign a second named manager to the account'
      ], a: 2,
      fb: 'Every upward move is something given before it is asked for. The testimonial ask belongs one rung higher, at Supporter→Advocate.' },
    { q: 'Two accounts: one is a Detractor at NPS 4 with two QBRs held and contact four days ago; the other is a Passive at NPS 7 with a 96% clean claim rate, zero QBRs and no proactive contact on record. Which is the higher churn risk?',
      opts: [
        'The Detractor — a 4 is the clearest dissatisfaction signal available',
        'The Passive — excellent delivery with no relationship contact means nobody has given them a reason to be committed',
        'Neither — both are current accounts in good standing',
        'Impossible to judge without revenue figures'
      ], a: 1,
      fb: 'A detractor you are talking to is a problem; a passive you are not talking to is a risk. Loud problems get resourced. Quiet ones get missed — and a green dashboard is not a retained client.' }
  ]
};
