<script>
	import { icone } from '../dist/icones.js';

	/** Ícone do Rochedo pelo nome (veja docs/icones). Decorativo: o texto vizinho ou o aria-label do botão é quem fala. */
	let { nome, tamanho = 22 } = $props();
	let alvo;
	$effect(() => {
		alvo.replaceChildren(icone(nome, tamanho));
	});
</script>

<span bind:this={alvo} style="display: contents"></span>
