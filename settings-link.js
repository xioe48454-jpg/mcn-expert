(() => {
  const root = document.documentElement;
  root.style.setProperty("--ink", "#3e252f");
  root.style.setProperty("--muted", "#84616f");
  root.style.setProperty("--line", "#f0d7df");
  root.style.setProperty("--paper", "#fff8fa");
  root.style.setProperty("--accent", "#c75d83");
  const style = document.createElement("style");
  style.textContent = `.settings-modal{position:fixed;inset:0;z-index:10;display:grid;place-items:center;padding:18px;background:#51273566}.settings-modal[hidden]{display:none}.settings-box{width:min(680px,100%);max-height:90vh;overflow:auto;background:#fff;border:1px solid #efd1dc;border-radius:20px;padding:25px;box-shadow:0 24px 70px #54223340}.settings-head{display:flex;align-items:start;justify-content:space-between;gap:16px}.settings-head h2{margin:0}.settings-close{border:0;background:#fff0f5;color:#9d355c;border-radius:9px;padding:8px 11px;font-size:18px;cursor:pointer}.settings-box p{color:#84616f;line-height:1.55;font-size:14px}.settings-box label{display:block;margin:18px 0 7px;color:#3e252f;font-weight:700;font-size:14px}.settings-box input,.settings-box textarea{width:100%;border:1px solid #efd1dc;border-radius:10px;padding:12px;font:inherit;resize:vertical}.settings-actions{display:flex;gap:10px;margin-top:18px}.settings-save,.settings-remove{border:0;border-radius:10px;padding:12px 15px;font:inherit;font-weight:700;cursor:pointer}.settings-save{background:#c75d83;color:#fff}.settings-remove{background:#fff0f5;color:#923657}.settings-state{margin-top:16px;padding:11px;border-radius:10px;background:#fff0f5;color:#923657;font-size:14px}.settings-state.ready{background:#fff1f5;color:#923657}`;
  document.head.append(style);
  const eyebrow = document.querySelector(".eyebrow");
  if (!eyebrow) return;
  const heading = document.querySelector("h1");
  if (heading) heading.textContent = "我是MCN专家";
  const link = document.createElement("a");
  link.href = "#settings";
  link.textContent = " · 连接设置";
  link.style.color = "#b44c73";
  link.style.textDecoration = "underline";
  eyebrow.append(link);
  const note = document.querySelector(".note");
  if (note) note.textContent = "在“连接设置”中导入 API Key、抖音和小红书 Cookie；它们只保存在当前浏览器。";
  const modal = document.createElement("section");
  modal.className = "settings-modal";
  modal.hidden = true;
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.innerHTML = `<div class="settings-box"><div class="settings-head"><div><h2>连接设置</h2><p>参照 SocialScript 的方式：凭据保存于本浏览器，分析时才随请求交给服务端。</p></div><button class="settings-close" aria-label="关闭">×</button></div><label for="ci-api">硅基流动 API Key</label><input id="ci-api" type="password" autocomplete="off" placeholder="sk-..."><label for="ci-xhs">小红书 Cookie</label><textarea id="ci-xhs" rows="3" placeholder="粘贴完整 Cookie 字符串或 Cookie Editor 导出的 JSON"></textarea><label for="ci-douyin">抖音 Cookie</label><textarea id="ci-douyin" rows="3" placeholder="粘贴完整 Cookie 字符串或 Cookie Editor 导出的 JSON"></textarea><div class="settings-actions"><button class="settings-save">保存</button><button class="settings-remove">删除全部凭据</button></div><div class="settings-state"></div></div>`;
  document.body.append(modal);
  const keys = { "ci-api":"ci.siliconflowApiKey", "ci-xhs":"ci.xhsCookie", "ci-douyin":"ci.douyinCookie" };
  const state = modal.querySelector(".settings-state");
  function refresh() {
    const filled = Object.entries(keys).filter(([, key]) => localStorage.getItem(key)).map(([id]) => id === "ci-api" ? "API Key" : id === "ci-xhs" ? "小红书 Cookie" : "抖音 Cookie");
    state.textContent = filled.length ? `已保存：${filled.join("、")}` : "尚未保存任何凭据";
    state.classList.toggle("ready", Boolean(filled.length));
  }
  function open() {
    for (const [id, key] of Object.entries(keys)) modal.querySelector(`#${id}`).value = localStorage.getItem(key) || "";
    refresh(); modal.hidden = false; modal.querySelector("#ci-api").focus();
  }
  function close() { modal.hidden = true; }
  link.onclick = event => { event.preventDefault(); open(); };
  modal.querySelector(".settings-close").onclick = close;
  modal.onclick = event => { if (event.target === modal) close(); };
  modal.querySelector(".settings-save").onclick = () => {
    for (const [id, key] of Object.entries(keys)) { const value = modal.querySelector(`#${id}`).value.trim(); if (value) localStorage.setItem(key, value); else localStorage.removeItem(key); }
    refresh();
  };
  modal.querySelector(".settings-remove").onclick = () => {
    if (confirm("删除此浏览器保存的全部 API Key 和 Cookie？")) { Object.values(keys).forEach(key => localStorage.removeItem(key)); for (const id of Object.keys(keys)) modal.querySelector(`#${id}`).value = ""; refresh(); }
  };
  document.addEventListener("keydown", event => { if (event.key === "Escape") close(); });
})();
