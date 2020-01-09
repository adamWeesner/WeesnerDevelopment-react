import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'
import { Currency } from '../../../utils/utils'
import Card from '../../WDCard'

class ItemSocialSecurity extends Component {
    render() {
        const { data } = this.props

        const itemData = data[0]

        return (
            <Card>
                <Typography variant='h6'>
                    Percent: {itemData.percent}%
                            </Typography>
                <Typography variant='h6'>
                    Limit: {Currency(itemData.limit)}
                </Typography>
            </Card>
        )
    }
}

ItemSocialSecurity.propTypes = {
    data: PropTypes.array.isRequired
}

export default ItemSocialSecurity