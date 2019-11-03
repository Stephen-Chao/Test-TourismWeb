/*eslint no-unused-vars: "off" */
let createError = require("http-errors")
let express = require("express")
let path = require("path")
let cookieParser = require("cookie-parser")
let logger = require("morgan")

let indexRouter = require("./routes/index")
let usersRouter = require("./routes/users")
const tourisms = require("./routes/tourisms")
const orders = require("./routes/orders")
const search = require("./routes/search")
let app = express()

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

app.use("/", indexRouter)
app.use("/users", usersRouter)

// Our Custom Donation Web App Routes
app.get("/tourism", tourisms.findAll)
app.get("/tourism/:id", tourisms.findOne)
app.get("/order", orders.findAll)
app.get("/order/:id", orders.findOne)

app.post("/tourism/",tourisms.addAttraction)
app.post("/search/order",search.findOneWithPart)
app.post("/order/",orders.addOrder)

app.put("/tourism/:id/increase_tickets", tourisms.incrementremaintickets)
app.put("/order/:id/increase_booked", orders.incrementNumOfBooked)
app.put("/tourism/:id/decrease_tickets", tourisms.decreaseremaintickets)
app.put("/order/:id/decrease_booked", orders.decreaseNumOfBooked)

app.delete("/tourism/:id", tourisms.deleteAttraction)
app.delete("/order/:id", orders.deleteOrder)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
})




module.exports = app
