#!/bin/bash

# Script para provisionar o ambiente de desenvolvimento do Portfolio Astro.
# Este script é executado pelo Vagrant na primeira inicialização da VM.

set -e # Encerra o script imediatamente se um comando falhar.

echo ">>> [1/5] Atualizando lista de pacotes do sistema..."
export DEBIAN_FRONTEND=noninteractive
apt-get update -y

echo ">>> [2/6] Instalando ferramentas essenciais e dependências do Puppeteer..."
# Instala ferramentas básicas e dependências para o Chrome rodar em modo headless (Puppeteer) de uma só vez.
apt-get install -y \
    curl \
    git \
    make \
    gnupg \
    unzip \
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

echo ">>> [3/6] Instalando Docker e Act (Nektos)..."
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
rm -f get-docker.sh
usermod -aG docker vagrant

# Install act
curl --proto '=https' --tlsv1.2 -sSf https://raw.githubusercontent.com/nektos/act/master/install.sh | bash
mv bin/act /usr/local/bin/act || true
rm -rf bin || true

echo ">>> [4/6] Instalando Node.js v22.x (LTS)..."
# Altera para o repositório oficial do NodeSource para a versão 22 (exigida pelo projeto).
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt-get install -y nodejs

echo ">>> [5/6] Limpando cache do APT para reduzir o tamanho da imagem..."
apt-get clean

echo ">>> [6/6] Entrando na pasta do projeto e rodando 'make install'..."
cd /home/vagrant/portfolio
make install

echo "✅ Ambiente pronto! Para usar, siga os passos:"
echo "   1. Conecte-se à VM com: vagrant ssh"
echo "   2. Navegue até a pasta do projeto com: cd /home/vagrant/portfolio"
echo "   3. Inicie o servidor de desenvolvimento com: make dev"