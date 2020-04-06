import { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { login } from '../../../middleware/databaseConnection'
import { styles } from '../../../styles/authStyles'
import { layout } from './LoginLayout'

const stateDefault = {
    username: "",
    password: "",
}

class Login extends Component {
    login = async () => {
        const { username, password } = this.state
        await login(username, password)
        this.setState(stateDefault)
        window.location.reload()
        this.props.close()
    }

    handleChange = name => event => {
        this.setState({
            ...this.state,
            [name]: event.target.value,
        });
    }

    state = stateDefault

    render = () => {
        const { classes, open, close, signUp } = this.props
        const { username, password } = this.state

        const userInfo = { username, password }
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