import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { Dialog, DialogContent, Button } from '@material-ui/core'
import { DialogTitle } from '@material-ui/core'
import CustomTextField from '../../CustomTextField'
import { years, withholdingTypes, payPeriods, currentYear } from '../../../utils/utils'
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
    type: 'General',
    payPeriod: 'Weekly',
    amount: undefined
}

class AddFederalIncomeTax extends Component {
    state = stateDefault

    addToServer = () => {
        addItem(backendUrls.TaxWithholding, {
            year: Number(this.state.year),
            type: this.state.type,
            payPeriod: this.state.payPeriod,
            amount: Number(this.state.amount.replace(',', ''))
        }).then(_ => {
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
        const { year, payPeriod, type, amount } = this.state

        return (
            <Dialog open={open} onClose={close} aria-labelledby='add-new-tax-withholding'>
                <DialogTitle id='add-new-tax-withholding'>
                    Add New Tax Withholding
                </DialogTitle>
                <DialogContent>
                    <div className={classes.horizontal}>
                        <FormControl className={classes.formControl}>
                            <InputLabel>
                                Year
                            </InputLabel>
                            <Select
                                value={year}
                                onChange={this.handleChange('year')}
                                name='year'
                            >
                                {
                                    years.map(item => {
                                        return <MenuItem key={item} value={item}>
                                            {item}
                                        </MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel>
                                Type
                            </InputLabel>
                            <Select
                                value={type}
                                onChange={this.handleChange('type')}
                                name='type'
                            >
                                {
                                    Object.values(withholdingTypes).map(item => {
                                        return <MenuItem key={item} value={item}>
                                            {item}
                                        </MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel>
                                Pay Period
                            </InputLabel>
                            <Select
                                name='payPeriod'
                                value={payPeriod}
                                onChange={this.handleChange('payPeriod')}
                            >
                                {
                                    Object.values(payPeriods).map(item => {
                                        return <MenuItem key={item.index} value={item.name}>
                                            {item.name}
                                        </MenuItem>
                                    })}
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <CustomTextField
                            item={amount}
                            name='amount'
                            label='Amount'
                            money={true}
                            className={classes.textField}
                            handleChange={this.handleChange('amount')} />
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