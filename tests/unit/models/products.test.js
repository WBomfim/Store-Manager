const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const productsModel = require('../../../models/products');

describe('Models - Busca todos os produtos cadastrados no branco de dados', () => {
  beforeEach(sinon.restore);

  describe('Quando não houver produtos cadastrados', () => {
    it('Deve retornar null', async () => {
      sinon.stub(connection, 'execute').resolves([[]]);
      const result = await productsModel.getAllProducts();
      expect(result).to.be.null;
    });
  });

  describe('Quando houver produtos cadastrados', () => {
    const productsTest = [
      {
        "id": 1,
        "name": "Martelo de Thor",
      },
      {
        "id": 2,
        "name": "Traje de encolhimento",
      }
    ];

    it('Deve retornar um array de produtos', async () => {
      sinon.stub(connection, 'execute').resolves([productsTest]);
      const result = await productsModel.getAllProducts();
      expect(result).to.be.an('array');
    });

    it('Os elementos desse array são objetos', async () => {
      sinon.stub(connection, 'execute').resolves([productsTest]);
      const result = await productsModel.getAllProducts();
      result.forEach(product => {
        expect(product).to.be.an('object');
      });
    });

    it('Os elementos desse array possuem as propriedades id e name', async () => {
      sinon.stub(connection, 'execute').resolves([productsTest]);
      const result = await productsModel.getAllProducts();
      expect(result[0]).to.have.keys('id', 'name');
    });
  });
});

describe('Models - Busca um produto pelo id', () => {
  beforeEach(sinon.restore);
  const TESTE_ID = 1;

  describe('Quando o produto não existir', () => {
    it('Deve retornar null', async () => {
      sinon.stub(connection, 'execute').resolves([[]]);
      const result = await productsModel.getProductById(TESTE_ID);
      expect(result).to.be.null;
    });
  });

  describe('Quando o produto existir', () => {
    const productTest = {
      "id": 1,
      "name": "Martelo de Thor",
    };

    it('Deve retornar um objeto', async () => {
      sinon.stub(connection, 'execute').resolves([[productTest]]);
      const result = await productsModel.getProductById(TESTE_ID);
      expect(result).to.be.an('object');
    });

    it('O objeto retornado possui as propriedades id e name', async () => {
      sinon.stub(connection, 'execute').resolves([[productTest]]);
      const result = await productsModel.getProductById(TESTE_ID);
      expect(result).to.have.keys('id', 'name');
    });
  });
});

describe('Models - Cria um novo produto no banco de dados', () => { 
  beforeEach(sinon.restore);
  const newProductTest = 'Martelo de Thor'

  describe('Quando o produto não é criado', () => {
    it('Deve retornar null', async () => {
      sinon.stub(connection, 'execute').resolves([{}]);
      const result = await productsModel.addProduct(newProductTest);
      expect(result).to.be.null;
    });
  });

  describe('Quando o produto for criado com sucesso', () => {
    it('Deve retornar o id do produto criado', async () => {
      sinon.stub(connection, 'execute').resolves([{ insertId: 5 }]);
      const result = await productsModel.addProduct(newProductTest);
      expect(result).to.be.equal(5);
    });
  });
});
