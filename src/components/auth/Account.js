import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Dialog, DialogContent, Typography } from '@material-ui/core'
import { DialogTitle } from '@material-ui/core'
import { account, logout } from '../../middleware/databaseConnection'
import Button from '../WDButton'

const styles = theme => ({
    vertical: {
        minWidth: 240,
        display: 'grid',
    },
    full: {
        width: '100%'
    },
    button: {
        marginTop: theme.spacing() * 2,
        marginBottom: theme.spacing(),
    },
    header: {
        marginBottom: -8,
        textDecoration: 'underline',
    }
})

const stateDefault = {
    name: null,
    email: null,
    username: null,
}

class Account extends Component {
    state = stateDefault

    account = async () => {
        const received = await account()
        console.log("received", received)
        if (received) {
            this.setState({
                name: received.name,
                email: received.email,
                username: received.username
            })
        }
    }

    logout = async () => {
        await logout()
        window.location.reload()
        this.closeClick()
    }

    closeClick = () => {
        this.props.close()
    }

    handleChange = (name) => event => {
        this.setState({
            ...this.state,
            [name]: event.target.value,
        });
    }

    render() {
        const { classes, open, close } = this.props
        const { name, email, username } = this.state

        if (name === null && email === null && username === null)
            this.account()

        console.log("account", name, email, username)

        return (
            <Dialog open={open} onClose={close} aria-labelledby='account'>
                <DialogTitle id='account'>
                    Account
                </DialogTitle>
                <DialogContent>
                    <div className={classes.vertical}>
                        <div>
                            <Typography className={classes.header} color='inherit'>Name</Typography>
                            <Typography variant='h6' color='inherit'>{name}</Typography>
                        </div>
                        <div>
                            <Typography className={classes.header} color='inherit'>Username</Typography>
                            <Typography variant='h6' color='inherit'>{username}</Typography>
                        </div>
                        <div>
                            <Typography className={classes.header} color='inherit'>Email</Typography>
                            <Typography variant='h6' color='inherit'>{email}</Typography>
                        </div>
                    </div>
                    <Button
                        text='Logout'
                        click={this.logout}
                    />
                    <Button
                        text='Close'
                        click={this.closeClick}
                    />
                </DialogContent>
            </Dialog>
        )
    }
}

Account.propTypes = {
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
}

export default withStyles(styles)(Account)