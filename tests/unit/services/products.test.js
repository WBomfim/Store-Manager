const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../models/products');
const productsService = require('../../../services/products');

describe('Services - Ao buscar todos os produtos cadastrados no branco de dados', () => {
  beforeEach(sinon.restore);

  describe('Quando não houver produtos cadastrados', () => {
    it('Deve retornar um objeto com as chaves code e error', async () => {
      sinon.stub(productsModel, 'getAllProducts').resolves(null);
      const result = await productsService.getAllProducts();
      expect(result).to.be.an('object');
      expect(result).to.have.keys('code', 'error');
    });

    it('A chave code deve conter o código 404', async () => {
      sinon.stub(productsModel, 'getAllProducts').resolves(null);
      const { code } = await productsService.getAllProducts();
      expect(code).to.be.equal(404);
    });

    it('A chave error deve conter a mensagem "Products not found"', async () => {
      const ERROR_MESSAGE = 'Products not found';
      sinon.stub(productsModel, 'getAllProducts').resolves(null);
      const { error } = await productsService.getAllProducts();
      expect(error).to.be.equal(ERROR_MESSAGE);
    });
  });

  describe('Quando houver produtos cadastrados', () => {
    const PRODUCTS_TEST = [{
        "id": 1,
        "name": "Martelo de Thor",
      },
      {
        "id": 2,
        "name": "Traje de encolhimento",
      }
    ];

    it('Deve retornar um objeto com as chaves code e data', async () => {
      sinon.stub(productsModel, 'getAllProducts').resolves(PRODUCTS_TEST);
      const result = await productsService.getAllProducts();
      expect(result).to.be.an('object');
      expect(result).to.have.keys('code', 'data');
    });

    it('A chave code deve conter o código 200', async () => {
      sinon.stub(productsModel, 'getAllProducts').resolves(PRODUCTS_TEST);
      const { code } = await productsService.getAllProducts();
      expect(code).to.be.equal(200);
    });

    it('A chave data deve conter um array com objetos', async () => {
      sinon.stub(productsModel, 'getAllProducts').resolves(PRODUCTS_TEST);
      const { data } = await productsService.getAllProducts();
      expect(data).to.be.an('array');
      data.forEach(product => {
        expect(product).to.be.an('object');
      });
    });

    it('Os elementos desse array possuem as propriedades id e name', async () => {
      sinon.stub(productsModel, 'getAllProducts').resolves(PRODUCTS_TEST);
      const { data } = await productsService.getAllProducts();
      data.forEach(product => {
        expect(product).to.have.keys('id', 'name');
      });
    });
  });
});

describe('Services - Ao buscar um produto pelo id', () => {
  beforeEach(sinon.restore);
  const ID_TEST = 5;

  describe('Quando o produto não existir', () => {
    it('Deve retornar um objeto com as chaves code e error', async () => {
      sinon.stub(productsModel, 'getProductById').resolves(null);
      const result = await productsService.getProductById(ID_TEST);
      expect(result).to.be.an('object');
      expect(result).to.have.keys('code', 'error');
    });

    it('A chave code deve conter o código 404', async () => { 
      sinon.stub(productsModel, 'getProductById').resolves(null);
      const { code } = await productsService.getProductById(ID_TEST);
      expect(code).to.be.equal(404);
    });

    it('A chave error deve conter a mensagem "Product not found"', async () => {
      const ERROR_MESSAGE = 'Product not found';
      sinon.stub(productsModel, 'getProductById').resolves(null);
      const { error } = await productsService.getProductById(ID_TEST);
      expect(error).to.be.equal(ERROR_MESSAGE);
    });
  });

  describe('Quando o produto existir', () => {
    const PRODUCT_TEST = { id: 1, name: "Martelo de Thor" };

    it('Deve retornar um objeto com as chaves code e data', async () => {
      sinon.stub(productsModel, 'getProductById').resolves(PRODUCT_TEST);
      const result = await productsService.getProductById(ID_TEST);
      expect(result).to.be.an('object');
      expect(result).to.have.keys('code', 'data');
    });

    it('A chave code deve conter o código 200', async () => {
      sinon.stub(productsModel, 'getProductById').resolves(PRODUCT_TEST);
      const { code } = await productsService.getProductById(ID_TEST);
      expect(code).to.be.equal(200);
    });

    it('A chave data deve conter um objeto', async () => {
      sinon.stub(productsModel, 'getProductById').resolves(PRODUCT_TEST);
      const { data } = await productsService.getProductById(ID_TEST);
      expect(data).to.be.an('object');
    });

    it('O objeto possui as propriedades id e name', async () => {
      sinon.stub(productsModel, 'getProductById').resolves(PRODUCT_TEST);
      const { data } = await productsService.getProductById(ID_TEST);
      expect(data).to.have.keys('id', 'name');
    });
  });
});

