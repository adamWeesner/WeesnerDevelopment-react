import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Button, Typography } from '@material-ui/core'

import ItemMedicare from './read-items/ItemMedicare'
import ItemSocialSecurity from './read-items/ItemSocialSecurity'
import ItemTaxWithholding from './read-items/ItemTaxWithholding'
import AddFederalIncomeTax from './add-items/AddFederalIncomeTax'

import AddMedicare from './add-items/AddMedicare'
import AddSocialSecurity from './add-items/AddSocialSecurity'
import AddTaxWithholding from './add-items/AddTaxWithholding'
import ItemFederalIncomeTax from './read-items/ItemFederalIncomeTax'

const styles = theme => ({
    horizontal: {
        display: 'flex',
        justifyContent: 'center',
        minWidth: 400
    },
    button: {
        marginTop: theme.spacing.unit * 3,
        marginStart: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit,
    },
})

class TaxItemContainer extends Component {
    state = {
        dialogOpen: false
    }

    dialogOpen = () => {
        this.setState({
            dialogOpen: true
        })
    }

    dialogClose = () => {
        this.props.taxesNeedUpdate()
        this.setState({
            dialogOpen: false
        })
    }

    displayAddItem = () => {
        const dialogOpen = this.state.dialogOpen
        let itemToAdd

        switch (this.props.type) {
            case 'Federal Income Tax':
                itemToAdd = <AddFederalIncomeTax open={dialogOpen} close={this.dialogClose} />
                break
            case 'Medicare':
                itemToAdd = <AddMedicare open={dialogOpen} close={this.dialogClose} />
                break
            case 'Social Security':
                itemToAdd = <AddSocialSecurity open={dialogOpen} close={this.dialogClose} />
                break
            case 'Tax Withholding':
                itemToAdd = <AddTaxWithholding open={dialogOpen} close={this.dialogClose} />
                break
            default:
                itemToAdd = undefined
        }

        return itemToAdd
    }

    displayYearData = (data) => {
        if (data !== undefined) {
            return data.map(item => {
                return (
                    <div key={item.year + item.data}>
                        <Typography
                            variant='h5'
                            align='center'
                            gutterBottom={true}
                        >
                            {item.year}
                        </Typography >
                        {this.displayEachData(item)}
                    </div>
                )
            })
        }
    }

    displayEachData = (yearData) => {
        let itemToDisplay
        switch (this.props.type) {
            case 'Federal Income Tax':
                itemToDisplay = (
                    <div className={this.props.classes.horizontal} key={yearData.year}>
                        <ItemFederalIncomeTax key={yearData.year + '-single'} data={yearData.single} type='Single' />
                        <ItemFederalIncomeTax key={yearData.year + '-married'} data={yearData.married} type='Married' />
                    </div>
                )
                break
            case 'Medicare':
                itemToDisplay = <ItemMedicare data={yearData} />
                break
            case 'Social Security':
                itemToDisplay = <ItemSocialSecurity data={yearData} />
                break
            case 'Tax Withholding':
                itemToDisplay = (
                    <div className={this.props.classes.horizontal} key={yearData.year}>
                        <ItemTaxWithholding key={yearData.year + '-general'} type='General' data={yearData.general} />
                        <ItemTaxWithholding key={yearData.year + '-nonResidents'} type='NonResidents' data={yearData.nonResidents} />
                    </div>
                )
                break
            default:
                itemToDisplay = undefined
        }

        return itemToDisplay
    }

    render() {
        const { classes, type, taxData } = this.props

        const typeData = taxData[type]

        return (
            <div>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={this.dialogOpen}
                >
                    Add New
                </Button>

                {this.displayYearData(typeData)}
                {this.displayAddItem()}
            </div>
        )
    }
}

TaxItemContainer.propTypes = {
    type: PropTypes.string.isRequired,
    taxData: PropTypes.array.isRequired,
    taxesNeedUpdate: PropTypes.func.isRequired
}

export default withStyles(styles)(TaxItemContainer)