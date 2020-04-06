import React from 'react'
import { Route, Switch } from 'react-router-dom'

import PageTaxFetcher from '../tax-fetcher/PageTaxFetcher'
import PageTrackYourTime from '../PageTrackYourTime'

const layout = (classes) =>
    <div className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
            <Route path='/track-your-time' component={PageTrackYourTime} />
            <Route path='/tax-fetcher' component={PageTaxFetcher} />
        </Switch>
    </div>

export {
    layout,
}