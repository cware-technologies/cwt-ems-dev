import React from 'react';
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
            page: 0,
            rowsPerPage: 5,
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
        const { rowsPerPage, page } = this.state;

        return (
            <Container>
              <div className={classes.appBarSpacer} />
              <Paper className={classes.board} elevation={5}>
                <Typography variant="h4" gutterBottom component="h2">
                  News And Updates
                </Typography>
                { news.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                      return <SimpleCard 
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