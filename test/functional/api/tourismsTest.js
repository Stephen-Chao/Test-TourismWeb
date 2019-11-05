const chai = require("chai")
const server = require("../../../bin/www")
const expect = chai.expect
const request = require("supertest")
const _ = require("lodash")

describe("Tourisms",  () => {

  describe("GET /tourism", () => {
    it("should return all the Attractions", done => {
      request(server)
        .get("/tourism")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a("array")
          const result = _.map(res.body, tourism => {
            return {attractionsname: tourism.attractionsname, ticketprice: tourism.ticketprice}
          })
          expect(result).to.deep.include({attractionsname: "Tramore", ticketprice: 10,})
          expect(result).to.deep.include({attractionsname: "Crystal", ticketprice: 15,})
          done(err)
        })
    })
  })

  describe("GET /tourism/:id", () => {
    describe("when the id is valid", () => {
      it("should return the matching Attractions", done => {
        request(server)
          .get("/tourism/5db051061c9d440000f65f98")
          .set("Accept", "applicatsion/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .end((err, res) => {
            const result = _.map(res.body, tourism => {
              return {attractionsname: tourism.attractionsname, ticketprice: tourism.ticketprice}
            })
            expect(result).to.deep.include({attractionsname: "Crystal", ticketprice: 15,})
            done(err)
          })
      })
    })


    describe("when the id is invalid", () => {
      it("should return the NOT found message", () => {
        request(server)
          .get("/tourism/9999")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .expect({message: "Attraction NOT Found!"}, () => {

          })
      })
    })
  })

  describe("DELETE /tourism/:id", () => {
    describe("when the id is valid", () => {
      it("should return a message and the Attraction deleted", () => {
        return request(server)
          .delete("/tourism/5dc14aa55ecabb04115e7e75")
          .expect(200)
          .then(resp => {
            expect(resp.body).to.include({
              message: "Attraction Successfully Deleted!"
            })

          })
      })
      after(() => {
        return request(server)
          .get("/tourism")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then(res => {
            expect(res.body).to.deep.not.include({ attractionsname: "Test", ticketprice: 15, remaintickets: 969 })
          })
      })
    })
    describe("when the id is invalid", () => {
      it("should return a message for invalid order id", () => {
        return request(server)
          .delete("/tourism/1100001/")
          .expect(200)
          .then(resp => {
            expect(resp.body).to.include({
              message: "Attraction NOT DELETED!"
            })

          })

      })
    })
  })

  describe("POST /tourism/", () => {
    it("should return confirmation message and update attractions", () => {
      const tourism = {
        attractionsname: "Test",
        ticketprice: 15,
        remaintickets: 969
      }
      return request(server)
        .post("/tourism/")
        .send(tourism)
        .expect(200)

        .then(resp => {
          expect(resp.body).to.include({
            message: "Attraction Successfully Added!"
          })

        })

    })
    after(() => {
      return request(server)
        .get("/tourism")
        .expect(200)
        .then(res => {
          const result = _.map(res.body, tourism => {
            return {
              attractionsname: tourism.attractionsname, ticketprice: tourism.ticketprice,
            }
          })
          expect(result).to.deep.include({attractionsname: "Test", ticketprice: 15,})
        })
    })
  })

  describe("PUT /tourism/:id/increase_tickets", () => {
    describe("when the id is valid", () => {
      it("should return a message and the tickets increase by 1", () => {
        return request(server)
          .put("/tourism/5db051061c9d440000f65f98/increase_tickets")
          .expect(200)
          .then(resp => {
            expect(resp.body).to.include({
              message: "Remaintickets Successfully Increase!"
            })
          })
      })
      after(() => {
        request(server)
          .get("/tourism/5db051061c9d440000f65f98")
          .set("Accept", "applicatsion/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .end((err, res) => {
            const result = _.map(res.body, tourism => {
              return {attractionsname:tourism.attractionsname,remaintickets:tourism.remaintickets}
            })
            expect(result).to.deep.include({attractionsname: "Crystal", remaintickets: 979,})


          })
      })
      describe("when the id is invalid", () => {
        it("should return a 404 and a message for invalid tourism id", () => {
          return request(server)
            .put("/tourism/8848/increase_tickets")
            .expect(200)
            .then(
              expect({ message: "Attraction NOT Found!" })
            )

        })
      })


    })
  })

  describe("PUT /tourism/:id/decrease_tickets", () => {
    describe("when the id is valid", () => {
      it("should return a message and the tickets decrease by 1", () => {
        return request(server)
          .put("/tourism/5db051061c9d440000f65f98/decrease_tickets")
          .expect(200)
          .then(resp => {
            expect(resp.body).to.include({
              message: "Remaintickets Successfully Decrease!"
            })
          })
      })
      after(() => {
        request(server)
          .get("/tourism/5db051061c9d440000f65f98")
          .set("Accept", "applicatsion/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .end((err, res) => {
            const result = _.map(res.body, tourism => {
              return {attractionsname: tourism.attractionsname, remaintickets: tourism.remaintickets}
            })
            expect(result).to.deep.include({attractionsname: "Crystal", remaintickets: 978,})


          })
      })
    })
    describe("when the id is invalid", () => {
      it("should return a 404 and a message for invalid tourism id", () => {
        return request(server)
          .put("/tourism/8848/decrease_tickets")
          .expect(200)
          .then(
            expect({ message: "Attraction NOT Found!" })
          )

      })
    })
  })


})

