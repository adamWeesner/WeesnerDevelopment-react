import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Card, CardContent, Typography } from '@material-ui/core'
import { Currency, payPeriods } from '../../../utils/utils';

const styles = theme => ({
    center: {
        display: 'flex',
        justifyContent: 'center'
    },
    card: {
        marginBottom: theme.spacing() * 3,
        marginLeft: theme.spacing() * 1.5,
        marginRight: theme.spacing() * 1.5,
        marginEnd: theme.spacing() * 3,
        width: 325
    },
})

class ItemFederalncomeTax extends Component {
    keyStart = this.props.data.year + this.props.data.percent

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

                let periodName;
                if (previousPeriod === period.payPeriod) {
                    periodName = ""
                } else {
                    previousPeriod = period.payPeriod
                    periodName =
                        <div>
                            <Typography variant='h6' align='center'><u>{period.payPeriod}</u></Typography>
                            <Typography variant='h6'>When n:</Typography>
                        </div>
                }

                items.push(
                    <div key={this.keyStart + period + periodData + '-div'}>
                        {periodName}
                        <Typography variant='h6'>
                            {over} > n ≤ {notOver}
                        </Typography>
                        <Typography variant='h6'>
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

        const periodSorted = sortedData.sort((a, b) => {
            const aPeriod = payPeriods[a.payPeriod].index
            const bPeriod = payPeriods[b.payPeriod].index

            if (aPeriod < bPeriod) return -1
            if (aPeriod > bPeriod) return 1
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

                            {this.displaySortedData(periodSorted)}
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