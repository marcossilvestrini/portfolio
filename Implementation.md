# Portfolio

Plano de migração opara astro

## Visão Geral da Arquitetura Completa

portfolio/
├── .github/
│   └── workflows/
│       ├── deploy.yml            # Build e Deploy automático no GitHub Pages
│       └── generate-pdf.yml      # Gera o right-resume.pdf automaticamente após o deploy
├── src/
│   ├── content/                  # COLEÇÕES DE DADOS (Markdown / JSON separados)
│   │   ├── config.ts             # Validação dos tipos de dados
│   │   ├── experiencias/         # Arquivos individuais por experiência profissional
│   │   │   ├── 01-cloud-sre.json
│   │   │   ├── 02-analista-infra-2.json
│   │   │   └── 03-analista-infra-1.json
│   │   ├── habilidades/          # Separadas por domínio técnico
│   │   │   ├── plataforma.json
│   │   │   ├── devops.json
│   │   │   ├── observabilidade.json
│   │   │   └── infraestrutura.json
│   │   └── certificacoes/
│   │       └── certificacoes.json
│   │
│   ├── components/               # COMPONENTES ISOLADOS (HTML5 + CSS + JS)
│   │   ├── Header.astro          # Hero, foto, bio e botões de ação
│   │   ├── ProfileSelector.astro # Tabs para filtrar (Plataforma, DevOps, Infra)
│   │   ├── TimelineCard.astro    # Componente de card de experiência
│   │   ├── SkillBadge.astro      # Badges de competências com nível
│   │   ├── ContactForm.astro     # Formulário de contato (Integração Formspree/Slack)
│   │   └── Footer.astro          # Rodapé
│   │
│   ├── layouts/
│   │   └── Layout.astro          # Shell HTML5 principal (SEO, Meta tags, Fontes)
│   │
│   ├── pages/                    # ROTAS / VISÕES DEDICADAS
│   │   ├── index.astro           # Home / Visão Geral (URL: /)
│   │   ├── plataforma.astro      # Visão Engenharia de Plataforma (URL: /plataforma)
│   │   ├── devops.astro          # Visão DevOps & SRE (URL: /devops)
│   │   └── infraestrutura.astro  # Visão Infraestrutura (URL: /infraestrutura)
│   │
├── public/                       # Arquivos estáticos servidos diretamente
│   ├── css/
│   │   ├── site.css              # Estilos principais
│   │   └── print.css             # Estilos para impressão
│   ├── scripts/
│   │   └── profileFilter.js      # Lógica JS para alternar perfis na home
│
│   ├── favicon.ico
│   ├── right-resume.pdf          # PDF gerado automaticamente pela Action
│   └── images/                   # Imagens e foto de perfil
│
├── astro.config.mjs              # Configuração do Astro (base URL do GitHub Pages)
├── package.json                  # Dependências do projeto
└── tsconfig.json

## Integrações Mantidas e Aprimoradas

### A. Formulário de Contato & Envio de Mensagens (Formspree / Slack)

- Mantemos a sua integração do __Formspree__ (`https://formspree.io/f/xpzekgve`), que já envia e-mails e suporta webhooks diretos para o __Slack__.
- O componente `ContactForm.astro` terá validação HTML5/JS moderna, UX amigável com indicador de carregamento e mensagem de sucesso/erro sem redirecionar a página.

### B. Automação de Geração de PDF (`right-resume.pdf`)

- Atualizaremos a GitHub Action `.github/workflows/generate-pdf.yml`.
- Quando você atualizar qualquer dado no repositório, o GitHub constrói a página, renderiza em background via Headless Chrome e atualiza o arquivo `public/right-resume.pdf` no repositório automaticamente.

### C. Deploy Contínuo no GitHub Pages

- Utilizaremos a Action oficial `withastro/action` para realizar o build e publicar no seu domínio `marcossilvestrini.github.io` sem custos.

---

## Como Fica a Separação do CSS e JavaScript?

1. __CSS Modularizado:__
   - Cada componente em `.astro` possui sua tag `<style>` própria. Os estilos descritos dentro de um componente não afetam os outros componentes (__Scoped CSS__).
   - Arquivos CSS globais como `site.css` e `print.css` ficam na pasta `public/css` e são referenciados diretamente no `<head>` do layout principal.

2. __JavaScript Leve no Navegador:__
   - O Astro gera HTML estático e envia __zero JavaScript__ por padrão.
   - Usaremos um pequeno script (`public/scripts/profileFilter.js`) para gerenciar as abas e os filtros de perfil instantaneamente na página inicial, sem recarregar a página.

---

## Plano de Execução (Fases de Implementação)

Se estiver tudo alinhado, quando migrar para o modo __Act__, o trabalho será executado na seguinte ordem:

1. __Estruturação da Aplicação Astro:__ Inicializar o projeto e criar as pastas de coleções.
2. __Migração dos Dados (HTML → JSONs Modulares):__
   - Extrair e organizar suas experiências e certificações do `index.html` em arquivos de dados organizados por temas.
3. __Criação dos Componentes e Filtro de Perfil:__
   - Desenvolver os componentes visuais responsivos (Layout, Header, Tabs, Timeline, Skills e Form).
4. __Configuração das GitHub Actions:__
   - Criar os workflows de Build/Deploy no GitHub Pages e o gerador de PDF automatizado.
5. __Validação Final:__
   - Testar navegação, responsividade em dispositivos móveis, envio do formulário de contato e formatação de impressão PDF.
