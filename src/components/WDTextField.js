import React from 'react'
import PropTypes from 'prop-types'
import { InputAdornment, TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { NumberFormatCustom } from '../utils/utils'

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing(),
        marginRight: theme.spacing(),
    }
})

class CustomTextField extends React.PureComponent {
    render() {
        const { item, name, label, handleChange, money, inputProps, maxWidth } = this.props

        let showInputProps = true
        if(inputProps != null) showInputProps = inputProps

        return (<TextField
            InputLabelProps={{ shrink: true }}
            style={{maxWidth: (maxWidth ? maxWidth : 120)}}
            label={label}
            InputProps={
                showInputProps ? (money ? {
                    inputComponent: NumberFormatCustom,
                    startAdornment: <InputAdornment position='start'>$</InputAdornment>,
                } :
                { endAdornment: <InputAdornment position='end'>%</InputAdornment> })
                : null
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

CustomTextField.propTypes = {
    maxWidth: PropTypes.string,
}

export default withStyles(styles)(CustomTextField)