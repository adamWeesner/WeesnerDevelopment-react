import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Card, CardContent, Typography } from '@material-ui/core'
import { Currency } from '../../../utils/utils'

const styles = theme => ({
    center: {
        display: 'flex',
        justifyContent: 'center'
    },
    card: {
        marginBottom: theme.spacing() * 3,
        marginLeft: theme.spacing() * 3,
        marginEnd: theme.spacing() * 3
    },
})

class ItemMedicare extends Component {
    limits = (data) => {
        const limits = data.limits
        let limitViews = []

        for (const limit in limits) {
            const item = limits[limit]
            limitViews.push(
                <Typography variant='h6' key={item.amount + item.year}>
                    {item.maritalStatus}: {Currency(item.amount)}
                </Typography>
            )
        }

        return limitViews
    }

    render() {
        const { classes, data } = this.props

        const itemData = data[0]

        return (
            <div className={classes.center}>
                <Card className={classes.card}>
                    <CardContent>
                        <div>
                            <Typography variant='h6'>
                                Percent: {itemData.percent}%
                            </Typography>
                            <Typography variant='h6'>
                                Additional: {itemData.additionalPercent}%
                            </Typography>
                            <Typography align='center' variant='h6'>
                                Limits
                            </Typography>
                            {this.limits(itemData)}
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

ItemMedicare.propTypes = {
    data: PropTypes.array.isRequired
}

export default withStyles(styles)(ItemMedicare)