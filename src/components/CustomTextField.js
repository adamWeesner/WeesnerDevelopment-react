import React from 'react'
import { InputAdornment, TextField } from '@material-ui/core'
import { NumberFormatCustom } from '../utils/utils'

export default class CustomTextField extends React.PureComponent {
    render() {
        const { item, name, label, className, handleChange, money } = this.props

        return (<TextField
            InputLabelProps={{ shrink: true }}
            label={label}
            InputProps={
                money ? {
                    inputComponent: NumberFormatCustom,
                    startAdornment: <InputAdornment position='start'>$</InputAdornment>,
                } :
                { endAdornment: <InputAdornment position='end'>%</InputAdornment> }
            }
            error={item === ''}
            className={className}
            margin='normal'
            name={name}
            value={item}
            onChange={handleChange}
        />)
    }
}