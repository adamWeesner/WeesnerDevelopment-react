import React from 'react'
import { AppBar, Tabs, Tab } from '@material-ui/core'

import TaxItemContainer from '../TaxItemContainer'

import { items } from '../../../utils/utils'

const layout = (taxData, selectedTab, methods, classes) =>
    <div className={classes.root}>
        <AppBar position='static' elevation={0}>
            <Tabs
                value={selectedTab}
                onChange={methods.handleChange}
                variant='scrollable'
            >
                {items.map((item, i) => <Tab label={item} key={i} />)}
            </Tabs>
        </AppBar>
        <TaxItemContainer
            type={items[selectedTab]}
            taxData={taxData}
            taxesNeedUpdate={methods.updateTaxes} />
    </div>

export {
    layout,
}