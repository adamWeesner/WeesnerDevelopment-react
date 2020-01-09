import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Card, CardContent, Typography } from '@material-ui/core'

const styles = theme => ({
    card: {
        margin: theme.spacing() * 3,
        minWidth: 275
    },
    title: {
        fontSize: 20
    }
})

class PageTrackYourTime extends Component {
    componentDidMount = () => {
        this.initServer()
    }

    initServer = () => {
    }

    render() {
        const { classes } = this.props

        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title}><b>Welcome to Track Your Time</b></Typography>
                </CardContent>
            </Card>
        );
    }
}

PageTrackYourTime.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PageTrackYourTime)