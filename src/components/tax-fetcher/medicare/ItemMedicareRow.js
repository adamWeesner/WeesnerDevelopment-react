import React from 'react'
import { Typography } from '@material-ui/core'

import { Currency } from '../../../utils/utils'


const layout = (item) =>
    <Typography variant='h6' key={item.amount + item.year}>
        {item.maritalStatus}: {Currency(item.amount)}
    </Typography>

export {
    layout,
}