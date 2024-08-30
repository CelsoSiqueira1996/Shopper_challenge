
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

```bash
{
  "image": "base64",
  "customer_code": "string",
  "measure_datetime": "datetime",
  "measure_type": "WATER" ou "GAS"
}
```

#### Response Body

- **200 - Operação realizada com sucesso**

  ```bash
  {
    "image_url": "string",
    "measure_value": "integer",
    "measure_uuid": "string"
  }
  ```

- **400 - Dados inválidos**

  ```bash
  {
    "error_code": "INVALID_DATA",
    "error_description": "Descrição do erro"
  }
  ```

- **409 - Leitura já realizada**

  ```bash
  {
    "error_code": "DOUBLE_REPORT",
    "error_description": "Leitura do mês já realizada"
  }
  ```

### 2. `PATCH /confirm`

Este endpoint confirma ou corrige o valor lido pelo LLM.

#### Request Body

```bash
{
  "measure_uuid": "string",
  "confirmed_value": "integer"
}
```

#### Response Body

- **200 - Operação realizada com sucesso**

  ```bash
  {
    "success": true
  }
  ```

- **400 - Dados inválidos**

  ```bash
  {
    "error_code": "INVALID_DATA",
    "error_description": "Descrição do erro"
  }
  ```

- **404 - Leitura não encontrada**

  ```bash
  {
    "error_code": "MEASURE_NOT_FOUND",
    "error_description": "Nenhuma leitura encontrada"
  }
  ```

- **409 - Leitura já confirmada**

  ```bash
  {
    "error_code": "CONFIRMATION_DUPLICATE",
    "error_description": "Leitura do mês já confirmada"
  }
  ```

### 3. `GET /<customer_code>/list`

Este endpoint lista as medidas realizadas por um determinado cliente.

#### Query Parameters

- `measure_type` (opcional): `WATER` ou `GAS`

#### Response Body

- **200 - Operação realizada com sucesso**

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

- **400 - Tipo de medição inválida**

  ```bash
  {
    "error_code": "INVALID_TYPE",
    "error_description": "Tipo de medição não permitida"
  }
  ```

- **404 - Nenhum registro encontrado**

  ```bash
  {
    "error_code": "MEASURES_NOT_FOUND",
    "error_description": "Nenhuma leitura encontrada"
  }
  ```

## Docker

Este projeto é totalmente dockerizado e inclui um arquivo `docker-compose.yml` na raiz do repositório. Para executar a aplicação, use o comando:

```bash
docker-compose up
```

## Configuração de Variáveis de Ambiente

Um arquivo `.env` deverá ser criado e deve conter a variável:

```env
GEMINI_API_KEY=<sua chave da API>
```

## Links Úteis

- [Documentação do Google Gemini (API Key)](https://ai.google.dev/gemini-api/docs/api-key)
- [Documentação do Google Gemini (Vision)](https://ai.google.dev/gemini-api/docs/vision)

## Observações adicionais

- Foi utilizado o Prisma como ferramenta para gerenciar o banco de dados. O banco de dados escolhido para esse projeto foi o SQLite (banco relacional).
- Foram criadas duas tabelas, uma para os consumidores e outra para as medidas, sendo a relação: um consumidor possui varias medidas e uma medida possui apenas um consumidor relacionado.
- Para garantir a validação dos dados, foi utilizada a biblioteca zod.
- Algumas implementações extras foram feitas, como por exemplo, tratamento de erros gerais, sendo categorizados como status 500 - Erro interno do servidor.

  ### Modelo adotado para o cliente e para a medida:
    -Cliente:
      - id: string (uuid)
      - customer_code: string
    -Medidas:
      - measure_uuid: string (uuid)
      - image_url: string
      - measure_value: integer
      - measure_datetime: datetime
      - measure_type: string
      - has_confirmed: boolean
      - customer_code: string
