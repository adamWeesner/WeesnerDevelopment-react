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
        marginBottom: theme.spacing.unit * 3,
        marginStart: theme.spacing.unit * 3,
        marginEnd: theme.spacing.unit * 3,
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
                for (const periodInfo in period) {
                    const info = period[periodInfo]
                    const over = info.over
                    const notOver = info.notOver
                    const plus = info.plus
                    const percent = info.percent
                    const nonTaxable = info.nonTaxable

                    const totalKey = over + notOver + plus + percent + nonTaxable

                    let periodName;
                    if (previousPeriod === periodData) {
                        periodName = ""
                    } else {
                        previousPeriod = periodData
                        periodName =
                            <div>
                                <Typography key={periodData} variant='h6' align='center'><u>{periodData}</u></Typography>
                                <Typography key={periodData + "hint"} variant='h6'>When n:</Typography>
                            </div>
                    }

                    items.push(
                        <div key={periodData + totalKey + '-div'}>
                            {periodName}
                            <Typography key={periodData + totalKey + '-desc'} variant='h6'>
                                {over} > n ≤ {notOver}
                            </Typography>
                            <Typography key={periodData + totalKey + '-formula'} variant='h6'>
                                ((n - {nonTaxable}) + {plus}) * {(percent * .01).toFixed(2)}
                            </Typography>
                            <br />
                        </div>
                    )
                }
            }
        }

        return (items)
    }

    render() {
        const { classes, data, type } = this.props

        const sortedData = data.sort((a, b) => {
            if (a.amount < b.amount) return -1
            if (a.amount > b.amount) return 1
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