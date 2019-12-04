const functions = require('./contractFunctions');

async function main() {
    console.log("Creating medication:");
    await functions.createMedication("MED10", "FAB10", "Floratil", "1574973266", "1665446400");



    console.log("Creating Prescription:");
    await functions.createPrescription('PES10', '{"payload":[{"name":"MED0"}]}', "11111111111", "4444");
    await functions.createPrescription('PES11', '{"payload":[{"name":"MED1"},{"name":"MED11"}]}', "11111111111", "4444");

    console.log("Selling medicine");
    await functions.sellMedication("MED0", "PES10");
}

main();