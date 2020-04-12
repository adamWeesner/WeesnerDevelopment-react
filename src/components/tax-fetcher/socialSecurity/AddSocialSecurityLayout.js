import React from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { Dialog, DialogContent } from '@material-ui/core'
import { DialogTitle } from '@material-ui/core'

import TextField from '../../WDTextField'
import Button from '../../WDButton'

import { years } from '../../../utils/utils'

const layout = (state, methods, classes) =>
    <Dialog open={methods.open} onClose={methods.close} aria-labelledby='add-new-social-security'>
        <DialogTitle id='add-new-social-security'>
            Add New Social Security
                </DialogTitle>
        <DialogContent>
            <FormControl className={classes.formControl}>
                <InputLabel>
                    Year
                </InputLabel>
                <Select
                    value={state.year}
                    onChange={methods.handleChange('year')}
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
                    item={state.percent}
                    name='percent'
                    label='Percent'
                    handleChange={methods.handleChange('percent')} />
                <TextField
                    item={state.limit}
                    name='limit'
                    label='Limit'
                    money={true}
                    handleChange={methods.handleChange('limit')} />
            </div>
            <Button
                text='Save'
                click={methods.addToServer}
            />
        </DialogContent>
    </Dialog>

export {
    layout,
}