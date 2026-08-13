#!/bin/bash

# Script para provisionar o ambiente de desenvolvimento do Portfolio Astro.
# Este script é executado pelo Vagrant na primeira inicialização da VM.

set -e # Encerra o script imediatamente se um comando falhar.

echo ">>> [1/5] Atualizando lista de pacotes do sistema..."
export DEBIAN_FRONTEND=noninteractive
apt-get update -y

echo ">>> [2/5] Instalando ferramentas essenciais (git, make, curl)..."
apt-get install -y curl git make gnupg

echo ">>> [3/5] Instalando Node.js v20.x (LTS)..."
# Adiciona o repositório oficial do NodeSource para obter uma versão recente.
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

echo ">>> [4/5] Instalando dependências do Puppeteer/Chrome Headless para geração de PDF..."
# Lista de pacotes necessários para o Chrome rodar em modo headless no Debian.
# Fonte: Documentação oficial do Puppeteer.
apt-get install -y \
    libnss3 \
    libnspr4 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libxkbcommon0 \
    libx11-xcb1 \
    libxcb-dri3-0 \
    libgbm1 \
    libasound2 \
    libatspi2.0-0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libpangocairo-1.0-0 \
    libcairo2 \
    libpango-1.0-0

echo ">>> [5/5] Instalando dependências do projeto com 'make install'..."
cd /vagrant
make install # Isso irá executar 'npm ci' e baixar o navegador do Puppeteer.

echo "✅ Ambiente pronto! Para usar, siga os passos:"
echo "   1. Conecte-se à VM com: vagrant ssh"
echo "   2. Navegue até a pasta do projeto com: cd /vagrant"
echo "   3. Inicie o servidor de desenvolvimento com: make dev"