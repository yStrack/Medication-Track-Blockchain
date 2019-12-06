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
  },
  async createMedication(req, res) {
    const { medicationId } = req.body;
    const { manufactorId } = req.body;
    const { medicationName } = req.body;
    const { fabDate } = req.body;
    const { expDate } = req.body;

    try {
      await functions.createMedication(
        medicationId,
        manufactorId,
        medicationName,
        fabDate,
        expDate
      );
      return res.send({ status: "ok", message: "" });
    } catch (err) {
      return res.send({
        status: "Fail",
        message: `Failed to create new medicine ${err}`
      });
    }
  },
  async createPrescription(req, res) {
    const { prescriptionId } = req.body;
    const { medications } = req.body;
    const { patientId } = req.body;
    const { doctorId } = req.body;
    try {
      await functions.createPrescription(
        prescriptionId,
        JSON.stringify(medications),
        patientId,
        doctorId
      );
      return res.send({ status: "ok", message: "" });
    } catch (err) {
      return res.send({
        status: "Fail",
        message: `Failed to create new prescription ${err}`
      });
    }
  },
  async sellMedication(req, res) {
    const { saleId } = req.body;
    const { prescriptionId } = req.body;
    const { medicationId } = req.body;

    try {
      await functions.sellMedication(saleId, medicationId, prescriptionId);
      return res.send({ status: "ok", message: "" });
    } catch (err) {
      return res.send({
        status: "Fail",
        message: `Failed to create new prescription ${err}`
      });
    }
  }
};
