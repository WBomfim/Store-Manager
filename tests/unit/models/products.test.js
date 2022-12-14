const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const productsModel = require('../../../models/products');

describe('Models - Ao buscar todos os produtos cadastrados no branco de dados', () => {
  beforeEach(sinon.restore);

  describe('Quando não houver produtos cadastrados', () => {
    it('Deve retornar null', async () => {
      sinon.stub(connection, 'execute').resolves([[]]);
      const result = await productsModel.getAllProducts();
      expect(result).to.be.null;
    });
  });

  describe('Quando houver produtos cadastrados', () => {
    const PRODUCTS_TEST = [
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
      sinon.stub(connection, 'execute').resolves([PRODUCTS_TEST]);
      const result = await productsModel.getAllProducts();
      expect(result).to.be.an('array');
    });

    it('Os elementos desse array são objetos', async () => {
      sinon.stub(connection, 'execute').resolves([PRODUCTS_TEST]);
      const result = await productsModel.getAllProducts();
      result.forEach(product => {
        expect(product).to.be.an('object');
      });
    });

    it('Os elementos desse array possuem as propriedades id e name', async () => {
      sinon.stub(connection, 'execute').resolves([PRODUCTS_TEST]);
      const result = await productsModel.getAllProducts();
      expect(result[0]).to.have.keys('id', 'name');
    });
  });
});

describe('Models - Ao buscar um produto pelo id', () => {
  beforeEach(sinon.restore);
  const ID_TEST = 1;

  describe('Quando o produto não existir', () => {
    it('Deve retornar null', async () => {
      sinon.stub(connection, 'execute').resolves([[]]);
      const result = await productsModel.getProductById(ID_TEST);
      expect(result).to.be.null;
    });
  });

  describe('Quando o produto existir', () => {
    const PRODUCT_TESTE = { id: 1, name: "Martelo de Thor" };

    it('Deve retornar um objeto', async () => {
      sinon.stub(connection, 'execute').resolves([[PRODUCT_TESTE]]);
      const result = await productsModel.getProductById(ID_TEST);
      expect(result).to.be.an('object');
    });

    it('O objeto retornado possui as propriedades id e name', async () => {
      sinon.stub(connection, 'execute').resolves([[PRODUCT_TESTE]]);
      const result = await productsModel.getProductById(ID_TEST);
      expect(result).to.have.keys('id', 'name');
    });
  });
});

describe('Models - Ao buscar um produto pelo nome', () => {
  beforeEach(sinon.restore);
  const NAME_TEST = 'Martelo';

  describe('Quando o produto não existir', () => {
    it('Deve retornar null', async () => {
      sinon.stub(connection, 'execute').resolves([[]]);
      const result = await productsModel.searchProduct(NAME_TEST);
      expect(result).to.be.null;
    });
  });

  describe('Quando o produto existir', () => {
    const PRODUCT_TESTE = [
      {
        "id": 1,
        "name": "Martelo de Thor",
      },
      {
        "id": 2,
        "name": "Martelo do Batman",
      }
    ];

    it('Deve retornar um array de produtos', async () => {
      sinon.stub(connection, 'execute').resolves([PRODUCT_TESTE]);
      const result = await productsModel.searchProduct(NAME_TEST);
      expect(result).to.be.an('array');
    });

    it('Os elementos desse array são objetos', async () => {
      sinon.stub(connection, 'execute').resolves([PRODUCT_TESTE]);
      const result = await productsModel.searchProduct(NAME_TEST);
      result.forEach((product) => {
        expect(product).to.be.an('object');
      });
    });

    it('Os elementos desse array possuem as propriedades id e name', async () => {
      sinon.stub(connection, 'execute').resolves([PRODUCT_TESTE]);
      const result = await productsModel.searchProduct(NAME_TEST);
      result.forEach((product) => {
        expect(product).to.have.keys('id', 'name');
      });
    });
  });
});

describe('Models - Ao criar um novo produto no banco de dados', () => { 
  beforeEach(sinon.restore);
  const NEW_PRODUCT_TEST = 'Martelo de Thor'

  describe('Quando o produto não é criado', () => {
    it('Deve retornar null', async () => {
      sinon.stub(connection, 'execute').resolves([{}]);
      const result = await productsModel.addProduct(NEW_PRODUCT_TEST);
      expect(result).to.be.null;
    });
  });

  describe('Quando o produto for criado com sucesso', () => {
    it('Deve retornar o id do produto criado', async () => {
      sinon.stub(connection, 'execute').resolves([{ insertId: 5 }]);
      const result = await productsModel.addProduct(NEW_PRODUCT_TEST);
      expect(result).to.be.equal(5);
    });
  });
});

describe('Models - Ao atualizar um produto no banco de dados', () => {
  beforeEach(sinon.restore);
  const ID_TEST = 1;
  const NEW_NAME_TEST = 'Martelo de Thor';

  describe('Quando o produto for atualizado com sucesso', () => {
    it('A função "updateProduct" deve chamar o "connection.execute"', async () => {
      const updatedProduct = sinon.stub(connection, 'execute').resolves([{}]);
      await productsModel.updateProduct(ID_TEST, NEW_NAME_TEST);
      expect(updatedProduct.called).to.be.true;
    });
  });
});

describe('Models - Ao deletar um produto no banco de dados', () => {
  beforeEach(sinon.restore);
  const ID_TEST = 1;

  describe('Quando o produto for deletado com sucesso', () => {
    it('A função "deleteProduct" deve chamar o "connection.execute"', async () => {
      const deletedProduct = sinon.stub(connection, 'execute').resolves([{}]);
      await productsModel.deleteProduct(ID_TEST);
      expect(deletedProduct.called).to.be.true;
    });
  });
});
