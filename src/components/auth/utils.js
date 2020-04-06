import React from 'react'
import TextField from '../WDTextField'

const createTextField = (label, item, handleChange) => {
    const title = `${label[0].toUpperCase()}${label.slice(1)}`
    return (<TextField
        maxWidth='100%'
        item={item}
        name={label}
        label={title}
        inputProps={false}
        handleChange={handleChange(`${label}`)} />)
}

export {
    createTextField,
}