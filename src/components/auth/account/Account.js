import { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { account, logout } from '../../../middleware/databaseConnection'
import { styles } from '../../../styles/authStyles'
import { layout } from './AccountLayout'

const stateDefault = {
    name: null,
    email: null,
    username: null,
}

class Account extends Component {
    account = async () => {
        const received = await account()
        if (received) {
            this.setState({...received})
        }
    }

    logout = () => {
        logout()
        window.location.reload()
        this.closeClick()
    }

    closeClick = () => {
        this.setState(stateDefault)
        this.props.close()
    }

    handleChange = (name) => event => {
        this.setState({
            ...this.state,
            [name]: event.target.value,
        })
    }

    state = stateDefault

    render() {
        const { classes, open, close } = this.props
        const { name, email, username } = this.state

        if (name === null && email === null && username === null)
            this.account()

        const userInfo = { name, username, email }
        const methods = {
            open,
            close,
            logout: this.logout,
            closeClick: this.closeClick
        }

        return layout(userInfo, methods, classes)
    }
}

Account.propTypes = {
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
}

export default withStyles(styles)(Account)