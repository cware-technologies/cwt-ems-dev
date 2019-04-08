import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import NewsCard from './NewsCard';
import Container from './MainContainer'
import { news as newsList } from '../assets/news';
import LoadingSpinner from './LoadingSpinner';
import LoadingError from './LoadError';

const styles = theme => ({
    news: {
        width: '100%',
        height: '100vh',
        gridArea: 'news',
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gridTemplateRows: '50px repeat(3, 1fr) 50px',
        gridTemplateAreas: '"heading heading" "billboard news1" "billboard news2" "billboard news3" "button button"',
        padding: theme.spacing.unit,
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flexDirection: 'column',
            height: 'auto',
        },
    },
    heading: {
        gridArea: 'heading',
        textAlign: 'center',
    },
    billboard: {
        gridArea: 'billboard',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    actionBar: {
        justifySelf: 'flex-end',
    },
    button: {
        gridArea: 'button',
    },
})

const data = [
    {
        title: '',
        body: 'Happy birthday Ehsan.',
    },
    {
        title: '',
        body: 'Employee of the year: Sajeel Waien',
    },
    {
        title: '',
        body: 'Lorem ipsum, blah blah blah blah blah blah blah blah blah blah',
    }
]

class NewsBoard extends React.Component {
    state = {
        newsNo: 0,
        isFetching: true,
        success: null,
        news: [],
    };

    getNextNews = () => {
        if(this.state.newsNo >= 2)
            return 0
        else
            return this.state.newsNo ++
    }

    startSlideshow = async() => {
        this.slideShow = setInterval(() => {
            this.setState(prevState => ({
                newsNo: this.getNextNews()
            }))
        }, 1000)
    }

    async componentDidMount() {
        let response;

        this.startSlideshow()

        try {
            response = await axios({
                method: 'get',
                url: '/homepage/news',
            })
            this.handleResponse(response)
        }
        catch (err) {
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

    render() {
        const { classes } = this.props;
        const { isFetching, success, news, newsNo } = this.state;

        console.log('STATE: ', this.state)

        if (isFetching) {
            return <Paper className={classes.news} elevation={5}><LoadingSpinner /></Paper>
        }
        else if (!success) {
            return <Paper className={classes.news} elevation={5}><LoadingError /></Paper>
        }
        else {
            return (
                <Paper className={classes.news} elevation={5}>
                    <Typography variant="h6" gutterBottom component="h2" className={classes.heading}>
                        News And Updates
                    </Typography>
                    <NewsCard
                        _className={classes.billboard}
                        title={news[newsNo].ATTRIB_10}
                        date={news[newsNo].created}
                        img={news[newsNo].IMG_PTH}
                        big={true}
                    />
                    {news.slice(0, 3).map((item, index) => {
                        return <NewsCard
                            key={item.row_id}
                            title={item.ATTRIB_10}
                            date={item.created}
                            img={item.IMG_PTH}
                            
                        />
                    })}

                    <Button component={Link} to="news_and_updates" className={classes.button}>
                        Show All
                    </Button>
                </Paper>
            );
        }
    }
}

NewsBoard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewsBoard);