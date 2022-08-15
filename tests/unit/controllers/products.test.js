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
      const objectError = { code: 404, error: 'Products not found' };
      sinon.stub(productsService, 'getAllProducts').resolves(objectError);
    });

    after(() => productsService.getAllProducts.restore());

    it('Deve retornar o status com o código 404', async () => {
      await productsController.getAllProducts(req, res);
      expect(res.status.calledWith(404)).to.be.true;
    });

    it('Deve retornar o objeto com a menssagem de erro "Products not found"', async () => {
      const objectRes = { message: 'Products not found' };
      await productsController.getAllProducts(req, res);
      expect(res.json.calledWith(objectRes)).to.be.true;
    });
  });

  describe('Havendo produtos cadastrados', () => {
    before(() => {
      res.status = sinon.stub().returnsThis();
      res.json = sinon.stub().returns();
      const objectData = {
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
      sinon.stub(productsService, 'getAllProducts').resolves(objectData);
    });
    
    after(() => productsService.getAllProducts.restore());

    it('Deve retornar o status com o código 200', async () => {
      await productsController.getAllProducts(req, res);
      expect(res.status.calledWith(200)).to.be.true;
    });

    it('Deve retornar um array com objetos contendo os produtos', async () => {
      const arrayRes = [
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
      expect(res.json.calledWith(arrayRes)).to.be.true;
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
      const objectError = { code:404, error: 'Product not found' };
      sinon.stub(productsService, 'getProductById').resolves(objectError);
    });
    
    after(() => productsService.getProductById.restore());
    
    it('Deve retornar o status com o código 404', async () => {
      await productsController.getProductById(req, res);
      expect(res.status.calledWith(404)).to.be.true;
    });
    
    it('Deve retornar o objeto com a menssagem de erro "Product not found"', async () => {
      const objectRes = { message: 'Product not found' };
      await productsController.getProductById(req, res);
      expect(res.json.calledWith(objectRes)).to.be.true;
    });
  });

  describe('Havendo produtos cadastrados', () => {
    before(() => {
      req.params = { id: 1 };
      res.status = sinon.stub().returnsThis();
      res.json = sinon.stub().returns();
      const objectData = {
        code: 200,
        data: {
          "id": 1,
          "name": "Martelo de Thor",
        }
      };
      sinon.stub(productsService, 'getProductById').resolves(objectData);
    });
    
    after(() => productsService.getProductById.restore());
    
    it('Deve retornar o status com o código 200', async () => {
      await productsController.getProductById(req, res);
      expect(res.status.calledWith(200)).to.be.true;
    });
    
    it('Deve retornar um objeto contendo o produto', async () => {
      const objectRes = {
        "id": 1,
        "name": "Martelo de Thor",
      };
      await productsController.getProductById(req, res);
      expect(res.json.calledWith(objectRes)).to.be.true;
    });
  });
});
