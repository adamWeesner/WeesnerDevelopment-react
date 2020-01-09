import React from 'react'
import { InputAdornment, TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { NumberFormatCustom } from '../utils/utils'

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing(),
        marginRight: theme.spacing(),
        maxWidth: 120
    }
})

class CustomTextField extends React.PureComponent {
    render() {
        const { item, name, label, handleChange, money } = this.props

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
            className={this.props.classes.textField}
            margin='normal'
            name={name}
            value={item}
            onChange={handleChange}
        />)
    }
}

export default withStyles(styles)(CustomTextField)