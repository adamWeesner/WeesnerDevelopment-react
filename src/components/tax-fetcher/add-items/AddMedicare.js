import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { TextField, Dialog, DialogContent, Button } from '@material-ui/core'
import { DialogTitle, InputAdornment, Typography } from '@material-ui/core'
import { years, NumberFormatCustom } from '../../../utils/utils'
import { addItem } from '../../../middleware/firebase-firestore'

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        maxWidth: 120
    },
    horizontal: {
        display: 'flex',
        minWidth: 400
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
    typography: {
        marginStart: theme.spacing.unit,
        marginTop: theme.spacing.unit * 2.5,
        fontSize: 16
    }
})

const stateDefault = {
    year: 2019,
    percent: 1.45,
    additional: 0.9,
    limitMarried: undefined,
    limitSeparated: undefined,
    limitOther: undefined
}

class AddMedicare extends Component {
    state = stateDefault

    addToServer = () => {
        addItem(`${this.state.year}`, 'medicare', {
            year: this.state.year,
            percent: Number(this.state.percent),
            additional: Number(this.state.additional),
            limits: {
                married: Number(this.state.limitMarried.replace(',', '')),
                separate: Number(this.state.limitSeparated.replace(',', '')),
                single: Number(this.state.limitOther.replace(',', ''))
            }
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
        const { year, percent, additional, limitMarried, limitSeparated, limitOther } = this.state

        return (
            <Dialog open={open} onClose={close} aria-labelledby='add-new-medicare'>
                <DialogTitle id='add-new-medicare'>
                    Add New Medicare
                </DialogTitle>
                <DialogContent>
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
                    <div className={classes.horizontal}>
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
                            error={additional === ''}
                            InputLabelProps={{ shrink: true }}
                            InputProps={{ endAdornment: <InputAdornment position='end'>%</InputAdornment> }}
                            name='additional'
                            label='Additional'
                            type='number'
                            className={classes.textField}
                            margin='normal'
                            value={additional}
                            onChange={this.handleChange('additional')}
                        />
                    </div>
                    <Typography className={classes.typography}>Limits</Typography>
                    <div className={classes.horizontal}>
                        <TextField
                            InputProps={{
                                inputComponent: NumberFormatCustom,
                                startAdornment: <InputAdornment position='start'>$</InputAdornment>,
                            }}
                            name='limitMarried'
                            label='Married'
                            className={classes.textField}
                            margin='normal'
                            type='text'
                            value={limitMarried}
                            onChange={this.handleChange('limitMarried')}
                        />
                        <TextField
                            InputProps={{
                                inputComponent: NumberFormatCustom,
                                startAdornment: <InputAdornment position='start'>$</InputAdornment>,
                            }}
                            name='limitSeparated'
                            label='Seperated'
                            className={classes.textField}
                            margin='normal'
                            value={limitSeparated}
                            onChange={this.handleChange('limitSeparated')}
                        />
                        <TextField
                            InputProps={{
                                inputComponent: NumberFormatCustom,
                                startAdornment: <InputAdornment position='start'>$</InputAdornment>,
                            }}
                            name='limitOther'
                            label='Other'
                            className={classes.textField}
                            margin='normal'
                            value={limitOther}
                            onChange={this.handleChange('limitOther')}
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

AddMedicare.propTypes = {
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
}

export default withStyles(styles)(AddMedicare)