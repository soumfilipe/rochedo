/** Mostra um aviso rápido. Devolve uma função que o fecha.
 *  aviso('Nota salva');
 *  aviso('Nota apagada', { acao: { rotulo: 'desfazer', aoClicar: restaurar } });
 *  aviso('Falhou', { tipo: 'erro' });        // role=alert, fica 6 s
 *  Opções: tipo ('info' | 'erro'), duracao (ms; 0 = fica até fechar), acao ({ rotulo, aoClicar }). */
export function aviso(texto, { tipo = 'info', duracao, acao } = {}) {
  let pilha = document.querySelector('.ro-avisos');
  if (!pilha) {
    pilha = document.createElement('div');
    pilha.className = 'ro-avisos';
    document.body.append(pilha);
  }
  const el = document.createElement('div');
  el.className = 'ro-aviso' + (tipo === 'erro' ? ' ro-aviso--erro' : '');
  el.setAttribute('role', tipo === 'erro' ? 'alert' : 'status');
  const t = document.createElement('span');
  t.className = 'ro-aviso__texto';
  t.textContent = texto;
  el.append(t);

  let timer;
  const fechar = () => {
    clearTimeout(timer);
    if (!el.isConnected) return;
    el.classList.add('ro-aviso--saindo');
    setTimeout(() => el.remove(), 160);
  };
  if (acao) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'ro-aviso__acao';
    b.textContent = acao.rotulo;
    b.addEventListener('click', () => { fechar(); acao.aoClicar?.(); });
    el.append(b);
  }
  // só um aviso por vez: o novo substitui o anterior
  pilha.replaceChildren(el);
  const ms = duracao ?? (acao || tipo === 'erro' ? 6000 : 3500);
  if (ms > 0) timer = setTimeout(fechar, ms);
  return fechar;
}