describe('Services - Ao pesquisar um produto pelo nome', () => {
  beforeEach(sinon.restore);
  const NAME_TEST = 'Martelo';

  describe('Quando não for recebido o parametro "name"', () => {
    it('Deve retornar todos os produtos cadastrados', async () => {
      const PRODUCTS_TEST = [
        { id: 1, name: "Martelo de Thor" },
        { id: 2, name: "Traje de encolhimento" }
      ];
      sinon.stub(productsModel, 'getAllProducts').resolves(PRODUCTS_TEST);
      const { data } = await productsService.searchProduct();
      expect(data).to.be.an('array');
      expect(data).to.have.lengthOf(2);
    });
  });

  describe('Quando o produto não existir', () => {
    it('Deve retornar um objeto com as chaves code e data', async () => {
      sinon.stub(productsModel, 'searchProduct').resolves(null);
      const result = await productsService.searchProduct(NAME_TEST);
      expect(result).to.be.an('object');
      expect(result).to.have.keys('code', 'data');
    })

    it('A chave code deve conter o código 200', async () => {
      sinon.stub(productsModel, 'searchProduct').resolves(null);
      const { code } = await productsService.searchProduct(NAME_TEST);
      expect(code).to.be.equal(200);
    });

    it('A chave data deve conter um array vazio', async () => {
      sinon.stub(productsModel, 'searchProduct').resolves(null);
      const { data } = await productsService.searchProduct(NAME_TEST);
      expect(data).to.be.an('array');
      expect(data).to.be.empty;
    });
  });

  describe('Quando o produto ou produtos existir', () => {
    const PRODUCTS_TEST = [
      { id: 1, name: "Martelo de Thor" },
      { id: 2, name: "Traje de encolhimento" }
    ];

    it('Deve retornar um objeto com as chaves code e data', async () => {
      sinon.stub(productsModel, 'searchProduct').resolves(PRODUCTS_TEST);
      const result = await productsService.searchProduct(NAME_TEST);
      expect(result).to.be.an('object');
      expect(result).to.have.keys('code', 'data');
    });

    it('A chave code deve conter o código 200', async () => {
      sinon.stub(productsModel, 'searchProduct').resolves(PRODUCTS_TEST);
      const { code } = await productsService.searchProduct(NAME_TEST);
      expect(code).to.be.equal(200);
    });

    it('A chave data deve conter um array com objetos', async () => {
      sinon.stub(productsModel, 'searchProduct').resolves(PRODUCTS_TEST);
      const { data } = await productsService.searchProduct(NAME_TEST);
      expect(data).to.be.an('array');
      data.forEach((product) => {
        expect(product).to.be.an('object');
      });
    });

    it('Os elementos desse array possuem as propriedades id e name', async () => {
      sinon.stub(productsModel, 'searchProduct').resolves(PRODUCTS_TEST);
      const { data } = await productsService.searchProduct(NAME_TEST);
      data.forEach((product) => {
        expect(product).to.have.keys('id', 'name');
      });
    });
  });
});

