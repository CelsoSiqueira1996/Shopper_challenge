# Resumo do Projeto

## Etapa 1 – Back-end

### Objetivos
Desenvolver o back-end de um serviço para gerenciar a leitura individualizada de consumo de água e gás. O serviço utilizará IA para obter medições através de fotos de medidores.

### Tecnologias Necessárias
- **Linguagem**: Node.js com TypeScript
- **Banco de Dados**: Noção básica de modelagem de bancos de dados
- **API REST**: Desenvolvimento de endpoints REST
- **Docker**: Criar uma imagem e subir um container
- **Git**: Versionamento de código

### Pontos Desejáveis
- **Arquitetura Limpa**: Clean code
- **Testes Unitários**: Implementação de testes

### Entrega do Projeto
- O projeto deve ser dockerizado.
- Deve incluir um arquivo `docker-compose.yml` na raiz do repositório.
- A aplicação deve ser capaz de subir com um único comando via Docker Compose.
- Deve suportar variáveis de ambiente configuradas via `.env`.

## Endpoints

### 1. POST /upload
- Recebe uma imagem em base64 e extrai a medição através de uma API LLM.
- Valida dados, verifica duplicidade de leitura no mês, e integra com a API Gemini para extrair o valor da imagem.
- **Request Body**:
  ```bash
  {
    "image": "base64",
    "customer_code": "string",
    "measure_datetime": "datetime",
    "measure_type": "WATER" ou "GAS"
  }
  ```
- **Response**:
  - `200`: Retorna a URL da imagem, valor reconhecido e UUID da medição.
  - `400`: Dados inválidos.
  - `409`: Leitura duplicada para o mês.

### 2. PATCH /confirm
- Confirma ou corrige o valor lido pelo LLM.
- Valida dados, verifica a existência e se já foi confirmada a leitura.
- **Request Body**:
  ```json
  {
    "measure_uuid": "string",
    "confirmed_value": integer
  }
  ```
- **Response**:
  - `200`: Operação realizada com sucesso.
  - `400`: Dados inválidos.
  - `404`: Leitura não encontrada.
  - `409`: Leitura já confirmada.

### 3. GET /<customer_code>/list
- Lista as medidas realizadas por um cliente.
- Pode filtrar pelo tipo de medição (`WATER` ou `GAS`).
- **Response**:
  - `200`: Retorna a lista de medições.
  - `400`: Tipo de medição inválido.
  - `404`: Nenhum registro encontrado.

## Cenário
O sistema desenvolvido permitirá que usuários enviem fotos de medidores de água e gás, extraiam os valores por meio de IA e confirmem ou corrijam essas medições. Além disso, será possível listar todas as medições realizadas por um cliente específico.

## Documentação Técnica
- [Documentação Gemini API](https://ai.google.dev/gemini-api/docs/api-key)
- [Documentação Gemini Vision](https://ai.google.dev/gemini-api/docs/vision)

## Considerações
- O uso de LLMs (como ChatGPT) é permitido para auxiliar no desenvolvimento, mas o código gerado deve ser original e ajustado conforme necessário.
- O projeto deve ser totalmente funcional e seguir rigorosamente os requisitos estabelecidos.
