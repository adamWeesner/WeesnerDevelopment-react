import React from 'react'
import { Dialog, DialogContent, Typography } from '@material-ui/core'
import { DialogTitle } from '@material-ui/core'
import Button from '../../WDButton'

const layout = (userInfo, methods, classes) =>
    <Dialog open={methods.open} onClose={methods.close} aria-labelledby='account'>
        <DialogTitle id='account'>
            Account
                </DialogTitle>
        <DialogContent>
            <div className={classes.vertical}>
                <div>
                    <Typography className={classes.header} color='inherit'>Name</Typography>
                    <Typography variant='h6' color='inherit'>{userInfo.name}</Typography>
                </div>
                <div>
                    <Typography className={classes.header} color='inherit'>Username</Typography>
                    <Typography variant='h6' color='inherit'>{userInfo.username}</Typography>
                </div>
                <div>
                    <Typography className={classes.header} color='inherit'>Email</Typography>
                    <Typography variant='h6' color='inherit'>{userInfo.email}</Typography>
                </div>
            </div>
            <Button
                text='Logout'
                click={methods.logout}
            />
            <Button
                text='Close'
                click={methods.closeClick}
            />
        </DialogContent>
    </Dialog>

export {
    layout,
}