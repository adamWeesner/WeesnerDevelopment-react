import React from 'react'
import { Typography } from '@material-ui/core'

import Card from '../../WDCard'

const layout = (type, sortedData) =>
    <Card>
        <Typography variant='h5' align='center'>
            {type}
        </Typography>

        {sortedData}
    </Card>

export {
    layout,
}