# Portfolio de Marcos Silvestrini

## Sobre

Este é o repositório do portfolio pessoal de Marcos Silvestrini, um profissional especializado em Cloud Computing e Infraestrutura com foco na cultura DevOps. O site foi migrado para Astro, um framework moderno para construção de websites estáticos de alta performance.

## Estrutura do Projeto (Simplificada)

```
.
├── src/
│   ├── components/     # Componentes reutilizáveis
│   ├── layouts/        # Layouts para páginas
│   ├── pages/          # Páginas do site
│   └── styles/         # Estilos globais
├── public/             # Arquivos estáticos
├── dist/               # Build gerado
├── .astro/             # Arquivos de configuração do Astro
├── Makefile            # Comandos para desenvolvimento
└── package.json        # Dependências do projeto
```

## Tecnologias Utilizadas

- **Astro**: Framework para construção de websites estáticos
- **TypeScript**: Linguagem de programação para desenvolvimento
- **Tailwind CSS**: Framework CSS para estilização
- **Markdown**: Para conteúdo textual
- **Makefile**: Automatização de comandos de desenvolvimento

## Comandos Disponíveis

O projeto utiliza um Makefile com diversos comandos para facilitar o desenvolvimento:

```bash
# Ver ajuda dos comandos disponíveis
make help

# Instalar dependências
make install

# Iniciar servidor de desenvolvimento
make dev

# Buildar projeto para produção
make build

# Visualizar build localmente
make preview

# Limpar arquivos gerados
make clean

# Executar testes
make test

# Verificação completa do projeto
make check
```

## Como Usar

1. Clone o repositório
2. Instale as dependências com `make install`
3. Inicie o servidor de desenvolvimento com `make dev`
4. Acesse http://localhost:4321

## Contribuições

Este é um projeto pessoal, mas feedbacks e sugestões são bem-vindos!

## Autor

Marcos Silvestrini - [marcos.silvestrini@gmail.com](mailto:marcos.silvestrini@gmail.com)

## Licença

Este projeto está sob a licença MIT.
