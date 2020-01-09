import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { Dialog, DialogContent, Button } from '@material-ui/core'
import { DialogTitle } from '@material-ui/core'
import CustomTextField from '../../CustomTextField'
import { years, maritalStatuses, payPeriods, currentYear } from '../../../utils/utils'
import { addItem, backendUrls } from '../../../middleware/databaseConnection'

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing(),
        marginRight: theme.spacing(),
        maxWidth: 120
    },
    horizontal: {
        display: 'flex',
        minWidth: 450
    },
    formControl: {
        margin: theme.spacing(),
        minWidth: 120,
    },
    button: {
        marginTop: 20,
        marginLeft: theme.spacing(),
        marginBottom: theme.spacing(),
    },
})

const stateDefault = {
    year: currentYear,
    maritalStatus: 'Single',
    atLeast: undefined,
    notOver: undefined,
    plus: "0",
    percent: "0",
    nonTaxable: undefined,
    payPeriod: 'Weekly'
}

class AddFederalIncomeTax extends Component {
    state = stateDefault

    addToServer = () => {
        let notOverAdj
        if ((this.state.atLeast !== undefined || this.state.atLeast !== '') && (this.state.notOver === '' || this.state.notOver === undefined))
            notOverAdj = Number.MAX_VALUE
        else
            notOverAdj = Number(this.state.notOver.replace(',', ''))

        addItem(backendUrls.FederalIncomeTax, {
            year: Number(this.state.year),
            maritalStatus: this.state.maritalStatus,
            payPeriod: this.state.payPeriod,
            over: Number(this.state.atLeast.replace(',', '')),
            notOver: notOverAdj,
            plus: Number(this.state.plus.replace(',', '')),
            percent: Number(this.state.percent),
            nonTaxable: Number(this.state.nonTaxable.replace(',', ''))
        }).then(_ => {
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

    createText = (item, name, label, money) => {
        return <CustomTextField
            item={item}
            name={name}
            label={label}
            money={money}
            className={this.props.classes.textField}
            handleChange={this.handleChange(name)} />
    }

    createFormControl = (item, name, label, getItems) => {
        return <FormControl className={this.props.classes.formControl}>
            <InputLabel>
                {label}
            </InputLabel>
            <Select
                value={item}
                onChange={this.handleChange(name)}
                name={name}
            >
                {getItems}
            </Select>
        </FormControl>
    }

    createDropDown = (item, name, label, array) => {
        return this.createFormControl(item, name, label, array.map(item => {
            return <MenuItem key={item} value={item}>
                {item}
            </MenuItem>
        }))
    }

    createDropDownForValues = (item, name, label, array) => {
        return this.createFormControl(item, name, label, Object.values(array).map(item => {
            return <MenuItem key={item.index} value={item.name}>
                {item.name}
            </MenuItem>
        }))
    }

    render() {
        const { classes, open, close } = this.props
        const { year, maritalStatus, payPeriod, atLeast, notOver, plus, percent, nonTaxable } = this.state

        return (
            <Dialog open={open} onClose={close} aria-labelledby='add-new-fed-tax-bracket'>
                <DialogTitle id='add-new-fed-tax-bracket'>
                    Add New Federal Income Tax Bracket
                </DialogTitle>
                <DialogContent>
                    <div className={classes.horizontal}>
                        {this.createDropDown(year, 'year', 'Year', years)}
                        {this.createDropDownForValues(maritalStatus, 'maritalStatus', 'Marital Status', maritalStatuses)}
                        {this.createDropDownForValues(payPeriod, 'payPeriod', 'Pay Period', payPeriods)}

                    </div>
                    <div className={classes.horizontal}>
                        {this.createText(atLeast, 'atLeast', 'At Least', true)}
                        {this.createText(notOver, 'notOver', 'Not Over', true)}
                    </div>
                    <div className={classes.horizontal}>
                        {this.createText(plus, 'plus', 'Plus', true)}
                        {this.createText(percent, 'percent', 'Percent')}
                        {this.createText(nonTaxable, 'nonTaxable', 'Non Taxable', true)}
                    </div>
                    <Button
                        variant='contained'
                        color='primary'
                        className={classes.button}
                        onClick={this.addToServer}
                    >
                        Save
                    </Button>
                </DialogContent>
            </Dialog>
        )
    }
}

AddFederalIncomeTax.propTypes = {
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
}

export default withStyles(styles)(AddFederalIncomeTax)