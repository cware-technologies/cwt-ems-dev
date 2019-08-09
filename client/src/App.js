import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { connect } from 'react-redux'
import { getLoggedIn, getUserInfo } from './reducers/authReducer';
import { authActions } from './actions'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import SignIn from './components/SignIn';
import Portal from './components/Portal';
import PrivateRoute from './components/PrivateRoute';
import { store, persistor } from './helpers/reduxStore';
import { addAuthHeaderAsBearerToken } from './helpers/axiosConfig';

import PasswordReset from './components/PasswordReset'
import PasswordNew from './components/PasswordNew'

const theme = createMuiTheme(
	{
		palette: {
			primary: {
				light: '#5472d3',
				main: '#0d47a1',
				dark: '#002171',
				contrastText: '#fff',
			},
			secondary: {
				light: '#52c7b8',
				main: '#009688',
				dark: '#00675b',
				contrastText: '#000',
			},
			textPrimary: {
				main: '#0071BC',
			},
			textSecondary: {
				main: '#29ABE2',
			},
		},
		typography: {
			useNextVariants: true,
			h1: {
				color: '#0071BC',
			},
			h2: {
				color: '#0071BC',
			},
			h3: {
				color: '#0071BC',
			},
			h4: {
				color: '#0071BC',
			},
			h5: {
				color: '#0071BC',
			},
			h6: {
				color: '#0071BC',
			},
		},
		overrides: {
			MuiPaper: {
				root: {
					backgroundColor: 'white',
				},
			},
			MuiFormHelperText: {
				root: {
					margin: 0,
				}
			},
			MuiTextField: {
				root: {
					margin: 0,
				}
			}
		},
		drawerWidth: 240,
	}
)

addAuthHeaderAsBearerToken()

class App extends Component {

	async componentDidMount() {
		// await this.verifyLoggedInUser()
	}

	async verifyLoggedInUser() {
		return new Promise(async (resolve, reject) => {
			console.log("LOGGED IN: ", this.props.loggedIn)
			if (this.props.loggedIn) {
				console.log(this.props.user)
				await this.props.verifyUser(this.props.user)
				resolve()
			}
		})
	}
	render() {
		let { match, loggedIn } = this.props

		console.log("RENDERRRRRRR: ", this.props.loggedIn)
		return (
			<MuiThemeProvider theme={theme}>
				<Router>
					<React.Fragment>
						<CssBaseline />
						<div className="App">
							<Switch>
								<Route path='/signin' component={SignIn} />
								<Route path={`/password-reset`} component={PasswordReset} />
								<Route path={`/password-new/:token`} component={PasswordNew} />
								<Route strict path='/portal/' component={Portal} />
								{ loggedIn ? <Redirect exact from='/' to='/portal/dashboard' /> : <Redirect from='/' to='/signin' /> }
								{/* {!loggedIn && <Redirect from='*' to='/signin' />} */}
								{/* { loggedIn && <Redirect exact from='/' to='/portal/dashboard' /> } */}
							</Switch>
						</div>
					</React.Fragment>
				</Router>
			</MuiThemeProvider>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loggedIn: getLoggedIn(state),
		user: getUserInfo(state)
	}
}

export default connect(mapStateToProps, { ...authActions })(App);
