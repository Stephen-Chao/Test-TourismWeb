const chai = require("chai")
const server = require("../../../bin/www")
const expect = chai.expect
const request = require("supertest")
const _ = require("lodash")

describe("Search",  () => {

  describe("POST /search/order", () => {
    it("should return update order", () => {
      const search = {
        Scheduler : "O"
      }
      return request(server)
        .post("/search/order")
        .send(search)
        .expect(200)

    })
    after(() => {
      return request(server)
        .get("/order")
        .expect(200)
        .then(res => {
          const result = _.map(res.body, search => {
            return {
              NumOfBooked : search.NumOfBooked, Scheduler : search.Scheduler, PaymentMethod : search.PaymentMethod, Attraction : search.Attraction
            }
          })
          expect(result).to.deep.include({NumOfBooked : 2, Scheduler : "Owen", PaymentMethod : "Visa", Attraction : "Tramore"})
          expect(result).to.deep.include({NumOfBooked : 2, Scheduler : "Owen", PaymentMethod : "MasterCard", Attraction : "Crystal"})
        })
    })
  })

})