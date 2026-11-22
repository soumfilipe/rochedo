// Junta src/ em dist/: rochedo.css (fontes + tokens + componentes), peças avulsas, fontes e ícones.
import { cpSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const raiz = new URL('..', import.meta.url).pathname;
const src = join(raiz, 'src');
const dist = join(raiz, 'dist');

rmSync(dist, { recursive: true, force: true });
mkdirSync(join(dist, 'fontes'), { recursive: true });

const ler = (...p) => readFileSync(join(src, ...p), 'utf8');
const componentes = readdirSync(join(src, 'componentes')).filter((f) => f.endsWith('.css')).sort();

const versao = JSON.parse(readFileSync(join(raiz, 'package.json'), 'utf8')).version;
const cab = `/* Rochedo ${versao} — design system de Filipe Costa. Gerado por scripts/build.mjs: não edite. */\n`;

writeFileSync(join(dist, 'rochedo.css'), cab + [ler('fontes.css'), ler('tokens.css'), ...componentes.map((f) => ler('componentes', f))].join('\n'));
writeFileSync(join(dist, 'tokens.css'), cab + ler('tokens.css'));
writeFileSync(join(dist, 'fontes.css'), cab + ler('fontes.css'));
cpSync(join(src, 'fontes'), join(dist, 'fontes'), { recursive: true });
cpSync(join(src, 'icones.js'), join(dist, 'icones.js'));
console.log(`rochedo ${versao}: dist/ gerado (${componentes.length} componente(s)).`);
