import { Component } from 'react'
import PropTypes from 'prop-types'

import FederalIncomeTax from '../../../classes/FederalIncomeTaxClass'

import { layout } from './ItemFederalIncomeTaxLayout'
import { layout as fitRowLayout } from './ItemFederalIncomeTaxRow'

import { Currency, payPeriods } from '../../../utils/utils'

class ItemFederalncomeTax extends Component {
    keyStart = this.props.data.year + this.props.data.percent

    displaySortedData = (sortedData) => {
        const items = []
        let previousPeriod

        for (const periodData in sortedData) {
            if (sortedData.hasOwnProperty(periodData)) {
                const period = sortedData[periodData]
                const fit = new FederalIncomeTax()

                fit.over = Currency(period.over)
                fit.notOver = Currency(period.notOver)
                fit.plus = Currency(period.plus)
                fit.percent = period.percent
                fit.nonTaxable = Currency(period.nonTaxable)

                items.push(fitRowLayout(this.keyStart + period + periodData, fit, previousPeriod, period))
            }
        }

        return (items)
    }

    render() {
        const { data, type } = this.props

        const sortedData = data.sort((a, b) => {
            return a.percent - b.percent
        })

        const periodSorted = sortedData.sort((a, b) => {
            const aPeriod = payPeriods[a.payPeriod].index
            const bPeriod = payPeriods[b.payPeriod].index

            return aPeriod - bPeriod
        })

        return layout(type, this.displaySortedData(periodSorted))
    }
}

ItemFederalncomeTax.propTypes = {
    data: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired
}

export default ItemFederalncomeTax