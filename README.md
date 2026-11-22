# Rochedo

Design system de Filipe Costa, usado pelo [Paquiderme](https://github.com/soumfilipe/paquiderme) e pelo [Life OS](https://github.com/soumfilipe/Sdv). CSS puro: não depende de framework.

Documentação ao vivo: `docs/index.html` (publicada no GitHub Pages, em `/docs/`).

## O que tem

| Peça | Arquivo | Conteúdo |
| --- | --- | --- |
| Variáveis | `dist/tokens.css` | cores (escuro e claro), tipografia, raios, alvo de toque (44 px), movimento |
| Fontes | `dist/fontes.css` + `dist/fontes/` | Bricolage Grotesque e JetBrains Mono (OFL), servidas localmente |
| Aviso (JS) | `dist/aviso.js` | `aviso(texto, { tipo, duracao, acao })` |
| Confirmar (JS) | `dist/confirmar.js` | `confirmar(botao, aoConfirmar, { rotulo, tempo })`: dois toques |
| Folha (JS) | `dist/folha.js` + `folha.css` | `abrirFolha({ titulo, itens, conteudo })`: menu de ações ou formulário curto |
| Faixa | `faixa.css` | `.ro-faixa` (`--erro`): mensagem fixa até o problema passar, com ação opcional |
| Ícones | `dist/icones.js` | Hugeicons (versão gratuita, MIT): `icone(nome, tamanho)` devolve um `<svg>` |
| Componentes | `dist/rochedo.css` | tudo junto (fontes + variáveis + componentes). Hoje: **abas**, **linha de lista**, **chips de filtro**, **selo**, **botões**, **campos**, **interruptor**, **aviso rápido**, **estados** (vazio/erro/carregando) e **ação destrutiva** |

Todo nome começa com `ro-` (`--ro-acento`, `.ro-abas`), para não colidir com o CSS do projeto.

## Como usar

**Sem build** (ex.: Paquiderme): copie `dist/` para o projeto, na versão escolhida, e ligue `rochedo.css`. Fica no repositório do projeto, então funciona offline.

**Com build** (ex.: Life OS):

```sh
npm i github:soumfilipe/rochedo#v0.9.0
```

```js
import 'rochedo';                              // tudo
import { icone } from 'rochedo/icones.js';     // ícones
```

**Tema:** automático pela preferência do sistema. Para forçar: `<html data-tema="claro">` ou `<html data-tema="escuro">`.

## Versões

Cada mudança sai com tag semântica (`v0.2.0`). Projetos fixam a versão e só atualizam quando quiserem.

- **patch**: correção que não muda o visual esperado.
- **minor**: componente ou variável nova.
- **major**: renomear ou remover variável, classe ou ícone.

## Como mexer

1. Edite `src/` (`tokens.css`, `fontes.css`, `componentes/*.css`, `icones.js`).
2. `npm run build` gera `dist/`. **`dist/` é versionado** (os projetos instalam direto do GitHub), e o CI falha se estiver defasado (`npm run check`).
3. Atualize a página em `docs/` com um exemplo e a regra de uso do que mudou.
4. Mude a versão em `package.json` e crie a tag.

## Regras de componente

- Alvos de toque com no mínimo 44 px; itens dentro de um trilho podem ter 36 px se o trilho somar 44 px.
- Rótulos, handles e horários em `--ro-fonte-mono`; títulos e texto em `--ro-fonte-titulo`.
- Cor só por variável. Nada de valor fixo dentro de componente.
- Estados pela semântica (`aria-current`, `aria-selected`, `aria-pressed`), não por classe, para o CSS e a acessibilidade andarem juntos.

## Próximos componentes

Faixa de aviso, seletor.

## Licenças

Bricolage Grotesque e JetBrains Mono: SIL OFL (`dist/fontes/LICENSE-*.txt`). Hugeicons gratuito: MIT.
