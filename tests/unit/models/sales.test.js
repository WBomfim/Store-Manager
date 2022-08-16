const { expect } = require('chai');
const { assert } = require('joi');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const salesModel = require('../../../models/sales');

describe('Models - Ao adicionar uma nova venda no banco de dados', () => {
  beforeEach(sinon.restore);

  describe('Quando a venda não for adicionada', () => {
    it('Deve retornar null', async () => {
      sinon.stub(connection, 'execute').resolves([[]]);
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
      const stub = sinon.stub(connection, 'execute').resolves([[]]);
      await salesModel.addSaleInfo(ID_TEST, PRODUCT_ID_TEST, QUANTITY_TEST);
      expect(stub.called).to.be.true;
    });
  });
});
