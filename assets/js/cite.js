// Copy a BibTeX entry to the clipboard. The <pre> stays selectable if this fails.
(function () {
  function label(done) {
    var zh = document.documentElement.dataset.lang === 'zh';
    if (done) return zh ? '已复制' : 'Copied';
    return zh ? '复制' : 'Copy';
  }

  function flash(btn) {
    btn.textContent = label(true);
    btn.dataset.copied = '1';
    setTimeout(function () {
      btn.textContent = label(false);
      delete btn.dataset.copied;
    }, 1500);
  }

  function legacyCopy(text) {
    try {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      var ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch (e) {
      return false;
    }
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.copybtn');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();

    var pre = btn.closest('details').querySelector('pre');
    if (!pre) return;
    var text = pre.textContent;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          flash(btn);
        }, function () {
          if (legacyCopy(text)) flash(btn);
        });
        return;
      }
    } catch (err) { /* fall through */ }

    if (legacyCopy(text)) flash(btn);
  });

  // Keep the button label in the current language.
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.langtoggle')) return;
    document.querySelectorAll('.copybtn').forEach(function (b) {
      if (!b.dataset.copied) b.textContent = label(false);
    });
  });

  document.querySelectorAll('.copybtn').forEach(function (b) {
    b.textContent = label(false);
  });
})();
