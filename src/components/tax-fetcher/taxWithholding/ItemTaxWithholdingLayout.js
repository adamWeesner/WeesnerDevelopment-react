import React from 'react'
import { Typography } from '@material-ui/core'

import Card from '../../WDCard'

const layout = (type, displaySortedData, sortedData) =>
    <Card>
        <Typography variant='h5' align='center'>
            {type}
        </Typography>

        {displaySortedData(sortedData)}
    </Card>

export {
    layout,
}