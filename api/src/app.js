const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const Invoice = require("./services/invoice");
const Quotation = require("./services/quotation");
const Auth = require("./services/auth");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Hello World!"));
app.get("/invoices/:year", (req, res) => {
  new Invoice().all(req.params.year).then((invoices) => {
    res.json(invoices);
  });
});
app.get("/invoice/:invoiceNumber", function (req, res) {
  new Invoice().get(req.params.invoiceNumber).then((inv) => {
    res.json(inv);
  });
});
app.put("/invoice/:invoiceNumber/", function (req, res) {
  new Invoice()
    .update(req.body)
    .then((inv) => {
      res.json(inv);
    })
    .catch(serverErrorHandler(res));
});
app.post("/invoices/", function (req, res) {
  new Invoice()
    .save(req.body)
    .then((id) => {
      res.json(id);
    })
    .catch(serverErrorHandler(res));
});
app.get("/quotations/:year", (req, res) => {
  new Quotation().all(req.params.year).then((quotations) => {
    res.json(quotations);
  });
});
app.get("/quotation/:number", function (req, res) {
  new Quotation().get(req.params.number).then((doc) => {
    res.json(doc);
  });
});
app.post("/quotations/", function (req, res) {
  new Quotation()
    .save(req.body)
    .then((id) => {
      res.json(id);
    })
    .catch(serverErrorHandler(res));
});
app.put("/quotation/:number", function (req, res) {
  new Quotation()
    .update(req.body)
    .then((inv) => {
      res.json(inv);
    })
    .catch(serverErrorHandler(res));
});
app.post("/login/", function (req, res) {
  new Auth()
    .login(req.body.password)
    .then((out) => {
      res.json(out);
    })
    .catch(serverErrorHandler(res));
});

let serverErrorHandler = (res) => {
  return (error) => {
    try {
      if (error.status === 401) {
        res.status(error.status);
        res.json(error.message);
      }
      throw error;
    } catch (e) {
      console.log(e);
      res.status(500);
      res.json({ error: e.toString() });
    }
  };
};
module.exports = app;
