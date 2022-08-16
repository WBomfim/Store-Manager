const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../models/sales');
const salesService = require('../../../services/sales');
const productsModel = require('../../../models/products');

describe('Service - Ao adicionar uma nova venda', () => {
  beforeEach(sinon.restore);
  
  describe('Quando não é enviado o id do produto no objeto com as infomações', () => {
    const SALE_INCORRECT_TEST = [{ "quantity": 1 }];

    it('Deve retornar um objeto com as chaves code e error', async () => {
      const result = await salesService.addSale(SALE_INCORRECT_TEST);
      expect(result).to.be.an('object');
      expect(result).to.have.keys('code', 'error');
    });

    it('A chave code deve conter o código 400', async () => {
      const result = await salesService.addSale(SALE_INCORRECT_TEST);
      expect(result.code).to.be.equal(400);
    });

    it('A chave error deve conter a mensagem "productId" is required', async () => {
      const ERROR_MESSAGE = '"productId" is required';
      const result = await salesService.addSale(SALE_INCORRECT_TEST);
      expect(result.error).to.be.equal(ERROR_MESSAGE);
    });
  });

  describe('Quando não é enviado a quantidade do produto no objeto com as infomações', () => {
    const SALE_INCORRECT_TEST = [{ "productId": 1 }];

    it('Deve retornar um objeto com as chaves code e error', async () => {
      const result = await salesService.addSale(SALE_INCORRECT_TEST);
      expect(result).to.be.an('object');
      expect(result).to.have.keys('code', 'error');
    });

    it('A chave code deve conter o código 400', async () => {
      const result = await salesService.addSale(SALE_INCORRECT_TEST);
      expect(result.code).to.be.equal(400);
    });

    it('A chave error deve conter a mensagem "quantity" is required', async () => {
      const ERROR_MESSAGE = '"quantity" is required';
      const result = await salesService.addSale(SALE_INCORRECT_TEST);
      expect(result.error).to.be.equal(ERROR_MESSAGE);
    });
  });

  describe('Quando o id do produto não é um número', () => {
    const SALE_INCORRECT_TEST = [{ "productId": "A", "quantity": 1 }];

    it('Deve retornar um objeto com as chaves code e error', async () => {
      const result = await salesService.addSale(SALE_INCORRECT_TEST);
      expect(result).to.be.an('object');
      expect(result).to.have.keys('code', 'error');
    });

    it('A chave code deve conter o código 400', async () => {
      const result = await salesService.addSale(SALE_INCORRECT_TEST);
      expect(result.code).to.be.equal(400);
    });

    it('A chave error deve conter a mensagem "productId" must be a number', async () => {
      const ERROR_MESSAGE = '"productId" must be a number';
      const result = await salesService.addSale(SALE_INCORRECT_TEST);
      expect(result.error).to.be.equal(ERROR_MESSAGE);
    });
  });

  describe('Quando a quantidade do produto não é um número', () => {
    const SALE_INCORRECT_TEST = [{ "productId": 1, "quantity": "A" }];

    it('Deve retornar um objeto com as chaves code e error', async () => {
      const result = await salesService.addSale(SALE_INCORRECT_TEST);
      expect(result).to.be.an('object');
      expect(result).to.have.keys('code', 'error');
    });

    it('A chave code deve conter o código 400', async () => {
      const result = await salesService.addSale(SALE_INCORRECT_TEST);
      expect(result.code).to.be.equal(400);
    });

    it('A chave error deve conter a mensagem "quantity" must be a number', async () => {
      const ERROR_MESSAGE = '"quantity" must be a number';
      const result = await salesService.addSale(SALE_INCORRECT_TEST);
      expect(result.error).to.be.equal(ERROR_MESSAGE);
    });
  });

  describe('Quando a quantidade do produto é menor ou igual a 0', () => {
    const SALE_INCORRECT_TEST = [{ "productId": 1, "quantity": 0 }];

    it('Deve retornar um objeto com as chaves code e error', async () => {
      const result = await salesService.addSale(SALE_INCORRECT_TEST);
      expect(result).to.be.an('object');
      expect(result).to.have.keys('code', 'error');
    });

    it('A chave code deve conter o código 422', async () => {
      const result = await salesService.addSale(SALE_INCORRECT_TEST);
      expect(result.code).to.be.equal(422);
    });

    it('A chave error deve conter a mensagem "quantity" must be greater than or equal to 1', async () => {
      const ERROR_MESSAGE = '"quantity" must be greater than or equal to 1';
      const result = await salesService.addSale(SALE_INCORRECT_TEST);
      expect(result.error).to.be.equal(ERROR_MESSAGE);
    });
  });

  describe('Quando o produto não está cadastrado no banco de dados', () => {
    const SALE_INCORRECT_TEST = [{ "productId": 100, "quantity": 1 }];

    it('Deve retornar um objeto com as chaves code e error', async () => {
      sinon.stub(productsModel, 'getProductById').resolves(null);
      const result = await salesService.addSale(SALE_INCORRECT_TEST);
      expect(result).to.be.an('object');
      expect(result).to.have.keys('code', 'error');
    });

    it('A chave code deve conter o código 404', async () => {
      sinon.stub(productsModel, 'getProductById').resolves(null);
      const result = await salesService.addSale(SALE_INCORRECT_TEST);
      expect(result.code).to.be.equal(404);
    });

    it('A chave error deve conter a mensagem "Product not found"', async () => {
      sinon.stub(productsModel, 'getProductById').resolves(null);
      const ERROR_MESSAGE = 'Product not found';
      const result = await salesService.addSale(SALE_INCORRECT_TEST);
      expect(result.error).to.be.equal(ERROR_MESSAGE);
    });
  });

  describe('Quando as informações para cadastrar a venda estão corretas', () => {
    describe('E ocorre algum erro no registro da venda', () => {
      const SALE_CORRECT_TEST = [{ "productId": 2, "quantity": 2 }];
      const RETURN_PRODUCT = { "id": 2, "name": "Traje de encolhimento" };

      it('Deve retornar um objeto com as chaves code e error', async () => {
        sinon.stub(productsModel, 'getProductById').resolves(RETURN_PRODUCT);
        sinon.stub(salesModel, 'addSale').resolves(null);
        const result = await salesService.addSale(SALE_CORRECT_TEST);
        expect(result).to.be.an('object');
        expect(result).to.have.keys('code', 'error');
      });

      it('A chave code deve conter o código 501', async () => {
        sinon.stub(productsModel, 'getProductById').resolves(RETURN_PRODUCT);
        sinon.stub(salesModel, 'addSale').resolves(null);
        const result = await salesService.addSale(SALE_CORRECT_TEST);
        expect(result.code).to.be.equal(501);
      });

      it('A chave error deve conter a mensagem "Sale not added"', async () => {
        const ERROR_MESSAGE = 'Sale not added';
        sinon.stub(productsModel, 'getProductById').resolves(RETURN_PRODUCT);
        sinon.stub(salesModel, 'addSale').resolves(null);
        const result = await salesService.addSale(SALE_CORRECT_TEST);
        expect(result.error).to.be.equal(ERROR_MESSAGE);
      });
    });

    describe('E a venda é cadastrada com sucesso', () => {
      const RETURN_PRODUCT = {
        "id": 2,
        "name": "Traje de encolhimento"
      };
      const SALE_CORRECT_TEST = [
        {
          "productId": 1,
          "quantity": 1
        },
        {
          "productId": 2,
          "quantity": 5
        }
      ]

      it('Deve retornar um objeto com as chaves code e data', async () => {
        sinon.stub(productsModel, 'getProductById').resolves(RETURN_PRODUCT);
        sinon.stub(salesModel, 'addSale').resolves(5);
        sinon.stub(salesModel, 'addSaleInfo').resolves();
        const result = await salesService.addSale(SALE_CORRECT_TEST);
        expect(result).to.be.an('object');
        expect(result).to.have.keys('code', 'data');
      });

      it('A chave code deve conter o código 201', async () => {
        sinon.stub(productsModel, 'getProductById').resolves(RETURN_PRODUCT);
        sinon.stub(salesModel, 'addSale').resolves(5);
        sinon.stub(salesModel, 'addSaleInfo').resolves();
        const result = await salesService.addSale(SALE_CORRECT_TEST);
        expect(result.code).to.be.equal(201);
      });

      it('A chave data deve ser um objeto com as chaves id e itemsSold', async () => {
        sinon.stub(productsModel, 'getProductById').resolves(RETURN_PRODUCT);
        sinon.stub(salesModel, 'addSale').resolves(5);
        sinon.stub(salesModel, 'addSaleInfo').resolves();
        const result = await salesService.addSale(SALE_CORRECT_TEST);
        expect(result.data).to.be.an('object');
        expect(result.data).to.have.keys('id', 'itemsSold');
      });

      it('A chave id deve conter o id da venda cadastrada', async () => {
        sinon.stub(productsModel, 'getProductById').resolves(RETURN_PRODUCT);
        sinon.stub(salesModel, 'addSale').resolves(5);
        sinon.stub(salesModel, 'addSaleInfo').resolves();
        const result = await salesService.addSale(SALE_CORRECT_TEST);
        expect(result.data.id).to.be.equal(5);
      });

      it('A chave itemsSold deve conter um array com os itens vendidos', async () => {
        sinon.stub(productsModel, 'getProductById').resolves(RETURN_PRODUCT);
        sinon.stub(salesModel, 'addSale').resolves(5);
        sinon.stub(salesModel, 'addSaleInfo').resolves();
        const result = await salesService.addSale(SALE_CORRECT_TEST);
        expect(result.data.itemsSold).to.be.an('array');
        expect(result.data.itemsSold).to.have.lengthOf(2);
      });

      it('Cada item do array deve conter as chaves productId e quantity', async () => {
        sinon.stub(productsModel, 'getProductById').resolves(RETURN_PRODUCT);
        sinon.stub(salesModel, 'addSale').resolves(5);
        sinon.stub(salesModel, 'addSaleInfo').resolves();
        const result = await salesService.addSale(SALE_CORRECT_TEST);
        result.data.itemsSold.forEach((item) => {
          expect(item).to.have.keys('productId', 'quantity');
        });
      });
    });
  });
});
