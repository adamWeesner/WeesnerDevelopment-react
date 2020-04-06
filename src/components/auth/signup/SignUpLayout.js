import React from 'react'
import { Dialog, DialogContent } from '@material-ui/core'
import { DialogTitle } from '@material-ui/core'

import Button from '../../WDButton'
import SignUp from './SignUp'

import { createTextField } from '../utils'

const layout = (userInfo, methods, classes) =>
    <Dialog open={methods.open} onClose={methods.close} aria-labelledby='create'>
        <DialogTitle id='create'>
            Create
        </DialogTitle>
        <DialogContent>
            <div className={classes.vertical}>
                {createTextField('name', userInfo.name, methods.handleChange)}
                {createTextField('email', userInfo.email, methods.handleChange)}
                {createTextField('username', userInfo.username, methods.handleChange)}
                {createTextField('password', userInfo.password, methods.handleChange)}
            </div>
            <Button
                text='Create'
                click={methods.create}
            />
        </DialogContent>
    </Dialog>

const view = (open, close) => 
    <SignUp open={open} close={close} />

export {
    layout,
    view,
}