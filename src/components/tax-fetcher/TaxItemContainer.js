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
        marginTop: theme.spacing() * 3,
        marginLeft: theme.spacing() * 3,
        marginBottom: theme.spacing(),
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
            let years = []

            data[0].forEach(item => {
                if (years.length === 0) {
                    years[0] = [item]
                } else {
                    for (let y = 0; y < years.length; y++) {
                        if(years[y].includes(item)) return

                        if (item.year === years[y][0].year)
                            years[y].push(item)
                        else if(y === years.length - 1)
                        years[years.length] = [item]
                    }
                }
            })

            const sortedYears = years.sort((a, b) => {
                if (a[0].year < b[0].year) return 1
                if (a[0].year > b[0].year) return -1
                return 0
            })

            console.log("sorted", sortedYears)

            return sortedYears.map(items => {
                return (
                    <div key={items.year + items}>
                        <Typography
                            variant='h5'
                            align='center'
                            gutterBottom={true}
                        >
                            {items[0].year}
                        </Typography>
                        {this.displayEachData(items)}
                    </div>
                )
            })
        }
    }

    displayFederalType = (typeData) => {
        return <ItemFederalIncomeTax key={typeData[0].year + typeData[0].maritalStatus} data={typeData} type={typeData[0].maritalStatus} />
    }

    displayWithholdingType = (typeData) => {
        return <ItemTaxWithholding key={typeData[0].year + typeData[0].type} type={typeData[0].type} data={typeData} />
    }

    displayEachData = (data) => {
        let itemToDisplay
        let types = []
        let items = []

        switch (this.props.type) {
            case 'Federal Income Tax':
                data.forEach(item => {
                    if (types.length === 0) {
                        types[0] = [item]
                    } else {
                        for (let y = 0; y < types.length; y++) {
                            if(types[y].includes(item)) return

                            if (item.maritalStatus === types[y][0].maritalStatus){
                                types[y].push(item)
                            } else if (y === types.length - 1)
                                types[types.length] = [item]
                        }
                    }
                })

                for(const type in types)
                    items.push(this.displayFederalType(types[type]))
                itemToDisplay = (
                    <div className={this.props.classes.horizontal} key={data.year}>
                        {items}
                    </div>
                )
                break
            case 'Medicare':
                itemToDisplay = <ItemMedicare key={data[0].year + data[0].percent} data={data} />
                break
            case 'Social Security':
                itemToDisplay = <ItemSocialSecurity key={data[0].year + data[0].amount} data={data} />
                break
            case 'Tax Withholding':
                    data.forEach(item => {
                        if (types.length === 0) {
                            types[0] = [item]
                        } else {
                            for (let y = 0; y < types.length; y++) {
                                if(types[y].includes(item)) return
    
                                if (item.type === types[y][0].type){
                                    types[y].push(item)
                                } else if (y === types.length - 1)
                                    types[types.length] = [item]
                            }
                        }
                    })
    
                    for(const type in types)
                        items.push(this.displayWithholdingType(types[type]))
                    itemToDisplay = (
                        <div className={this.props.classes.horizontal} key={data.year}>
                            {items}
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