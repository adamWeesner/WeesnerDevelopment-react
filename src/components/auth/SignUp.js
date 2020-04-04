import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Dialog, DialogContent } from '@material-ui/core'
import { DialogTitle } from '@material-ui/core'
import { signUp } from '../../middleware/databaseConnection'
import TextField from '../WDTextField'
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
})

const stateDefault = {
    name: "",
    email: "",
    username: "",
    password: "",
}

class SignUp extends Component {
    state = stateDefault

    create = async () => {
        const { name, email, username, password } = this.state
        const received = await signUp(name, email, username, password)
        console.log(received)
        this.setState(stateDefault)
        this.props.close()
    }

    handleChange = name => event => {
        this.setState({
            ...this.state,
            [name]: event.target.value,
        });
    }

    render() {
        const { classes, open, close } = this.props
        const { name, email, username, password } = this.state

        return (
            <Dialog open={open} onClose={close} aria-labelledby='create'>
                <DialogTitle id='create'>
                    Create
                </DialogTitle>
                <DialogContent>
                    <div className={classes.vertical}>
                        <TextField
                            maxWidth='100%'
                            item={name}
                            name='name'
                            label='name'
                            inputProps={false}
                            handleChange={this.handleChange('name')} />

                        <TextField
                            maxWidth='100%'
                            item={email}
                            name='email'
                            label='email'
                            inputProps={false}
                            handleChange={this.handleChange('email')} />

                        <TextField
                            maxWidth='100%'
                            item={username}
                            name='username'
                            label='Username'
                            inputProps={false}
                            handleChange={this.handleChange('username')} />

                        <TextField
                            maxWidth='100%'
                            item={password}
                            name='password'
                            label='Password'
                            inputProps={false}
                            handleChange={this.handleChange('password')} />
                    </div>
                    <Button
                        text='Create'
                        click={this.create}
                    />
                </DialogContent>
            </Dialog>
        )
    }
}

SignUp.propTypes = {
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
}

export default withStyles(styles)(SignUp)