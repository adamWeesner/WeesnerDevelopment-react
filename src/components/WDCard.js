import React from 'react'
import { Card, CardContent } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    center: {
        display: 'flex',
        justifyContent: 'center'
    },
    card: {
        marginBottom: theme.spacing() * 3,
        marginLeft: theme.spacing() * 1.5,
        marginRight: theme.spacing() * 1.5,
        width: 325
    },
})

class CustomCard extends React.PureComponent {
    render() {
        return (<div className={this.props.classes.center}>
            <Card className={this.props.classes.card}>
                <CardContent>
                    <div>
                        {this.props.children}
                    </div>
                </CardContent>
            </Card>
        </div>)
    }
}

export default withStyles(styles)(CustomCard)