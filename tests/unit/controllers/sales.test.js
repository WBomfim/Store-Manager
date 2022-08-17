const { expect } = require('chai');
const sinon = require('sinon');
const salesService = require('../../../services/sales');
const salesController = require('../../../controllers/sales');

describe('Controllers - Quando chamar o controller addSale', () => {
  const req = {};
  const res = {};

  describe('E não for enviado o id do produto na requisição', () => {
    before(() => {
      req.body = [{ "quantity": 1 }];
      res.status = sinon.stub().returnsThis();
      res.json = sinon.stub().returns();
      const OBJECT_ERROR = { code: 400, error: '"productId" is required' };
      sinon.stub(salesService, 'addSale').resolves(OBJECT_ERROR);
    });

    after(() => salesService.addSale.restore());

    it('Deve retornar o status com o código 400', async () => {
      await salesController.addSale(req, res);
      expect(res.status.calledWith(400)).to.be.true;
    });

    it('Deve retornar o objeto com a menssagem de erro "productId" is required', async () => {
      const OBJECT_RES = { message: '"productId" is required' };
      await salesController.addSale(req, res);
      expect(res.json.calledWith(OBJECT_RES)).to.be.true;
    });
  });

  describe('E não for enviado a quantidade do produto na requisição', () => {
    before(() => {
      req.body = [{ "productId": 1 }];
      res.status = sinon.stub().returnsThis();
      res.json = sinon.stub().returns();
      const OBJECT_ERROR = { code: 400, error: '"quantity" is required' };
      sinon.stub(salesService, 'addSale').resolves(OBJECT_ERROR);
    });

    after(() => salesService.addSale.restore());

    it('Deve retornar o status com o código 400', async () => {
      await salesController.addSale(req, res);
      expect(res.status.calledWith(400)).to.be.true;
    });

    it('Deve retornar o objeto com a menssagem de erro "quantity" is required', async () => {
      const OBJECT_RES = { message: '"quantity" is required' };
      await salesController.addSale(req, res);
      expect(res.json.calledWith(OBJECT_RES)).to.be.true;
    });
  });

  describe('E o id do produto não é um número', () => {
    before(() => {
      req.body = [{ "productId": "A", "quantity": 1 }];
      res.status = sinon.stub().returnsThis();
      res.json = sinon.stub().returns();
      const OBJECT_ERROR = { code: 400, error: '"productId" must be a number' };
      sinon.stub(salesService, 'addSale').resolves(OBJECT_ERROR);
    });

    after(() => salesService.addSale.restore());

    it('Deve retornar o status com o código 400', async () => {
      await salesController.addSale(req, res);
      expect(res.status.calledWith(400)).to.be.true;
    });

    it('Deve retornar o objeto com a menssagem de erro "productId" must be a number', async () => {
      const OBJECT_RES = { message: '"productId" must be a number' };
      await salesController.addSale(req, res);
      expect(res.json.calledWith(OBJECT_RES)).to.be.true;
    });
  });

  describe('E a quantidade do produto não é um número', () => {
    before(() => {
      req.body = [{ "productId": 1, "quantity": "A" }];
      res.status = sinon.stub().returnsThis();
      res.json = sinon.stub().returns();
      const OBJECT_ERROR = { code: 400, error: '"quantity" must be a number' };
      sinon.stub(salesService, 'addSale').resolves(OBJECT_ERROR);
    });

    after(() => salesService.addSale.restore());

    it('Deve retornar o status com o código 400', async () => {
      await salesController.addSale(req, res);
      expect(res.status.calledWith(400)).to.be.true;
    });

    it('Deve retornar o objeto com a menssagem de erro "quantity" must be a number', async () => {
      const OBJECT_RES = { message: '"quantity" must be a number' };
      await salesController.addSale(req, res);
      expect(res.json.calledWith(OBJECT_RES)).to.be.true;
    });
  });

  describe('E a quantidade do produto é menor ou igual a 0', () => {
    before(() => {
      req.body = [{ "productId": 1, "quantity": 0 }];
      res.status = sinon.stub().returnsThis();
      res.json = sinon.stub().returns();
      const OBJECT_ERROR = { code: 422, error: '"quantity" must be greater than or equal to 1' };
      sinon.stub(salesService, 'addSale').resolves(OBJECT_ERROR);
    });

    after(() => salesService.addSale.restore());

    it('Deve retornar o status com o código 400', async () => {
      await salesController.addSale(req, res);
      expect(res.status.calledWith(422)).to.be.true;
    });

    it('Deve retornar o objeto com a menssagem de erro "quantity" must be greater than or equal to 1', async () => {
      const OBJECT_RES = { message: '"quantity" must be greater than or equal to 1' };
      await salesController.addSale(req, res);
      expect(res.json.calledWith(OBJECT_RES)).to.be.true;
    });
  });

  describe('E o produto enviado na requisição não está cadastrado no banco de dados', () => {
    before(() => {
      req.body = [{ "productId": 100, "quantity": 1 }];
      res.status = sinon.stub().returnsThis();
      res.json = sinon.stub().returns();
      const OBJECT_ERROR = { code: 404, error: 'Product not found' };
      sinon.stub(salesService, 'addSale').resolves(OBJECT_ERROR);
    });

    after(() => salesService.addSale.restore());

    it('Deve retornar o status com o código 404', async () => {
      await salesController.addSale(req, res);
      expect(res.status.calledWith(404)).to.be.true;
    });

    it('Deve retornar o objeto com a menssagem de erro "Product not found"', async () => {
      const OBJECT_RES = { message: 'Product not found' };
      await salesController.addSale(req, res);
      expect(res.json.calledWith(OBJECT_RES)).to.be.true;
    });
  });

  describe('E o as informações enviadas na requisição estão corretas', () => {
    before(() => {
      req.body = [
        {
          "productId": 1,
          "quantity": 1
        },
        {
          "productId": 2,
          "quantity": 5
        }
      ];

      res.status = sinon.stub().returnsThis();
      res.json = sinon.stub().returns();

      const OBJECT_OK = {
        code: 200,
        data: {
          "id": 5,
          "itemsSold": [
            {
              "productId": 1,
              "quantity": 1
            }, {
              "productId": 2,
              "quantity": 5
            }
          ]
        }
      };

      sinon.stub(salesService, 'addSale').resolves(OBJECT_OK);
    });

    after(() => salesService.addSale.restore());

    it('Deve retornar o status com o código 200', async () => {
      await salesController.addSale(req, res);
      expect(res.status.calledWith(200)).to.be.true;
    });

    it('Deve retornar o objeto com os dados da venda cadastrada', async () => {
      const OBJECT_RES = {
        "id": 5,
        "itemsSold": [
          {
            "productId": 1,
            "quantity": 1
          },
          {
            "productId": 2,
            "quantity": 5
          }
        ]
      };
      
      await salesController.addSale(req, res);
      expect(res.json.calledWith(OBJECT_RES)).to.be.true;
    });
  });
});

