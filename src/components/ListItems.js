import React from 'react';
import { withTheme, withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import StarBorder from '@material-ui/icons/StarBorder';
import SvgIcon from '@material-ui/core/SvgIcon';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import BarChartIcon from '@material-ui/icons/BarChart';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import ListIcon from '@material-ui/icons/List';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import ViewIcon from '@material-ui/icons/ViewList';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 3,
  },
  listItem: {
    zIndex: 10,
  },
  listItemText: {
    paddingLeft: '0px',
  }
});

class MainListItems extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      openServices: false,
      openManager: false,
      openLeave: false,
    };
  
  }

  handleClick = (e) => {
    let target = e.currentTarget.id;
    console.log(e.currenttarget);
    this.setState(state => ({ [target]: !state[target] }),()=>console.log(this.state));
  };

  render() {
    let { classes } = this.props;

    return (
      <React.Fragment>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText classes={{ root: classes.listItemText }} primary="Dashboard" />
        </ListItem>
        <ListItem className={classes.listItem} button id="openServices" onClick={this.handleClick}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText classes={{ root: classes.listItemText }} primary="Services" />
          {this.state.openServices ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.openServices} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
              <SvgIcon>
                  <CreditCardIcon />
                </SvgIcon>
              </ListItemIcon>
              <ListItemText inset primary="Get Payslip" />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <SvgIcon>
                  <path fill="#757575" d="M13,8.5H11V6.5H13V8.5M13,13H11V11H13V13M13,17.5H11V15.5H13V17.5M22,10V6C22,4.89 21.1,4 20,4H4A2,2 0 0,0 2,6V10C3.11,10 4,10.9 4,12A2,2 0 0,1 2,14V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V14A2,2 0 0,1 20,12A2,2 0 0,1 22,10Z" />
                </SvgIcon>
              </ListItemIcon>
              <ListItemText inset primary="Get IT Ticket" />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <SvgIcon>
                  <path fill="#757575" d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M15,18V16H6V18H15M18,14V12H6V14H18Z" />
                </SvgIcon>
              </ListItemIcon>
              <ListItemText inset primary="HR Documents" />
            </ListItem>
          </List>
        </Collapse>
        <ListItem button id="openManager" onClick={this.handleClick}>
          <ListItemIcon>
            <SvgIcon>
                <path fill="#757575" d="M9,2V8H11V11H5C3.89,11 3,11.89 3,13V16H1V22H7V16H5V13H11V16H9V22H15V16H13V13H19V16H17V22H23V16H21V13C21,11.89 20.11,11 19,11H13V8H15V2H9Z" />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText classes={{ root: classes.listItemText }} primary="Organization Chart" />
          {this.state.openManager ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.openManager} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <SvgIcon>
                    <path fill="#757575" d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M15,18V16H6V18H15M18,14V12H6V14H18Z" />
                </SvgIcon>
              </ListItemIcon>
              <ListItemText inset primary="Visual Diagram" />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <ViewIcon />
              </ListItemIcon>
              <ListItemText inset primary="See Roles Detail" />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText inset primary="Edit Roles Detail" />
            </ListItem>
          </List>
        </Collapse>
        <ListItem button id="openLeave" onClick={this.handleClick}>
          <ListItemIcon>
            <SvgIcon>
              <path fill="#757575" d="M10.63,14.1C12.23,10.58 16.38,9.03 19.9,10.63C23.42,12.23 24.97,16.38 23.37,19.9C22.24,22.4 19.75,24 17,24C14.3,24 11.83,22.44 10.67,20H1V18C1.06,16.86 1.84,15.93 3.34,15.18C4.84,14.43 6.72,14.04 9,14C9.57,14 10.11,14.05 10.63,14.1V14.1M9,4C10.12,4.03 11.06,4.42 11.81,5.17C12.56,5.92 12.93,6.86 12.93,8C12.93,9.14 12.56,10.08 11.81,10.83C11.06,11.58 10.12,11.95 9,11.95C7.88,11.95 6.94,11.58 6.19,10.83C5.44,10.08 5.07,9.14 5.07,8C5.07,6.86 5.44,5.92 6.19,5.17C6.94,4.42 7.88,4.03 9,4M17,22A5,5 0 0,0 22,17A5,5 0 0,0 17,12A5,5 0 0,0 12,17A5,5 0 0,0 17,22M16,14H17.5V16.82L19.94,18.23L19.19,19.53L16,17.69V14Z" />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText classes={{ root: classes.listItemText }} primary="Leave Manager" />
          {this.state.openLeave ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.openLeave} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <ListIcon />
                </ListItemIcon>
                <ListItemText inset primary="My Leave List" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText inset primary="Apply For New" />
              </ListItem>
            </List>
          </Collapse>
      </React.Fragment>
    );
  }
}

MainListItems.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainListItems);

// export const secondaryListItems = (
//   <div>
//     <ListSubheader inset>Saved reports</ListSubheader>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Current month" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Last quarter" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Year-end sale" />
//     </ListItem>
//   </div>
// );