describe('Services - Ao criar um novo produto', () => {
  beforeEach(sinon.restore);
  const CORRECT_NAME_TEST = 'Martelo de Thor';
  const INSERT_ID_TEST = 5;

  describe('Quando o nome do produto não é enviado na requisição', () => {
    it('Deve retornar um objeto com as chaves code e error', async () => {
      const result = await productsService.updateProduct();
      expect(result).to.be.an('object');
      expect(result).to.have.keys('code', 'error');
    });

    it('A chave code deve conter o código 400', async () => {
      const { code } = await productsService.updateProduct();
      expect(code).to.be.equal(400);
    });

    it('A chave error deve conter a mensagem ""name" is required"', async () => {
      const ERROR_MESSAGE = '"name" is required';
      const { error } = await productsService.updateProduct();
      expect(error).to.be.equal(ERROR_MESSAGE);
    });
  });

  describe('Quando o nome do produto não é uma palavra', () => {
    const INCORRECT_NAME_TEST = 12345;

    it('Deve retornar um objeto com as chaves code e error', async () => {
      const result = await productsService.addProduct(INCORRECT_NAME_TEST);
      expect(result).to.be.an('object');
      expect(result).to.have.keys('code', 'error');
    });

    it('A chave code deve conter o código 400', async () => {
      const { code } = await productsService.addProduct(INCORRECT_NAME_TEST);
      expect(code).to.be.equal(400);
    });

    it('A chave error deve conter a mensagem ""name" must be a string"', async () => {
      const ERROR_MESSAGE = '"name" must be a string';
      const { error } = await productsService.addProduct(INCORRECT_NAME_TEST);
      expect(error).to.be.equal(ERROR_MESSAGE);
    });
  });

  describe('Quando o nome do produto tem menos de 5 caracteres', () => {
    const INCORRECT_NAME_TEST = 'Thor';
    it('Deve retornar um objeto com as chaves code e error', async () => {
      const result = await productsService.addProduct(INCORRECT_NAME_TEST);
      expect(result).to.be.an('object');
      expect(result).to.have.keys('code', 'error');
    });

    it('A chave code deve conter o código 422', async () => {
      const { code } = await productsService.addProduct(INCORRECT_NAME_TEST);
      expect(code).to.be.equal(422);
    });

    it('A chave error deve conter a mensagem ""name" length must be at least 5 characters long"',
      async () => {
        const ERROR_MESSAGE = '"name" length must be at least 5 characters long';
        const { error } = await productsService.addProduct(INCORRECT_NAME_TEST);
        expect(error).to.be.equal(ERROR_MESSAGE);
    });
  });

  describe('Quando não é inserido o produto no banco de dados', () => {
    it('Deve retornar um objeto com as chaves code e error', async () => {
      sinon.stub(productsModel, 'addProduct').resolves(null);
      const result = await productsService.addProduct(CORRECT_NAME_TEST);
      expect(result).to.be.an('object');
      expect(result).to.have.keys('code', 'error');
    });

    it('A chave code deve conter o código 501', async () => {
      sinon.stub(productsModel, 'addProduct').resolves(null);
      const { code } = await productsService.addProduct(CORRECT_NAME_TEST);
      expect(code).to.be.equal(501);
    });

    it('A chave error deve conter a mensagem "Product not added"', async () => {
      const ERROR_MESSAGE = 'Product not added';
      sinon.stub(productsModel, 'addProduct').resolves(null);
      const { error } = await productsService.addProduct(CORRECT_NAME_TEST);
      expect(error).to.be.equal(ERROR_MESSAGE);
    });
  });

  describe('Quando o produto é inserido no banco de dados', () => {
    it('Deve retornar um objeto com as chaves code e data', async () => {
      sinon.stub(productsModel, 'addProduct').resolves(INSERT_ID_TEST);
      const result = await productsService.addProduct(CORRECT_NAME_TEST);
      expect(result).to.be.an('object');
      expect(result).to.have.keys('code', 'data');
    });

    it('A chave code deve conter o código 201', async () => {
      sinon.stub(productsModel, 'addProduct').resolves(INSERT_ID_TEST);
      const { code } = await productsService.addProduct(CORRECT_NAME_TEST);
      expect(code).to.be.equal(201);
    });

    it('A chave data deve conter um objeto com as chaves id e name', async () => {
      sinon.stub(productsModel, 'addProduct').resolves(INSERT_ID_TEST);
      const { data } = await productsService.addProduct(CORRECT_NAME_TEST);
      expect(data).to.be.an('object');
      expect(data).to.have.keys('id', 'name');
    });

    it('As informações da chave data devem estar corretas', async () => {
      const CORRECT_DATA = { id: INSERT_ID_TEST, name: CORRECT_NAME_TEST };
      sinon.stub(productsModel, 'addProduct').resolves(INSERT_ID_TEST);
      const { data } = await productsService.addProduct(CORRECT_NAME_TEST);
      expect(data).to.be.deep.equal(CORRECT_DATA);
    });
  });
});

