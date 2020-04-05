import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Dialog, DialogContent } from '@material-ui/core'
import { DialogTitle } from '@material-ui/core'
import { login } from '../../middleware/databaseConnection'
import TextField from '../WDTextField'
import Button from '../WDButton'
import SignUp from '../auth/SignUp'

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
    username: "",
    password: "",
    dialogOpenSignUp: false
}

class Login extends Component {
    state = stateDefault

    login = async () => {
        const { username, password } = this.state
        await login(username, password)
        this.setState(stateDefault)
        window.location.reload()
        this.props.close()
    }

    signUp = () => {
        this.setState({
            dialogOpenSignUp: true,
        })
        this.props.close()
    }

    signUpDialogClose = () => {
        this.setState({
            dialogOpenSignUp: false,
        })
    }

    handleChange = name => event => {
        this.setState({
            ...this.state,
            [name]: event.target.value,
        });
    }

    render() {
        const { classes, open, close } = this.props
        const { username, password, dialogOpenSignUp } = this.state

        return (
            <Dialog open={open} onClose={close} aria-labelledby='login'>
                <DialogTitle id='login'>
                    Login
                </DialogTitle>
                <DialogContent>
                    <div className={classes.vertical}>
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
                        text='Login'
                        click={this.login}
                    />

                    <Button
                        text='Sign up'
                        click={this.signUp}
                    />
                </DialogContent>
                <SignUp open={dialogOpenSignUp} close={this.signUpDialogClose} />
            </Dialog>
        )
    }
}

Login.propTypes = {
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
}

export default withStyles(styles)(Login)