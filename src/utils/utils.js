import React from 'react'
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format'

function* range(start, end) {
    yield start;
    if (start === end) return;
    yield* range(start - 1, end);
}

export function Currency(value) {
    return '$' + value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

export function NumberFormatCustom(props) {
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

export function organizeTaxData(taxData) {
    const taxItems = []
    const federalIncomeTax = []
    const medicare = []
    const socialSecurity = []
    const taxWithholding = []

    const sortedData = taxData.sort((a, b) => {
        if (a.year > b.year) return -1
        if (a.year < b.year) return 1
        return 0
    })

    for (const taxType in sortedData) {
        if (sortedData.hasOwnProperty(taxType)) {
            const taxData = sortedData[taxType]

            if (taxData.medicare !== undefined)
                medicare.push(taxData.medicare)
            else if (taxData.socialSecurity !== undefined)
                socialSecurity.push(taxData.socialSecurity)
            else if (taxData.taxWithholding !== undefined)
                taxWithholding.push(taxData.taxWithholding)
            else if (taxData.federalIncomeTax !== undefined){
                federalIncomeTax.push(taxData.federalIncomeTax)
            }
        }
    }

    taxItems[items[0]] = federalIncomeTax
    taxItems[items[1]] = medicare
    taxItems[items[2]] = socialSecurity
    taxItems[items[3]] = taxWithholding

    return taxItems
}

export const items = [
    'Federal Income Tax',
    'Medicare',
    'Social Security',
    'Tax Withholding'
]
export const years = [
    2019, ...range(2018, 1990)
]
export const maritalStatuses = [
    'Single',
    'Married',
    'Separate'
]
export const withholdingTypes = [
    'General',
    'MonResidents'
]
export const payPeriods = [
    { key: 'Weekly', value: 'Weekly' },
    { key: 'Biweekly', value: 'Biweekly' },
    { key: 'Semimonthly', value: 'Semimonthly' },
    { key: 'Monthly', value: 'Monthly' },
    { key: 'Quarterly', value: 'Quarterly' },
    { key: 'Semiannual', value: 'Semiannual' },
    { key: 'Annual', value: 'Annual' },
    { key: 'Daily', value: 'Daily' }
]