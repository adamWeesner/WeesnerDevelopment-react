import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { TextField, Dialog, DialogContent, Button } from '@material-ui/core'
import { DialogTitle, InputAdornment } from '@material-ui/core'
import { years, NumberFormatCustom } from '../../../utils/utils'
import { socialSecurity } from '../../../utils/routes'
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
})

const stateDefault = {
    year: 2019,
    percent: 6.2,
    limit: undefined
}

class AddSocialSecurity extends Component {
    state = stateDefault

    addToServer = () => {
        addItem(`${this.state.year}`, 'social-security', {
            percent: Number(this.state.percent),
            limit: Number(this.state.limit.replace(',', ''))
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
        const { year, percent, limit } = this.state

        return (
            <Dialog open={open} onClose={close} aria-labelledby='add-new-social-security'>
                <DialogTitle id='add-new-social-security'>
                    Add New Social Security
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
                            error={limit === ''}
                            InputProps={{
                                inputComponent: NumberFormatCustom,
                                startAdornment: <InputAdornment position='start'>$</InputAdornment>,
                            }}
                            name='limit'
                            label='Limit'
                            className={classes.textField}
                            margin='normal'
                            value={limit}
                            onChange={this.handleChange('limit')}
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

AddSocialSecurity.propTypes = {
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
}

export default withStyles(styles)(AddSocialSecurity)