import React from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';
import Container from './MainContainer';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField'
import NewsCard from './NewsCard';

const styles = theme => ({

});

const filterOptions = [
	{ name: 'Company News', value: 'Company News' },
	{ name: 'Employee News', value: 'Employee News' },
	{ name: 'Announcements', value: 'Announcements' },
	{ name: 'External Feed', value: 'External Feed' },
]

class NewsAndUpdates extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			news: [],
			isFetching: true,
			success: null,
			page: 0,
			rowsPerPage: 5,
			filter: 'all',
		}
	}

	async componentDidMount() {
		let params = new URLSearchParams(this.props.location.search);
		let filter = params.get("filter")
		if(filter && filter !== ""){
			console.log("ID: ", filter)
			this.setState(prevState => ({
				filter,
			}))
		}

		this.getData()
	}

	getData = async () => {
		let response;

		try {
			response = await axios({
				method: 'get',
				url: '/homepage/news/all',
			})
			console.log(response)

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
				news: res.data.data,
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

	handleFilterChange = (e) => {
        let value = e.target.value

        this.setState(prevState => ({
            filter: value,
        }))
	}
	
	filterData = (data) => {
		console.log("FILTER: ", this.state.filter, data.filter(row => row.type_cd === this.state.filter))
        if(this.state.filter === 'all'){
			return data
		}
			
		if(this.state.filter === 'External Feed'){
			return data.filter(row => row.type_cd === 'Local' || row.type_cd === 'Economy' || row.type_cd === 'Technology')
		}

        return data.filter(row => row.type_cd === this.state.filter)
    }

	render() {
		const { classes } = this.props;
		const { rowsPerPage, page, news } = this.state;

		return (
			<Container>
					<Typography variant="h4" align='center' gutterBottom component="h2">
						News And Updates
					</Typography>

					<TextField
                        id='filter-list'
                        select
                        label='Filter'
                        value={this.state.filter}
                        defaultValue=''
                        onChange={this.handleFilterChange}
                        SelectProps={{
                            native: true,
                        }}
                        margin="dense"
                        variant="outlined"
                    >
                        <option value={'all'}>
                            {'All'}
                        </option>
                        {filterOptions.map((option, index) => (
                            <option key={index} value={option.value}>
                                {option.name}
                            </option>
                        ))}
                    </TextField>

					{
						this.filterData(news).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
							return <NewsCard
								title={item.ATTRIB_10}
								body={item.ATTRIB_01}
								date={item.created}
								type={item.type_cd}
								link={item.ATTRIB_02 && item.ATTRIB_02 !== "" ? item.ATTRIB_02 : null }
								img={item.img_pth}
								current={true}
							/>
						})
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
			</Container>
		);
	}
}

export default withStyles(styles)(NewsAndUpdates);