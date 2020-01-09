import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { Dialog, DialogContent } from '@material-ui/core'
import { DialogTitle, Typography } from '@material-ui/core'
import TextField from '../../WDTextField'
import Button from '../../WDButton'
import { years, currentYear, maritalStatuses } from '../../../utils/utils'
import { addItem, backendUrls } from '../../../middleware/databaseConnection'

const styles = theme => ({
    horizontal: {
        display: 'flex',
        minWidth: 400
    },
    formControl: {
        margin: theme.spacing(),
        minWidth: 120,
    },
    typography: {
        marginLeft: theme.spacing(),
        marginTop: theme.spacing() * 2.5,
        fontSize: 16
    }
})

const stateDefault = {
    year: currentYear,
    percent: "1.45",
    additional: "0.9",
    limitMarried: undefined,
    limitSeparated: undefined,
    limitOther: undefined
}

class AddMedicare extends Component {
    state = stateDefault

    addToServer = () => {
        addItem(backendUrls.Medicare, {
            year: Number(this.state.year),
            percent: Number(this.state.percent),
            additionalPercent: Number(this.state.additional),
            limits: [
                {
                    year: Number(this.state.year),
                    amount: Number(this.state.limitMarried.replace(',', '')),
                    maritalStatus: `${maritalStatuses.Married}`
                },
                {
                    year: Number(this.state.year),
                    amount: Number(this.state.limitSeparated.replace(',', '')),
                    maritalStatus: `${maritalStatuses.Separate}`
                },
                {
                    year: Number(this.state.year),
                    amount: Number(this.state.limitOther.replace(',', '')),
                    maritalStatus: `${maritalStatuses.Single}`
                }
            ]
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

    createText = (item, name, label, money) => {
        return <TextField
            item={item}
            name={name}
            label={label}
            money={money}
            handleChange={this.handleChange(name)} />
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
                        {this.createText(percent, 'percent', 'Percent')}
                        {this.createText(additional, 'additional', 'Additional')}
                    </div>
                    <Typography className={classes.typography}>Limits</Typography>
                    <div className={classes.horizontal}>
                        {this.createText(limitOther, 'limitOther', 'Single', true)}
                        {this.createText(limitMarried, 'limitMarried', 'Married', true)}
                        {this.createText(limitSeparated, 'limitSeparated', 'Separated', true)}
                    </div>

                    <Button
                        text='Save'
                        click={this.addToServer}
                    />
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