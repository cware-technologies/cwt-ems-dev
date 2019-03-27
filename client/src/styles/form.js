import { orange } from "@material-ui/core/colors";

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
        gridColumn: 'span 2',
        textAlign: 'left',
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
        marginTop: '50px',
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
    errorList: {
        backgroundColor: 'lightgray',
        padding: '10px',
        border: '2px solid red',
        borderRadius: '10px',
    },
    errorListItem: {
        marginLeft: '5px',
    }
});