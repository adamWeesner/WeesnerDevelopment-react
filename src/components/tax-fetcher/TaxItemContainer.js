import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

import Button from '../WDButton'

import ItemFederalIncomeTax from './federalIncomeTax/ItemFederalIncomeTax'
import ItemMedicare from './read-items/ItemMedicare'
import ItemSocialSecurity from './read-items/ItemSocialSecurity'
import ItemTaxWithholding from './read-items/ItemTaxWithholding'

import AddFederalIncomeTax from './federalIncomeTax/AddFederalIncomeTax'
import AddMedicare from './medicare/AddMedicare'
import AddSocialSecurity from './add-items/AddSocialSecurity'
import AddTaxWithholding from './add-items/AddTaxWithholding'

const styles = () => ({
    horizontal: {
        display: 'flex',
        justifyContent: 'center',
        minWidth: 400
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

            data.forEach(item => {
                if (years.length === 0) {
                    years[0] = [item]
                } else {
                    for (let y = 0; y < years.length; y++) {
                        if (years[y].includes(item)) {
                            break
                        }

                        if (item.year === years[y][0].year) {
                            years[y].push(item)
                            break
                        } else if (y === years.length - 1) {
                            years[years.length] = [item]
                            break
                        }
                    }
                }
            })

            const sortedYears = years.sort((a, b) => {
                if (a[0].year < b[0].year) return 1
                if (a[0].year > b[0].year) return -1
                return 0
            })

            return sortedYears.map((items, i) => {
                return (
                    <div key={items[0].year + [i] + "-label-div"}>
                        <Typography
                            key={items[0].year + "-label"}
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
                            if (types[y].includes(item)) return

                            if (item.maritalStatus === types[y][0].maritalStatus) {
                                types[y].push(item)
                            } else if (y === types.length - 1)
                                types[types.length] = [item]
                        }
                    }
                })

                for (const type in types)
                    items.push(this.displayFederalType(types[type]))
                itemToDisplay = (
                    <div className={this.props.classes.horizontal} key={data[0].year + "-federal-income-tax"}>
                        {items}
                    </div>
                )
                break
            case 'Medicare':
                itemToDisplay = <ItemMedicare key={data[0].year + "-medicare"} data={data} />
                break
            case 'Social Security':
                itemToDisplay = <ItemSocialSecurity key={data[0].year + "-social-security"} data={data} />
                break
            case 'Tax Withholding':
                data.forEach(item => {
                    if (types.length === 0) {
                        types[0] = [item]
                    } else {
                        for (let y = 0; y < types.length; y++) {
                            if (types[y].includes(item)) return

                            if (item.type === types[y][0].type) {
                                types[y].push(item)
                            } else if (y === types.length - 1)
                                types[types.length] = [item]
                        }
                    }
                })

                for (const type in types)
                    items.push(this.displayWithholdingType(types[type]))
                itemToDisplay = (
                    <div className={this.props.classes.horizontal} key={data[0].year + "-tax-withholding"}>
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
        const { type, taxData } = this.props

        const typeData = taxData[type]

        return (
            <div>
                <Button
                    key={typeData}
                    text='Add New'
                    click={this.dialogOpen}
                />

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