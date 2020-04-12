import { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import { layout } from './AddTaxWithholdingLayout'

import TaxWithholding from '../../../classes/TaxWithholdingClass'

import { styles } from '../../../styles/taxFetcherStyles'
import { currentYear, withholdingTypes, payPeriods } from '../../../utils/utils'
import { addItem, backendUrls } from '../../../middleware/databaseConnection'

const stateDefault = new TaxWithholding(
    currentYear,
    withholdingTypes.General.name,
    payPeriods.Weekly.name,
    undefined
)

class AddTaxWithholding extends Component {
    state = stateDefault

    addToServer = () => {
        addItem(backendUrls.TaxFetcher.TaxWithholding, new TaxWithholding(
            Number(this.state.year),
            this.state.type,
            this.state.payPeriod,
            Number(this.state.amount.replace(',', ''))
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

AddTaxWithholding.propTypes = {
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
}

export default withStyles(styles)(AddTaxWithholding)