describe('Controllers - Quando chamar o controller getAllSeles', () => {
  const req = {};
  const res = {};

  describe('E não houver vendas cadastradas ou ocorrer algum erro no banco de dados', () => {
    before(() => {
      res.status = sinon.stub().returnsThis();
      res.json = sinon.stub().returns();
      const OBJECT_ERROR = { code: 404, error: 'Sales not found' };
      sinon.stub(salesService, 'getAllSales').resolves(OBJECT_ERROR);
    });

    after(() => salesService.getAllSales.restore());

    it('Deve retornar o status com o código 404', async () => {
      await salesController.getAllSales(req, res);
      expect(res.status.calledWith(404)).to.be.true;
    });

    it('Deve retornar o objeto com a menssagem de erro "Sales not found"', async () => {
      const OBJECT_RES = { message: 'Sales not found' };
      await salesController.getAllSales(req, res);
      expect(res.json.calledWith(OBJECT_RES)).to.be.true;
    });
  });

  describe('E houver vendas cadastradas', () => {
    before(() => {
      res.status = sinon.stub().returnsThis();
      res.json = sinon.stub().returns();
      const OBJECT_OK = {
        code: 200,
        data: [
          {
            "saleId": 1,
            "date": "2021-09-09T04:54:29.000Z",
            "productId": 1,
            "quantity": 2
          },
          {
            "saleId": 1,
            "date": "2021-09-09T04:54:54.000Z",
            "productId": 2,
            "quantity": 2
          }
        ]
      };
      sinon.stub(salesService, 'getAllSales').resolves(OBJECT_OK);
    });

    after(() => salesService.getAllSales.restore());

    it('Deve retornar o status com o código 200', async () => {
      await salesController.getAllSales(req, res);
      expect(res.status.calledWith(200)).to.be.true;
    });

    it('Deve retornar o objeto com os dados das vendas cadastradas', async () => {
      const OBJECT_RES = [
        {
          "saleId": 1,
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        },
        {
          "saleId": 1,
          "date": "2021-09-09T04:54:54.000Z",
          "productId": 2,
          "quantity": 2
        }
      ];
      
      await salesController.getAllSales(req, res);
      expect(res.json.calledWith(OBJECT_RES)).to.be.true;
    });
  });
});

