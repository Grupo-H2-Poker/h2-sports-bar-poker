# Contribuindo para o H2 Club

Obrigado por contribuir. Este guia cobre setup, padrão de código e o fluxo de Pull Request.

## Código de conduta

Seja respeitoso em issues, reviews e PRs. Foque no problema e na solução — feedback técnico, sem ataques pessoais.

## Como contribuir

### Reportar bugs

Abra uma issue com:

- Passos para reproduzir
- Comportamento esperado vs. atual
- Browser / Node / SO
- Screenshots ou stack trace, se houver

### Sugerir features

Descreva o problema que a feature resolve, o público (jogador, marketing, ops) e, se possível, um esboço de API/JSON do módulo CMS.

### Pull Requests

1. Fork o repositório
2. Crie uma branch a partir de `main`:

   ```bash
   git checkout -b feat/nome-curto
   # ou fix/…, chore/…, docs/…
   ```

3. Instale e rode:

   ```bash
   npm install
   npm run dev
   ```

4. Faça commits pequenos e legíveis
5. Abra o PR com contexto: o *porquê*, screenshots de UI e checklist

## Setup local

```bash
git clone https://github.com/pedro-ruffo/h2-sports-bar-poker.git
cd h2-sports-bar-poker
npm install
cp .env.example .env   # preencha as URLs das APIs
npm run dev
```

Variáveis: ver [`.env.example`](./.env.example) e a seção no [README](./README.md#-variáveis-de-ambiente).

Sem `.env`, o conteúdo CMS via mock continua disponível.

## Padrões do projeto

### Módulos CMS

Todo `*Module.vue` recebe **apenas** `modulo`. Use:

```ts
const { ctaConfig, items } = useModuloComponents(() => props.modulo)
```

Checklist para módulo novo:

1. Types em `app/types/modules.ts`
2. Componente + composable quando fizer sentido
3. Registro em `ModuleRenderer.vue`
4. Mock em `server/api/mock/`

Mais detalhes: `.cursor/rules/modules-system.mdc`.

### UI e estilo

- Reutilize componentes em `app/components/ui` e padrões Nuxt UI
- Preserve a linguagem visual existente (não reinventar o design system)
- Mobile-first; valide em viewport estreita
- Prefira Tailwind utilitário já usado no projeto

### TypeScript

- Tipagem estrita nos contratos CMS (`ModuloOf<'tipo'>`, maps em `modules.ts`)
- Evite `any`; prefira tipos do domínio em `app/types/`

### i18n

Textos de UI devem ir para `i18n/locales/` (pelo menos `pt.json`). Se o CMS tiver copy multilíngue, rode:

```bash
npx tsx scripts/audit-cms-i18n-gaps.ts
```

### Commits

Use prefixos claros:

| Prefixo | Uso |
|---|---|
| `feat:` | Nova funcionalidade |
| `fix:` | Correção |
| `refactor:` | Mudança sem alterar comportamento |
| `docs:` | README, CONTRIBUTING, comentários |
| `chore:` | Tooling, deps, configs |
| `style:` | Formatação / CSS sem lógica |

Exemplos:

```text
feat: adiciona módulo faixa_cta na home CPH
fix: corrige bleed do galeria_preview no mobile
docs: atualiza quick start do README
```

## Checklist do PR

- [ ] Branch atualizada com `main`
- [ ] `npm run build` conclui sem erro
- [ ] Sem `.env`, secrets ou arquivos gerados (`.nuxt`, `.output`)
- [ ] Módulos novos tipados + mock + `ModuleRenderer`
- [ ] i18n atualizado quando houver strings novas
- [ ] Descrição do PR explica o *porquê* (não só o *o quê*)
- [ ] Screenshots / GIFs para mudanças de UI

## Review

Mantenedores revisam:

- Adequação ao sistema de módulos
- Regressões de layout / a11y
- Tipagem e nomes consistentes
- Escopo do PR (preferir PRs focados)

## Dúvidas

Abra uma issue com a tag `question` ou comente no PR em andamento.

Obrigado por ajudar a melhorar o H2 Club.
