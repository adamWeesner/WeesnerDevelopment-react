import { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import SocialSecurity from '../../../classes/SocialSecurityClass'

import { styles } from '../../../styles/taxFetcherStyles'
import { layout } from './AddSocialSecurityLayout'
import { currentYear } from '../../../utils/utils'
import { addItem, backendUrls } from '../../../middleware/databaseConnection'


const stateDefault = new SocialSecurity(
    currentYear,
    6.2,
    undefined
)

class AddSocialSecurity extends Component {
    state = stateDefault

    addToServer = () => {
        addItem(backendUrls.TaxFetcher.SocialSecurity, new SocialSecurity(
            Number(this.state.year),
            Number(this.state.percent),
            Number(this.state.limit.replace(',', ''))
        )).then(_ => {
            this.setState(stateDefault)
            this.props.close()
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

        const methods = { 
            open, 
            close, 
            handleChange: this.handleChange, 
            addToServer: this.addToServer,
        }

        return layout(this.state, methods, classes)
    }
}

AddSocialSecurity.propTypes = {
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
}

export default withStyles(styles)(AddSocialSecurity)
