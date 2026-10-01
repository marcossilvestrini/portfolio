# Makefile para projeto Astro
# Autor: Marcos Silvestrini
# Descrição: Comandos para desenvolvimento, build e testes do portfolio Astro

# --- Variáveis ---
PROJECT_NAME = portfolio

# Invocação direta e exata baseada na raiz dos módulos instalados
ASTRO_CLI    = node ./node_modules/astro/astro.js
ESLINT_CLI   = node ./node_modules/eslint/bin/eslint.js
PRETTIER_CLI = node ./node_modules/prettier/bin/prettier.cjs
VITEST_CLI   = node ./node_modules/vitest/dist/cli.js

PUPPETEER_INSTALL_CMD = node node_modules/puppeteer/install.mjs
PDF_CMD = URL="file://$(CURDIR)/dist/index.html" OUT="dist/resume.pdf" node scripts/generatePdf.js

# Cores para o terminal
GREEN  = \033[0;32m
BLUE   = \033[0;34m
YELLOW = \033[1;33m
NC     = \033[0m

NODE_MODULES_MARKER = node_modules/.installed

# --- Comandos Disponíveis ---
.PHONY: help
help:
	@echo "$(BLUE)=== $(PROJECT_NAME) - Comandos de Desenvolvimento (Linux) ===$(NC)"
	@echo ""
	@echo "$(YELLOW)Setup$(NC)"
	@echo "  install     - Instala as dependências com --no-bin-links"
	@echo "  reinstall   - Limpa tudo e reinstala do zero"
	@echo "  clean       - Limpa diretórios de build e cache"
	@echo ""
	@echo "$(YELLOW)Development$(NC)"
	@echo "  dev         - Inicia o servidor de desenvolvimento (localhost:4321)"
	@echo "  build       - Gera o build de produção do site"
	@echo ""
	@echo "$(YELLOW)Quality$(NC)"
	@echo "  format      - Formata o código com o Prettier"
	@echo "  lint        - Executa o ESLint"
	@echo "  test        - Executa os testes com o Vitest"
	@echo "  check       - Executa todas as checagens"
	@echo ""
	@echo "$(YELLOW)Utils$(NC)"
	@echo "  pdf         - Gera o currículo em PDF"
	@echo ""

# --- Setup & Dependências ---
.PHONY: install
install: $(NODE_MODULES_MARKER)
	@echo "$(GREEN)✔ Dependências prontas para uso.$(NC)"

$(NODE_MODULES_MARKER): package.json
	@echo "$(YELLOW)Instalando dependências (npm install)...$(NC)"
	npm install --no-audit --fund=false --no-bin-links
	@echo "$(YELLOW)Garantindo a instalação do navegador do Puppeteer...$(NC)"
	$(PUPPETEER_INSTALL_CMD)
	@touch $(NODE_MODULES_MARKER)
	@echo "$(GREEN)✔ Instalação concluída!$(NC)"

.PHONY: reinstall
reinstall:
	@echo "$(YELLOW)Limpando dependências e caches...$(NC)"
	rm -rf node_modules package-lock.json .astro dist
	npm install --no-audit --fund=false --no-bin-links
	$(PUPPETEER_INSTALL_CMD)
	@touch $(NODE_MODULES_MARKER)
	@echo "$(GREEN)✔ Ambiente recriado com sucesso!$(NC)"

.PHONY: clean
clean:
	@echo "$(YELLOW)Limpando diretórios de cache e build...$(NC)"
	rm -rf .astro dist node_modules/.cache .cache chrome
	rm -rf /home/vagrant/.cache/puppeteer || true
	@echo "$(GREEN)✔ Projeto limpo!$(NC)"

# --- Development ---
.PHONY: dev
dev:
	$(ASTRO_CLI) dev --host 0.0.0.0

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
	$(ESLINT_CLI) . --ext .js,.ts,.astro

.PHONY: format
format:
	$(PRETTIER_CLI) --write .

.PHONY: check
check: format type-check lint test
	@echo "$(GREEN)✔ Todos os testes e checagens passaram!$(NC)"

# --- Utils ---
.PHONY: pdf
pdf: build
	@echo "$(YELLOW)Gerando PDF do currículo...$(NC)"
	$(PDF_CMD)
	@echo "$(GREEN)✔ Currículo salvo em dist/resume.pdf$(NC)"