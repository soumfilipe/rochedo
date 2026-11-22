/** Confirmação de ação destrutiva em dois toques, sem janela. O primeiro toque troca o rótulo do botão;
 *  o segundo (em até `tempo` ms) executa; passado o prazo, o botão volta ao normal.
 *  confirmar(botao, () => apagar(id));
 *  confirmar(botao, apagar, { rotulo: 'toque de novo para apagar', tempo: 4000 });
 *  Devolve uma função que desliga o comportamento. */
export function confirmar(botao, aoConfirmar, { rotulo = 'toque de novo para confirmar', tempo = 4000 } = {}) {
  let original = null;
  let timer;
  const reverter = () => {
    clearTimeout(timer);
    if (original === null) return;
    botao.textContent = original;
    botao.removeAttribute('data-confirmando');
    botao.removeAttribute('aria-live');
    original = null;
  };
  const aoClicar = (e) => {
    if (original === null) {
      e.preventDefault();
      e.stopImmediatePropagation();
      original = botao.textContent;
      botao.textContent = rotulo;
      botao.setAttribute('data-confirmando', '');
      botao.setAttribute('aria-live', 'polite');
      timer = setTimeout(reverter, tempo);
      return;
    }
    reverter();
    aoConfirmar(e);
  };
  botao.addEventListener('click', aoClicar);
  botao.addEventListener('blur', reverter);
  return () => { reverter(); botao.removeEventListener('click', aoClicar); botao.removeEventListener('blur', reverter); };
}
