import { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'

import { layout } from './PageTaxFetcherLayout'

import { styles } from '../../../styles/taxFetcherStyles'
import { organizeTaxData } from '../../../utils/utils'
import { readAll } from '../../../middleware/databaseConnection'

class PageTaxFetcher extends Component {
    state = {
        selectedTab: 1,
        taxesNeedUpdate: false,
        taxData: [],
    }

    updateTaxes = () => {
        this.setState({
            taxesNeedUpdate: true
        })
    }

    handleChange = (event, newValue) => {
        if (newValue !== this.state.selectedTab)
            this.setState({
                selectedTab: newValue
            })
    }

    checkItemForStatus = (item) => {
        const itemData = item && item.statusCode && item.statusCode === 401
        if (itemData) {
            this.setState({
                taxesNeedUpdate: false,
            })
            window.location.reload()
        }
    }

    fetchTaxData = async () => {
        const readData = await readAll()
        const readDataKeys = Object.keys(readData)

        for (let i = 0; i < readDataKeys.length; i++) {
            this.checkItemForStatus(readData[readDataKeys[i]])
        }

        this.setState({
            taxesNeedUpdate: false,
            taxData: organizeTaxData(readData)
        })
    }

    componentDidMount = () => {
        this.fetchTaxData()
        this.handleChange('', 0)
    }

    render() {
        const { classes } = this.props
        const { selectedTab, taxData, taxesNeedUpdate } = this.state

        if (taxesNeedUpdate)
            this.fetchTaxData()

        const methods = {
            handleChange: this.handleChange,
            updateTaxes: this.updateTaxes,
        }

        return layout(taxData, selectedTab, methods, classes)
    }
}

export default withStyles(styles)(PageTaxFetcher)