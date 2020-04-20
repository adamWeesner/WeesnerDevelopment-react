import { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import { layout } from './LoginLayout'

import { login } from '../../../middleware/databaseConnection'
import { styles } from '../../../styles/authStyles'

const stateDefault = {
    username: "",
    password: "",
    invalidUser: false,
}

class Login extends Component {
    login = async () => {
        const { username, password } = this.state
        const loginData = await login(username, password)

        if(loginData.reasonCode){
            this.setState({
                invalidUser: true,
                password: ""
            })
        } else {
            this.setState(stateDefault)
            window.location.reload()
            this.props.close()
        }
    }

    handleChange = name => event => {
        this.setState({
            ...this.state,
            invalidUser: false,
            [name]: event.target.value,
        });
    }

    state = stateDefault

    render = () => {
        const { classes, open, close, signUp } = this.props
        const { username, password, invalidUser } = this.state

        const userInfo = { username, password, invalidUser }
        const methods = {
            open,
            close,
            handleChange: this.handleChange,
            login: this.login,
            signUp
        }

        return layout(userInfo, methods, classes)
    }
}

Login.propTypes = {
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    signUp: PropTypes.func.isRequired
}

export default withStyles(styles)(Login)