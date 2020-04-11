import { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import { layout } from './AddMedicareLayout'

import Medicare from '../../../classes/MedicareClass'

import { styles } from '../../../styles/taxFetcherStyles'
import { currentYear, maritalStatuses } from '../../../utils/utils'
import { addItem, backendUrls } from '../../../middleware/databaseConnection'

const stateDefault = {
    year: currentYear,
    percent: "1.45",
    additionalPercent: "0.9",
    limitMarried: undefined,
    limitOther: undefined,
    limitSeparated: undefined,
}

class AddMedicare extends Component {
    state = stateDefault

    addToServer = () => {
        console.log("state", this.state)
        addItem(backendUrls.TaxFetcher.Medicare, new Medicare(
            Number(this.state.year),
            Number(this.state.percent),
            Number(this.state.additionalPercent),
            [
                {
                    year: Number(this.state.year),
                    amount: Number(this.state.limitMarried.replace(',', '')),
                    maritalStatus: `${maritalStatuses.Married.name}`
                },
                {
                    year: Number(this.state.year),
                    amount: Number(this.state.limitSeparated.replace(',', '')),
                    maritalStatus: `${maritalStatuses.Separate.name}`
                },
                {
                    year: Number(this.state.year),
                    amount: Number(this.state.limitOther.replace(',', '')),
                    maritalStatus: `${maritalStatuses.Single.name}`
                }
            ]
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

        const methods = { open, close, handleChange: this.handleChange, addToServer: this.addToServer }

        return layout(methods, this.state, classes)
    }
}

AddMedicare.propTypes = {
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
}

export default withStyles(styles)(AddMedicare)