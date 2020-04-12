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

    fetchTaxData = async () => {
        const readData = await readAll()

        if (readData.medicare && readData.medicare.statusCode && readData.medicare.statusCode === 401) {
            this.setState({
                dialogOpen: true,
                taxesNeedUpdate: false,
            })
        } else {
            this.setState({
                taxesNeedUpdate: false,
                taxData: organizeTaxData(readData)
            })
        }
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