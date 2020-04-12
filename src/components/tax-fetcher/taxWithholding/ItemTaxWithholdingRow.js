import React from 'react'
import { Typography } from '@material-ui/core'

import { Currency } from '../../../utils/utils'

const layout = (data) =>
    <Typography key={data.year + data.payPeriod + data.amount} variant='h6'>
        {data.payPeriod}: {Currency(data.amount)}
    </Typography>

export {
    layout,
}