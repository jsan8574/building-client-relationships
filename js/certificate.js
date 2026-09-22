/* =============================================================================
   certificate.js — canvas-drawn certificate + PNG download.
   The certificate names the course it was earned on (DATA.title). It carries no
   series or module numbering — this course stands alone.
   ========================================================================== */
(function (global) {
  'use strict';
  var U = global.ActivityUtil, esc = U.esc, el = U.el;

  var W = 2000, H = 1414;                       // 2x an A4 landscape-ish sheet

  function rr(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath();
  }

  function fitText(ctx, text, max, startPx, weight) {
    var px = startPx;
    do {
      ctx.font = weight + ' ' + px + 'px "Proxima Nova", Helvetica, Arial, sans-serif';
      if (ctx.measureText(text).width <= max) break;
      px -= 4;
    } while (px > 28);
    return px;
  }

  function draw(cv, info) {
    var ctx = cv.getContext('2d');
    cv.width = W; cv.height = H;

    /* page */
    ctx.fillStyle = '#FFFFFF'; ctx.fillRect(0, 0, W, H);

    /* top band */
    var g = ctx.createLinearGradient(0, 0, W, 300);
    g.addColorStop(0, '#1B1A23'); g.addColorStop(0.55, '#194A5D'); g.addColorStop(1, '#255F65');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, 232);

    /* accent rule under the band */
    var g2 = ctx.createLinearGradient(0, 0, W, 0);
    g2.addColorStop(0, '#57B6C0'); g2.addColorStop(0.5, '#3394BA'); g2.addColorStop(1, '#76BDA7');
    ctx.fillStyle = g2; ctx.fillRect(0, 232, W, 10);

    /* inner keyline */
    ctx.strokeStyle = '#DCE6EA'; ctx.lineWidth = 3;
    rr(ctx, 60, 292, W - 120, H - 352, 26); ctx.stroke();

    ctx.textAlign = 'center';

    /* band text */
    ctx.fillStyle = '#9AD3D9';
    ctx.font = '700 30px "Proxima Nova", Helvetica, Arial, sans-serif';
    ctx.fillText(info.eyebrow.toUpperCase(), W / 2, 106);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 58px "Proxima Nova", Helvetica, Arial, sans-serif';
    ctx.fillText('Certificate of Completion', W / 2, 176);

    /* presented to */
    ctx.fillStyle = '#7A8C8F';
    ctx.font = '600 26px "Proxima Nova", Helvetica, Arial, sans-serif';
    ctx.fillText('THIS CERTIFIES THAT', W / 2, 404);

    var px = fitText(ctx, info.name, W - 320, 96, '700');
    ctx.fillStyle = '#1B1A23';
    ctx.font = '700 ' + px + 'px "Proxima Nova", Helvetica, Arial, sans-serif';
    ctx.fillText(info.name, W / 2, 500);

    /* underline */
    var nw = Math.min(ctx.measureText(info.name).width + 120, W - 260);
    ctx.strokeStyle = '#3394BA'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo((W - nw) / 2, 536); ctx.lineTo((W + nw) / 2, 536); ctx.stroke();

    if (info.role) {
      ctx.fillStyle = '#5A696B';
      ctx.font = '400 30px "Proxima Nova", Helvetica, Arial, sans-serif';
      ctx.fillText(info.role, W / 2, 584);
    }

    ctx.fillStyle = '#5A696B';
    ctx.font = '400 32px "Proxima Nova", Helvetica, Arial, sans-serif';
    ctx.fillText('has successfully completed', W / 2, info.role ? 654 : 630);

    var tp = fitText(ctx, info.title, W - 360, 62, '700');
    ctx.fillStyle = '#1B1A23';
    ctx.font = '700 ' + tp + 'px "Proxima Nova", Helvetica, Arial, sans-serif';
    ctx.fillText(info.title, W / 2, info.role ? 778 : 754);

    /* stat tiles */
    var stats = [
      ['Time invested', info.time],
      ['Knowledge check', info.score],
      ['Activities completed', info.acts]
    ];
    var tw = 480, gap = 34, total = tw * 3 + gap * 2, x0 = (W - total) / 2, y0 = info.role ? 856 : 832;
    stats.forEach(function (s, i) {
      var x = x0 + i * (tw + gap);
      ctx.fillStyle = '#F4F8FA'; rr(ctx, x, y0, tw, 176, 18); ctx.fill();
      ctx.strokeStyle = '#DCE6EA'; ctx.lineWidth = 2; rr(ctx, x, y0, tw, 176, 18); ctx.stroke();
      ctx.fillStyle = '#7A8C8F';
      ctx.font = '600 24px "Proxima Nova", Helvetica, Arial, sans-serif';
      ctx.fillText(s[0].toUpperCase(), x + tw / 2, y0 + 54);
      ctx.fillStyle = '#194A5D';
      var sp = fitText(ctx, s[1], tw - 60, 58, '700');
      ctx.font = '700 ' + sp + 'px "Proxima Nova", Helvetica, Arial, sans-serif';
      ctx.fillText(s[1], x + tw / 2, y0 + 126);
    });

    /* footer */
    ctx.strokeStyle = '#DCE6EA'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(220, H - 214); ctx.lineTo(W - 220, H - 214); ctx.stroke();

    ctx.fillStyle = '#5A696B';
    ctx.font = '600 28px "Proxima Nova", Helvetica, Arial, sans-serif';
    ctx.fillText('Completed ' + info.date, W / 2, H - 158);
    ctx.fillStyle = '#7A8C8F';
    ctx.font = '400 23px "Proxima Nova", Helvetica, Arial, sans-serif';
    ctx.fillText('Self-paced e-learning', W / 2, H - 112);
  }

  function render(host, ctxInfo) {
    var DATA = ctxInfo.data, p = Store.profile(), a = ctxInfo.allUnits, kc = ctxInfo.kc;

    var reqs = [
      { ok: !!p.name, txt: 'Your name is saved' , fix: '#/' },
      { ok: a.total > 0 && a.done === a.total, txt: 'All ' + a.total + ' activities complete (' + a.done + ' done)', fix: '#/m/' + DATA.modules[0].id },
      { ok: kc.submitted, txt: 'Final knowledge check submitted', fix: '#/check' },
      { ok: kc.submitted && kc.pct >= DATA.passMark, txt: 'Knowledge check at or above ' + DATA.passMark + '%' + (kc.submitted ? ' (best: ' + kc.pct + '%)' : ''), fix: '#/check' }
    ];
    var ready = reqs.every(function (r) { return r.ok; });

    host.innerHTML = '';
    host.appendChild(el('<div class="mod-head"><div class="mod-head-img" style="background-image:url(\'assets/closing.jpg\')">' +
      '<div class="t"><div class="n">Course completion</div><h1>Your certificate</h1></div></div>' +
      '<div class="mod-head-body"><p class="lede" style="margin:0">Canvas-drawn and downloadable as a PNG. Your answer export compiles every reflection and activity result into a single PDF.</p></div></div>'));

    var card = el('<div class="card"><p class="eyebrow">Requirements</p>' +
      '<h3 style="margin-bottom:4px">' + (ready ? 'Everything is complete' : 'Not quite there yet') + '</h3>' +
      '<ul class="cert-req">' + reqs.map(function (r) {
        return '<li class="' + (r.ok ? 'ok' : '') + '">' + esc(r.txt) +
          (r.ok ? '' : ' — <a href="' + r.fix + '">go there</a>') + '</li>';
      }).join('') + '</ul></div>');
    host.appendChild(card);

    if (!ready) {
      host.appendChild(el('<div class="card"><p class="eyebrow">Answer export</p>' +
        '<h3>Download a PDF of my answers</h3>' +
        '<p class="muted tiny">Available at any time — it compiles every reflection you have written and every activity result so far.</p>' +
        '<div class="btn-row"><button class="btn sec" id="pdfbtn">Download PDF of my answers</button>' +
        '<span class="savehint" id="pdfhint"></span></div></div>'));
      Export.wire(document.getElementById('pdfbtn'), document.getElementById('pdfhint'));
      return;
    }

    var info = {
      eyebrow: DATA.audience,
      audience: DATA.audience,
      title: DATA.title,
      name: p.name,
      role: p.role || '',
      time: Store.fmtTime(Store.elapsed()),
      score: kc.pct + '%',
      acts: a.done + ' of ' + a.total,
      date: new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
    };

    var wrap = el('<div class="card"><p class="eyebrow">Preview</p>' +
      '<canvas class="certcanvas" id="cert" role="img" aria-label="Certificate of completion for ' + esc(p.name) + '"></canvas>' +
      '<div class="btn-row"><button class="btn" id="dlpng">Download certificate (PNG)</button>' +
      '<button class="btn sec" id="pdfbtn">Download PDF of my answers</button>' +
      '<span class="savehint" id="pdfhint"></span></div></div>');
    host.appendChild(wrap);

    var cv = document.getElementById('cert');
    function paint() { draw(cv, info); }

    if (global.document.fonts && document.fonts.load) {
      Promise.all([
        document.fonts.load('700 96px "Proxima Nova"'),
        document.fonts.load('600 30px "Proxima Nova"'),
        document.fonts.load('400 32px "Proxima Nova"')
      ]).then(paint).catch(paint);
    } else paint();
    paint();

    document.getElementById('dlpng').addEventListener('click', function () {
      paint();
      var a2 = document.createElement('a');
      a2.download = (info.name.replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-') || 'certificate') +
        '-Certificate.png';
      a2.href = cv.toDataURL('image/png');
      document.body.appendChild(a2); a2.click(); document.body.removeChild(a2);
      App.toast('Certificate downloaded');
    });

    Export.wire(document.getElementById('pdfbtn'), document.getElementById('pdfhint'));
  }

  global.Certificate = { render: render, draw: draw };
})(window);
