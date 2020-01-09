import React from 'react'
import { Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    button: {
        marginTop: theme.spacing() * 3,
        marginLeft: theme.spacing(),
        marginBottom: theme.spacing(),
    },
})

class CustomButton extends React.PureComponent {
    render() {
        const { text, click } = this.props

        return (<Button
            variant='contained'
            color='primary'
            className={this.props.classes.button}
            onClick={click}
        >
            {text}
        </Button>)
    }
}

export default withStyles(styles)(CustomButton)