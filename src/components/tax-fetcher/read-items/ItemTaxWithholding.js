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
        width: 275
    },
})

class ItemTaxWithholding extends Component {
    displaySortedData = (sortedData) => {
        const items = []

        for (const period in sortedData) {
            if (sortedData.hasOwnProperty(period)) {
                const amount = sortedData[period]
                items.push(
                    <Typography key={period} variant='h6'>
                        {period}: {Currency(amount)}
                    </Typography>
                )
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

ItemTaxWithholding.propTypes = {
    data: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired
}

export default withStyles(styles)(ItemTaxWithholding)