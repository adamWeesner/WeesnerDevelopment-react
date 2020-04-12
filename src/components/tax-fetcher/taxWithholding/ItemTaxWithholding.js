import { Component } from 'react'
import PropTypes from 'prop-types'

import { layout } from './ItemTaxWithholdingLayout'
import { layout as layoutRow } from './ItemTaxWithholdingRow'

class ItemTaxWithholding extends Component {
    displaySortedData = (sortedData) => {
        const items = []

        for (const period in sortedData) {
            if (sortedData.hasOwnProperty(period)) {
                items.push(layoutRow(sortedData[period]))
            }
        }

        return (items)
    }

    render() {
        const { data, type } = this.props

        const sortedData = data.sort((a, b) => {
            return a.amount - b.amount
        })

        return layout(type, this.displaySortedData, sortedData)
    }
}

ItemTaxWithholding.propTypes = {
    data: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired
}

export default ItemTaxWithholding