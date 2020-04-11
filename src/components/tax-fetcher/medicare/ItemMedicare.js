import { Component } from 'react'
import PropTypes from 'prop-types'

import { layout } from './ItemMedicareLayout'
import { layout as limitRow } from './ItemMedicareRow'

import { maritalStatuses } from '../../../utils/utils'

class ItemMedicare extends Component {
    limits = (data) => {
        const limits = data.limits
        let limitViews = []

        const sortedLimits = limits.sort((a, b) => {
            const aStatus = maritalStatuses[a.maritalStatus].index
            const bStatus = maritalStatuses[b.maritalStatus].index

            return aStatus - bStatus
        })

        for (const limit in sortedLimits) {
            limitViews.push(limitRow(limits[limit]))
        }

        return limitViews
    }

    render() {
        const { data } = this.props

        return layout(data[0], this.limits)
    }
}

ItemMedicare.propTypes = {
    data: PropTypes.array.isRequired
}

export default ItemMedicare