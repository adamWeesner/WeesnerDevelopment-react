import React from 'react'
import { Dialog, DialogContent } from '@material-ui/core'
import { DialogTitle } from '@material-ui/core'

import Button from '../../WDButton'

import { years } from '../../../utils/utils'
import { createText, createDropDown } from '../utils'

const layout = (state, methods, classes) =>
    <Dialog open={methods.open} onClose={methods.close} aria-labelledby='add-new-social-security'>
        <DialogTitle id='add-new-social-security'>
            Add New Social Security
        </DialogTitle>
        <DialogContent>
            {createDropDown(state.year, 'year', 'Year', years, classes, methods.handleChange)}
            <div className={classes.horizontal}>
                {createText(state.percent, 'percent', 'Percent', false, methods.handleChange)}
                {createText(state.limit, 'limit', 'Limit', true, methods.handleChange)}
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