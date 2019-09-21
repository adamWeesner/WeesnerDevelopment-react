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

class ItemSocialSecurity extends Component {
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
                                Limit: {Currency(data.limit)}
                            </Typography>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

ItemSocialSecurity.propTypes = {
    data: PropTypes.object.isRequired
}

export default withStyles(styles)(ItemSocialSecurity)