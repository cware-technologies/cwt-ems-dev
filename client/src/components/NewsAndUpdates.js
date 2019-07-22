import React from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';
import Container from './MainContainer';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SimpleCard from './SimpleCard';
import { news } from '../assets/news';

const styles = theme => ({

});

class NewsAndUpdates extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			news: [],
			isFetching: true,
			success: null,
			page: 0,
			rowsPerPage: 5,
		}
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

	handleChangePage = (event, page) => {
		this.setState({ page });
	}

	handleChangeRowsPerPage = (event) => {
		this.setState({ rowsPerPage: event.target.value });
	}

	render() {
		const { classes } = this.props;
		const { rowsPerPage, page, news } = this.state;

		return (
			<Container>
				<div className={classes.appBarSpacer} />
				<Paper className={classes.board} elevation={5}>
					<Typography variant="h4" gutterBottom component="h2">
						News And Updates
                </Typography>
					{news.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
						return <SimpleCard
							key={index}
							title={item.title}
							body={item.body}
							date={item.date}
						/>
					}
					)
					}
					<TablePagination
						rowsPerPageOptions={[5, 10, 25]}
						component="div"
						count={news.length}
						rowsPerPage={rowsPerPage}
						page={this.state.page}
						backIconButtonProps={{
							'aria-label': 'Previous Page',
						}}
						nextIconButtonProps={{
							'aria-label': 'Next Page',
						}}
						onChangePage={this.handleChangePage}
						onChangeRowsPerPage={this.handleChangeRowsPerPage}
					/>
				</Paper>
			</Container>
		);
	}
}

export default withStyles(styles)(NewsAndUpdates);