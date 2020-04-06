import React from 'react'
import { Dialog, DialogContent } from '@material-ui/core'
import { DialogTitle } from '@material-ui/core'

import Login from './Login'
import Button from '../../WDButton'

import { createTextField } from '../authUtils'

const layout = (userInfo, methods, classes) =>
    <Dialog open={methods.open} onClose={methods.close} aria-labelledby='login'>
        <DialogTitle id='login'>
            Login
        </DialogTitle>
        <DialogContent>
            <div className={classes.vertical}>
                {createTextField('username', userInfo.username, methods.handleChange)}
                {createTextField('password', userInfo.password, methods.handleChange)}
            </div>

            <Button
                text='Login'
                click={methods.login}
            />

            <Button
                text='Sign up'
                click={methods.signUp}
            />
        </DialogContent>
    </Dialog>

const view = (open, gone, signUpVisible) =>
    <Login open={open} close={gone} signUp={signUpVisible} />


export {
    layout,
    view
}