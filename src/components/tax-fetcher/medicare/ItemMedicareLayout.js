import React from 'react'
import { Typography } from '@material-ui/core'

import Card from '../../WDCard'

const layout = (itemData, limits) =>
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
        {limits(itemData)}
    </Card>

export {
    layout,
}