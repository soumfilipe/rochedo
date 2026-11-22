<script>
	/** Liga/desliga algo que vale na hora (sem botão "salvar").
	 *  <Interruptor bind:marcado={notificar} rotulo="notificações" />
	 *  Sem `rotulo` visível, passe `nome` (aria-label). Com `children`, o texto vai ao lado e o toque vale para a linha toda. */
	let { marcado = $bindable(false), rotulo, nome, desabilitado = false, aoMudar, children } = $props();
	const alternar = () => {
		marcado = !marcado;
		aoMudar?.(marcado);
	};
</script>

<label class="ro-linha ro-interruptor-linha" style="cursor: pointer">
	<span class="ro-linha__corpo">{#if children}{@render children()}{:else}{rotulo}{/if}</span>
	<button
		type="button"
		class="ro-interruptor"
		role="switch"
		aria-checked={marcado}
		aria-label={nome ?? rotulo}
		disabled={desabilitado}
		onclick={alternar}
	></button>
</label>
