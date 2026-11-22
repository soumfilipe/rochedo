<script>
	/** Navegação entre vistas irmãs da mesma tela, em trilho de pílula. Setas esquerda/direita trocam de aba.
	 *  <Abas itens={[{ id: 'notas', rotulo: 'notas' }, { id: 'ideias', rotulo: 'ideias', contagem: 3 }]} bind:valor={aba} nome="coleções" />
	 *  `cheia`: poucas abas dividem a largura toda. A aba atual é trazida para a vista se o trilho rolar. */
	let { itens, valor = $bindable(), nome = 'abas', cheia = false, aoMudar } = $props();
	let trilho;

	const escolher = (id) => {
		if (id === valor) return;
		valor = id;
		aoMudar?.(id);
	};
	const teclar = (e) => {
		const passo = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
		if (!passo) return;
		e.preventDefault();
		const i = itens.findIndex((x) => x.id === valor);
		const prox = itens[(i + passo + itens.length) % itens.length];
		escolher(prox.id);
		queueMicrotask(() => trilho.querySelector('[aria-selected="true"]')?.focus());
	};
	$effect(() => {
		valor;
		const atual = trilho?.querySelector('[aria-selected="true"]');
		if (atual) trilho.scrollLeft = atual.offsetLeft - (trilho.clientWidth - atual.clientWidth) / 2;
	});
</script>

<div bind:this={trilho} class="ro-abas" class:ro-abas--cheia={cheia} role="tablist" aria-label={nome}>
	{#each itens as item (item.id)}
		<button
			type="button"
			role="tab"
			aria-selected={item.id === valor}
			tabindex={item.id === valor ? 0 : -1}
			onclick={() => escolher(item.id)}
			onkeydown={teclar}
		>{item.rotulo}{#if item.contagem != null}<span class="ro-contagem">{item.contagem}</span>{/if}</button>
	{/each}
</div>
