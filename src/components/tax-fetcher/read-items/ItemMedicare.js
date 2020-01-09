import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'
import { Currency, maritalStatuses } from '../../../utils/utils'
import Card from '../../WDCard'

class ItemMedicare extends Component {
    limits = (data) => {
        const limits = data.limits
        let limitViews = []

        const sortedLimits = limits.sort((a, b) => {
            const aStatus = maritalStatuses[a.maritalStatus].index
            const bStatus = maritalStatuses[b.maritalStatus].index

            if (aStatus < bStatus) return -1
            if (aStatus > bStatus) return 1
            return 0
        })

        for (const limit in sortedLimits) {
            const item = limits[limit]
            limitViews.push(
                <Typography variant='h6' key={item.amount + item.year}>
                    {item.maritalStatus}: {Currency(item.amount)}
                </Typography>
            )
        }

        return limitViews
    }

    render() {
        const { data } = this.props

        const itemData = data[0]

        return (
            <Card>
                <Typography variant='h6'>
                    Percent: {itemData.percent}%
                            </Typography>
                <Typography variant='h6'>
                    Additional: {itemData.additionalPercent}%
                            </Typography>
                <Typography align='center' variant='h6'>
                    Limits
                            </Typography>
                {this.limits(itemData)}
            </Card>
        )
    }
}

ItemMedicare.propTypes = {
    data: PropTypes.array.isRequired
}

export default ItemMedicare