import { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import { layout } from './AddFederalIncomeTaxLayout'

import FederalIncomeTax from '../../../classes/FederalIncomeTaxClass'

import { styles } from '../../../styles/taxFetcherStyles'
import { currentYear, maritalStatuses, payPeriods } from '../../../utils/utils'
import { addItem, backendUrls } from '../../../middleware/databaseConnection'

const stateDefault = new FederalIncomeTax(
    currentYear,
    maritalStatuses.Single.name,
    payPeriods.Weekly.name,
    undefined,
    undefined,
    '0',
    '0',
    undefined
)

class AddFederalIncomeTax extends Component {
    state = stateDefault

    addToServer = () => {
        let notOverAdj
        if ((this.state.atLeast !== undefined || this.state.atLeast !== '') && (this.state.notOver === '' || this.state.notOver === undefined))
            notOverAdj = Number.MAX_VALUE
        else
            notOverAdj = Number(this.state.notOver.replace(',', ''))

        const fit = new FederalIncomeTax(
            Number(this.state.year),
            this.state.maritalStatus,
            this.state.payPeriod,
            Number(this.state.atLeast.replace(',', '')),
            notOverAdj,
            Number(this.state.plus.replace(',', '')),
            Number(this.state.percent),
            Number(this.state.nonTaxable.replace(',', ''))
        )

        addItem(backendUrls.TaxFetcher.FederalIncomeTax, fit).then(_ => {
            this.setState(stateDefault)
            this.props.close()
        })
    }

    handleChange = name => event => {
        this.setState({
            ...this.state,
            [name]: event.target.value,
        })

        if (name === 'atLeast') {
            this.setState({
                atLeast: event.target.value,
                nonTaxable: event.target.value
            })
        }
    }

    render() {
        const { classes, open, close } = this.props
        const methods = { open, close, handleChange: this.handleChange, addToServer: this.addToServer }

        return layout(methods, this.state, classes)
    }
}

AddFederalIncomeTax.propTypes = {
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
}

export default withStyles(styles)(AddFederalIncomeTax)