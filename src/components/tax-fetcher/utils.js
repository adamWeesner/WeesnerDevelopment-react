import React from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'

import TextField from '../WDTextField'

const createText = (item, name, label, money, handleChange) => {
    return <TextField
        item={item}
        name={name}
        label={label}
        money={money}
        handleChange={handleChange(`${name}`)} />
}

const createFormControl = (item, name, label, classes, handleChange, getItems) => {
    return <FormControl className={classes.formControl}>
        <InputLabel>
            {label}
        </InputLabel>  
        <Select
            value={item}
            onChange={handleChange(`${name}`)}
            name={name}
        >
            {getItems}
        </Select>
    </FormControl>
}

const createDropDown = (item, name, label, array, classes, handleChange) => {
    return createFormControl(item, name, label, classes, handleChange, array.map(item => {
        return <MenuItem key={item} value={item}>
            {item}
        </MenuItem>
    }))
}

const createDropDownForValues = (item, name, label, array, classes, handleChange) => {
    return createFormControl(item, name, label, classes, handleChange, Object.values(array).map(item => {
        return <MenuItem key={item.index} value={item.name}>
            {item.name}
        </MenuItem>
    }))
}

export {
    createText,
    createFormControl,
    createDropDown,
    createDropDownForValues
}