describe('Controllers - Quando chamar o controller getSaleById', () => {
  const req = {};
  const res = {};

  describe('E não é encontrado a venda com o id enviado na requisição', () => {
    before(() => {
      req.params = { id: 1 };
      res.status = sinon.stub().returnsThis();
      res.json = sinon.stub().returns();
      const OBJECT_ERROR = { code: 404, error: 'Sale not found' };
      sinon.stub(salesService, 'getSaleById').resolves(OBJECT_ERROR);
    });

    after(() => salesService.getSaleById.restore());

    it('Deve retornar o status com o código 404', async () => {
      await salesController.getSaleById(req, res);
      expect(res.status.calledWith(404)).to.be.true;
    });

    it('Deve retornar o objeto com a menssagem de erro "Sale not found"', async () => {
      const OBJECT_RES = { message: 'Sale not found' };
      await salesController.getSaleById(req, res);
      expect(res.json.calledWith(OBJECT_RES)).to.be.true;
    });
  });

  describe('E o id enviado na requisição é encontrado', () => {
    before(() => {
      req.params = { id: 2 };
      res.status = sinon.stub().returnsThis();
      res.json = sinon.stub().returns();
      const OBJECT_OK = {
        code: 200,
        data: [
          { date: "2021-09-09T04:54:29.000Z", productId: 1, quantity: 2 },
          { date: "2021-09-09T04:54:54.000Z", productId: 2, quantity: 2 },
        ]
      };
      sinon.stub(salesService, 'getSaleById').resolves(OBJECT_OK);
    });
      
    after(() => salesService.getSaleById.restore());

    it('Deve retornar o status com o código 200', async () => {
      await salesController.getSaleById(req, res);
      expect(res.status.calledWith(200)).to.be.true;
    });

    it('Deve retornar um array com os dados da venda encontrada', async () => {
      const OBJECT_RES = [
        { date: "2021-09-09T04:54:29.000Z", productId: 1, quantity: 2 },
        { date: "2021-09-09T04:54:54.000Z", productId: 2, quantity: 2 },
      ];
      await salesController.getSaleById(req, res);
      expect(res.json.calledWith(OBJECT_RES)).to.be.true;
    });
  });
});

describe('Controller - Quando chamar o controller deleteSale', () => {
  const req = {};
  const res = {};

  describe('E não é encontrado a venda com o id enviado na requisição', () => {
    before(() => {
      req.params = { id: 1 };
      res.status = sinon.stub().returnsThis();
      res.json = sinon.stub().returns();
      const OBJECT_ERROR = { code: 404, error: 'Sale not found' };
      sinon.stub(salesService, 'deleteSale').resolves(OBJECT_ERROR);
    });

    after(() => salesService.deleteSale.restore());

    it('Deve retornar o status com o código 404', async () => {
      await salesController.deleteSale(req, res);
      expect(res.status.calledWith(404)).to.be.true;
    });

    it('Deve retornar o objeto com a menssagem de erro "Sale not found"', async () => {
      const OBJECT_RES = { message: 'Sale not found' };
      await salesController.deleteSale(req, res);
      expect(res.json.calledWith(OBJECT_RES)).to.be.true;
    });
  });

  describe('E o id enviado na requisição é encontrado e a venda é excluída com sucesso', () => {
    before(() => {
      req.params = { id: 2 };
      res.status = sinon.stub().returnsThis();
      res.json = sinon.stub().returns();
      const OBJECT_OK = { code: 204, data: {} };
      sinon.stub(salesService, 'deleteSale').resolves(OBJECT_OK);
    });

    after(() => salesService.deleteSale.restore());

    it('Deve retornar o status com o código 204', async () => {
      await salesController.deleteSale(req, res);
      expect(res.status.calledWith(204)).to.be.true;
    });

    it('Deve retornar o objeto vazio', async () => {
      const OBJECT_RES = {};
      await salesController.deleteSale(req, res);
      expect(res.json.calledWith(OBJECT_RES)).to.be.true;
    });
  });
});
