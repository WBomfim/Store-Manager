const { expect } = require('chai');
const sinon = require('sinon');
const productsService = require('../../../services/products');
const productsController = require('../../../controllers/products');

describe('Controllers - Quando chamar o controller getAllProducts', () => {
  const req = {};
  const res = {};
  describe('Não havendo produtos cadastrados', () => {
    before(() => {
      res.status = sinon.stub().returnsThis();
      res.json = sinon.stub().returns();
      const OBJECT_ERROR = { code: 404, error: 'Products not found' };
      sinon.stub(productsService, 'getAllProducts').resolves(OBJECT_ERROR);
    });

    after(() => productsService.getAllProducts.restore());

    it('Deve retornar o status com o código 404', async () => {
      await productsController.getAllProducts(req, res);
      expect(res.status.calledWith(404)).to.be.true;
    });

    it('Deve retornar o objeto com a menssagem de erro "Products not found"', async () => {
      const OBJECT_RES = { message: 'Products not found' };
      await productsController.getAllProducts(req, res);
      expect(res.json.calledWith(OBJECT_RES)).to.be.true;
    });
  });

  describe('Havendo produtos cadastrados', () => {
    before(() => {
      res.status = sinon.stub().returnsThis();
      res.json = sinon.stub().returns();
      const OBJECT_DATA = {
        code: 200,
        data: [
          {
            "id": 1,
            "name": "Martelo de Thor",
          },
          {
            "id": 2,
            "name": "Traje de encolhimento",
          }
        ]
      };
      sinon.stub(productsService, 'getAllProducts').resolves(OBJECT_DATA);
    });
    
    after(() => productsService.getAllProducts.restore());

    it('Deve retornar o status com o código 200', async () => {
      await productsController.getAllProducts(req, res);
      expect(res.status.calledWith(200)).to.be.true;
    });

    it('Deve retornar um array com objetos contendo os produtos', async () => {
      const ARRAY_RES = [
        {
          "id": 1,
          "name": "Martelo de Thor",
        },
        {
          "id": 2,
          "name": "Traje de encolhimento",
        }
      ];
      await productsController.getAllProducts(req, res);
      expect(res.json.calledWith(ARRAY_RES)).to.be.true;
    });
  });
});

describe('Controllers - Quando chamar o controller getProductById', () => {
  const req = {};
  const res = {};
  describe('Não havendo produtos cadastrados', () => {
    before(() => {
      req.params = { id: 1 };
      res.status = sinon.stub().returnsThis();
      res.json = sinon.stub().returns();
      const OBJECT_ERROR = { code:404, error: 'Product not found' };
      sinon.stub(productsService, 'getProductById').resolves(OBJECT_ERROR);
    });
    
    after(() => productsService.getProductById.restore());
    
    it('Deve retornar o status com o código 404', async () => {
      await productsController.getProductById(req, res);
      expect(res.status.calledWith(404)).to.be.true;
    });
    
    it('Deve retornar o objeto com a menssagem de erro "Product not found"', async () => {
      const OBJECT_RES = { message: 'Product not found' };
      await productsController.getProductById(req, res);
      expect(res.json.calledWith(OBJECT_RES)).to.be.true;
    });
  });

  describe('Havendo produtos cadastrados', () => {
    before(() => {
      req.params = { id: 1 };
      res.status = sinon.stub().returnsThis();
      res.json = sinon.stub().returns();
      const OBJECT_DATA = {
        code: 200,
        data: {
          "id": 1,
          "name": "Martelo de Thor",
        }
      };
      sinon.stub(productsService, 'getProductById').resolves(OBJECT_DATA);
    });
    
    after(() => productsService.getProductById.restore());
    
    it('Deve retornar o status com o código 200', async () => {
      await productsController.getProductById(req, res);
      expect(res.status.calledWith(200)).to.be.true;
    });
    
    it('Deve retornar um objeto contendo o produto', async () => {
      const OBJECT_RES = {
        "id": 1,
        "name": "Martelo de Thor",
      };
      await productsController.getProductById(req, res);
      expect(res.json.calledWith(OBJECT_RES)).to.be.true;
    });
  });
});

