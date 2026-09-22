// Language toggle. Default is English; the choice is remembered per browser.
(function () {
  var KEY = 'aae-lang';
  var root = document.documentElement;

  function read() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function write(v) {
    try { localStorage.setItem(KEY, v); } catch (e) { /* private mode, blocked storage */ }
  }

  function apply(lang) {
    root.dataset.lang = lang;
    root.setAttribute('lang', lang === 'zh' ? 'zh-Hans' : 'en');
    var btn = document.querySelector('.langtoggle');
    if (btn) {
      btn.textContent = lang === 'zh' ? 'English' : '中文';
      btn.setAttribute('aria-label', lang === 'zh' ? 'Switch to English' : '切换到中文');
    }
  }

  var saved = read();
  apply(saved === 'zh' ? 'zh' : 'en');

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.langtoggle');
    if (!btn) return;
    var next = root.dataset.lang === 'zh' ? 'en' : 'zh';
    apply(next);
    write(next);
  });
})();
