const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    horizontal: {
        display: 'flex',
        minWidth: 450
    },
    horizontalCenter: {
        display: 'flex',
        justifyContent: 'center',
        minWidth: 400
    },
    formControl: {
        margin: theme.spacing(),
        minWidth: 120,
    },
    typography: {
        marginLeft: theme.spacing(),
        marginTop: theme.spacing() * 2.5,
        fontSize: 16
    },
})

export {
    styles,
}