import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, Route, BrowserRouter, Switch } from 'react-router-dom'
import { AppBar, Toolbar, CssBaseline, Typography, Button } from '@material-ui/core'
import { Drawer, List, ListItem, ListItemText } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import PageTrackYourTime from './PageTrackYourTime'
import PageTaxFetcher from './tax-fetcher/PageTaxFetcher'
import { getToken } from '../middleware/databaseConnection'
import Login from '../components/auth/Login'
import Account from '../components/auth/Account'

const drawerWidth = 160

const styles = (theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        display: 'flex'
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
    },
    toolbar: theme.mixins.toolbar,
    rightText: {
        marginLeft: 'auto',
        boxShadow: 'none',
        marginRight: -16,
        fontSize: '1.2rem',
        textTransform: 'none',
    }
})

class NavBar extends Component {
    state = {
        dialogLoginOpen: false,
        dialogAccountOpen: false,
    }

    dialogLoginVisible = () => this.setState({ dialogLoginOpen: true })
    dialogLoginGone = () => this.setState({ dialogLoginOpen: false })
    dialogAccountVisible = () => this.setState({ dialogAccountOpen: true })
    dialogAccountGone = () => this.setState({ dialogAccountOpen: false })

    authClick = () => {
        if (getToken()) {
            this.dialogAccountVisible()
        } else {
            this.dialogLoginVisible()
        }
    }

    componentDidMount = () => {
        if (getToken() == null) {
            this.dialogLoginVisible()
        }
    }

    updateDialog = () => {
        const { dialogLoginOpen, dialogAccountOpen } = this.state

        if (dialogLoginOpen)
            return (<Login open={dialogLoginOpen} close={this.dialogLoginGone} />)

        if (dialogAccountOpen)
            return (<Account open={dialogAccountOpen} close={this.dialogAccountGone} />)
    }

    render() {
        const { classes } = this.props

        return (<BrowserRouter>
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
                            onClick={this.authClick}
                        >
                            {getToken() ? 'Account' : 'Login'}
                        </Button>
                    </Toolbar>
                </AppBar>
                <Drawer
                    style={{ visibility: getToken() ? 'visible' : 'collapse' }}
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

                <div className={classes.content} style={{ visibility: getToken() ? 'visible' : 'collapse' }}>
                    <div className={classes.toolbar} />
                    <Switch>
                        <Route path='/track-your-time' component={PageTrackYourTime} />
                        <Route path='/tax-fetcher' component={PageTaxFetcher} />
                    </Switch>
                </div>
            </div>
            {this.updateDialog()}
        </BrowserRouter >)
    }
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NavBar)