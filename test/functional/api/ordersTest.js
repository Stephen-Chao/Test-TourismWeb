const chai = require("chai")
const server = require("../../../bin/www")
const expect = chai.expect
const request = require("supertest")
const _ = require("lodash")

describe("Orders",  () => {

  describe("GET /order", () => {
    it("should return all the Orders", done => {
      request(server)
        .get("/order")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a("array")
          const result = _.map(res.body, order => {
            return {PaymentMethod: order.PaymentMethod, Scheduler: order.Scheduler,Attraction: order.Attraction}
          })
          expect(result).to.deep.include({PaymentMethod: "Visa", Scheduler: "Owen",Attraction: "Tramore"})
          expect(result).to.deep.include({PaymentMethod: "花呗", Scheduler: "Meng",Attraction: "Waterford_Wall"})
          done(err);
        })
    })
  })

  describe("GET /order/:id", () => {
    describe("when the id is valid", () => {
      it("should return the matching Order", done => {
        request(server)
          .get("/order/5db236441c9d440000681f10")
          .set("Accept", "applicatsion/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .end((err, res) => {
            const result = _.map(res.body, order => {
              return {PaymentMethod: order.PaymentMethod, Scheduler: order.Scheduler,Attraction: order.Attraction}
            })
            expect(result).to.deep.include({PaymentMethod: "Visa", Scheduler: "Owen",Attraction: "Tramore"})
            done(err)
          })
      })
    })


    describe("when the id is invalid", () => {
      it("should return the NOT found message", () => {
        request(server)
          .get("/order/9999")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .expect({message: "Order NOT Found!"}, () => {

          })
      })
    })
  })

  describe("DELETE /order/:id", () => {
    describe("when the id is valid", () => {
      it("should return a message and the order deleted", () => {
        return request(server)
          .delete("/order/5dc14aa25ecabb04115e7e74")
          .expect(200)
          .then(resp => {
            expect(resp.body).to.include({
              message: "Order Successfully Deleted!"
            })

          })
      })
      after(() => {
        return request(server)
          .get("/order")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then(res => {
            expect(res.body).to.deep.not.include({ Scheduler : "工具人", PaymentMethod : "打白条", Attraction : "Test" })
          })
      })
    })
    describe("when the id is invalid", () => {
      it("should return a message for invalid order id", () => {
        return request(server)
          .delete("/order/1100001/")
          .expect(200)
          .then(resp => {
            expect(resp.body).to.include({
              message: "Order NOT DELETED!"
            })

          })

      })
    })
  })

  describe("POST /order/", () => {
    it("should return confirmation message and update order", () => {
      const order = {
        NumOfBooked : 3,
        Scheduler : "工具人",
        PaymentMethod : "打白条",
        Attraction : "Test"
      }
      return request(server)
        .post("/order/")
        .send(order)
        .expect(200)

        .then(resp => {
          expect(resp.body).to.include({
            message: "Order Successfully Added!"
          })

        })

    })
    after(() => {
      return request(server)
        .get("/order")
        .expect(200)
        .then(res => {
          const result = _.map(res.body, order => {
            return {
              PaymentMethod: order.PaymentMethod, Scheduler: order.Scheduler,Attraction: order.Attraction,
            }
          })
          expect(result).to.deep.include({Scheduler : "工具人", PaymentMethod : "打白条", Attraction : "Test"})
        })
    })
  })

  describe("PUT /order/:id/incrementNumOfBooked", () => {
    describe("when the id is valid", () => {
      it("should return a message and the NumOfBooked increase by 1", () => {
        return request(server)
          .put("/order/5db234d71c9d440000681f0d/increase_booked")
          .expect(200)
          .then(resp => {
            expect(resp.body).to.include({
              message: "NumOfBooked Successfully Increase!"
            })
          })
      })
      after(() => {
        request(server)
          .get("/order/5db234d71c9d440000681f0d")
          .set("Accept", "applicatsion/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .end((err, res) => {
            const result = _.map(res.body, order => {
              return {NumOfBooked:order.NumOfBooked, PaymentMethod: order.PaymentMethod, Scheduler: order.Scheduler,Attraction: order.Attraction}
            })
            expect(result).to.deep.include({NumOfBooked: 6, Scheduler: "William", PaymentMethod: "PayPal", Attraction: "Dunmore"})


          })
      })
      describe("when the id is invalid", () => {
        it("should return a 404 and a message for invalid tourism id", () => {
          return request(server)
            .put("/order/8848/increase_booked")
            .expect(200)
            .then(
              expect({ message: "Order NOT Found!" })
            )

        })
      })


    })
  })

  describe("PUT /order/:id/decreaseNumOfBooked", () => {
    describe("when the id is valid", () => {
      it("should return a message and the tickets decrease by 1", () => {
        return request(server)
          .put("/order/5db234d71c9d440000681f0d/decrease_booked")
          .expect(200)
          .then(resp => {
            expect(resp.body).to.include({
              message: "NumOfBooked Successfully Decrease!"
            })
          })
      })
      after(() => {
        request(server)
          .get("/order/5db234d71c9d440000681f0d")
          .set("Accept", "applicatsion/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .end((err, res) => {
            const result = _.map(res.body, order => {
              return {NumOfBooked:order.NumOfBooked, PaymentMethod: order.PaymentMethod, Scheduler: order.Scheduler,Attraction: order.Attraction}
            })
            expect(result).to.deep.include({NumOfBooked: 5, Scheduler: "William", PaymentMethod: "PayPal", Attraction: "Dunmore"})


          })
      })
    })
    describe("when the id is invalid", () => {
      it("should return a 404 and a message for invalid tourism id", () => {
        return request(server)
          .put("/order/999999/decrease_booked")
          .expect(200)
          .then(
            expect({ message: "Order NOT Found!" })
          )
      })
    })
  })


})
