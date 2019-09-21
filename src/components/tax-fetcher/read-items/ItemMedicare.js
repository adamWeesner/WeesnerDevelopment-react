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
        marginBottom: theme.spacing.unit * 3,
        marginStart: theme.spacing.unit * 3,
        marginEnd: theme.spacing.unit * 3
    },
})

class ItemMedicare extends Component {
    render() {
        const { classes, data } = this.props

        return (
            <div className={classes.center}>
                <Card className={classes.card}>
                    <CardContent>
                        <div>
                            <Typography variant='h6'>
                                Percent: {data.percent}%
                            </Typography>
                            <Typography variant='h6'>
                                Additional: {data.additional}%
                            </Typography>
                            <Typography align='center' variant='h6'>
                                Limits
                            </Typography>
                            <Typography variant='h6'>
                                Married: {Currency(data.limits.married)}
                            </Typography>
                            <Typography variant='h6'>
                                Separated: {Currency(data.limits.separate)}
                            </Typography>
                            <Typography variant='h6'>
                                Other (Single): {Currency(data.limits.single)}
                            </Typography>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

ItemMedicare.propTypes = {
    data: PropTypes.object.isRequired
}

export default withStyles(styles)(ItemMedicare)