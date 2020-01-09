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

const items = [
    'Federal Income Tax',
    'Medicare',
    'Social Security',
    'Tax Withholding'
]

const years = [
    currentYear, ...range(currentYear - 1, 1990)
]

const maritalStatuses = Object.freeze({
    Single: { index: 0, name: 'Single' },
    Married: {index: 1, name: 'Married' },
    Separate: { index: 2, name: 'Separate' }
})

const withholdingTypes = Object.freeze({
    General: 'General',
    NonResident: 'NonResident'
})

const payPeriods = Object.freeze({
    Weekly: { index: 0, name: 'Weekly'},
    Biweekly: { index: 1, name: 'Biweekly'},
    Semimonthly: { index: 2, name: 'Semimonthly'},
    Monthly: { index: 3, name: 'Monthly'},
    Quarterly: { index: 4, name: 'Quarterly'},
    Semiannual: { index: 5, name: 'Semiannual'},
    Annual: { index: 6, name: 'Annual'},
    Daily: { index: 7, name: 'Daily'}
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