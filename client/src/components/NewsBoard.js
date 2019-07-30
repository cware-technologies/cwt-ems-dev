import React from 'react';
import { Link, withRouter } from 'react-router-dom'
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
        [theme.breakpoints.down('md')]: {
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
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    smallBoard: {
        minWidth: 275,
        // width: '200px',
        // display: 'inline-block',
        margin: theme.spacing.unit,
        height: 'auto',
        // backgroundColor: theme.palette.grey[500],
        [theme.breakpoints.down('md')]: {
            height: '200px',
        },
    },
    actionBar: {
        justifySelf: 'flex-end',
    },
    button: {
        gridArea: 'button',
    },
})

class NewsBoard extends React.Component {
    state = {
        newsNo: 0,
        isFetching: true,
        success: null,
        news: [],
    };

    getNextNews = () => {
        if (this.state.newsNo >= 2)
            return 0
        else
            return this.state.newsNo + 1
    }

    getCurrentSlide = (index) => {
        return index === this.state.newsNo;
    }

    changeSlide = () => {
        this.setState(prevState => ({
            newsNo: this.getNextNews()
        }))
    }

    startSlideshow = async () => {
        this.slideShow = setInterval(() => {
            this.changeSlide()
        }, 5000)
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

            console.log(response)
        }
        catch (err) {
            this.handleResponse(err.response)
        }
    }

    async componentWillUnmount() {
        clearInterval(this.slideShow)
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

    getDetails = (index) => {
        const data = (({ ATTRIB_01, ATTRIB_10, created }) => ({ ATTRIB_01, ATTRIB_10, created }))(this.state.news[index]);
        data.type = 'news'
        return data
    }

    render() {
        const { classes, match } = this.props;
        const { isFetching, success, news, newsNo } = this.state;

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
                    {news.length > 0 &&
                        <NewsCard
                            _className={classes.billboard}
                            title={news[newsNo].ATTRIB_10}
                            date={news[newsNo].created}
                            img={news[newsNo].img_pth}
                            data={this.getDetails(newsNo)}
                            current={true}
                            big={true}
                        />
                    }
                    {news.slice(0, 3).map((item, index) => {
                        return <NewsCard
                            _className={classes.smallBoard}                            
                            key={item.row_id}
                            title={item.ATTRIB_10}
                            body={item.ATTRIB_01}
                            date={item.created}
                            type={item.type_cd}
                            img={item.img_pth}
                            data={this.getDetails(index)}
                            current={this.getCurrentSlide(index)}
                        />
                    })}

                    {/* <Link to={{ pathname: `/portal/news_and_updates` }} style={{ textDecoration: 'none' }}>
                        <Button
                            component="button"
                            variant="outlined"
                            color='primary'
                            className={classes.button}
                        >Edit</Button>
                    </Link> */}
                    <Button component={Link} to={{ pathname: `/portal/news-and-updates`, search: `?filter=Company News` }} fullWidth={true}>
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

export default withRouter(withStyles(styles)(NewsBoard));