describe('Controllers - Quando chamar o controller addProduct', () => {
  const req = {};
  const res = {};

  describe('Não inviando o nome do produto na requisição', () => {
    before(() => {
      req.body = {};
      res.status = sinon.stub().returnsThis();
      res.json = sinon.stub().returns();
      const OBJECT_ERROR = { code: 400, error: '"name" is required' };
      sinon.stub(productsService, 'addProduct').resolves(OBJECT_ERROR);
    });

    after(() => productsService.addProduct.restore());

    it('Deve retornar o status com o código 400', async () => {
      await productsController.addProduct(req, res);
      expect(res.status.calledWith(400)).to.be.true;
    });

    it('Deve retornar o objeto com a menssagem de erro "name" is required"', async () => {
      const OBJECT_RES = { message: '"name" is required' };
      await productsController.addProduct(req, res);
      expect(res.json.calledWith(OBJECT_RES)).to.be.true;
    });
  });

  describe('Com o nome do produto não sendo uma palavra', () => {
    before(() => {
      req.body = { name: 12345 };
      res.status = sinon.stub().returnsThis();
      res.json = sinon.stub().returns();
      const OBJECT_ERROR = { code: 400, error: '"name" must be a string"' };
      sinon.stub(productsService, 'addProduct').resolves(OBJECT_ERROR);
    });

    after(() => productsService.addProduct.restore());

    it('Deve retornar o status com o código 400', async () => {
      await productsController.addProduct(req, res);
      expect(res.status.calledWith(400)).to.be.true;
    });

    it('Deve retornar o objeto com a menssagem de erro "name" must only contain alpha-numeric characters"', async () => {
      const OBJECT_RES = { message: '"name" must be a string"' };
      await productsController.addProduct(req, res);
      expect(res.json.calledWith(OBJECT_RES)).to.be.true;
    });
  });

  describe('Com o nome do produto tendo menos de 5 caracteres', () => {
    before(() => {
      req.body = { name: 'Thor' };
      res.status = sinon.stub().returnsThis();
      res.json = sinon.stub().returns();
      const OBJECT_ERROR = { code: 422, error: '"name" length must be at least 5 characters long' };
      sinon.stub(productsService, 'addProduct').resolves(OBJECT_ERROR);
    });

    after(() => productsService.addProduct.restore());

    it('Deve retornar o status com o código 422', async () => {
      await productsController.addProduct(req, res);
      expect(res.status.calledWith(422)).to.be.true;
    });

    it('Deve retornar o objeto com a menssagem de erro "name" length must be at least 5 characters long"', async () => {
      const OBJECT_RES = { message: '"name" length must be at least 5 characters long' };
      await productsController.addProduct(req, res);
      expect(res.json.calledWith(OBJECT_RES)).to.be.true;
    });
  });

  describe('E ocorrer um erro na inserção do produto no banco de dados', () => {
    before(() => {
      req.body = { name: 'Martelo de Thor' };
      res.status = sinon.stub().returnsThis();
      res.json = sinon.stub().returns();
      const OBJECT_ERROR = { code: 501, error: 'Product not added' };
      sinon.stub(productsService, 'addProduct').resolves(OBJECT_ERROR);
    });

    after(() => productsService.addProduct.restore());

    it('Deve retornar o status com o código 501', async () => {
      await productsController.addProduct(req, res);
      expect(res.status.calledWith(501)).to.be.true;
    });

    it('Deve retornar o objeto com a menssagem de erro "Product not added"', async () => {
      const OBJECT_RES = { message: 'Product not added' };
      await productsController.addProduct(req, res);
      expect(res.json.calledWith(OBJECT_RES)).to.be.true;
    });
  });

  describe('Com o nome do produto em conformidade com os requisitos e os dados forem salvos', () => {
    before(() => {
      req.body = { name: 'Martelo de Thor' };
      res.status = sinon.stub().returnsThis();
      res.json = sinon.stub().returns();
      const OBJECT_DATA = {
        code: 201,
        data: {
          "id": 1,
          "name": "Martelo de Thor",
        }
      };
      sinon.stub(productsService, 'addProduct').resolves(OBJECT_DATA);
    });

    after(() => productsService.addProduct.restore());

    it('Deve retornar o status com o código 201', async () => {
      await productsController.addProduct(req, res);
      expect(res.status.calledWith(201)).to.be.true;
    });

    it('Deve retornar um objeto contendo o produto salvo no banco de dados', async () => {
      const OBJECT_RES = {
        "id": 1,
        "name": "Martelo de Thor",
      };
      await productsController.addProduct(req, res);
      expect(res.json.calledWith(OBJECT_RES)).to.be.true;
    });
  });
});
