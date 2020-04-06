import React from 'react'
import { Link } from 'react-router-dom'
import { Drawer, List, ListItem, ListItemText } from '@material-ui/core'

const layout = (classes) =>
    <Drawer
        variant='permanent'
        className={classes.drawer}
        classes={{
            paper: classes.drawerPaper,
        }}>
        <div className={classes.toolbar} />
        <List>
            <ListItem button key='track-your-time' component={Link} to='/track-your-time'>
                <ListItemText primary='Track Your Time' />
            </ListItem>
            <ListItem button key='tax-fetcher' component={Link} to='/tax-fetcher'>
                <ListItemText primary='Tax Fetcher' />
            </ListItem>
        </List>
    </Drawer>

export {
    layout,
}