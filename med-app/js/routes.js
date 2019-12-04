const express = require("express");
const contract = require("./controller.js");
const routes = express.Router();

routes.get("/get_all_meds", contract.queryAllMedication);
routes.get("/get_all_presc", contract.queryAllPrescription);
routes.get("/get_all_sells", contract.queryAllSales);

module.exports = routes;
