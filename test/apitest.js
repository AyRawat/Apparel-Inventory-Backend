import { expect } from 'chai';
import sinon   from 'sinon';
import chaiHttp from 'chai-http';
import app from './index';
// import {updateStock, updateBulkStock} from "../controllers/vendorService";
// import {canFulfillOrder} from "../controllers/userService";

chai.use(chaiHttp);

//Bulk Update testing
describe("PUT /stock/apparel", () => {
    it("should update the stock for valid apparels and return success message", async () => {
      const apparels = [
        {
          apparelId: "123",
          size: "M",
          quantity: 10,
          price: 25,
        },
        {
          apparelId: "456",
          size: "S",
          quantity: 5,
          price: 20,
        },
      ];
  
      const response = await chai
        .request(app)
        .put("/stock/apparel")
        .send({ data: apparels });
  
      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal("All the Items were successfully Updated");
      expect(response.body.failedTransactions).to.be.an("array").that.is.empty;
    });
  
    it("should not update the stock for invalid apparels and return failed items", async () => {
      const apparels = [
        {
          apparelId: "789",
          size: "L",
          quantity: 15,
          price: 30,
        },
        {
          apparelId: "1011",
          size: "S",
          quantity: 7,
          price: 22,
        },
      ];
  
      const response = await chai
        .request(app)
        .put("/stock/apparel")
        .send({ data: apparels });
  
      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal("Not able to update the following items");
      expect(response.body.failedTransactions).to.be.an("array").that.has.lengthOf(2);
      expect(response.body.failedTransactions[0]).to.deep.equal(apparels[0]);
      expect(response.body.failedTransactions[1]).to.deep.equal(apparels[1]);
    });
  
  });


//Testing the single Apparel Update
describe('PUT /stock', () => {
  const apparelId = '123';
  const size = 'M';
  const quantity = 5;
  const price = 50;
  const apparel = { apparelId, size, quantity, price };
  let updateStockStub;

  beforeEach(() => {

    updateStockStub = sinon.stub().resolves({ message: 'Successfully Updated the record', value: apparel });
  });

  afterEach(() => {
   
    sinon.restore();
  });

  it('should update the stock for a valid apparel', async () => {
    const requestBody = { quantity, price };
    const queryParameters = { apparelId, size };

    updateStockStub.resolves(apparel);

    const response = await chai.request(app)
      .put('/stock')
      .query(queryParameters)
      .send(requestBody);

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({ message: 'Successfully Updated the record', value: apparel });
    sinon.assert.calledOnce(updateStockStub);
    sinon.assert.calledWithExactly(updateStockStub, apparel);
  });

  it('should return an error message for an invalid apparel', async () => {
 
    const requestBody = { quantity, price };
    const queryParameters = { apparelId: '999', size };


    updateStockStub.rejects('No such Apparel Found');

    const response = await chai.request(app)
      .put('/stock')
      .query(queryParameters)
      .send(requestBody);

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({ message: 'Operation Failed', error: 'No such Apparel Found' });
    sinon.assert.calledOnce(updateStockStub);
    sinon.assert.calledWithExactly(updateStockStub, { apparelId: '999', size, quantity, price });
  });
});

//Testing to check if order can be fulfilled Or not
describe("POST /order/fulfill", () => {
    it("should return canFulfill true when given a valid order", async () => {
      const order = [
        {
          apparelId: "123",
          size: "M",
          quantity: 2,
        },
      ];
      const canFulfillOrderStub = sinon.stub().resolves({
        canFulFill: true,
      });
  
      const res = await chai
        .request(app)
        .post("/order/fulfill")
        .send({ order })
        .set("content-type", "application/json");
  
      expect(res).to.have.status(200);
      expect(res.body).to.have.property("canFulFill", true);
      expect(canFulfillOrderStub.calledOnceWith(order)).to.be.true;
    });
  
    it("should return canFulfill false when given an invalid order", async () => {
      const order = [
        {
          apparelId: "invalid_id",
          size: "M",
          quantity: 2,
        },
      ];
      const canFulfillOrderStub = sinon.stub().resolves({
        canFulFill: false,
      });
  
      const res = await chai
        .request(app)
        .post("/order/fulfill")
        .send({ order })
        .set("content-type", "application/json");
  
      expect(res).to.have.status(200);
      expect(res.body).to.have.property("canFulFill", false);
      expect(canFulfillOrderStub.calledOnceWith(order)).to.be.true;
    });
  
    it("should return an error message when there is an error in canFulfillOrder", async () => {
      const order = [
        {
          apparelId: "123",
          size: "M",
          quantity: 2,
        },
      ];
      const errorMessage = "Error in canFulfillOrder";
      const canFulfillOrderStub = sinon.stub().throws(new Error(errorMessage));
  
      const res = await chai
        .request(app)
        .post("/order/fulfill")
        .send({ order })
        .set("content-type", "application/json");
  
      expect(res).to.have.status(500);
      expect(res.body).to.have.property("message", "Failed to check :");
      expect(canFulfillOrderStub.calledOnceWith(order)).to.be.true;
    });
  
    it("should return a validation error message when given an invalid request body", async () => {
      const invalidOrder = [
        {
          apparelId: "123",
          size: "M",
        },
      ];
  
      const res = await chai
        .request(app)
        .post("/order/fulfill")
        .send({ invalidOrder })
        .set("content-type", "application/json");
  
      expect(res).to.have.status(400);
      expect(res.body).to.have.property("message");
    });
  });