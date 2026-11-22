<script>
	import Icone from './Icone.svelte';

	/** Painel que sobe de baixo (celular) ou vira diálogo centrado (tela larga).
	 *  <Folha bind:aberta titulo="Livro" itens={[{ rotulo: 'Editar', icone: 'edit', aoClicar: editar }, { rotulo: 'Excluir', perigo: true, aoClicar: apagar }]} />
	 *  Com `children`, o conteúdo livre (formulário curto) entra antes dos itens. `cancelar={false}` omite o último botão.
	 *  Item com `href` vira link; item com `manterAberta` só fecha se aoClicar não devolver false. */
	let { aberta = $bindable(false), titulo, itens = [], cancelar = 'Cancelar', children } = $props();
	const id = 'ro-folha-' + Math.random().toString(36).slice(2, 8);
	let dialogo;

	$effect(() => {
		if (aberta && !dialogo.open) dialogo.showModal();
		else if (!aberta && dialogo.open) dialogo.close();
	});
	const fechar = () => (aberta = false);
	const clicar = async (it) => {
		if (it.manterAberta) {
			if ((await it.aoClicar?.()) !== false) fechar();
			return;
		}
		fechar();
		await it.aoClicar?.();
	};
</script>

<dialog
	bind:this={dialogo}
	class="ro-folha"
	aria-labelledby={titulo ? id : undefined}
	aria-label={titulo ? undefined : 'opções'}
	onclose={() => (aberta = false)}
	onclick={(e) => e.target === dialogo && fechar()}
>
	<div class="ro-folha__conteudo">
		{#if titulo}<div class="ro-folha__topo"><h2 {id} class="ro-folha__titulo">{titulo}</h2></div>{/if}
		{@render children?.()}
		{#each itens as it (it.rotulo)}
			{#if it.href}
				<a class="ro-folha__item" class:ro-folha__item--perigo={it.perigo} href={it.href} target="_blank" rel="noopener noreferrer" onclick={fechar}>
					{#if it.icone}<Icone nome={it.icone} tamanho={20} />{/if}{it.rotulo}
				</a>
			{:else}
				<button type="button" class="ro-folha__item" class:ro-folha__item--perigo={it.perigo} onclick={() => clicar(it)}>
					{#if it.icone}<Icone nome={it.icone} tamanho={20} />{/if}{it.rotulo}
				</button>
			{/if}
		{/each}
		{#if cancelar}<button type="button" class="ro-folha__item ro-folha__item--cancelar" onclick={fechar}>{cancelar}</button>{/if}
	</div>
</dialog>
