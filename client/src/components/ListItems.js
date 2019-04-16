import React from 'react';
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import SvgIcon from '@material-ui/core/SvgIcon';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import BarChartIcon from '@material-ui/icons/BarChart';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import ListIcon from '@material-ui/icons/List';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import ViewIcon from '@material-ui/icons/ViewList';
import NewsIcon from '@material-ui/icons/NoteAddTwoTone';
import OrgAddIcon from '@material-ui/icons/Business';
import EmpAddIcon from '@material-ui/icons/PersonAdd';
import AdminIcon from '@material-ui/icons/HowToReg';
import EducationIcon from '@material-ui/icons/School';
import ContactIcon from '@material-ui/icons/ContactPhone';
import SkillIcon from '@material-ui/icons/Stars'
import ITTicketIcon from '@material-ui/icons/ConfirmationNumber';
import DocumentIcon from '@material-ui/icons/Description';
import CertificateIcon from '@material-ui/icons/Book';
import ProfileIcon from '@material-ui/icons/Face';

const styles = theme => ({
  '@global': {
    a: {
      '&:visited': {
        color: theme.palette.primary.main,
      },
    },
  },
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
  },
  divider: {
    height: '1px',
    width: '80%',
    position: 'relative',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: theme.palette.grey[500],
  },
  listSubheader: {
    padding: '4px 1px',
    textAlign: 'left',
    color: theme.palette.grey[300],
    // backgroundColor: theme.palette.grey[500],
  },
  listSubheaderText: {
    color: theme.palette.grey[400],
    // backgroundColor: theme.palette.grey[500],
  },
});

class MainList extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      openMyProfile: false,
      openServices: false,
      openChart: false,
      openManager: false,
      openLeave: false,
    };
  
  }

  handleClick = (e) => {
    let target = e.currentTarget.id;
    this.setState(state => ({ [target]: !state[target] }));
  };

  render() {
    let { classes, match } = this.props;

    return (
      <React.Fragment>
        <Link to={`${match.url}dashboard`} style={{ textDecoration: 'none' }}>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText classes={{ root: classes.listItemText }} primary="Dashboard" />
          </ListItem>
        </Link>
        <ListItem className={classes.listItem} button id="openMyProfile" onClick={this.handleClick}>
          <ListItemIcon>
            <ProfileIcon />
          </ListItemIcon>
          <ListItemText classes={{ root: classes.listItemText }} primary="My Profile" />
          {this.state.openMyProfile ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.openMyProfile} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link to={`${match.url}pay-slips`} style={{ textDecoration: 'none' }}>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <SvgIcon>
                    <EducationIcon />
                  </SvgIcon>
                </ListItemIcon>
                <ListItemText inset primary="Education" />
              </ListItem>
            </Link>
            <Link to={`${match.url}it-tickets`} style={{ textDecoration: 'none' }}>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <SvgIcon>
                    <ContactIcon />
                  </SvgIcon>
                </ListItemIcon>
                <ListItemText inset primary="Contact" />
              </ListItem>
            </Link>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <SvgIcon>
                  <CertificateIcon />
                </SvgIcon>
              </ListItemIcon>
              <ListItemText inset primary="Certificates" />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <SvgIcon>
                  <SkillIcon />
                </SvgIcon>
              </ListItemIcon>
              <ListItemText inset primary="Skills" />
            </ListItem>
          </List>
        </Collapse>
        <ListItem className={classes.listItem} button id="openServices" onClick={this.handleClick}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText classes={{ root: classes.listItemText }} primary="Services" />
          {this.state.openServices ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.openServices} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link to={`${match.url}pay-slips`} style={{ textDecoration: 'none' }}>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                <SvgIcon>
                    <CreditCardIcon />
                  </SvgIcon>
                </ListItemIcon>
                <ListItemText inset primary="Get Payslip" />
              </ListItem>
            </Link>
            <Link to={`${match.url}it-tickets`} style={{ textDecoration: 'none' }}>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <SvgIcon>
                    <ITTicketIcon />
                  </SvgIcon>
                </ListItemIcon>
                <ListItemText inset primary="Get IT Ticket" />
              </ListItem>
            </Link>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <SvgIcon>
                  <DocumentIcon />
                </SvgIcon>
              </ListItemIcon>
              <ListItemText inset primary="HR Documents" />
            </ListItem>
          </List>
        </Collapse>
        <ListItem button id="openChart" onClick={this.handleClick}>
          <ListItemIcon>
            <SvgIcon>
                <path fill="#757575" d="M9,2V8H11V11H5C3.89,11 3,11.89 3,13V16H1V22H7V16H5V13H11V16H9V22H15V16H13V13H19V16H17V22H23V16H21V13C21,11.89 20.11,11 19,11H13V8H15V2H9Z" />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText classes={{ root: classes.listItemText }} primary="Organization Chart" />
          {this.state.openChart ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.openChart} timeout="auto" unmountOnExit>
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
            <Link to={`${match.url}leaves`} style={{ textDecoration: 'none' }}>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <ListIcon />
                </ListItemIcon>
                <ListItemText inset primary="My Leave List" />
              </ListItem>
            </Link>
            <Link to={`${match.url}apply-leave`} style={{ textDecoration: 'none' }}>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText inset primary="Apply For New" />
              </ListItem>
            </Link>
          </List>
        </Collapse>
      </React.Fragment>
    );
  }
}

