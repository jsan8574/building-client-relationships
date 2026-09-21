/* =============================================================================
   store.js — localStorage persistence + robust elapsed-time tracking.

   Every key is namespaced   bcr.<courseId>.<key>
   so a later module (Module 3, 4 ...) gets its own drawer without colliding
   with this one and without any restructuring here.
   ========================================================================== */
(function (global) {
  'use strict';

  var NS = 'bcr';
  var available = (function () {
    try { var k = '__t'; localStorage.setItem(k, '1'); localStorage.removeItem(k); return true; }
    catch (e) { return false; }
  })();
  var memory = {};                       // fallback when storage is blocked

  function cid() { return (global.COURSE && global.COURSE.id) || 'course'; }
  function key(k) { return NS + '.' + cid() + '.' + k; }

  function rawGet(k) {
    if (!available) return Object.prototype.hasOwnProperty.call(memory, k) ? memory[k] : null;
    try { return localStorage.getItem(k); } catch (e) { return null; }
  }
  function rawSet(k, v) {
    if (!available) { memory[k] = v; return; }
    try { localStorage.setItem(k, v); } catch (e) { memory[k] = v; }
  }

  function get(k, fallback) {
    var raw = rawGet(key(k));
    if (raw === null || raw === undefined) return fallback;
    try { return JSON.parse(raw); } catch (e) { return fallback; }
  }
  function set(k, v) { rawSet(key(k), JSON.stringify(v)); }
  function del(k) {
    if (!available) { delete memory[key(k)]; return; }
    try { localStorage.removeItem(key(k)); } catch (e) {}
  }

  /* ---------------------------------------------------------------- profile */
  function profile() { return get('profile', { name: '', role: '', started: null }); }
  function setProfile(p) {
    var cur = profile();
    if (!cur.started) p.started = Date.now(); else p.started = cur.started;
    set('profile', p);
    return p;
  }

  /* ------------------------------------------------- generic activity state
     Saved on EVERY interaction, not only on completion, so a mid-activity
     refresh restores exactly where the learner was.                          */
  function actState(id) { return get('act.' + id, null); }
  function saveAct(id, state) {
    var prev = actState(id) || {};
    var next = {};
    for (var a in prev) if (Object.prototype.hasOwnProperty.call(prev, a)) next[a] = prev[a];
    for (var b in state) if (Object.prototype.hasOwnProperty.call(state, b)) next[b] = state[b];
    next.t = Date.now();
    set('act.' + id, next);
    Store.emit('save');
    return next;
  }
  function actDone(id) { var s = actState(id); return !!(s && s.done); }

  /* ------------------------------------------------------------ reflections */
  function reflection(id) { var r = get('refl', {}); return r[id] || ''; }
  function saveReflection(id, text) {
    var r = get('refl', {}); r[id] = text; set('refl', r); Store.emit('save');
  }
  function allReflections() { return get('refl', {}); }

  /* ------------------------------------------------------------------ quiz */
  function quizState(id) { return get('quiz.' + id, null); }
  function saveQuiz(id, state) { set('quiz.' + id, state); Store.emit('save'); }

  /* -------------------------------------------------------- module progress */
  function moduleDone(mid) { return get('mod', {})[mid] === true; }
  function setModuleDone(mid, v) {
    var m = get('mod', {}); m[mid] = !!v; set('mod', m); Store.emit('save');
  }

  /* ==========================================================================
     Elapsed time.
     Heartbeat every 5s. A tick only counts when the page is visible AND the
     gap since the previous tick is plausible (<= 30s). That throws away the
     long jumps produced by a backgrounded tab, a sleeping laptop, or a tab
     left open overnight, so "time invested" stays honest.
     ====================================================================== */
  var TICK = 5000, MAX_GAP = 30000, last = null, timer = null;

  function elapsed() { return get('elapsed', 0); }
  function addElapsed(ms) { set('elapsed', elapsed() + ms); }

  function tick() {
    var now = Date.now();
    if (document.hidden) { last = null; return; }
    if (last === null) { last = now; return; }
    var d = now - last;
    last = now;
    if (d > 0 && d <= MAX_GAP) addElapsed(d);
  }

  function startClock() {
    if (timer) return;
    last = document.hidden ? null : Date.now();
    timer = setInterval(function () { tick(); Store.emit('tick'); }, TICK);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { tick(); last = null; } else { last = Date.now(); }
    });
    global.addEventListener('pagehide', function () { tick(); });
    global.addEventListener('beforeunload', function () { tick(); });
  }

  function fmtTime(ms) {
    var s = Math.floor(ms / 1000), h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60);
    if (h > 0) return h + 'h ' + m + 'm';
    return m + 'm ' + (s % 60) + 's';
  }

  /* --------------------------------------------------------------- events */
  var subs = {};
  function on(evt, fn) { (subs[evt] = subs[evt] || []).push(fn); }
  function emit(evt, payload) { (subs[evt] || []).forEach(function (f) { try { f(payload); } catch (e) {} }); }

  /* ----------------------------------------------------------------- reset */
  function resetAll() {
    if (!available) { memory = {}; return; }
    var pre = NS + '.' + cid() + '.', doomed = [];
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (k && k.indexOf(pre) === 0) doomed.push(k);
      }
      doomed.forEach(function (k) { localStorage.removeItem(k); });
    } catch (e) {}
  }

  var Store = {
    available: available,
    get: get, set: set, del: del,
    profile: profile, setProfile: setProfile,
    actState: actState, saveAct: saveAct, actDone: actDone,
    reflection: reflection, saveReflection: saveReflection, allReflections: allReflections,
    quizState: quizState, saveQuiz: saveQuiz,
    moduleDone: moduleDone, setModuleDone: setModuleDone,
    elapsed: elapsed, startClock: startClock, fmtTime: fmtTime,
    on: on, emit: emit, resetAll: resetAll
  };
  global.Store = Store;
})(window);
