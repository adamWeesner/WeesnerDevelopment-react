import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { TextField, Dialog, DialogContent, Button } from '@material-ui/core'
import { DialogTitle, InputAdornment } from '@material-ui/core'
import { years, maritalStatuses, payPeriods, NumberFormatCustom } from '../../../utils/utils'
import { federalIncomeTax } from '../../../utils/routes'
import { addItem } from '../../../middleware/firebase-firestore'

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        maxWidth: 120
    },
    horizontal: {
        display: 'flex',
        minWidth: 450
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    button: {
        marginTop: 20,
        marginStart: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
})

const stateDefault = {
    year: 2018,
    maritalStatus: 'single',
    atLeast: undefined,
    notOver: undefined,
    plus: undefined,
    percent: 0,
    nonTaxable: undefined,
    payPeriod: 'weekly'
}

class AddFederalIncomeTax extends Component {
    state = stateDefault

    addToServer = () => {
        let notOverAdj
        if ((this.state.atLeast !== undefined || this.state.atLeast !== '') && (this.state.notOver === '' || this.state.notOver === undefined))
            notOverAdj = 'Infinity'
        else
            notOverAdj = Number(this.state.notOver.replace(',', ''))

        addItem(`${this.state.year}`, 'federal-income-tax', {
            year: this.state.year,
            maritalStatus: this.state.maritalStatus,
            atLeast: Number(this.state.atLeast.replace(',', '')),
            notOver: notOverAdj,
            plus: Number(this.state.plus.replace(',', '')),
            percent: Number(this.state.percent),
            nonTaxable: Number(this.state.nonTaxable.replace(',', '')),
            payPeriod: this.state.payPeriod
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
            console.log('nonTaxable', this.state.nonTaxable)
        }
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
                                Marital Status
                            </InputLabel>
                            <Select
                                value={maritalStatus}
                                onChange={this.handleChange('maritalStatus')}
                                name='maritalStatus'
                            >
                                {
                                    maritalStatuses.map(item => {
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
                    <div className={classes.horizontal}>
                        <TextField
                            error={atLeast === ''}
                            InputProps={{
                                inputComponent: NumberFormatCustom,
                                startAdornment: <InputAdornment position='start'>$</InputAdornment>
                            }}
                            name='atLeast'
                            label='At Least'
                            className={classes.textField}
                            margin='normal'
                            value={atLeast}
                            onChange={this.handleChange('atLeast')}
                        />
                        <TextField
                            error={notOver === ''}
                            InputProps={{
                                inputComponent: NumberFormatCustom,
                                startAdornment: <InputAdornment position='start'>$</InputAdornment>
                            }}
                            name='notOver'
                            label='Not Over'
                            className={classes.textField}
                            margin='normal'
                            value={notOver}
                            onChange={this.handleChange('notOver')}
                        />
                    </div>
                    <div className={classes.horizontal}>
                        <TextField
                            error={plus === ''}
                            InputProps={{
                                inputComponent: NumberFormatCustom,
                                startAdornment: <InputAdornment position='start'>$</InputAdornment>
                            }}
                            name='plus'
                            label='Plus'
                            className={classes.textField}
                            margin='normal'
                            value={plus}
                            onChange={this.handleChange('plus')}
                        />
                        <TextField
                            error={percent === ''}
                            InputLabelProps={{ shrink: true }}
                            InputProps={{ endAdornment: <InputAdornment position='end'>%</InputAdornment> }}
                            name='percent'
                            label='Percent'
                            type='number'
                            className={classes.textField}
                            margin='normal'
                            value={percent}
                            onChange={this.handleChange('percent')}
                        />
                        <TextField
                            error={nonTaxable === ''}
                            InputProps={{
                                inputComponent: NumberFormatCustom,
                                startAdornment: <InputAdornment position='start'>$</InputAdornment>
                            }}
                            name='nonTaxable'
                            label='Not Taxable'
                            className={classes.textField}
                            margin='normal'
                            value={nonTaxable}
                            onChange={this.handleChange('nonTaxable')}
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