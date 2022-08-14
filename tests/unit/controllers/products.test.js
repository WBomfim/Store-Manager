const { expect } = require('chai');
const sinon = require('sinon');
const productsService = require('../../../services/products');
const productsController = require('../../../controllers/products');

describe('Quando chamar o controller getAllProducts', () => {
  describe('Não havendo produtos cadastrados', () => {
    const req = {};
    const res = {};

    before(() => {
      req.body = {};
      res.status = sinon.stub().returnsThis();
      res.json = sinon.stub().returns();
      const objectError = { error: 'Products not found' };
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
    const req = {};
    const res = {};

    before(() => {
      req.body = {};
      res.status = sinon.stub().returnsThis();
      res.json = sinon.stub().returns();
      const objectData = {
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
    })

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
