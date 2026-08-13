# Makefile para projeto Astro
# Autor: Marcos Silvestrini
# Descrição: Comandos para desenvolvimento, build e testes do portfolio Astro
# Ambiente: Linux / macOS / WSL2 (Exclusivo para ambientes Unix-like)

# --- Variáveis ---
PROJECT_NAME = portfolio

# Executáveis via 'npx'
ASTRO_CLI    = npx astro
VITEST_CLI   = npx vitest
ESLINT_CLI   = npx eslint
PRETTIER_CLI = npx prettier

# Comando para instalação isolada do navegador do Puppeteer
PUPPETEER_INSTALL_CMD = npx --yes @puppeteer/browsers install chrome

# Geração de PDF (Usa a sintaxe de variáveis de ambiente nativa do Bash)
PDF_CMD = URL="file://$(CURDIR)/dist/index.html" OUT="dist/resume.pdf" node scripts/generatePdf.js

# Cores para o terminal
GREEN  = \033[0;32m
BLUE   = \033[0;34m
YELLOW = \033[1;33m
NC     = \033[0m

# Marcador de idempotência para instalação de dependências
NODE_MODULES_MARKER = node_modules/.installed

# --- Comandos Disponíveis ---
.PHONY: help
help:
	@echo "$(BLUE)=== $(PROJECT_NAME) - Comandos de Desenvolvimento (Linux) ===$(NC)"
	@echo ""
	@echo "$(YELLOW)Setup$(NC)"
	@echo "  install     - Instala as dependências de forma inteligente"
	@echo "  reinstall   - Limpa tudo e reinstala as dependências do zero"
	@echo "  clean       - Limpa diretórios de build e cache"
	@echo ""
	@echo "$(YELLOW)Development$(NC)"
	@echo "  dev         - Inicia o servidor de desenvolvimento (localhost:4321)"
	@echo "  build       - Gera o build de produção do site"
	@echo "  preview     - Pré-visualiza o build de produção"
	@echo ""
	@echo "$(YELLOW)Quality$(NC)"
	@echo "  type-check  - Executa a verificação de tipos do Astro (astro check)"
	@echo "  format      - Formata o código com o Prettier"
	@echo "  lint        - Executa o ESLint para encontrar problemas"
	@echo "  test        - Executa os testes com o Vitest"
	@echo "  check       - Executa todas as validações (format, type-check, lint, test)"
	@echo ""
	@echo "$(YELLOW)Utils$(NC)"
	@echo "  pdf         - Gera a versão em PDF do currículo"
	@echo "  verify      - Verifica as versões do Node.js e NPM"
	@echo ""

# --- Setup & Dependências ---

# Instalação rápida: Só executa se o package.json for modificado ou a pasta sumir
.PHONY: install
install: $(NODE_MODULES_MARKER)
	@echo "$(GREEN)✔ Dependências já estão instaladas e prontas para uso.$(NC)"

$(NODE_MODULES_MARKER): package.json
	@echo "$(YELLOW)Instalando dependências (npm install)...$(NC)"
	npm install --no-audit --fund=false
	@echo "$(YELLOW)Garantindo a instalação do navegador do Puppeteer...$(NC)"
	$(PUPPETEER_INSTALL_CMD)
	@touch $(NODE_MODULES_MARKER)
	@echo "$(GREEN)✔ Instalação concluída!$(NC)"

# Reinstalação forçada (ótima para resolver módulos corrompidos)
.PHONY: reinstall
reinstall:
	@echo "$(YELLOW)Limpando dependências, lockfile e caches...$(NC)"
	npm cache clean --force
	rm -rf node_modules package-lock.json .astro dist
	@echo "$(YELLOW)Instalando dependências do zero...$(NC)"
	npm install --no-audit --fund=false
	@echo "$(YELLOW)Instalando o navegador do Puppeteer...$(NC)"
	$(PUPPETEER_INSTALL_CMD)
	@touch $(NODE_MODULES_MARKER)
	@echo "$(GREEN)✔ Ambiente recriado com sucesso!$(NC)"

# Limpeza de projeto
.PHONY: clean
clean:
	@echo "$(YELLOW)Limpando diretórios de cache e build...$(NC)"
	rm -rf .astro dist node_modules/.cache
	@echo "$(GREEN)✔ Projeto limpo!$(NC)"

# --- Development ---
.PHONY: dev
dev:
	$(ASTRO_CLI) dev

.PHONY: build
build:
	$(ASTRO_CLI) build

.PHONY: preview
preview:
	$(ASTRO_CLI) preview

# --- Quality ---
.PHONY: test
test:
	$(VITEST_CLI) run

.PHONY: type-check
type-check:
	$(ASTRO_CLI) check

.PHONY: lint
lint:
	$(ESLINT_CLI) "scripts/generatePdf.js" "src/**/*.js" "test/**/*.ts"

.PHONY: format
format:
	$(PRETTIER_CLI) --write "src/**/*.{js,ts,astro,css,json,md}"

.PHONY: check
check: format type-check lint test
	@echo "$(GREEN)✔ Todos os testes e checagens passaram!$(NC)"

# --- Utils ---
.PHONY: pdf
pdf: build
	@echo "$(YELLOW)Gerando PDF do currículo a partir do build estático...$(NC)"
	$(PDF_CMD)
	@echo "$(GREEN)✔ Currículo em PDF salvo em dist/resume.pdf$(NC)"

.PHONY: verify
verify:
	@node --version && npm --version