import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { TextField, Dialog, DialogContent, Button } from '@material-ui/core'
import { DialogTitle, InputAdornment } from '@material-ui/core'
import { years, withholdingTypes, payPeriods, NumberFormatCustom } from '../../../utils/utils'
import { taxWithholding } from '../../../utils/routes'
import { addItem } from '../../../middleware/databaseConnection'

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
    year: 2019,
    type: 'general',
    payPeriod: 'weekly',
    amount: undefined
}

class AddFederalIncomeTax extends Component {
    state = stateDefault

    addToServer = () => {
        const obj = {}
        const item = {}
        item[this.state.payPeriod] = Number(this.state.amount.replace(',', ''))
        obj[this.state.type] = item

        addItem(`${this.state.year}`, 'tax-withholding', {
            obj
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
                                    withholdingTypes.map(item => {
                                        const readable = item.charAt(0).toUpperCase() + item.slice(1)
                                        return <MenuItem key={item} value={item}>
                                            {readable}
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
                                    payPeriods.map(item => {
                                        return <MenuItem key={item.key} value={item.key}>
                                            {item.value}
                                        </MenuItem>
                                    })}
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <TextField
                            error={amount === ''}
                            InputProps={{
                                inputComponent: NumberFormatCustom,
                                startAdornment: <InputAdornment position='start'>$</InputAdornment>
                            }}
                            name='amount'
                            label='Amount'
                            className={classes.textField}
                            margin='normal'
                            value={amount}
                            onChange={this.handleChange('amount')}
                        />
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