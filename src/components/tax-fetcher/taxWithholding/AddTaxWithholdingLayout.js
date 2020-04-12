import React from 'react'
import { Dialog, DialogContent } from '@material-ui/core'
import { DialogTitle } from '@material-ui/core'

import Button from '../../WDButton'

import { createText, createDropDown, createDropDownForValues } from '../utils'
import { years, withholdingTypes, payPeriods } from '../../../utils/utils'

const layout = (state, methods, classes) =>
    <Dialog open={methods.open} onClose={methods.close} aria-labelledby='add-new-tax-withholding'>
        <DialogTitle id='add-new-tax-withholding'>
            Add New Tax Withholding
        </DialogTitle>
        <DialogContent>
            <div className={classes.horizontal}>
                {createDropDown(state.year, 'year', 'Year', years, classes, methods.handleChange)}
                {createDropDownForValues(state.type, 'type', 'Type', withholdingTypes, classes, methods.handleChange)}
                {createDropDownForValues(state.payPeriod, 'payPeriod', 'Pay Period', payPeriods, classes, methods.handleChange)}
            </div>
            <div>
                {createText(state.amount, 'amount', 'Amount', true, methods.handleChange)}
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