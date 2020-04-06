import React from 'react'
import { Typography } from '@material-ui/core'

const periodNameLayout = (previousPeriod, period, fit) => {
    let periodName
    if (previousPeriod !== period.payPeriod) {
        previousPeriod = period.payPeriod

        fit.payPeriod = period.payPeriod
        periodName =
            <div>
                <Typography variant='h6' align='center'><u>{fit.payPeriod}</u></Typography>
                <Typography variant='h6'>When n:</Typography>
            </div>
    }

    return periodName
}

const layout = (key, fit, previousPeriod, period) =>
    <div key={key + '-div'}>
        {periodNameLayout(previousPeriod, period, fit)}
        <Typography variant='h6'>
            {fit.over} > n ≤ {fit.notOver}
        </Typography>
        <Typography variant='h6'>
            ((n - {fit.nonTaxable}) + {fit.plus}) * {fit.percent}%
        </Typography>
        <br />
    </div>

export {
    layout,
}