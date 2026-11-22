import { icone } from './icones.js';

/** Abre uma folha (painel de baixo). Devolve { fechar }.
 *  abrirFolha({
 *    titulo: 'Publicação de @ana',
 *    itens: [
 *      { rotulo: 'Copiar link', icone: 'link', aoClicar: copiar },
 *      { rotulo: 'Abrir original', icone: 'external', href: url },
 *      { rotulo: 'Excluir', icone: 'trash', perigo: true, aoClicar: apagar },
 *    ],
 *    conteudo: nodeOpcional,        // formulário curto, antes dos itens
 *    cancelar: 'Cancelar',          // rótulo do último botão; false para omitir
 *  });
 *  Item com `manterAberta: true`: a folha só fecha se aoClicar não devolver false. */
export function abrirFolha({ titulo, itens = [], conteudo, cancelar = 'Cancelar' } = {}) {
  const d = document.createElement('dialog');
  d.className = 'ro-folha';
  const id = 'ro-folha-' + Math.random().toString(36).slice(2, 8);
  if (titulo) d.setAttribute('aria-labelledby', id); else d.setAttribute('aria-label', 'opções');

  const caixa = document.createElement('div');
  caixa.className = 'ro-folha__conteudo';
  if (titulo) {
    const topo = document.createElement('div');
    topo.className = 'ro-folha__topo';
    const h = document.createElement('h2');
    h.id = id; h.className = 'ro-folha__titulo'; h.textContent = titulo;
    topo.append(h);
    caixa.append(topo);
  }
  if (conteudo) caixa.append(conteudo);

  const fechar = () => { if (d.open) d.close(); };
  for (const it of itens) {
    const el = document.createElement(it.href ? 'a' : 'button');
    el.className = 'ro-folha__item' + (it.perigo ? ' ro-folha__item--perigo' : '');
    if (it.href) { el.href = it.href; el.target = '_blank'; el.rel = 'noopener noreferrer'; el.addEventListener('click', fechar); }
    else {
      el.type = 'button';
      el.addEventListener('click', async () => {
        if (it.manterAberta) { if ((await it.aoClicar?.()) !== false) fechar(); return; }
        fechar();
        await it.aoClicar?.();
      });
    }
    if (it.icone) el.append(icone(it.icone, 20));
    el.append(document.createTextNode(it.rotulo));
    caixa.append(el);
  }
  if (cancelar) {
    const c = document.createElement('button');
    c.type = 'button'; c.className = 'ro-folha__item ro-folha__item--cancelar'; c.textContent = cancelar;
    c.addEventListener('click', fechar);
    caixa.append(c);
  }
  d.append(caixa);
  // toque no fundo (fora da caixa) fecha
  d.addEventListener('click', (e) => { if (e.target === d) fechar(); });
  d.addEventListener('close', () => d.remove());
  document.body.append(d);
  d.showModal();
  return { fechar };
}
