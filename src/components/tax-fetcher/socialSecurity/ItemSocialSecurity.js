import { Component } from 'react'
import PropTypes from 'prop-types'

import { layout } from './ItemSocialSecurityLayout'

class ItemSocialSecurity extends Component {
    render() {
        const { data } = this.props

        return layout(data[0])
    }
}

ItemSocialSecurity.propTypes = {
    data: PropTypes.array.isRequired
}

export default ItemSocialSecurity