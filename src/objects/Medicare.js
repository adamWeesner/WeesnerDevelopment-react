import { maritalStatuses } from "../utils/utils";

export class Medicare {
    constructor(data) {
        this.limits = []
        this.year = data.year
        this.percent = data.percent
        this.additional = data.additional

        for (const status in maritalStatuses) {
            if (maritalStatuses.hasOwnProperty(status)) {
                const item = maritalStatuses[status]

                if (data.limits[item] !== undefined)
                    this.limits[item] = data.limits[item]
            }
        }
    }
}