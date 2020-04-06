const drawerWidth = 160

const styles = (theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        display: 'flex'
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
    },
    toolbar: theme.mixins.toolbar,
    rightText: {
        marginLeft: 'auto',
        boxShadow: 'none',
        marginRight: -16,
        fontSize: '1.2rem',
        textTransform: 'none',
    }
})

export {
    styles,
}