<<<<<<< HEAD
# Projeto de Back-End para Leitura de Consumo de Água e Gás

## Descrição

Este projeto desenvolve o back-end de um serviço que gerencia a leitura individualizada de consumo de água e gás. O serviço utiliza Inteligência Artificial (IA) para obter a medição através da foto de um medidor.

## Requisitos

### Conhecimentos Necessários

- Ler especificações técnicas em inglês e entender requisitos de negócios
- Desenvolver uma API REST em Node.js com TypeScript
- Noções básicas de modelagem de bancos de dados
- Criar uma imagem e subir um container utilizando Docker
- Versionamento básico em Git

### Pontos Desejáveis

- Arquitetura limpa (Clean Code)
- Testes unitários

## Endpoints

### 1. `POST /upload`

Este endpoint recebe uma imagem em base64, consulta a API do Gemini para extrair a medição e retorna os dados processados.

#### Request Body

=======

# Projeto de Back-end para Leitura de Consumo de Água e Gás

## Etapa 1 – Back-end

### O que você precisará saber:
- **Ler especificações técnicas em inglês e entender requisitos de negócios.**
- **Desenvolver uma API REST em Node.js com TypeScript.**
- **Noção básica de modelagem de bancos de dados.**
- **Criar uma imagem e subir um container utilizando Docker.**
- **O básico do versionamento em um repositório usando Git.**

### No que você será avaliado:
Sua aplicação será submetida a uma bateria de testes que irão verificar cada um dos critérios de aceite. Por isso, é importante que você leia atentamente e siga rigorosamente todas as instruções. Sua aplicação deve cumprir integralmente os requisitos.

### Pontos desejáveis, mas que não são eliminatórios:
- **Uma arquitetura limpa (clean code).**
- **Testes unitários.**

