/* =============================================================================
   course.js — the programme manifest.

   ADDING MODULE 3 (or 4, 5 ...) LATER:
     1. drop  data/m3.js  next to data/m2.js, same shape
     2. add one entry to PROGRAM.courses below
     3. add the <script src="data/m3.js?v=N"> tag in index.html
   Nothing else changes. Navigation, progress, the sidebar, the knowledge check
   and the certificate all read from this manifest, and storage is namespaced
   per course id, so a new course starts with a clean drawer of its own.
   ========================================================================== */
(function (global) {
  'use strict';

  var PROGRAM = {
    id: 'client-relationship-leadership',
    title: 'Client Relationship Leadership',
    blurb: 'A manager-level programme on building, protecting and growing client relationships in revenue cycle management.',
    courses: [
      {
        id: 'm1',
        num: 1,
        title: 'Effective Client Communication',
        blurb: 'Managing perception, trust and conflict through intentional communication.',
        state: 'external',
        href: 'https://effective-client-communication-for-tls.revexpertone.com/'
      },
      {
        id: 'm2',
        num: 2,
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
