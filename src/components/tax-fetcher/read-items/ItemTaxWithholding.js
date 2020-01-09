import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'
import { Currency } from '../../../utils/utils'
import Card from '../../WDCard'

class ItemTaxWithholding extends Component {
    displaySortedData = (sortedData) => {
        const items = []

        for (const period in sortedData) {
            if (sortedData.hasOwnProperty(period)) {
                const data = sortedData[period]
                items.push(
                    <Typography key={data.year + data.payPeriod + data.amount} variant='h6'>
                        {data.payPeriod}: {Currency(data.amount)}
                    </Typography>
                )
            }
        }

        return (items)
    }

    render() {
        const { data, type } = this.props

        const sortedData = data.sort((a, b) => {
            if (a.amount < b.amount) return -1
            if (a.amount > b.amount) return 1
            return 0
        })

        return (
            <Card>
                <Typography variant='h5' align='center'>
                    {type}
                </Typography>

                {this.displaySortedData(sortedData)}
            </Card>
        )
    }
}

ItemTaxWithholding.propTypes = {
    data: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired
}

export default ItemTaxWithholding