### Como entregar seu projeto:
- **Preencha o formulário**: [Formulário de Entrega](https://bit.ly/testedevshopper)
- **Dockerização**: A aplicação deve ser completamente dockerizada.
- **Arquivo `docker-compose.yml`**: Deve conter um arquivo `docker-compose.yml` na raiz do seu repositório.
- **Variáveis de ambiente**: O script de teste irá criar um arquivo `.env` na raiz do repositório no seguinte formato:
  ```
  GEMINI_API_KEY=<chave da API>
  ```
  Sua aplicação deve receber essa variável de ambiente para a execução.

- **Comando único**: O docker-compose deve ser capaz de subir a aplicação e todos os serviços necessários com um único comando.

### Uso de LLMs (ChatGPT, Gemini, Llama, etc.):
- **Pode fazer**: Usar LLMs para melhorar o código que você criou ou estudar melhores práticas.
- **Não deve fazer**: Copiar o teste, colar no GPT e apenas copiar o resultado. LLMs geram códigos ruins.

## Cenário
Vamos desenvolver o back-end de um serviço que gerencia a leitura individualizada de consumo de água e gás. Para facilitar a coleta da informação, o serviço utilizará IA para obter a medição através da foto de um medidor.

### Endpoints

#### POST /upload
Responsável por receber uma imagem em base64, consultar o Gemini e retornar a medida lida pela API.

**Requisitos:**
- Validar o tipo de dados dos parâmetros enviados (inclusive o base64).
- Verificar se já existe uma leitura no mês naquele tipo de leitura.
- Integrar com uma API de LLM para extrair o valor da imagem.

**Request Body:**
>>>>>>> 65de7df6ef36e39c6f62f6c9d8bc8c27aa21c2e9
```bash
{
  "image": "base64",
  "customer_code": "string",
  "measure_datetime": "datetime",
  "measure_type": "WATER" ou "GAS"
}
```

<<<<<<< HEAD
#### Response Body

- **200 - Operação realizada com sucesso**

=======
**Response Body:**
- `200`: Operação realizada com sucesso.
>>>>>>> 65de7df6ef36e39c6f62f6c9d8bc8c27aa21c2e9
  ```bash
  {
    "image_url": "string",
    "measure_value": "integer",
    "measure_uuid": "string"
  }
  ```
<<<<<<< HEAD

- **400 - Dados inválidos**

  ```bash
  {
    "error_code": "INVALID_DATA",
    "error_description": "Descrição do erro"
  }
  ```

- **409 - Leitura já realizada**

=======
- `400`: Dados fornecidos no corpo da requisição são inválidos.
  ```bash
  {
    "error_code": "INVALID_DATA",
    "error_description": "<descrição do erro>"
  }
  ```
- `409`: Já existe uma leitura para este tipo no mês atual.
>>>>>>> 65de7df6ef36e39c6f62f6c9d8bc8c27aa21c2e9
  ```bash
  {
    "error_code": "DOUBLE_REPORT",
    "error_description": "Leitura do mês já realizada"
  }
  ```

<<<<<<< HEAD
### 2. `PATCH /confirm`

Este endpoint confirma ou corrige o valor lido pelo LLM.

#### Request Body

=======
#### PATCH /confirm
Responsável por confirmar ou corrigir o valor lido pelo LLM.

**Requisitos:**
- Validar o tipo de dados dos parâmetros enviados.
- Verificar se o código de leitura informado existe.
- Verificar se o código de leitura já foi confirmado.
- Salvar no banco de dados o novo valor informado.

**Request Body:**
>>>>>>> 65de7df6ef36e39c6f62f6c9d8bc8c27aa21c2e9
```bash
{
  "measure_uuid": "string",
  "confirmed_value": "integer"
}
```

<<<<<<< HEAD
#### Response Body

- **200 - Operação realizada com sucesso**

=======
**Response Body:**
- `200`: Operação realizada com sucesso.
>>>>>>> 65de7df6ef36e39c6f62f6c9d8bc8c27aa21c2e9
  ```bash
  {
    "success": true
  }
  ```
<<<<<<< HEAD

- **400 - Dados inválidos**

  ```bash
  {
    "error_code": "INVALID_DATA",
    "error_description": "Descrição do erro"
  }
  ```

- **404 - Leitura não encontrada**

=======
- `400`: Dados fornecidos no corpo da requisição são inválidos.
  ```bash
  {
    "error_code": "INVALID_DATA",
    "error_description": "<descrição do erro>"
  }
  ```
- `404`: Leitura não encontrada.
>>>>>>> 65de7df6ef36e39c6f62f6c9d8bc8c27aa21c2e9
  ```bash
  {
    "error_code": "MEASURE_NOT_FOUND",
    "error_description": "Leitura do mês já realizada"
  }
  ```
<<<<<<< HEAD

- **409 - Leitura já confirmada**

=======
- `409`: Leitura já confirmada.
>>>>>>> 65de7df6ef36e39c6f62f6c9d8bc8c27aa21c2e9
  ```bash
  {
    "error_code": "CONFIRMATION_DUPLICATE",
    "error_description": "Leitura do mês já realizada"
  }
  ```

<<<<<<< HEAD
### 3. `GET /<customer_code>/list`

Este endpoint lista as medidas realizadas por um determinado cliente.

#### Query Parameters

- `measure_type` (opcional): `WATER` ou `GAS`

#### Response Body

- **200 - Operação realizada com sucesso**

=======
#### GET /<customer_code>/list
Responsável por listar as medidas realizadas por um determinado cliente.

**Requisitos:**
- Receber o código do cliente e filtrar as medidas realizadas por ele.
- Pode opcionalmente receber um query parameter `measure_type`, que deve ser `WATER` ou `GAS` (case insensitive).

**Response Body:**
- `200`: Operação realizada com sucesso.
>>>>>>> 65de7df6ef36e39c6f62f6c9d8bc8c27aa21c2e9
  ```bash
  {
    "customer_code": "string",
    "measures": [
      {
        "measure_uuid": "string",
        "measure_datetime": "datetime",
        "measure_type": "string",
        "has_confirmed": "boolean",
        "image_url": "string"
      }
    ]
  }
  ```
<<<<<<< HEAD

- **400 - Tipo de medição inválida**

=======
- `400`: Parâmetro `measure_type` diferente de `WATER` ou `GAS`.
>>>>>>> 65de7df6ef36e39c6f62f6c9d8bc8c27aa21c2e9
  ```bash
  {
    "error_code": "INVALID_TYPE",
    "error_description": "Tipo de medição não permitida"
  }
  ```
<<<<<<< HEAD

- **404 - Nenhum registro encontrado**

=======
- `404`: Nenhum registro encontrado.
>>>>>>> 65de7df6ef36e39c6f62f6c9d8bc8c27aa21c2e9
  ```bash
  {
    "error_code": "MEASURES_NOT_FOUND",
    "error_description": "Nenhuma leitura encontrada"
  }
  ```

<<<<<<< HEAD
## Docker

Este projeto é totalmente dockerizado e inclui um arquivo `docker-compose.yml` na raiz do repositório. Para executar a aplicação, use o comando:

```bash
docker-compose up
```

## Configuração de Variáveis de Ambiente

O arquivo `.env` será criado automaticamente pelo script de testes e deve conter a variável:

```env
GEMINI_API_KEY=<sua chave da API>
```

## Como Utilizar LLMs

Você pode usar LLMs como uma ferramenta para melhorar seu código, mas lembre-se de que a avaliação será feita com base no seu próprio trabalho. Não copie e cole diretamente códigos gerados por LLMs.

## Links Úteis

- [Documentação do Google Gemini (API Key)](https://ai.google.dev/gemini-api/docs/api-key)
- [Documentação do Google Gemini (Vision)](https://ai.google.dev/gemini-api/docs/vision)
=======
## Documentação técnica do Google Gemini (LLM):
- [Documentação Gemini API](https://ai.google.dev/gemini-api/docs/api-key)
- [Documentação Gemini Vision](https://ai.google.dev/gemini-api/docs/vision)

**ATENÇÃO**: Você precisará obter uma chave de acesso para usar a funcionalidade. Ela é gratuita. Não realize despesas financeiras para realizar esse teste.
>>>>>>> 65de7df6ef36e39c6f62f6c9d8bc8c27aa21c2e9
