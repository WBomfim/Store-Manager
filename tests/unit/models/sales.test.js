const { expect } = require('chai');
const { assert } = require('joi');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const salesModel = require('../../../models/sales');

describe('Models - Ao buscar todas as vendas no banco de dados', () => {
  beforeEach(sinon.restore);

  describe('Quando não existem vendas cadastradas', () => {
    it('Deve retornar null', async () => {
      sinon.stub(connection, 'execute').resolves([[]]);
      const result = await salesModel.getAllSales();
      expect(result).to.be.null;
    });
  });

  describe('Quando existem vendas cadastradas', () => {
    const RETURN_SALES = [
      { saleId: 1, date: '2021-09-09T04:54:29.000Z', productId: 1, quantity: 2 },
      { saleId: 1, date: '2021-09-09T04:24:29.000Z', productId: 2, quantity: 3 },
      { saleId: 2, date: '2021-09-09T06:54:29.000Z', productId: 1, quantity: 1 },
      { saleId: 2, date: '2021-09-09T07:44:29.000Z', productId: 3, quantity: 2 },
    ];
    it('Deve retornar um array com as vendas', async () => {
      sinon.stub(connection, 'execute').resolves([RETURN_SALES]);
      const result = await salesModel.getAllSales();
      expect(result).to.be.an('array');
    });

    it('O array deve conter objetos com as propriedades "saleId", "date", "productId" e "quantity"',
      async () => {
        sinon.stub(connection, 'execute').resolves([RETURN_SALES]);
        const result = await salesModel.getAllSales();
        result.forEach((sale) => {
          expect(sale).to.be.an('object');
          expect(sale).to.have.all.keys('saleId', 'date', 'productId', 'quantity');
        });
      });
  });
});

describe('Models - Ao buscar uma venda pelo id no banco de dados', () => {
  beforeEach(sinon.restore);
  const ID_TEST = 2;

  describe('Quando a venda não existe', () => {
    it('Deve retornar null', async () => {
      sinon.stub(connection, 'execute').resolves([[]]);
      const result = await salesModel.getSaleById(ID_TEST);
      expect(result).to.be.null;
    });
  });

  describe('Quando a venda existe', () => {
    const RETURN_SALE = [
      { date: '2021-09-09T04:54:29.000Z', productId: 1, quantity: 2 },
      { date: '2021-09-09T04:24:29.000Z', productId: 2, quantity: 3 },
    ];

    it('Deve retornar um array com as vendas', async () => {
        sinon.stub(connection, 'execute').resolves([RETURN_SALE]);
        const result = await salesModel.getSaleById(ID_TEST);
        expect(result).to.be.an('array');
    });

    it('O array deve conter objetos com as propriedades, "date", "productId" e "quantity"',
      async () => {
        sinon.stub(connection, 'execute').resolves([RETURN_SALE]);
        const result = await salesModel.getSaleById(ID_TEST);
        result.forEach((sale) => {
          expect(sale).to.be.an('object');
          expect(sale).to.have.all.keys('date', 'productId', 'quantity');
        });
      });
  });
});

describe('Models - Ao adicionar uma nova venda no banco de dados', () => {
  beforeEach(sinon.restore);

  describe('Quando a venda não for adicionada', () => {
    it('Deve retornar null', async () => {
      sinon.stub(connection, 'execute').resolves([{}]);
      const result = await salesModel.addSale();
      expect(result).to.be.null;
    });
  });

  describe('Quando a venda for adicionada com sucesso', () => {
    it('Deve retornar o id da venda', async () => {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
      const result = await salesModel.addSale();
      expect(result).to.be.equal(1);
    });
  });
});

describe('Models - Ao adicionar as informções de uma venda no banco de dados', () => {
  beforeEach(sinon.restore);
  const ID_TEST = 1;
  const PRODUCT_ID_TEST = 2;
  const QUANTITY_TEST = 3;

  describe('Quando as informações a serem salvas são recebidas corretamente', () => {
    it('A função connection.execute deve ser executada', async () => {
      const stub = sinon.stub(connection, 'execute').resolves();
      await salesModel.addSaleInfo(ID_TEST, PRODUCT_ID_TEST, QUANTITY_TEST);
      expect(stub.called).to.be.true;
    });
  });
});

describe('Models - Ao excluir uma venda do banco de dados', () => {
  beforeEach(sinon.restore);
  const ID_TEST = 2;

  describe('Quando a venda é excluída com sucesso', () => {
    it('A função "deleteSale" deve chamar o "connection.execute"', async () => {
      const deletedSale = sinon.stub(connection, 'execute').resolves();
      await salesModel.deleteSale(ID_TEST);
      expect(deletedSale.called).to.be.true;
    });
  });
});

describe('Models - Ao excluir as informações de uma venda do banco de dados', () => {
  beforeEach(sinon.restore);
  const ID_TEST = 2;

  describe('Quando as informações da venda são excluídas com sucesso', () => {
    it('A função "deleteSaleInfo" deve chamar o "connection.execute"', async () => {
      const deletedSaleInfo = sinon.stub(connection, 'execute').resolves();
      await salesModel.deleteSaleInfo(ID_TEST);
      expect(deletedSaleInfo.called).to.be.true;
    });
  });
});
