import { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import { view as loginDialog } from '../../components/auth/login/LoginLayout'
import { view as accountDialog } from '../../components/auth/account/AccountLayout'
import { view as signUpDialog } from '../../components/auth/signup/SignUpLayout'
import { layout } from './NavBarLayout'

import { getToken } from '../../middleware/databaseConnection'
import { styles } from '../../styles/navBarStyles'

class NavBar extends Component {
    state = {
        dialogLoginOpen: false,
        dialogAccountOpen: false,
        dialogSignUpOpen: false,
    }

    dialogLoginVisible = () => this.setState({ dialogLoginOpen: true })
    dialogLoginGone = () => this.setState({ dialogLoginOpen: false })
    dialogAccountVisible = () => this.setState({ dialogAccountOpen: true })
    dialogAccountGone = () => this.setState({ dialogAccountOpen: false })
    dialogSignUpVisible = () => this.setState({
        dialogLoginOpen: false,
        dialogSignUpOpen: true
    })
    dialogSignUpGone = () => this.setState({ dialogSignUpOpen: false })

    authClick = () => {
        const { dialogSignUpOpen } = this.state
        if (getToken())
            this.dialogAccountVisible()
        else if (!dialogSignUpOpen)
            this.dialogLoginVisible()
    }

    updateDialog = () => {
        const { dialogLoginOpen, dialogAccountOpen, dialogSignUpOpen } = this.state

        if (dialogLoginOpen)
            return loginDialog(dialogLoginOpen, this.dialogLoginGone, this.dialogSignUpVisible)

        if (dialogSignUpOpen)
            return signUpDialog(dialogSignUpOpen, this.dialogSignUpGone)

        if (dialogAccountOpen)
            return accountDialog(dialogAccountOpen, this.dialogAccountGone)

    }

    componentDidMount = () => {
        if (!getToken())
            this.dialogLoginVisible()
    }

    render() {
        const { classes } = this.props
        const methods = {
            authClick: this.authClick,
            updateDialog: this.updateDialog
        }
        return layout(methods, classes)
    }
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NavBar)