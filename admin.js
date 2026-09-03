const API_BASE = window.BLIN_API_BASE || '';
async function api(path, options={}) { const r=await fetch(`${API_BASE}${path}`, {credentials:'include', ...options, headers:{'Content-Type':'application/json', ...(options.headers||{})}}); if(!r.ok) throw new Error(await r.text()); return r.status===204?null:r.json(); }
async function initAdmin(){
  const state=document.querySelector('#admin-state'), content=document.querySelector('#admin-content');
  try {
    const me=await api('/auth/me');
    if(!me || !me.authenticated){ location.href=`${API_BASE}/auth/discord`; return; }
    if(!me.is_admin){ state.innerHTML='<h3>Доступ запрещён</h3><p>Этот Discord-аккаунт не является администратором Blin.</p>'; return; }
    state.innerHTML='<h3>Доступ разрешён</h3><p>Администратор: '+String(me.username||'Discord')+'</p>';
    content.style.display='block';
    try { const health=await api('/health'); document.querySelector('#api-health').textContent=health.ok?'API работает':'API вернул ошибку'; } catch(e){ document.querySelector('#api-health').textContent='API недоступен'; }
    document.querySelector('#system-info').textContent='Discord OAuth2 · Dashboard API · база данных';
  } catch(e){ state.innerHTML='<h3>Не удалось проверить доступ</h3><p>Проверьте подключение к Blin API.</p>'; }
}
document.querySelector('#logout')?.addEventListener('click',()=>{ location.href=`${API_BASE}/auth/logout`; });
document.addEventListener('DOMContentLoaded',initAdmin);
