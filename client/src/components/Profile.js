import React from 'react';
import { withStyles } from '@material-ui/core/styles'
import Container from './MainContainer'
import HierarchyChart from './HierarchyChart'
import ProfilePic from '../assets/profile-pic.jpg'
import { Typography } from '@material-ui/core';
import generateChart from '../helpers/generateChart';
import EmployeeBadge from './EmployeeBadge';

const styles = theme => ({
    container: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridTemplateRows: '1fr auto 500px',
        gridTemplateAreas: '"header" "info" "chain"',
        rowGap: '20px',
    },
    infoContainer: {
        gridArea: 'info',
        display: 'grid',
        gridTemplateColumns: '1fr 3fr',
        gridTemplateRows: 'auto',
        gridAutoRows: '50px',
        gridAutoFlow: 'row',
    },
    infoAttribute: {
        backgroundColor: theme.palette.secondary.dark,
        borderBottom: `3px solid ${theme.palette.secondary.light}`,
        padding: theme.spacing.unit * 2,
    },
    infoValue: {
        backgroundColor: theme.palette.secondary.light,
        borderBottom: `3px solid ${theme.palette.secondary.dark}`,
        padding: theme.spacing.unit * 2,
    },
    chainContainer: {
        gridArea: 'chain',
        height: '100%',
        width: '100%',
        border: `2px solid ${theme.palette.secondary.light}`
    },
    chainHeader: {
        borderBottom: `2px solid ${theme.palette.secondary.light}`,
    }
})

const data = [
    {
        attribute: 'Department',
        value: 'Nights Watch',
    },
    {
        attribute: 'Location',
        value: 'Castle Black',
    },
    {
        attribute: 'Manager',
        value: 'Mormont',
    },
    {
        attribute: 'Email',
        value: 'jon_snow@westeros.com',
    },
    {
        attribute: 'Mobile',
        value: '090078601',
    },
]

const hierarchy = {
    "name": "Ousaid Imtiaz",
    "position": "CEO",
    "children": [
        {
            "name": "Sajeel Waien",
            "position": "Manager",
            "children": [
                {
                    "name": "Ehsan Ul Hassan",
                    "position": "Peon",
                },
    //             {
    //                 "name": "Mariam Amin",
    //                 "value": 300
    //             },
    //             {
    //                 "name": "Suleman Ishtiaq",
    //                 "value": 200
    //             }
            ]
        },
    //     {
    //         "name": "Jeff Bezos",
    //         "value": 200
    //     }
    ]
}

class Profile extends React.Component {
    state = {
        chainLoaded: false,
    }

    componentDidMount() {
        // generateChart(hierarchy);
        // this.setState(prevState => ({
        //     chainLoaded: true,
        // }))
    }

    render() {
        let { classes } = this.props

        return (
            <Container _className={classes.container}>
                <EmployeeBadge/>
                <div className={classes.infoContainer}>
                    {data.map(item => {
                        return (
                            <React.Fragment>
                                <Typography variant="body2" component="h5" color='secondary' className={classes.infoAttribute}>{item.attribute}</Typography>
                                <Typography variant="body2" component="h6" color='default' className={classes.infoValue}>{item.value}</Typography>
                            </React.Fragment>
                        )
                    })}
                </div>
                <div className={classes.chainContainer}>
                    <Typography className={classes.chainHeader} variant='headline' component='h1' color='secondary'>
                        Reporting Chain
                    </Typography>
                    <HierarchyChart 
                        data={hierarchy}
                    />
                </div>
            </Container>
        );
    }
}

export default withStyles(styles)(Profile);