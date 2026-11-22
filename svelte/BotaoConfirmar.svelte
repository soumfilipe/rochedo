<script>
	import { confirmar } from '../dist/confirmar.js';

	/** Ação destrutiva em dois toques, sem janela: o primeiro troca o rótulo, o segundo (em até `tempo` ms) executa.
	 *  <BotaoConfirmar aoConfirmar={apagar} classe="ro-botao ro-botao--perigo">apagar</BotaoConfirmar> */
	let { aoConfirmar, rotulo = 'toque de novo para confirmar', tempo = 4000, classe = 'ro-botao ro-botao--perigo', desabilitado = false, children } = $props();
	let botao;
	$effect(() => confirmar(botao, (e) => aoConfirmar?.(e), { rotulo, tempo }));
</script>

<button bind:this={botao} type="button" class={classe} disabled={desabilitado}>{@render children?.()}</button>
