# Guia de Configuração: LLM Local para Desenvolvimento (Placas AMD Radeon + IDE)

Este guia descreve os passos necessários para instalar o Ollama, gerenciar modelos de IA localmente utilizando aceleração por hardware em placas de vídeo AMD Radeon e integrar o ambiente de desenvolvimento usando o plugin Continue (formato YAML).

---

## 🚀 1. Preparação do Sistema (Drivers AMD)

Para garantir que o Ollama utilize o desempenho total da placa de vídeo (aceleração via HIP/ROCm/Vulkan) em vez de sobrecarregar o processador (CPU), certifique-se de realizar o seguinte passo:

1. Acesse o site oficial da AMD e instale a versão mais recente do driver **AMD Software: Adrenalin Edition**.

---

## 📥 2. Instalação e Configuração Limpa do Ollama

O aplicativo visual "Ollama Desktop" para Windows possui bugs conhecidos de sincronização de porta com placas recentes. Por isso, a recomendação oficial para ambientes de desenvolvimento é utilizar apenas o binário de terminal do Ollama.

1. Baixe o instalador oficial em: [://ollama.com](https://://ollama.com).
2. Execute o instalador `OllamaSetup.exe` e conclua o assistente.
3. Assim que a instalação finalizar, vá até a barra de tarefas do Windows (perto do relógio), clique com o botão direito no ícone da "Lhaminha" e selecione **Quit** (Sair).
4. Abra o **Gerenciador de Tarefas** (`Ctrl + Shift + Esc`) e garanta que nenhum processo `ollama.exe` ou `ollama_app.exe` ficou travado em segundo plano.

### ⚙️ Configuração de Variáveis de Ambiente do Sistema

Abra as **Variáveis de Ambiente do Sistema** no Windows e adicione **apenas estas duas chaves** na tabela de **Variáveis do Sistema** (na parte inferior):

- **`OLLAMA_MODELS`** : `E:\ollama`_(Substitua pelo caminho do seu disco de preferência. Essencial para que os modelos pesados não lotem o disco C:)._
- **`HSA_OVERRIDE_GFX_VERSION`** : `11.0.2`
  _(Essencial para que o driver computacional HIP/ROCm da AMD reconheça e ative a aceleração de hardware na GPU)._

> ⚠️ **Atenção:** Remova ou não adicione variáveis redundantes como `OLLAMA_HOST`, `OLLAMA_ORIGINS` ou controles manuais de threads. Elas causam loops de timeout no back-end do Windows.

---

## 🗂️ 3. Download dos Modelos Ideais via Terminal

Abra o **Prompt de Comando (CMD)** ou **PowerShell** e execute o comando abaixo para iniciar o servidor de forma limpa:

```powershell
ollama serve
```

_Mantenha esta janela do terminal aberta._ Abra uma **segunda janela** do terminal e faça o download (pull) da nossa arquitetura de modelos recomendada para o ambiente:

```powershell
# Cérebro Pesado - Utilizado para Chat, Agentes e Explicações Complexas
ollama pull qwen3-coder:30b

# Cérebro Leve - Utilizado para o Autocomplete instantâneo de digitação (Tab-completion)
ollama pull qwen2.5-coder:1.5b

# Modelo Geral Secundário (Opcional)
ollama pull llama3.2:latest
```

Para verificar se os arquivos foram salvos no disco correto e estão prontos, digite: `ollama list`.

---

## 🛠️ 4. Integração com a IDE (Antigravity ou VS Code)

O ecossistema do Google Antigravity não possui integração nativa exposta para o Ollama em suas configurações visuais de nuvem. A forma universal e recomendada para integrá-los é instalando a extensão de código aberto **Continue**.

### Passo A: Instalação Manual do Plugin (.vsix)

Como a Microsoft Store limita o download de arquivos puros de extensão no navegador, utilize o repositório aberto **Open VSX**:

1. Baixe o pacote da extensão acessando diretamente a página do [Continue no Open VSX](https://open-vsx.org).
2. No menu direito da página, clique em **Download Extension** para salvar o arquivo `.vsix`.
3. Abra a sua IDE, pressione **`Ctrl + Shift + P`** para abrir a Paleta de Comandos.
4. Digite `Extensions: Install from VSIX...`, selecione o arquivo baixado e confirme.

### Passo B: Configuração do Arquivo `config.yaml`

1. Clique no ícone do **Continue** adicionado à sua barra lateral esquerda.
2. Na parte inferior da janela do plugin, clique no ícone da **Engrenagem** (Settings).
3. A IDE abrirá o arquivo central de mapeamento em formato YAML. Substitua **todo** o conteúdo por este bloco estruturado (respeite rigorosamente os recuos de espaço do padrão YAML):

```yaml
name: Main Config
version: 1.0.1
schema: v1
models:
  - name: Qwen 3 Coder 30B (Local)
    provider: ollama
    model: qwen3-coder:30b
    apiBase: http://localhost:11434
    capabilities:
      - tool_use
    roles:
      - chat
      - edit
      - apply

  - name: Qwen Coder 1.5B (Local)
    provider: ollama
    model: qwen2.5-coder:1.5b
    apiBase: http://localhost:11434
    capabilities:
      - tool_use
    roles:
      - autocomplete

  - name: Llama 3.2 (Geral)
    provider: ollama
    model: llama3.2:latest
    apiBase: http://localhost:11434
    roles:
      - chat
```

4. Pressione `Ctrl + S` para salvar o arquivo.
5. Se a tela inicial de boas-vindas do Continue continuar aberta, clique no botão cinza bem abaixo chamado **"Skip and configure manually"**.

---

## 💡 5. Como Utilizar no Dia a Dia

A estrutura foi desenhada de forma híbrida e otimizada para a GPU. Você não precisa alterar configurações para alternar o uso:

- **Tab-Autocomplete (Invisível/Automático):** Conforme você digita seu código, o modelo ultraleve de `1.5b` faz a previsão do texto instantaneamente em cinza claro. Basta pressionar **`Tab`** para aceitar.
- **Chat com Agente do Repositório (`Ctrl + L`):** Selecione blocos de códigos complexos e aperte `Ctrl + L`. O painel lateral enviará o contexto para o modelo pesado de `30b`, ideal para debugar erros, gerar documentações técnicas em Markdown e planejar escopos.
- **Refatoração em Linha (`Ctrl + I`):** Abre uma caixa de edição rápida na linha atual para comandos diretos (ex: _"converta essa função para svelte"_ ou _"adicione try/catch"_).
