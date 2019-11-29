import functions from './contractFunctions';

function main() {
    
    console.log("Creating medication:");
    functions.createMedication("MED10", "FAB10", "Floratil", "1574973266", "1665446400");

    console.log("Creating Prescription:");
    functions.createPrescription("PES10", ["MED10"], "11111111111", "4444");

    console.log("Selling medicine");
    functions.sellMedication("MED10", "PES10");
}

main();