import React from 'react'
import { Typography } from '@material-ui/core'
import { Currency } from '../../../utils/utils'
import Card from '../../WDCard'

const layout = (itemData) =>
    <Card>
        <Typography variant='h6'>
            Percent: {itemData.percent}%
        </Typography>
        <Typography variant='h6'>
            Limit: {Currency(itemData.limit)}
        </Typography>
    </Card>

export {
    layout,
}