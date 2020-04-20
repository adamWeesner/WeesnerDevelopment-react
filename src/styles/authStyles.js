const styles = theme => ({
    vertical: {
        minWidth: 240,
        display: 'grid',
    },
    full: {
        width: '100%'
    },
    button: {
        marginTop: theme.spacing() * 2,
        marginBottom: theme.spacing(),
    },
    header: {
        marginBottom: -8,
        textDecoration: 'underline',
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