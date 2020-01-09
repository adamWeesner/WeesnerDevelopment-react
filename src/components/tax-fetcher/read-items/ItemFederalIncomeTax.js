import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'
import Card from '../../WDCard'
import { Currency, payPeriods } from '../../../utils/utils';

class ItemFederalncomeTax extends Component {
    keyStart = this.props.data.year + this.props.data.percent

    displaySortedData = (sortedData) => {
        const items = []
        let previousPeriod

        for (const periodData in sortedData) {
            if (sortedData.hasOwnProperty(periodData)) {
                const period = sortedData[periodData]
                const over = Currency(period.over)
                const notOver = Currency(period.notOver)
                const plus = Currency(period.plus)
                const percent = period.percent
                const nonTaxable = Currency(period.nonTaxable)

                let periodName;
                if (previousPeriod === period.payPeriod) {
                    periodName = ""
                } else {
                    previousPeriod = period.payPeriod
                    periodName =
                        <div>
                            <Typography variant='h6' align='center'><u>{period.payPeriod}</u></Typography>
                            <Typography variant='h6'>When n:</Typography>
                        </div>
                }

                items.push(
                    <div key={this.keyStart + period + periodData + '-div'}>
                        {periodName}
                        <Typography variant='h6'>
                            {over} > n ≤ {notOver}
                        </Typography>
                        <Typography variant='h6'>
                            ((n - {nonTaxable}) + {plus}) * {percent}%
                        </Typography>
                        <br />
                    </div>
                )
            }
        }

        return (items)
    }

    render() {
        const { data, type } = this.props

        const sortedData = data.sort((a, b) => {
            if (a.percent < b.percent) return -1
            if (a.percent > b.percent) return 1
            return 0
        })

        const periodSorted = sortedData.sort((a, b) => {
            const aPeriod = payPeriods[a.payPeriod].index
            const bPeriod = payPeriods[b.payPeriod].index

            if (aPeriod < bPeriod) return -1
            if (aPeriod > bPeriod) return 1
            return 0
        })

        return (
            <Card>
                <Typography variant='h5' align='center'>
                    {type}
                </Typography>

                {this.displaySortedData(periodSorted)}
            </Card>
        )
    }
}

ItemFederalncomeTax.propTypes = {
    data: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired
}

export default ItemFederalncomeTax