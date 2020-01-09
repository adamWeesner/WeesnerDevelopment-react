import React from 'react'
import PropTypes from 'prop-types'
import { Link, Route, BrowserRouter, Switch } from "react-router-dom"
import { AppBar, Toolbar, CssBaseline, Typography } from '@material-ui/core'
import { Drawer, List, ListItem, ListItemText } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import PageTrackYourTime from './PageTrackYourTime'
import PageTaxFetcher from './tax-fetcher/PageTaxFetcher';

const drawerWidth = 160;

const styles = themed => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: themed.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
    },
    toolbar: themed.mixins.toolbar,
});

function NavBar(props) {
    const { classes } = props;

    return (
        <BrowserRouter>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar} elevation={0}>
                    <Toolbar>
                        <Typography variant='h6' color='inherit'>Weesner Development</Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
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

                <div className={classes.content}>
                    <div className={classes.toolbar} />
                    <Switch>
                        <Route path='/track-your-time' component={PageTrackYourTime} />
                        <Route path='/tax-fetcher' component={PageTaxFetcher} />
                    </Switch>
                </div>
            </div>
        </BrowserRouter >
    );
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);