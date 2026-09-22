/* =============================================================================
   course.js — the programme manifest.

   ADDING MODULE 3 (or 4, 5 ...) LATER:
     1. drop  data/m3.js  next to data/m2.js, same shape
     2. add one entry to PROGRAM.courses below
     3. add the <script src="data/m3.js?v=N"> tag in index.html
   The course currently ships STANDALONE: exactly one entry, no series UI is
   rendered anywhere. Adding a second entry is what turns the series on.
   Nothing else changes. Navigation, progress, the sidebar, the knowledge check
   and the certificate all read from this manifest, and storage is namespaced
   per course id, so a new course starts with a clean drawer of its own.
   ========================================================================== */
(function (global) {
  'use strict';

  var PROGRAM = {
    id: 'client-relationship-leadership',
    title: 'Building Client Relationships',
    blurb: 'A manager-level course on building, protecting and growing client relationships in revenue cycle management.',
    courses: [
      {
        id: 'm2',                      // storage namespace — internal, never shown; kept stable so existing learner progress survives
        title: 'Building Client Relationships',
        blurb: 'Understand the client at depth, build trust that survives a bad quarter, manage expectations, and move accounts up the loyalty ladder.',
        state: 'active',
        data: 'M2_DATA'
      }
      /* , { id:'m3', num:3, title:'…', state:'active', data:'M3_DATA' } */
    ]
  };

  var active = null;
  for (var i = 0; i < PROGRAM.courses.length; i++) {
    if (PROGRAM.courses[i].state === 'active') { active = PROGRAM.courses[i]; break; }
  }

  global.PROGRAM = PROGRAM;
  global.COURSE = active;                              // storage namespace lives here
  global.getCourseData = function () { return global[active.data]; };
})(window);
