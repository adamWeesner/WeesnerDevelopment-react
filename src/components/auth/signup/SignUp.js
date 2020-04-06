import { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { signUp } from '../../../middleware/databaseConnection'
import { styles } from '../../../styles/authStyles'
import { layout } from './SignUpLayout'

const stateDefault = {
    name: "",
    email: "",
    username: "",
    password: "",
}

class SignUp extends Component {
    create = async () => {
        const { name, email, username, password } = this.state
        const received = await signUp(name, email, username, password)
        console.log(received)
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

    render() {
        const { classes, open, close } = this.props
        const { name, email, username, password } = this.state

        const userInfo = { name, email, username, password }
        const methods = { open, close, handleChange: this.handleChange, create: this.create }
        return layout(userInfo, methods, classes)
    }
}

SignUp.propTypes = {
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
}

export default withStyles(styles)(SignUp)