import React from 'react';
import RouterLink from 'react-router-dom/Link'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import AllIcon from '@material-ui/icons/AllInclusive';
import EconomyIcon from '@material-ui/icons/LocalAtm';
import TechnologyIcon from '@material-ui/icons/LaptopChromebook';
import LocalIcon from '@material-ui/icons/PinDrop'
import TabContainer from './TabContainer';
import SimpleCard from './SimpleCard';
import Container from './MainContainer'
import { news as newsList } from '../assets/news';

const styles = theme => ({
  root: {
    flexGrow: 1,
    // display: 'flex',
    // alignContent: 'center',
    // justifyContent: 'center',
    width: '100%',
    // maxWidth: 800,
    alignSelf: 'center',
  },
  feed: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing.unit,
    gridArea: 'feed',
    height: '100%',
  },
  tabs: {
    backgroundColor: theme.palette.grey[200],
    color: 'black',
  },
  tabLabel: {
    color: 'black',
  },
})

const data = [
  {
    title: 'Email server will be down',
    url: '',
  },
  {
    title: 'Timings changed due to Ramazan',
    url: '',
  },
  {
    title: 'Tommorow will be off. Lorem ipsum, blah blah blah blah blah',
    url: '',
  }
]

class ExternalFeedsBoard extends React.Component {
  state = {
    value: 0,
    isFetching: true,
    success: null,
    news: [],
  };

  async componentDidMount() {
    let response;

    try {
      response = await axios({
        method: 'get',
        url: '/homepage/external-feeds',
      })
      console.log("RESPONSE: ", response)
      this.handleResponse(response)
    }
    catch (err) {
      console.log("ERROR: ", err);
      this.handleResponse(err.response)
    }
  }

  handleResponse = (res) => {
    let error = res.data.message;

    if (res.data.status >= 400) {
      this.setState(prevState => ({
        isFetching: false,
        success: false,
      }))
      if (res.data.redirectURL)
        window.location.href = `${res.data.redirectURL}`;
    }

    else if (res.data.status >= 200 && res.data.status < 300) {
      this.setState(prevState => ({
        news: res.data.news,
        isFetching: false,
        success: true,
      }))
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value, news } = this.state;

    return (
      <div className={classes.feed}>
        <Typography variant="h6" gutterBottom component="h2" align='center'>
          External Feeds
          </Typography>
        <Paper square className={classes.root}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            variant="fullWidth"
            indicatorColor="secondary"
            textColor="secondary"
            classes={{
              root: classes.tabs,
            }}
          >
            <Tab icon={<EconomyIcon />} label="Economy" classes={{ labelIcon: classes.tabLabel, }} />
            <Tab icon={<TechnologyIcon />} label="Technology" classes={{ labelIcon: classes.tabLabel, }} />
            <Tab icon={<LocalIcon />} label="Local" classes={{ labelIcon: classes.tabLabel, }} />
          </Tabs>
          <TabContainer
            components={
              [
                { label: "Economy", component: <List>{news.filter(item => item.type_cd === 'Economy').map(item => <ListItem><Link href={item.ATTRIB_02} target="_blank">{item.ATTRIB_10}</Link></ListItem>)}</List> },
                { label: "Technology", component: <List>{news.filter(item => item.type_cd === 'Technology').map(item => <ListItem><Link href={item.ATTRIB_02} target="_blank">{item.ATTRIB_10}</Link></ListItem>)}</List> },
                { label: "Local", component: <List>{news.filter(item => item.type_cd === 'Local').map(item => <ListItem><Link href={item.ATTRIB_02} target="_blank">{item.ATTRIB_10}</Link></ListItem>)}</List> },
              ]
            }
          />
        </Paper>
        <Button component={RouterLink} align='center' to={{ pathname: `/portal/news-and-updates`, search: `?filter=External Feed` }} fullWidth={true}>
          See All
        </Button>
      </div>
    );
  }
}

ExternalFeedsBoard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExternalFeedsBoard);