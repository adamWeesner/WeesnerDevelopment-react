import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppBar, Toolbar, CssBaseline, Typography, Button } from '@material-ui/core'

import { layout as drawerLayout } from '../../components/navbar/DrawerLayout'
import { layout as drawerItemLayout } from '../../components/navbar/DrawerItemsLayout'

import { getToken } from '../../middleware/databaseConnection'

const updateDrawer = (classes) => {
    if (getToken())
        return drawerLayout(classes)
}

const updateContentLayout = (classes) => {
    if (getToken())
        return drawerItemLayout(classes)
}

const layout = (methods, classes) =>
    <BrowserRouter>
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position='fixed' className={classes.appBar} elevation={0}>
                <Toolbar>
                    <Typography variant='h6' color='inherit'>Weesner Development</Typography>
                    <Button
                        variant='contained'
                        elevation={0}
                        color='primary'
                        className={classes.rightText}
                        onClick={methods.authClick}
                    >
                        {getToken() ? 'Account' : 'Login'}
                    </Button>
                </Toolbar>
            </AppBar>
            {updateDrawer(classes)}
            {updateContentLayout(classes)}
        </div>
        {methods.updateDialog()}
    </BrowserRouter >

export {
    layout,
}