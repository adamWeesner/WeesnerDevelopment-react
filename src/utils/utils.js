import React from 'react'
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format'

const currentYear = new Date().getFullYear()

function* range(start, end) {
    yield start;
    if (start === end) return;
    yield* range(start - 1, end);
}

function Currency(value) {
    return '$' + value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.formattedValue,
                    },
                })
            }}
            thousandSeparator={true}
        />
    )
}

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
}

function organizeTaxData(taxData) {
    const taxItems = []

    if (taxData.federalIncomeTax && taxData.federalIncomeTax.items)
        taxItems[items[0]] = sortByYear(taxData.federalIncomeTax.items)

    if (taxData.medicare && taxData.medicare.items)
        taxItems[items[1]] = sortByYear(taxData.medicare.items)

    if (taxData.socialSecurity && taxData.socialSecurity.items)
        taxItems[items[2]] = sortByYear(taxData.socialSecurity.items)

    if (taxData.taxWithholding && taxData.taxWithholding.items)
        taxItems[items[3]] = sortByYear(taxData.taxWithholding.items)

    return taxItems
}

const sortByYear = (items) => items.sort((a, b) => {
    if (a.year > b.year) return -1
    if (a.year < b.year) return 1
    return 0
})

const items = [
    'Federal Income Tax',
    'Medicare',
    'Social Security',
    'Tax Withholding'
]

const years = [
    ...range(currentYear, 1990)
]

const maritalStatuses = Object.freeze({
    Single: { index: 0, name: 'Single' },
    Married: { index: 1, name: 'Married' },
    Separate: { index: 2, name: 'Separate' }
})

const withholdingTypes = Object.freeze({
    General: { index: 0, name: 'General' },
    NonResident: { index: 1, name: 'NonResident' }
})

const payPeriods = Object.freeze({
    Weekly: { index: 0, name: 'Weekly' },
    Biweekly: { index: 1, name: 'Biweekly' },
    Semimonthly: { index: 2, name: 'Semimonthly' },
    Monthly: { index: 3, name: 'Monthly' },
    Quarterly: { index: 4, name: 'Quarterly' },
    Semiannual: { index: 5, name: 'Semiannual' },
    Annual: { index: 6, name: 'Annual' },
    Daily: { index: 7, name: 'Daily' }
})

export {
    payPeriods,
    withholdingTypes,
    maritalStatuses,
    years,
    items,
    organizeTaxData,
    NumberFormatCustom,
    Currency,
    currentYear
}