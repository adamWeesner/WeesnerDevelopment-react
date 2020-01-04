import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Card, CardContent, Typography } from '@material-ui/core'
import { Currency } from '../../../utils/utils';

const styles = theme => ({
    center: {
        display: 'flex',
        justifyContent: 'center'
    },
    card: {
        marginBottom: theme.spacing() * 3,
        marginLeft: theme.spacing() * 3,
        marginEnd: theme.spacing() * 3,
        width: 325
    },
})

class ItemFederalncomeTax extends Component {
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

                const totalKey = over + notOver + plus + percent + nonTaxable

                let periodName;
                if (previousPeriod === period.payPeriod) {
                    periodName = ""
                } else {
                    previousPeriod = period.payPeriod
                    periodName =
                        <div>
                            <Typography key={period} variant='h6' align='center'><u>{period.payPeriod}</u></Typography>
                            <Typography key={period + "hint"} variant='h6'>When n:</Typography>
                        </div>
                }

                items.push(
                    <div key={periodData + totalKey + '-div'}>
                        {periodName}
                        <Typography key={periodData + totalKey + '-desc'} variant='h6'>
                            {over} > n ≤ {notOver}
                        </Typography>
                        <Typography key={periodData + totalKey + '-formula'} variant='h6'>
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
        const { classes, data, type } = this.props

        const sortedData = data.sort((a, b) => {
            if (a.percent < b.percent) return -1
            if (a.percent > b.percent) return 1
            return 0
        })

        return (
            <div className={classes.center}>
                <Card className={classes.card}>
                    <CardContent>
                        <div>
                            <Typography variant='h5' align='center'>
                                {type}
                            </Typography>

                            {this.displaySortedData(sortedData)}
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

ItemFederalncomeTax.propTypes = {
    data: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired
}

export default withStyles(styles)(ItemFederalncomeTax)