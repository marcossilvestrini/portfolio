#!/bin/bash

# Script para provisionar o ambiente de desenvolvimento do Portfolio Astro.
# Este script é executado pelo Vagrant na primeira inicialização da VM.

set -e # Encerra o script imediatamente se um comando falhar.

echo ">>> [1/5] Atualizando lista de pacotes do sistema..."
export DEBIAN_FRONTEND=noninteractive
apt-get update -y

echo ">>> [2/5] Instalando ferramentas essenciais (git, make, curl, unzip)..."
apt-get install -y curl git make gnupg unzip

echo ">>> [3/5] Instalando Node.js v22.x (LTS)..."
# Altera para o repositório oficial do NodeSource para a versão 22 (exigida pelo projeto).
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt-get install -y nodejs

echo ">>> [4/5] Instalando dependências do Puppeteer/Chrome Headless para geração de PDF..."
# Lista de pacotes necessários para o Chrome rodar em modo headless no Debian.
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
    libpango-1.0-0 \
    unzip

echo ">>> [5/5] Entrando na pasta do projeto e rodando 'make install'..."
cd /home/vagrant/portfolio
make install

echo "✅ Ambiente pronto! Para usar, siga os passos:"
echo "   1. Conecte-se à VM com: vagrant ssh"
echo "   2. Navegue até a pasta do projeto com: cd /home/vagrant/portfolio"
echo "   3. Inicie o servidor de desenvolvimento com: make dev"