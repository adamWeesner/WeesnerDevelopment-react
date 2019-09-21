import { payPeriods } from "../utils/utils";

export class TaxWithholding {
    constructor(data) {
        this.general = []
        this.nonResidents = []
        this.year = data.year

        for (const period in payPeriods) {
            if (payPeriods.hasOwnProperty(period)) {
                const item = payPeriods[period].value

                if (data.general[item] !== undefined)
                    this.general[item] = data.general[item]

                if (data.nonResidents[item] !== undefined)
                    this.nonResidents[item] = data.nonResidents[item]
            }
        }
    }
}