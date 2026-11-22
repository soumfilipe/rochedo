// Compila cada componente de svelte/ para pegar erro de sintaxe e avisos de acessibilidade antes do release.
import { readdirSync, readFileSync } from 'node:fs';
import { compile } from 'svelte/compiler';

let falhou = false;
for (const f of readdirSync(new URL('../svelte/', import.meta.url)).filter((x) => x.endsWith('.svelte'))) {
  const { warnings } = compile(readFileSync(new URL(`../svelte/${f}`, import.meta.url), 'utf8'), { filename: f, generate: 'client' });
  for (const w of warnings) { falhou = true; console.error(`${f}: ${w.code}: ${w.message}`); }
}
if (falhou) process.exit(1);
console.log('svelte/: componentes compilam sem avisos.');
