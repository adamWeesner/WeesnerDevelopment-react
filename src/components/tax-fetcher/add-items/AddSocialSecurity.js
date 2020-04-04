import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { Dialog, DialogContent } from '@material-ui/core'
import { DialogTitle } from '@material-ui/core'
import TextField from '../../WDTextField'
import Button from '../../WDButton'
import { years, currentYear } from '../../../utils/utils'
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
})

const stateDefault = {
    year: currentYear,
    percent: "6.2",
    limit: undefined
}

class AddSocialSecurity extends Component {
    state = stateDefault

    addToServer = () => {
        addItem(backendUrls.TaxFetcher.SocialSecurity, {
            year: Number(this.state.year),
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
                            item={percent}
                            name='percent'
                            label='Percent'
                            handleChange={this.handleChange('percent')} />
                        <TextField
                            item={limit}
                            name='limit'
                            label='Limit'
                            money={true}
                            handleChange={this.handleChange('limit')} />
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

AddSocialSecurity.propTypes = {
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
}

export default withStyles(styles)(AddSocialSecurity)