describe('Services - Ao atualizar um produto', () => {
  beforeEach(sinon.restore);
  const ID_TEST = 1;
  
  describe('Quando o nome do produto não é enviado na requisição', () => {
    const EMPTY_NAME_TEST = '';

    it('Deve retornar um objeto com as chaves code e error', async () => {
      const result = await productsService.updateProduct(ID_TEST, EMPTY_NAME_TEST);
      expect(result).to.be.an('object');
      expect(result).to.have.keys('code', 'error');
    });

    it('A chave code deve conter o código 400', async () => {
      const { code } = await productsService.updateProduct();
      expect(code).to.be.equal(400);
    });

    it('A chave error deve conter a mensagem ""name" is required"', async () => {
      const ERROR_MESSAGE = '"name" is required';
      const { error } = await productsService.updateProduct();
      expect(error).to.be.equal(ERROR_MESSAGE);
    });
  });

  describe('Quando o nome do produto não é uma palavra', () => {
    const INCORRECT_NAME_TEST = 12345;

    it('Deve retornar um objeto com as chaves code e error', async () => {
      const result = await productsService.updateProduct(ID_TEST, INCORRECT_NAME_TEST);
      expect(result).to.be.an('object');
      expect(result).to.have.keys('code', 'error');
    });

    it('A chave code deve conter o código 400', async () => {
      const { code } = await productsService.updateProduct(ID_TEST, INCORRECT_NAME_TEST);
      expect(code).to.be.equal(400);
    });

    it('A chave error deve conter a mensagem ""name" must be a string"', async () => {
      const ERROR_MESSAGE = '"name" must be a string';
      const { error } = await productsService.updateProduct(ID_TEST, INCORRECT_NAME_TEST);
      expect(error).to.be.equal(ERROR_MESSAGE);
    });
  });

  describe('Quando o nome do produto tem menos de 5 caracteres', () => {
    const INCORRECT_NAME_TEST = 'Thor';
    it('Deve retornar um objeto com as chaves code e error', async () => {
      const result = await productsService.updateProduct(ID_TEST, INCORRECT_NAME_TEST);
      expect(result).to.be.an('object');
      expect(result).to.have.keys('code', 'error');
    });

    it('A chave code deve conter o código 422', async () => {
      const { code } = await productsService.updateProduct(ID_TEST, INCORRECT_NAME_TEST);
      expect(code).to.be.equal(422);
    });

    it('A chave error deve conter a mensagem ""name" length must be at least 5 characters long"',
      async () => {
        const ERROR_MESSAGE = '"name" length must be at least 5 characters long';
        const { error } = await productsService.updateProduct(ID_TEST, INCORRECT_NAME_TEST);
        expect(error).to.be.equal(ERROR_MESSAGE);
    });
  });

  describe('Quando o produto não é encontrado no banco de dados', () => {
    const CORRECT_NAME_TEST = 'Thor: Ragnarok';

    it('Deve retornar um objeto com as chaves code e error', async () => {
      sinon.stub(productsModel, 'getProductById').resolves(null);
      const result = await productsService.updateProduct(ID_TEST, CORRECT_NAME_TEST);
      expect(result).to.be.an('object');
      expect(result).to.have.keys('code', 'error');
    });

    it('A chave code deve conter o código 404', async () => {
      sinon.stub(productsModel, 'getProductById').resolves(null);
      const { code } = await productsService.updateProduct(ID_TEST, CORRECT_NAME_TEST);
      expect(code).to.be.equal(404);
    });

    it('A chave error deve conter a mensagem "Product not found"', async () => {
      const ERROR_MESSAGE = 'Product not found';
      sinon.stub(productsModel, 'getProductById').resolves(null);
      const { error } = await productsService.updateProduct(ID_TEST, CORRECT_NAME_TEST);
      expect(error).to.be.equal(ERROR_MESSAGE);
    });
  });

  describe('Quando o produto é atualizado no banco de dados', () => {
    const CORRECT_NAME_TEST = 'Martelo do Batman';
    const RETURN_PRODUCT_TEST = { id: ID_TEST, name: 'Martelo do Thor' };

    it('Deve retornar um objeto com as chaves code e data', async () => {
      sinon.stub(productsModel, 'getProductById').resolves(RETURN_PRODUCT_TEST);
      sinon.stub(productsModel, 'updateProduct').resolves(true);
      const result = await productsService.updateProduct(ID_TEST, CORRECT_NAME_TEST);
      expect(result).to.be.an('object');
      expect(result).to.have.keys('code', 'data');
    });

    it('A chave code deve conter o código 200', async () => {
      sinon.stub(productsModel, 'getProductById').resolves(RETURN_PRODUCT_TEST);
      sinon.stub(productsModel, 'updateProduct').resolves(true);
      const { code } = await productsService.updateProduct(ID_TEST, CORRECT_NAME_TEST);
      expect(code).to.be.equal(200);
    });

    it('A chave data deve conter as informações do produto atualizado', async () => {
      const UPDATED_PRODUCT = { id: ID_TEST, name: CORRECT_NAME_TEST };
      sinon.stub(productsModel, 'getProductById').resolves(RETURN_PRODUCT_TEST);
      sinon.stub(productsModel, 'updateProduct').resolves(true);
      const { data } = await productsService.updateProduct(ID_TEST, CORRECT_NAME_TEST);
      expect(data).to.be.deep.equal(UPDATED_PRODUCT);
    });
  });
});

