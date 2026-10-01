# Estrutura do projeto

O site é um projeto Astro de geração estática. Dados JSON são validados em build pelas coleções de conteúdo; os componentes `.astro` produzem HTML sem hidratação JavaScript por padrão.

```text
src/
├── components/        # Cabeçalho, navegação, cards, formulário e rodapé
├── content/
│   ├── config.ts      # Schemas das coleções Astro
│   ├── perfil/        # Perfil pessoal
│   ├── sobre/         # Textos da seção “Sobre mim”
│   ├── experiencias/  # Histórico profissional
│   ├── habilidades/   # Categorias e competências
│   └── certificacoes/ # Formação e certificados
├── layouts/           # Documento HTML e recursos compartilhados
├── pages/             # index, infraestrutura, devops e plataforma
└── utils/             # Funções compartilhadas, como sortSkills

public/
├── css/               # Estilos de tela e impressão
├── images/            # Imagens estáticas do site
└── favicon.ico

scripts/               # Ferramentas de build, incluindo geração de PDF
slack/                 # Scripts Python auxiliares, independentes do site
dist/                  # Artefato gerado por `npm run build`
```

## Rotas

| Arquivo                          | Caminho publicado            |
| -------------------------------- | ---------------------------- |
| `src/pages/index.astro`          | `/portfolio/`                |
| `src/pages/infraestrutura.astro` | `/portfolio/infraestrutura/` |
| `src/pages/devops.astro`         | `/portfolio/devops/`         |
| `src/pages/plataforma.astro`     | `/portfolio/plataforma/`     |

## Conteúdo

O Astro carrega automaticamente os arquivos JSON dentro das coleções definidas em `src/content/config.ts`. O arquivo `perfil/marcos.json` fornece identidade, contato e o resumo curto do cabeçalho. Já `sobre/marcos.json` fornece os cartões da seção “Sobre mim”. São entradas separadas para que editar uma não altere a outra. Experiências, habilidades e certificações são carregadas pelas respectivas páginas com `getCollection()`.

Para atualizar o site durante a edição, rode `npm run dev`. `npm run preview` serve apenas o último conteúdo compilado em `dist/`.

## Considerações Finais

Este projeto foi estruturado para ser fácil de manter e atualizar. A separação entre dados e apresentação permite que qualquer pessoa possa atualizar o conteúdo sem precisar entender o código complexo.

O uso do Astro proporciona uma experiência de desenvolvimento rápida com geração de sites estáticos otimizados, ideal para currículos profissionais que precisam ser rápidos e acessíveis.
