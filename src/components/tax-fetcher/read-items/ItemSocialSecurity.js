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

class ItemSocialSecurity extends Component {
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
                                Limit: {Currency(itemData.limit)}
                            </Typography>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

ItemSocialSecurity.propTypes = {
    data: PropTypes.array.isRequired
}

export default withStyles(styles)(ItemSocialSecurity)