# Portfólio — Marcos Silvestrini

Currículo profissional estático construído com Astro. As páginas e os dados são gerados durante o build; não há backend para renderização em produção.

## Requisitos

- Node.js 22 ou superior
- npm

## Desenvolvimento

```sh
npm ci
npm run dev
```

O servidor Astro exibe o endereço local no terminal e recarrega a página quando arquivos de conteúdo ou componentes são alterados. Para testar o artefato de produção, execute `npm run build` e depois `npm run preview`.

## Comandos

| Comando            | Função                                                                   |
| ------------------ | ------------------------------------------------------------------------ |
| `npm run dev`      | Inicia o servidor de desenvolvimento com atualização automática          |
| `npm run check`    | Verifica tipos e componentes Astro                                       |
| `npm run build`    | Gera o site estático em `dist/`                                          |
| `npm run preview`  | Serve o build de `dist/`; não observa mudanças nos arquivos fonte        |
| `npm run test:run` | Executa os testes Vitest                                                 |
| `npm run pdf`      | Gera um PDF com Puppeteer; aceita `URL` e `OUT` por variável de ambiente |

## Atualizar o currículo

- Perfil: `src/content/perfil/marcos.json`
- Textos da seção “Sobre mim”: `src/content/sobre/marcos.json`
- Experiências: `src/content/experiencias/`
- Habilidades: `src/content/habilidades/`
- Formação e certificações: `src/content/certificacoes/`

O campo `resumo` em `perfil/marcos.json` alimenta apenas o texto do cabeçalho. Os cartões da seção “Sobre mim” vêm de `sobre/marcos.json`, então as alterações nesse arquivo não mudam o cabeçalho. As coleções e seus schemas estão em `src/content/config.ts`. Após editar JSON, use `npm run dev` para ver as alterações imediatamente; no preview é necessário gerar um novo build.

## Estrutura

- `src/pages/`: visão geral e visões de Infraestrutura, DevOps & SRE e Plataforma.
- `src/components/`: componentes Astro reutilizados pelas páginas.
- `src/layouts/`: HTML base, metadados e folhas de estilo.
- `src/utils/`: funções compartilhadas, como a ordenação das habilidades.
- `public/`: CSS, favicon e imagem copiados para o build.
- `scripts/generatePdf.js`: geração do currículo em PDF.
- `slack/`: utilitários Python independentes do site Astro.
- `dist/`: saída gerada; não edite manualmente.

## Publicação

O workflow `.github/workflows/deploy.yml` compila e publica no GitHub Pages quando há push para `main` ou execução manual. O projeto usa o caminho base `/portfolio/`.
