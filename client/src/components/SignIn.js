import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { ReactComponent as Logo} from '../assets/ems-logo.svg';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    width: '60%',
    height: '60%',
    margin: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,
    backgroundColor: 'white',
    borderRadius: '0px',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  logo: {
    height: '80%',
    width: '80%',
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class SignIn extends React.Component {

  state = {
    user: {
      email: '',
      password: '',
    },
    error: null,
  }

  handleTextChange = (event) => {
    let target = event.target.id
    let value = event.target.value

    this.setState(prevState => ({
      user: {
        ...prevState.user,
        [target]: value,
      }
    }))
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let user = this.state.user

    let res = axios({
      method: 'post',
      url: '/auth/signin',
      data: user,
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(this.handleResponse)
    .catch(err => this.handleResponse(err.response))
  }

  handleResponse = (res) => {
    let error = res.data.message;

    if(res.data.status >= 400){
      this.setState(prevState => ({
        error
      }))
    }

    else if(res.data.status >=200 && res.data.status <300){
      window.location.href = `${res.data.redirectURL}`;
    }
  }

  render(){
    const { classes } = this.props;
    const { user, error } = this.state;

    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <Logo className={classes.logo}/>
          </Avatar>
          <Typography component="h1" variant="h5" >
            Sign in
          </Typography>
          <form className={classes.form}>
            <FormHelperText error>{error && <ul className={classes.errorList}><li className={classes.errorListItem}>{error}</li></ul>}</FormHelperText>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email"
                name="email"
                value={user.email}
                onChange={this.handleTextChange}
                autoComplete="email"
                autoFocus
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                value={user.password}
                onChange={this.handleTextChange}
                autoComplete="current-password"
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button color="secondary" variant='text' size='small' disableRipple={true} className={classes.button}>
              Forgot Password
            </Button>
            <Button
              type="submit"
              onClick={this.handleSubmit}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign in
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);