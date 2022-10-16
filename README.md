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
  <summary>📄 Documentação</summary>
  
### Server: `http://localhost:3000`

## `GET` /products

**Lista todos os produtos cadastrados no banco de dados**

Os produtos possuem `id` e `nome`

- `Ok` - Response status `200` (application/json):

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

- `Bad request` - Response status `404` (application/json):

```bash
{ "message": "Products not found" }
```
</details>

# Instruções para rodar o Projeto

<details>
  <summary><strong>🛠 Passo a passo</strong></summary><br />

Clone o repositório

```bash
  git@github.com:WBomfim/Starwars-Planet-Search.git
```

Entre na pasta do repositório

```bash
  cd Starwars-Planet-Search
```

Instale as dependências

```bash
  npm install
```

Inicie o projeto

```bash
  npm start
```
</details>

# Demais detalhes

<details>
  <summary><strong>🕵🏿 Revisões futuras</strong></summary><br />

  - Revisar a presença de estados derivados e possíveis otimizações nas funções de filtro.
</details>

<details>
  <summary><strong>🚀 Próximas implementações</strong></summary><br />

  - Implementar responsividade para que seja possível utilizar a aplicação em todos os formatos de tela.
  - Implementar testes para garantir a qualidade da aplicação e robustez para próximas alterações. 
</details>

# Autor

🖋️ [@Willian Bomfim](https://github.com/WBomfim)
