const { expect } = require('chai');
const { assert } = require('joi');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const salesModel = require('../../../models/sales');

describe('Models - Adiciona uma nova venda no banco de dados', () => {
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

describe('Models - Adiciona as informções de uma venda no banco de dados', () => {
  beforeEach(sinon.restore);
  const ID_TEST = 1;
  const PRODUCT_ID_TEST = 2;
  const QUANTITY_TEST = 3;

  describe('Quando as informações a serem salvas são recebidas corretamente', () => {
    it('A função connection.execute deve ser executada', async () => {
      const spied = sinon.spy(connection, 'execute');
      await salesModel.addSaleInfo(ID_TEST, PRODUCT_ID_TEST, QUANTITY_TEST);
      expect(spied.called).to.be.true;
    });
  });
});
