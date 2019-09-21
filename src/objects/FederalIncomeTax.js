import { payPeriods } from "../utils/utils";

export class FederalIncomeTax {
    constructor(data) {
        this.year = data.year
        this.single = []
        this.married = []

        for (const period in payPeriods) {
            if (payPeriods.hasOwnProperty(period)) {
                const item = payPeriods[period].value

                if (data.single[item] !== undefined)
                    this.single[item] = data.single[item]

                if (data.married[item] !== undefined)
                    this.married[item] = data.married[item]
            }
        }
    }
}