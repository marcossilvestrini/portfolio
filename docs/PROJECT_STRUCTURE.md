# Documentação Completa do Projeto

## Visão Geral

Este projeto é um currículo profissional criado com Astro, um framework moderno para construção de sites estáticos. O projeto utiliza tecnologias como TypeScript, Tailwind CSS e componentes React para criar uma experiência de usuário rica e responsiva.

## Estrutura do Projeto

### Pasta `public`
- **Conteúdo**: Arquivos estáticos que são servidos diretamente pelo servidor
- **Uso**: Imagens, ícones, arquivos de configuração, etc.
- **Exemplo**: `favicon.ico`, imagens de perfil, arquivos PDF do currículo

### Pasta `src`
- **Conteúdo**: Código fonte principal do projeto
- **Estrutura**:
  - `components/`: Componentes reutilizáveis da interface
  - `layouts/`: Layouts padrão para as páginas
  - `pages/`: Páginas do site (com extensão .astro)
  - `styles/`: Arquivos de estilo CSS
  - `utils/`: Funções utilitárias e dados
  - `types/`: Definições de tipos TypeScript

### Pasta `src/components`
- **Conteúdo**: Componentes React reutilizáveis
- **Funcionalidade**:
  - `ComponenteBase.tsx`: Componente base para outros componentes
  - `CurriculumSection.tsx`: Seção de conteúdo do currículo
  - `ExperienceItem.tsx`: Item de experiência profissional
  - `ProjectItem.tsx`: Item de projeto realizado
  - `SkillItem.tsx`: Item de habilidade técnica

### Pasta `src/layouts`
- **Conteúdo**: Layouts padrão para as páginas do site
- **Funcionalidade**: Define a estrutura geral da página, incluindo cabeçalho, rodapé e navegação

### Pasta `src/pages`
- **Conteúdo**: Páginas do site (com extensão .astro)
- **Funcionalidade**: Cada arquivo representa uma página acessível pela URL
- **Exemplos**:
  - `index.astro`: Página principal do currículo
  - `404.astro`: Página de erro 404

### Pasta `src/styles`
- **Conteúdo**: Arquivos de estilo CSS
- **Funcionalidade**: Estilos globais e específicos para componentes

### Pasta `src/utils`
- **Conteúdo**: Funções utilitárias e dados do currículo
- **Funcionalidade**:
  - `curriculumData.ts`: Dados principais do currículo (experiência, projetos, habilidades)
  - Funções para processamento de dados

### Pasta `src/types`
- **Conteúdo**: Definições de tipos TypeScript
- **Funcionalidade**: Tipos utilizados em todo o projeto para garantir segurança de tipos

## Como Adicionar Novos Componentes

### Passos para criar um novo componente:
1. Criar arquivo no diretório `src/components/`
2. Definir interface de props (se necessário)
3. Implementar a lógica do componente
4. Exportar o componente
5. Importar e usar no componente ou página onde for necessário

### Exemplo de criação de componente:
```typescript
// src/components/NovoComponente.tsx
import React from 'react';

interface NovoComponenteProps {
  title: string;
}

const NovoComponente: React.FC<NovoComponenteProps> = ({ title }) => {
  return (
    <div>
      <h2>{title}</h2>
      {/* Conteúdo do componente */}
    </div>
  );
};

export default NovoComponente;
```

## Como Adicionar Nova Informação ao Currículo

### Passos para atualizar dados do currículo:
1. Abrir o arquivo `src/utils/curriculumData.ts`
2. Localizar a seção correspondente (experiência, projetos, habilidades)
3. Adicionar ou modificar os dados conforme necessário
4. Salvar e testar

### Estrutura dos dados do currículo:
```typescript
// Exemplo de estrutura em src/utils/curriculumData.ts
export const experience = [
  {
    id: 1,
    company: "Nome da Empresa",
    position: "Cargo",
    period: "Período",
    description: "Descrição da experiência",
    technologies: ["Tecnologia 1", "Tecnologia 2"]
  }
];
```

## Como Alterar o Design

### Modificações de estilo:
1. Editar arquivos em `src/styles/`
2. Utilizar classes Tailwind CSS para estilização
3. Criar novos componentes com estilos personalizados se necessário

### Exemplo de modificação de estilo:
```html
<!-- Em um arquivo .astro -->
<div class="bg-blue-500 text-white p-4">
  <!-- Conteúdo -->
</div>
```

## Como Executar o Projeto Localmente

### Comandos disponíveis:
- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Gera a versão final do site para produção
- `npm run preview`: Visualiza a versão final gerada localmente

### Requisitos:
- Node.js (versão 16 ou superior)
- npm (geralmente instalado com o Node.js)

## Manutenção e Atualização

### Atualizações de dependências:
1. Executar `npm update`
2. Verificar compatibilidade das novas versões
3. Testar todas as funcionalidades após atualização

### Melhorias contínuas:
- Adicionar novos componentes conforme necessário
- Refatorar código quando possível
- Manter a documentação atualizada

## Estrutura de Arquivos Detalhada

### `src/pages/index.astro`
- Página principal do currículo
- Contém a estrutura completa da página
- Importa e usa componentes para renderizar o conteúdo

### `src/layouts/Layout.tsx`
- Layout padrão com cabeçalho e rodapé
- Define a estrutura básica do site
- Inclui navegação e elementos compartilhados

### `src/utils/curriculumData.ts`
- Dados principais do currículo
- Estrutura organizada para fácil manutenção
- Facilita atualizações sem alterar código de apresentação

## Contribuição

### Para adicionar novos recursos:
1. Siga o padrão existente de componentes
2. Mantenha a estrutura de dados consistente
3. Teste todas as funcionalidades
4. Documente mudanças importantes

### Boas práticas:
- Utilize TypeScript para segurança de tipos
- Siga convenções de nomenclatura
- Mantenha componentes pequenos e focados
- Documente funções e componentes complexos

## Comandos Úteis

### Para desenvolvimento:
```bash
npm run dev          # Iniciar servidor de desenvolvimento
npm run build        # Gerar versão de produção
npm run preview      # Visualizar versão final localmente
```

### Para testes:
```bash
npm test             # Executar testes (se configurado)
```

## Dicas para Desenvolvimento

1. **Componentização**: Crie componentes pequenos e reutilizáveis
2. **Tipagem**: Utilize TypeScript para evitar erros em tempo de desenvolvimento
3. **Estilização**: Use Tailwind CSS para estilos consistentes e rápidos
4. **Performance**: Mantenha o projeto otimizado para carregamento rápido
5. **Responsividade**: Teste em diferentes tamanhos de tela

## Problemas Comuns e Soluções

### Problemas com dependências:
- Execute `npm install` para reinstalar dependências
- Verifique versões compatíveis do Node.js

### Problemas de build:
- Limpe o cache com `npm run clean`
- Verifique se todos os arquivos estão corretamente formatados

## Considerações Finais

Este projeto foi estruturado para ser fácil de manter e atualizar. A separação entre dados e apresentação permite que qualquer pessoa possa atualizar o conteúdo sem precisar entender o código complexo.

O uso do Astro proporciona uma experiência de desenvolvimento rápida com geração de sites estáticos otimizados, ideal para currículos profissionais que precisam ser rápidos e acessíveis.