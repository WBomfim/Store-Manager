# Boas-vindas ao repositório do Projeto Store Manager! 

<details>
<summary><strong>👨‍💻 Descrição do projeto</strong></summary><br />

O projeto é uma API RESTful com arquitetura MSC que consiste em um sistema de gerenciamento de vendas no formato dropshipping, onde é possível criar, visualizar, deletar e atualizar produtos e vendas em um banco de dados MySQL, também foram desenvolvidos testes unitários para todos os arquivos e funções de cada camada da aplicação.
</details>

<details>
<summary><strong>📝 Detalhes do desenvolvimento</strong></summary><br />

Nesse projeto foi utilizado **Node.js** com **Express** para o desenvolvimento da aplicação, foi utilizado **express-rescue** para capturar os erros não previstos nas rotas desenvolvidas e encaminhar para um middleware de error que exibi uma mensagem padrão para o usuário, para vailidação de dados foi utilizado o **Joi**, **MySQL** para o banco de dados e **mocha**, **chai** e **sinon** para os testes unitários.

Requisitos desenvolvidos:

- Criados os endpoints `/products` e `/products/:id` para listar produtos;
- Criado o endpoint `/products` para cadastrar produtos;
- Criado validações para as informações recebidas no `body` da requisição para cadastrar um produto;
- Criado o endpoint `/sales` para cadastrar vendas realizadas;
- Criado validações para as informações recebidas no `body` da requisição para cadastrar uma venda;
- Criados os endpoints `/sales` e `/sales/:id` para listar vendas;
- Criado o endpoint `/products/:id` para atualizar um produto;
- Criado validações para as informações recebidas no `body` da requisição para atualizar um produto;
- Criado o endpoint `/products/:id` para deletar um produto;
- Criado o endpoint `/sales/:id` para deletar uma venda;
- Criado o endpoint `/sales/:id` para atualizar uma venda;
- Criado o endpoint `/products/search` para trazer produtos pelo nome enviado na url da requisição;
- Criado testes para 100% de cobertura das camadas da aplicação.
</details>

<details>
<summary><strong>🎲 Diagrama de entidades e relacionamentos</strong></summary><br />

