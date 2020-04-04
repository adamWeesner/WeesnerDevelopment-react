import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { AppBar, Tabs, Tab } from '@material-ui/core'
import { items, organizeTaxData } from '../../utils/utils'
import TaxItemContainer from './TaxItemContainer'
import Login from '../auth/Login'
import { readAll } from '../../middleware/databaseConnection'

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
})

class PageTaxFetcher extends Component {
    state = {
        selectedTab: 1,
        taxesNeedUpdate: false,
        taxData: [],
        dialogOpen: false,
    }

    dialogClose = () => {
        this.setState({
            dialogOpen: false,
            taxesNeedUpdate: true
        })
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

        if (readData.medicare.statusCode && readData.medicare.statusCode === 401) {
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
        const { selectedTab, taxData, taxesNeedUpdate, dialogOpen } = this.state

        if (taxesNeedUpdate)
            this.fetchTaxData()

        return (
            <div className={classes.root}>
                <AppBar position='static' elevation={0}>
                    <Tabs
                        value={selectedTab}
                        onChange={this.handleChange}
                        variant='scrollable'
                    >
                        {items.map((item, i) => <Tab label={item} key={i} />)}
                    </Tabs>
                </AppBar>
                <Login open={dialogOpen} close={this.dialogClose} />
                <TaxItemContainer
                    type={items[selectedTab]}
                    taxData={taxData}
                    taxesNeedUpdate={this.updateTaxes} />
            </div>
        )
    }
}

export default withStyles(styles)(PageTaxFetcher)