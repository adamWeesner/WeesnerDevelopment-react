import React from 'react'
import { Dialog, DialogContent } from '@material-ui/core'
import { DialogTitle, Typography } from '@material-ui/core'

import Button from '../../WDButton'

import { createText, createDropDown } from '../utils'
import { years } from '../../../utils/utils'

const layout = (methods, state, classes) => {
    const { year, percent, additionalPercent, limitMarried, limitSeparated, limitOther } = state

    return (
        <Dialog open={methods.open} onClose={methods.close} aria-labelledby='add-new-medicare'>
            <DialogTitle id='add-new-medicare'>
                Add New Medicare
            </DialogTitle>
            <DialogContent>
                {createDropDown(year, 'year', 'Year', years, classes, methods.handleChange)}

                <div className={classes.horizontal}>
                    {createText(percent, 'percent', 'Percent', false, methods.handleChange)}
                    {createText(additionalPercent, 'additionalPercent', 'Additional', false, methods.handleChange)}
                </div>
                <Typography className={classes.typography}>Limits</Typography>
                <div className={classes.horizontal}>
                    {createText(limitOther, 'limitOther', 'Single', true, methods.handleChange)}
                    {createText(limitMarried, 'limitMarried', 'Married', true, methods.handleChange)}
                    {createText(limitSeparated, 'limitSeparated', 'Separated', true, methods.handleChange)}
                </div>

                <Button
                    text='Save'
                    click={methods.addToServer}
                />
            </DialogContent>
        </Dialog>
    )
}

export {
    layout,
}