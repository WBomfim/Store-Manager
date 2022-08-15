const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../models/products');
const productsService = require('../../../services/products');

describe('Services - Busca todos os produtos cadastrados no branco de dados', () => {
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
      const result = await productsService.getAllProducts();
      expect(result.code).to.be.equal(404);
    });

    it('A chave error deve conter a mensagem "Products not found"', async () => {
      const ERROR_MESSAGE = 'Products not found';
      sinon.stub(productsModel, 'getAllProducts').resolves(null);
      const result = await productsService.getAllProducts();
      expect(result.error).to.be.equal(ERROR_MESSAGE);
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
      const result = await productsService.getAllProducts();
      expect(result.code).to.be.equal(200);
    });

    it('A chave data deve conter um array com objetos', async () => {
      sinon.stub(productsModel, 'getAllProducts').resolves(PRODUCTS_TEST);
      const result = await productsService.getAllProducts();
      expect(result.data).to.be.an('array');
      result.data.forEach(product => {
        expect(product).to.be.an('object');
      });
    });

    it('Os elementos desse array possuem as propriedades id e name', async () => {
      sinon.stub(productsModel, 'getAllProducts').resolves(PRODUCTS_TEST);
      const result = await productsService.getAllProducts();
      expect(result.data[0]).to.have.keys('id', 'name');
    });
  });
});

describe('Services - Busca um produto pelo id', () => {
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
      const result = await productsService.getProductById(ID_TEST);
      expect(result.code).to.be.equal(404);
    });

    it('A chave error deve conter a mensagem "Product not found"', async () => {
      const ERROR_MESSAGE = 'Product not found';
      sinon.stub(productsModel, 'getProductById').resolves(null);
      const result = await productsService.getProductById(ID_TEST);
      expect(result.error).to.be.equal(ERROR_MESSAGE);
    });
  });

  describe('Quando o produto existir', () => {
    const PRODUCT_TEST = {
      "id": 1,
      "name": "Martelo de Thor",
    };

    it('Deve retornar um objeto com as chaves code e data', async () => {
      sinon.stub(productsModel, 'getProductById').resolves(PRODUCT_TEST);
      const result = await productsService.getProductById(ID_TEST);
      expect(result).to.be.an('object');
      expect(result).to.have.keys('code', 'data');
    });

    it('A chave code deve conter o código 200', async () => {
      sinon.stub(productsModel, 'getProductById').resolves(PRODUCT_TEST);
      const result = await productsService.getProductById(ID_TEST);
      expect(result.code).to.be.equal(200);
    });

    it('A chave data deve conter um objeto', async () => {
      sinon.stub(productsModel, 'getProductById').resolves(PRODUCT_TEST);
      const result = await productsService.getProductById(ID_TEST);
      expect(result.data).to.be.an('object');
    });

    it('O objeto possui as propriedades id e name', async () => {
      sinon.stub(productsModel, 'getProductById').resolves(PRODUCT_TEST);
      const result = await productsService.getProductById(ID_TEST);
      expect(result.data).to.have.keys('id', 'name');
    });
  });
});

describe('Services - Criando um novo produto', () => {
  beforeEach(sinon.restore);
  const CORRECT_NAME_TEST = 'Martelo de Thor';
  const INSERT_ID_TEST = 5;

  describe('Quando o nome do produto não é enviado na requisição', () => {
    it('Deve retornar um objeto com as chaves code e error', async () => {
      const result = await productsService.addProduct();
      expect(result).to.be.an('object');
      expect(result).to.have.keys('code', 'error');
    });

    it('A chave code deve conter o código 400', async () => {
      const result = await productsService.addProduct();
      expect(result.code).to.be.equal(400);
    });

    it('A chave error deve conter a mensagem ""name" is required"', async () => {
      const ERROR_MESSAGE = '"name" is required';
      const result = await productsService.addProduct();
      expect(result.error).to.be.equal(ERROR_MESSAGE);
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
      const result = await productsService.addProduct(12345);
      expect(result.code).to.be.equal(400);
    });

    it('A chave error deve conter a mensagem ""name" must be a string"', async () => {
      const ERROR_MESSAGE = '"name" must be a string';
      const result = await productsService.addProduct(INCORRECT_NAME_TEST);
      expect(result.error).to.be.equal(ERROR_MESSAGE);
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
      const result = await productsService.addProduct(INCORRECT_NAME_TEST);
      expect(result.code).to.be.equal(422);
    });

    it('A chave error deve conter a mensagem ""name" length must be at least 5 characters long"', async () => {
      const ERROR_MESSAGE = '"name" length must be at least 5 characters long';
      const result = await productsService.addProduct(INCORRECT_NAME_TEST);
      expect(result.error).to.be.equal(ERROR_MESSAGE);
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
      const result = await productsService.addProduct(CORRECT_NAME_TEST);
      expect(result.code).to.be.equal(501);
    });

    it('A chave error deve conter a mensagem "Product not inserted"', async () => {
      const ERROR_MESSAGE = 'Product not added';
      sinon.stub(productsModel, 'addProduct').resolves(null);
      const result = await productsService.addProduct(CORRECT_NAME_TEST);
      expect(result.error).to.be.equal(ERROR_MESSAGE);
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
      const result = await productsService.addProduct(CORRECT_NAME_TEST);
      expect(result.code).to.be.equal(201);
    });

    it('A chave data deve conter um objeto com as chaves id e name', async () => {
      sinon.stub(productsModel, 'addProduct').resolves(INSERT_ID_TEST);
      const result = await productsService.addProduct(CORRECT_NAME_TEST);
      expect(result.data).to.be.an('object');
      expect(result.data).to.have.keys('id', 'name');
    });

    it('As informações da chave data devem estar corretas', async () => {
      const CORRECT_DATA = { id: INSERT_ID_TEST, name: CORRECT_NAME_TEST };
      sinon.stub(productsModel, 'addProduct').resolves(INSERT_ID_TEST);
      const result = await productsService.addProduct(CORRECT_NAME_TEST);
      expect(result.data).to.be.deep.equal(CORRECT_DATA);
    });
  });
});
