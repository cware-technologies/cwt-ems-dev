export const formStyle = theme => ({
    formSection: {
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: 'auto',
        gridAutoRows: 'auto',
        gridAutoFlow: 'row',
        columnGap: '10px',
        rowGap: '10px',
        marginBottom: '50px',
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: '1fr',
        },
    },
    outlinedFormSection: {
        width: '80%',
        display: 'grid',
        gridColumn: '1 / -1',
        gridTemplateColumns: '1fr',
        gridTemplateRows: 'auto',
        gridAutoRows: 'auto',
        gridAutoFlow: 'row',
        margin: 'auto',
        padding: 10,
        columnGap: '10px',
        rowGap: '10px',
        border: '1px dotted black',
        borderRadius: 5,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    textField: {
        gridColumn: '1 / -1',
        width: '49%',
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        [theme.breakpoints.down('sm')]: {
            width: '99%',
        }
    },
    dense: {
        marginTop: 16,
    },
    singleSpanInput: {
        width: '99%',
        gridColumn: 'span 1',
        [theme.breakpoints.down('sm')]: {
            gridColumn: '1 / -1',
        }
    },
    fullSpanInput: {
        width: '99%',
        gridColumn: '1 / -1',
    },
    heading: {
        width: '100%',
        gridColumn: '1 / -1',
        textAlign: 'center',
        margin: 'auto',
    },
    input: {
        backgroundColor: theme.palette.grey[500],
        '&:hover': {
            opacity: 0.8,
        },
    },
    inputRoot: {
        margin: '0px 0px',
    },
    inputLabel: {
        color: 'white',
    },
    menu: {
        width: 200,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing.unit / 4,
    },
    button: {
        margin: 'auto',
        marginTop: '10px',
        width: 300,
    },
    radioGroup: {
        borderTop: '1px solid midnightblue',
        paddingTop: '10px',
        [theme.breakpoints.down('sm')]: {
            gridColumn: '1 / -1',
        }
    },
    legend: {
        
    },
    formResponseText: {
        gridColumn: 1 / -1,
    },
    errorList: {
        // backgroundColor: 'lightgray',
        gridColumn: 1 / -1,
        color: 'indianred',
        padding: '10px',
        margin: 0,
        borderBottom: '1px solid indianred',
        // borderRadius: '2px',
    },
    errorListItem: {
        marginLeft: '5px',
    },
    successList: {
        // backgroundColor: 'lightgray',
        gridColumn: 1 / -1,
        color: 'green',
        padding: '10px',
        margin: 0,
        borderBottom: '1px solid green',
        // borderRadius: '2px',
    },
});