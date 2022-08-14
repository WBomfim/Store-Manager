const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../models/products');
const productsService = require('../../../services/products');

describe('Services - Busca todos os produtos cadastrados no branco de dados', () => {
  beforeEach(sinon.restore);

  describe('Quando não houver produtos cadastrados', () => {
    it('Deve retornar um objeto com a chave error', async () => {
      sinon.stub(productsModel, 'getAllProducts').resolves(null);
      const result = await productsService.getAllProducts();
      expect(result).to.be.an('object');
      expect(result).to.have.property('error');
    });

    it('A chave error deve conter a mensagem "Products not found"', async () => {
      const messageError = 'Products not found';
      sinon.stub(productsModel, 'getAllProducts').resolves(null);
      const result = await productsService.getAllProducts();
      expect(result.error).to.be.equal(messageError);
    });
  });

  describe('Quando houver produtos cadastrados', () => {
    const productsTest = [{
        "id": 1,
        "name": "Martelo de Thor",
      },
      {
        "id": 2,
        "name": "Traje de encolhimento",
      }
    ];

    it('Deve retornar um objeto com a chave data', async () => {
      sinon.stub(productsModel, 'getAllProducts').resolves(productsTest);
      const result = await productsService.getAllProducts();
      expect(result).to.be.an('object');
      expect(result).to.have.property('data');
    });

    it('A chave data deve conter um array com objetos', async () => {
      sinon.stub(productsModel, 'getAllProducts').resolves(productsTest);
      const result = await productsService.getAllProducts();
      expect(result.data).to.be.an('array');
      result.data.forEach(product => {
        expect(product).to.be.an('object');
      });
    });

    it('Os elementos desse array possuem as propriedades id e name', async () => {
      sinon.stub(productsModel, 'getAllProducts').resolves(productsTest);
      const result = await productsService.getAllProducts();
      expect(result.data[0]).to.have.keys('id', 'name');
    });
  });
});

describe('Services - Busca um produto pelo id', () => {
  beforeEach(sinon.restore);
  const TESTE_ID = 1;

  describe('Quando o produto não existir', () => {
    it('Deve retornar um objeto com a chave error', async () => {
      sinon.stub(productsModel, 'getProductById').resolves(null);
      const result = await productsService.getProductById(TESTE_ID);
      expect(result).to.be.an('object');
      expect(result).to.have.property('error');
    });

    it('A chave error deve conter a mensagem "Product not found"', async () => {
      const messageError = 'Product not found';
      sinon.stub(productsModel, 'getProductById').resolves(null);
      const result = await productsService.getProductById(TESTE_ID);
      expect(result.error).to.be.equal(messageError);
    });
  });

  describe('Quando o produto existir', () => {
    const productTest = {
      "id": 1,
      "name": "Martelo de Thor",
    };

    it('Deve retornar um objeto com a chave data', async () => {
      sinon.stub(productsModel, 'getProductById').resolves(productTest);
      const result = await productsService.getProductById(TESTE_ID);
      expect(result).to.be.an('object');
      expect(result).to.have.property('data');
    });

    it('A chave data deve conter um objeto', async () => {
      sinon.stub(productsModel, 'getProductById').resolves(productTest);
      const result = await productsService.getProductById(TESTE_ID);
      expect(result.data).to.be.an('object');
    });

    it('O objeto possui as propriedades id e name', async () => {
      sinon.stub(productsModel, 'getProductById').resolves(productTest);
      const result = await productsService.getProductById(TESTE_ID);
      expect(result.data).to.have.keys('id', 'name');
    });
  });
});
