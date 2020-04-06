import React from 'react'
import { Dialog, DialogContent } from '@material-ui/core'
import { DialogTitle } from '@material-ui/core'

import Button from '../../WDButton'
import { createText, createDropDown, createDropDownForValues } from '../utils'

import { years, maritalStatuses, payPeriods } from '../../../utils/utils'

const layout = (methods, state, classes) =>
    <Dialog open={methods.open} onClose={methods.close} aria-labelledby='add-new-fed-tax-bracket'>
        <DialogTitle id='add-new-fed-tax-bracket'>
            Add New Federal Income Tax Bracket
                </DialogTitle>
        <DialogContent>
            <div className={classes.horizontal}>
                {createDropDown(state.year, 'year', 'Year', years, classes, methods.handleChange)}
                {createDropDownForValues(state.maritalStatus, 'maritalStatus', 'Marital Status', maritalStatuses, classes, methods.handleChange)}
                {createDropDownForValues(state.payPeriod, 'payPeriod', 'Pay Period', payPeriods, classes, methods.handleChange)}
            </div>
            <div className={classes.horizontal}>
                {createText(state.atLeast, 'atLeast', 'At Least', true, methods.handleChange)}
                {createText(state.notOver, 'notOver', 'Not Over', true, methods.handleChange)}
            </div>
            <div className={classes.horizontal}>
                {createText(state.plus, 'plus', 'Plus', true, methods.handleChange)}
                {createText(state.percent, 'percent', 'Percent', false, methods.handleChange)}
                {createText(state.nonTaxable, 'nonTaxable', 'Non Taxable', true, methods.handleChange)}
            </div>
            <Button
                text='save'
                click={methods.addToServer}
            />
        </DialogContent>
    </Dialog>

export {
    layout,
}