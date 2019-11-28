/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class MedicationContract extends Contract {
    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const meds = [
            {
                manufacturer: '129R',
                name: 'Alivium',
                fabDate: '1574973266',
                expDate: '1665446400',
                holderId: "sold",
                prescription: "PES1"
            },
            {
                manufacturer: 'J205',
                name: 'Floratil',
                fabDate: '1574973266',
                expDate: '1665446400',
                holderId: "Drogaria02",
                prescription: "PES2"
            },
            {
                manufacturer: 'J205',
                name: 'Engov',
                fabDate: '1574973266',
                expDate: '1665446400',
                holderId: "Drogaria03",
                prescription: "PES3"
            }
        ];

        for (let i = 0; i < meds.length; i++) {
            meds[i].docType = 'med';
            await ctx.stub.putState('MED' + i, Buffer.from(JSON.stringify(meds[i])));
            console.info('Added <--> ', meds[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }
    /* ============================FUNCOES PARA MEDICAMENTOS==============================*/
    async medicationExists(ctx, medicationId) {
        const buffer = await ctx.stub.getState(medicationId);
        return (!!buffer && buffer.length > 0);
    }

    async createMedication(ctx, medicationId, manufacturer, name, fabDate, expDate, holderId, prescription) {
        const exists = await this.medicationExists(ctx, medicationId);
        if (exists) {
            throw new Error(`The medication ${medicationId} already exists`);
        }
        const asset = { manufacturer, name, fabDate, expDate, holderId, prescription };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(medicationId, buffer);
    }

    async readMedication(ctx, medicationId) {
        const exists = await this.medicationExists(ctx, medicationId);
        if (!exists) {
            throw new Error(`The medication ${medicationId} does not exist`);
        }
        const buffer = await ctx.stub.getState(medicationId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }
    /**
     * 
     * Funcao chamada no momento da venda, informando a receita medica a qual
     * o medicamento vai se associar/sera vendido
     * 
     */
    async updateMedication(ctx, medicationId, prescriptionId) {
        const exists = await this.medicationExists(ctx, medicationId);
        if (!exists) {
            throw new Error(`The medication ${medicationId} does not exist`);
        }
        const oldAsset = this.readMedication(ctx, medicationId);
        const asset = { manufacturer: oldAsset.manufacturer, name: oldAsset.name, fabDate: oldAsset.fabDate, expDate: oldAsset.fabDate, holderId: "sold", prescription: prescriptionId };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(medicationId, buffer);
    }

    async queryAll(ctx){
        const startKey = 'MED0';
        const endKey = 'MED999';

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);

        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({ Key, Record });
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }

    async deleteMedication(ctx, medicationId) {
        const exists = await this.medicationExists(ctx, medicationId);
        if (!exists) {
            throw new Error(`The medication ${medicationId} does not exist`);
        }
        await ctx.stub.deleteState(medicationId);
    }

    /* ============================FUNCOES PARA RECEITAS==============================*/
    async prescriptionExists(ctx, prescriptionId) {
        const buffer = await ctx.stub.getState(prescriptionId);
        return (!!buffer && buffer.length > 0);
    }
    /**
     * 
     * @param {*} ctx 
     * @param {*} prescriptionId Identificacao da receita
     * @param {Array} medications Lista com o nome dos medicamentos solicitados
     * @param {*} doctorId Identificacao do medico que fez a receita
     * @param {*} hospitalId Identificacao do hospital gerador da receita
     */
    async createPresciption(ctx, prescriptionId, medications, doctorId, hospitalId) {
        const exists = await this.prescriptionExists(ctx, prescriptionId);
        if (exists) {
            throw new Error(`The prescription ${prescriptionId} already exists`);
        }
        const asset = { prescriptionId, medications: medications, doctorId, hospitalId };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(prescriptionId, buffer);
    }

    async queryPrescription(ctx, prescriptionId) {
        const exists = await this.prescriptionExists(ctx, prescriptionId);
        if (!exists) {
            throw new Error(`The prescription ${prescriptionId} does not exist`);
        }
        const buffer = await ctx.stub.getState(prescriptionId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async deletePrescription(ctx, prescriptionId) {
        const exists = await this.prescriptionExists(ctx, prescriptionId);
        if (!exists) {
            throw new Error(`The prescription ${prescriptionId} does not exist`);
        }
        await ctx.stub.deleteState(prescriptionId);
    }

}

module.exports = MedicationContract;