describe('Quando um produto é excluído', () => {
  beforeEach(sinon.restore);
  const ID_TEST = 5;

  describe('Quando o produto não está cadastrado no banco de dados', () => {
    it('Deve retornar um objeto com as chaves code e error', async () => {
      sinon.stub(productsModel, 'getProductById').resolves(null);
      const result = await productsService.deleteProduct(ID_TEST);
      expect(result).to.be.an('object');
      expect(result).to.have.keys('code', 'error');
    });

    it('A chave code deve conter o código 404', async () => {
      sinon.stub(productsModel, 'getProductById').resolves(null);
      const { code } = await productsService.deleteProduct(ID_TEST);
      expect(code).to.be.equal(404);
    });

    it('A chave error deve conter a mensagem "Product not found"', async () => {
      const ERROR_MESSAGE = 'Product not found';
      sinon.stub(productsModel, 'getProductById').resolves(null);
      const { error } = await productsService.deleteProduct(ID_TEST);
      expect(error).to.be.equal(ERROR_MESSAGE);
    });
  });

  describe('Quando o produto é excluído do banco de dados', () => {
    const RETURN_PRODUCT_TEST = { id: ID_TEST, name: 'Martelo do Thor' };

    it('Deve retornar um objeto com as chaves code e data', async () => {
      sinon.stub(productsModel, 'getProductById').resolves(RETURN_PRODUCT_TEST);
      sinon.stub(productsModel, 'deleteProduct').resolves(true);
      const result = await productsService.deleteProduct(ID_TEST);
      expect(result).to.be.an('object');
      expect(result).to.have.keys('code', 'data');
    });

    it('A chave code deve conter o código 204', async () => {
      sinon.stub(productsModel, 'getProductById').resolves(RETURN_PRODUCT_TEST);
      sinon.stub(productsModel, 'deleteProduct').resolves(true);
      const { code } = await productsService.deleteProduct(ID_TEST);
      expect(code).to.be.equal(204);
    });

    it('A chave data deve conter um objeto vazio', async () => {
      sinon.stub(productsModel, 'getProductById').resolves(RETURN_PRODUCT_TEST);
      sinon.stub(productsModel, 'deleteProduct').resolves(true);
      const { data } = await productsService.deleteProduct(ID_TEST);
      expect(data).to.be.deep.equal({});
    });
  });
});