![DER](https://github.com/WBomfim/Store-Manager_Node.js/blob/main/images/erStoreManager.png)

### Tabelas

O banco terá três tabelas: 

- A tabela `products`, com os atributos `id` e `name`;
- A tabela `sales`, com os atributos `id` e `date`;
- A tabela `sales_products`, com os atributos `sale_id`, `product_id` e `quantity`;

A tabela `products` tem o seguinte formato: *(O id é gerado automaticamente)*

![Tabela Produtos](https://github.com/WBomfim/Store-Manager_Node.js/blob/main/images/tableproducts.png)

A tabela `sales` tem o seguinte formato: *(O id e date são gerados automaticamente)*

![Tabela Vendas](https://github.com/WBomfim/Store-Manager_Node.js/blob/main/images/tablesales.png)

A tabela `sales_products`, é a tabela que faz o relacionamento `N:N` entre `products` e `sales` e tem o seguinte formato: *(O produto e a venda são deletados automaticamente)*

![Tabela Vendas-Produtos](https://github.com/WBomfim/Store-Manager_Node.js/blob/main/images/tablesalesproducts.png)
</details>
  
<details>
<summary><strong>📖 Documentação</strong></summary>

### **Server:**
```bash
http://localhost:3000
```

<details>
<summary><strong>▶️ Rotas para Produtos</strong></summary>

## `GET` /products

**Lista todos os produtos cadastrados no banco de dados**

Os produtos possuem `id` e `nome`.

Os retornos seguem os formatos abaixo:

- `Ok` - Retorna todos os produtos cadastrados no banco de dados - Response status `200` (application/json):

```bash
[
  {
    "id": 1,
    "name": "Martelo de Thor",
  },
  {
    "id": 2,
    "name": "Traje de encolhimento",
  }
  /* ... */
]
```

- `Not found` - Quando não há produtos cadastrados no banco de dados - Response status `404` (application/json):

```bash
{ "message": "Products not found" }
```

## `GET` /products/:id

**Lista apenas o produto com o `id` presente na URL**

O produto possui `id` e `nome`.

Os retornos seguem os formatos abaixo:

- `Ok` - Retorna o produto encontrado no banco de dados - Response status `200` (application/json):

```bash
{
  "id": 1,
  "name": "Martelo de Thor",
}
```

- `Not found` - Quando o produto não está cadastrado no banco de dados - Response status `404` (application/json):

```bash
{ "message": "Product not found" }
```

## `GET` /products/search

**Lista os produtos conforme o parametro presente na URL**

O produto possui `id` e `nome`.

O query params da requisição deverá seguir o seguinte formato:

```bash
http://localhost:PORT/products/search?q=nome_do_produto_para_pesquisa
```

Os retornos seguem os formatos abaixo:

- `Ok` - Retorna os produtos que possuem o termo enviado na URL - Response status `200` (application/json):

```bash
// GET /products/search?q=Martelo

[
  {
    "id": 1,
    "name": "Martelo de Thor",
  }
]
```

- `Ok` - Retorna todos os produtos cadastrados quando o parametro é enviado vazio - Response status `200` (application/json):

```bash
// GET /products/search?q=

[
  {
    "id": 1,
    "name": "Martelo de Thor",
  },
  {
    "id": 2,
    "name": "Traje de encolhimento",
  }
  /* ... */
]
```

## `POST` /products

**Cadastra um produto no banco de dados**

O nome do produto deve ser enviado no `body` no seguinte formato:

```bash
{
  "name": "Produto_X",
}
```

Os retornos seguem os formatos abaixo:

- `Created` - Quando o produto é cadastrado com sucesso - Response status `201` (application/json):

```bash
{
  "id": 4,  //id criado automaticamente no momento da inserção dos dados.
  "name": "ProdutoX"
}
```

- `Bad request` - Quando o nome do produto não é enviado na requisição - Response status `400` (application/json):

```bash
{ "message": "\"name\" is required"  }
```

- `Unprocessable Entity` - Quando o nome do produto tem menos de 5 caracteres - Response status `422` (application/json):

```bash
{ "message": "\"name\" length must be at least 5 characters long" }
```

## `PUT` /products/:id

**Atualiza o produto com o `id` presente na URL**

O novo nome do produto deve ser enviado no `body` no seguinte formato:

```bash
{
  "name": "Produto_X_Atualizado",
}
```

Os retornos seguem os formatos abaixo:

- `Ok` - Quando o produto é atualizado com sucesso - Response status `200` (application/json):

```bash
{
  "id": 4,
  "name": "Produto_X_Atualizado"
}
```

- `Not found` - Quando o produto não está cadastrado no banco de dados - Response status `404` (application/json):

```bash
{ "message": "Product not found" }
```

## `DELETE` /products/:id

**Deleta o produto com o `id` presente na URL**

Os retornos seguem os formatos abaixo:

- `Deleted - No Content` - Quando o produto é deletado com sucesso - Response status `204`.

- `Not found` - Quando o produto não está cadastrado no banco de dados - Response status `404` (application/json):

```bash
{ "message": "Product not found" }
```
</details>

<details>
<summary><strong>▶️ Rotas para Vendas</strong></summary>

## `GET` /sales

**Lista todas as vendas cadastradas no banco de dados**

As vendas possuem `saleId`, `date`, `productId` e `quantity`.

Os retornos seguem os formatos abaixo:

- `Ok` - Retorna todas as vendas cadastradas no banco de dados - Response status `200` (application/json):

```bash
[
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  },
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:54.000Z",
    "productId": 2,
    "quantity": 2
  }

  /* ... */
]
```

- `Not found` - Quando não há vendas cadastradas no banco de dados - Response status `404` (application/json):

```bash
{ "message": "Sales not found" }
```

## `GET` /sales/:id

**Lista apenas a venda com o `id` presente na URL**

A venda possui `id`, `date`, `productId` e `quantity`.

Os retornos seguem os formatos abaixo:

- `Ok` - Retorna um array com os produtos e quantidades referente a venda - Response status `200` (application/json):

```bash
[
  {
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  },
  {
    "date": "2021-09-09T04:54:54.000Z",
    "productId": 2,
    "quantity": 2
  }

  /* ... */
]
```

- `Not found` - Quando a venda não está cadastrada no banco de dados - Response status `404` (application/json):

```bash
{ "message": "Sale not found" }
```

## `POST` /sales

**Cadastra uma venda no banco de dados**

A venda deve ser enviada no `body` no seguinte formato:

```bash
[
  {
    "productId": 1,
    "quantity":1
  },
  {
    "productId": 2,
    "quantity":5
  }
]
```

Os retornos seguem os formatos abaixo:

- `Created` - Quando a venda é cadastrada com sucesso - Response status `201` (application/json):

```bash
{
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity":1
    },
    {
      "productId": 2,
      "quantity":5
    }
  ]
}
```

- `Bad request` - Quando o `productId` não é enviado na requisição - Response status `400` (application/json):

```bash
{ "message": "\"productId\" is required" }
```

- `Bad request` - Quando a `quantity` não é enviada na requisição - Response status `400` (application/json):

```bash
{ "message": "\"quantity\" is required" }
```

- `Unprocessable Entity` - Quando o campo `quantity` for menor ou igual a zero - Response status `422` (application/json):

```bash
{ "message": "\"quantity\" must be greater than or equal to 1" }
```

- `Not found` - Quando o `productId` não está cadastrado no banco de dados - Response status `422` (application/json):

```bash
{ "message": "Product not found" }
```

## `PUT` /sale/:id

**Atualiza a venda com o `id` presente na URL**

A venda atualizada deve ser enviada no `body` no seguinte formato:

```bash
[
  {
    "productId": 1,
    "quantity":10
  },
  {
    "productId": 2,
    "quantity":50
  }
]
```

Os retornos seguem os formatos abaixo:

- `Ok` - Quando a venda é atualizada com sucesso - Response status `200` (application/json):

```bash
{
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity":10
    },
    {
      "productId": 2,
      "quantity":50
    }
  ]
}
```

- `Not found` - Quando a venda não está cadastrada no banco de dados - Response status `404` (application/json):

```bash
{ "message": "Sale not found" }
```

## `DELETE` /sales/:id

**Deleta a venda com o `id` presente na URL**

Os retornos seguem os formatos abaixo:

- `Deleted - No Content` - Quando a venda é deletada com sucesso - Response status `204`.

- `Not found` - Quando a venda não está cadastrada no banco de dados - Response status `404` (application/json):

```bash
{ "message": "Sale not found" }
```
</details>
</details>

# Instruções para rodar o projeto

<details>
<summary><strong>:whale: Rodando no docker</strong></summary><br />

**:warning: Antes de começar, seu docker-compose precisa estar na versão 1.29 ou superior. [Veja aqui](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt) ou [na documentação](https://docs.docker.com/compose/install/) como instalá-lo. No primeiro artigo, você pode substituir onde está com `1.26.0` por `1.29.2`.**

Clone o repositório:

```bash
  git clone git@github.com:WBomfim/Starwars-Planet-Search.git
```

Entre na pasta do repositório:

```bash
  cd Starwars-Planet-Search
```

Rode os serviços `node` e `db`:

```bash
  docker-compose up -d
```

- Lembre-se de parar o `mysql` se estiver usando localmente na porta padrão (`3306`), ou adapte, caso queria fazer uso da aplicação em containers;
- Esses serviços irão inicializar um container chamado `store_manager` e outro chamado `store_manager_db`;
- A partir daqui você pode rodar o container `store_manager` via CLI ou abri-lo no VS Code.

Acesse o terminal interativo do container criado pelo compose:

```bash
  docker exec -it store_manager bash
```

Instale as dependências dentro do container:

```bash
  npm install
```

**:warning: Atenção:** Caso opte por utilizar o Docker, **TODOS** os comandos disponíveis no `package.json` (npm start, npm run test:mocha, ...) devem ser executados **DENTRO** do container, ou seja, no terminal que aparece após a execução do comando `docker exec` citado acima. 

**:warning: Atenção:** Não rode o comando npm audit fix! Ele atualiza várias dependências do projeto, e essa atualização pode gerar conflitos.

Crie o banco de dados e gere as tabelas:

```sh
  npm run migration
```

Limpe e popule o banco de dados:

```sh
  npm run seed
```

Inicie o servidor Node:

```sh
  npm start
```
</details>

<details>
<summary><strong>💻️ Rodando localmente</strong></summary><br />

Clone o repositório:

```bash
  git clone git@github.com:WBomfim/Starwars-Planet-Search.git
```

Entre na pasta do repositório:

```bash
  cd Starwars-Planet-Search
```

Instale as dependências:

```bash
  npm install
```

**:warning: Atenção:** Não rode o comando npm audit fix! Ele atualiza várias dependências do projeto, e essa atualização pode gerar conflitos.

**:warning: Atenção:** Não esqueça de renomear/configurar o arquivo `.env.example` com as variáveis de ambiente.

**:warning: Atenção:** Para rodar o projeto desta forma, **obrigatoriamente** você deve ter o `Node.js` instalado em seu computador.

**:warning: Atenção:** A versão do `Node.js` e `NPM` a ser utilizada é `"node": ">=16.0.0"` e `"npm": ">=7.0.0"`, como descrito a chave `engines` no arquivo `package.json`. Idealmente deve-se utilizar o Node.js na `versão 16.14`, a versão na que esse projeto foi testado.
</details>

<details>
<summary><strong>➡️ Variáveis de ambiente</strong></summary><br />

Caso opte por rodar a aplicação localmente, na raiz do projeto **renomeie o arquivo `.env.example` para `.env`** e altere as variáveis de ambiente com seus dados locais. Por exemplo, caso o seu usuário SQL seja `nome` e a senha `1234` seu arquivo ficará desta forma:

```sh
  MYSQL_HOST=localhost
  MYSQL_USER=nome
  MYSQL_PASSWORD=1234
  MYSQL_DATABASE=StoreManager
  PORT=3000
```
</details>

<details>
<summary><strong>⏩️ Scripts</strong></summary><br />

Criar o banco de dados e gerar as tabelas:

```sh
  npm run migration
```

Limpar e popular o banco de dados:

```sh
  npm run seed
```

Iniciar o servidor Node:

```sh
  npm start
```

Iniciar o servidor Node com nodemon:

```sh
  npm run debug
```

Executar os testes de unidade:

```sh
  npm run test:mocha
```
</details>

# Demais detalhes

<details>
<summary><strong>🕵🏿 Revisões futuras</strong></summary><br />

- Revisar as funções para possíveis otimizações.
</details>

<details>
<summary><strong>🚀 Próximas implementações</strong></summary><br />

- Implementar testes de integração para garantir a interação de todas as funcionalidades da aplicação e tornar o ambiente mais robusto para  as próximas alterações. 
</details>

# Autor

🖋️ [@Willian Bomfim](https://www.linkedin.com/in/willianbomfim/)
