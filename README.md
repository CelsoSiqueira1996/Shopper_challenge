
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
```bash
{
  "image": "base64",
  "customer_code": "string",
  "measure_datetime": "datetime",
  "measure_type": "WATER" ou "GAS"
}
```

**Response Body:**
- `200`: Operação realizada com sucesso.
  ```bash
  {
    "image_url": "string",
    "measure_value": "integer",
    "measure_uuid": "string"
  }
  ```
- `400`: Dados fornecidos no corpo da requisição são inválidos.
  ```bash
  {
    "error_code": "INVALID_DATA",
    "error_description": "<descrição do erro>"
  }
  ```
- `409`: Já existe uma leitura para este tipo no mês atual.
  ```bash
  {
    "error_code": "DOUBLE_REPORT",
    "error_description": "Leitura do mês já realizada"
  }
  ```

#### PATCH /confirm
Responsável por confirmar ou corrigir o valor lido pelo LLM.

**Requisitos:**
- Validar o tipo de dados dos parâmetros enviados.
- Verificar se o código de leitura informado existe.
- Verificar se o código de leitura já foi confirmado.
- Salvar no banco de dados o novo valor informado.

**Request Body:**
```bash
{
  "measure_uuid": "string",
  "confirmed_value": "integer"
}
```

**Response Body:**
- `200`: Operação realizada com sucesso.
  ```bash
  {
    "success": true
  }
  ```
- `400`: Dados fornecidos no corpo da requisição são inválidos.
  ```bash
  {
    "error_code": "INVALID_DATA",
    "error_description": "<descrição do erro>"
  }
  ```
- `404`: Leitura não encontrada.
  ```bash
  {
    "error_code": "MEASURE_NOT_FOUND",
    "error_description": "Leitura do mês já realizada"
  }
  ```
- `409`: Leitura já confirmada.
  ```bash
  {
    "error_code": "CONFIRMATION_DUPLICATE",
    "error_description": "Leitura do mês já realizada"
  }
  ```

#### GET /<customer_code>/list
Responsável por listar as medidas realizadas por um determinado cliente.

**Requisitos:**
- Receber o código do cliente e filtrar as medidas realizadas por ele.
- Pode opcionalmente receber um query parameter `measure_type`, que deve ser `WATER` ou `GAS` (case insensitive).

**Response Body:**
- `200`: Operação realizada com sucesso.
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
- `400`: Parâmetro `measure_type` diferente de `WATER` ou `GAS`.
  ```bash
  {
    "error_code": "INVALID_TYPE",
    "error_description": "Tipo de medição não permitida"
  }
  ```
- `404`: Nenhum registro encontrado.
  ```bash
  {
    "error_code": "MEASURES_NOT_FOUND",
    "error_description": "Nenhuma leitura encontrada"
  }
  ```

## Documentação técnica do Google Gemini (LLM):
- [Documentação Gemini API](https://ai.google.dev/gemini-api/docs/api-key)
- [Documentação Gemini Vision](https://ai.google.dev/gemini-api/docs/vision)

**ATENÇÃO**: Você precisará obter uma chave de acesso para usar a funcionalidade. Ela é gratuita. Não realize despesas financeiras para realizar esse teste.
