const functions = require("./index.js");

module.exports = {
  async queryAllMedication(req, res) {
    const response = await functions.queryAllMedication();
    return res.send(response.toString());
  },
  async queryAllPrescription(req, res) {
    const response = await functions.queryAllPrescriptions();
    return res.send(response.toString());
  },
  async queryAllSales(req, res) {
    const response = await functions.queryAllSales();
    return res.send(response.toString());
  }
};
