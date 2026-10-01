# Implementação atual

Este documento registra o estado existente do portfólio Astro; não é um plano de migração.

## Site

- Astro gera páginas estáticas para `/portfolio/`, `/portfolio/infraestrutura/`, `/portfolio/devops/` e `/portfolio/plataforma/`.
- As coleções de perfil, textos “Sobre mim”, experiências, habilidades e certificações são JSON validados em build por `src/content/config.ts`.
- `src/content/perfil/marcos.json` guarda identidade, contato e o resumo do cabeçalho; `src/content/sobre/marcos.json` guarda os textos independentes da seção “Sobre mim”.
- Os dados ficam em `src/content/`; componentes e páginas são `.astro` dentro de `src/`.
- O CSS global de tela e impressão fica em `public/css/`.
- O formulário de contato envia para Formspree.

## Desenvolvimento e validação

1. Instale dependências com `npm ci`.
2. Edite os JSONs em `src/content/` e rode `npm run dev` para ver atualizações imediatas.
3. Rode `npm run check`, `npm run test:run` e `npm run build` antes de publicar.
4. Use `npm run preview` para inspecionar o build pronto. O preview não observa a fonte: gere outro build após editar conteúdo.

## PDF

`scripts/generatePdf.js` usa Puppeteer. O workflow gera o PDF em `dist/resume.pdf` antes de enviar `dist/` ao Pages; a geração não grava o arquivo no Git.

## Deploy

`.github/workflows/deploy.yml` publica no GitHub Pages após push para `main` ou por execução manual. A configuração Astro usa o caminho base `/portfolio/`.

## Ferramentas auxiliares

`slack/` contém scripts Python separados do site Astro. `vagrant/` contém uma configuração opcional de ambiente de desenvolvimento virtualizado.