MainList.propTypes = {
  classes: PropTypes.object.isRequired,
};

class AdminList extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      openManager: false,
    };
  
  }

  handleClick = (e) => {
    let target = e.currentTarget.id;
    this.setState(state => ({ [target]: !state[target] }),()=>console.log(this.state));
  };

  render(){
    let { classes, match } = this.props;

    return (
      <React.Fragment>
        <Divider classes={{ root: classes.divider }} />
          <ListSubheader component='div' classes={{ root: classes.listSubheader }}>
            <ListItem>
              <ListItemIcon>
                <AdminIcon className={ classes.listSubheaderText } />
              </ListItemIcon>
              <ListItemText classes={{ primary: classes.listSubheaderText }} primary="Admin Panel" />
            </ListItem>
          </ListSubheader>
        <ListItem button id="openManager" onClick={this.handleClick}>
              <ListItemIcon>
                  <BarChartIcon />
              </ListItemIcon>
              <ListItemText classes={{ root: classes.listItemText }} primary="Manager" />
              {this.state.openManager ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.openManager} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
              <Link to={`${match.url}post-update`} style={{ textDecoration: 'none' }}>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <NewsIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Post An Update" />
                  </ListItem>
                </Link>
                <Link to={`${match.url}organization-structure`} style={{ textDecoration: 'none' }}>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <OrgAddIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Organization Structure" />
                  </ListItem>
                </Link>
                <Link to={`${match.url}register-user`} style={{ textDecoration: 'none' }}>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <EmpAddIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Add Employee" />
                  </ListItem>
                </Link>
                <Link to={`${match.url}manage-leaves`} style={{ textDecoration: 'none' }}>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                    <SvgIcon>
                      <path fill="#757575" d="M10.63,14.1C12.23,10.58 16.38,9.03 19.9,10.63C23.42,12.23 24.97,16.38 23.37,19.9C22.24,22.4 19.75,24 17,24C14.3,24 11.83,22.44 10.67,20H1V18C1.06,16.86 1.84,15.93 3.34,15.18C4.84,14.43 6.72,14.04 9,14C9.57,14 10.11,14.05 10.63,14.1V14.1M9,4C10.12,4.03 11.06,4.42 11.81,5.17C12.56,5.92 12.93,6.86 12.93,8C12.93,9.14 12.56,10.08 11.81,10.83C11.06,11.58 10.12,11.95 9,11.95C7.88,11.95 6.94,11.58 6.19,10.83C5.44,10.08 5.07,9.14 5.07,8C5.07,6.86 5.44,5.92 6.19,5.17C6.94,4.42 7.88,4.03 9,4M17,22A5,5 0 0,0 22,17A5,5 0 0,0 17,12A5,5 0 0,0 12,17A5,5 0 0,0 17,22M16,14H17.5V16.82L19.94,18.23L19.19,19.53L16,17.69V14Z" />
                    </SvgIcon>
                    </ListItemIcon>
                    <ListItemText inset primary="Leave Manager" />
                  </ListItem>
                </Link>
              </List>
            </Collapse>
      </React.Fragment>
    );
  }
}

export const MainListItems = withRouter(withStyles(styles)(MainList));
export const AdminListItems = withRouter(withStyles(styles)(AdminList));