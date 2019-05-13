import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';
import SignIn from './components/SignIn';
import Portal from './components/Portal';
import { store, persistor } from './helpers/reduxStore'
import { addAuthHeaderAsBearerToken } from './helpers/axiosConfig';

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
		},
		drawerWidth: 240,
	}
)

addAuthHeaderAsBearerToken()

class App extends Component {
	render() {
		let { match } = this.props
		
		return (
			<MuiThemeProvider theme={theme}>
				<Provider store={store}>
					<PersistGate loading={null} persistor={persistor}>
						<Router>
							<React.Fragment>
								<CssBaseline />
								<div className="App">
									<Route path='/signin' component={SignIn} />
									<Route strict path='/portal/' component={Portal} />
									{/* <Redirect exact from='/' to='/portal/' /> */}
								</div>
							</React.Fragment>
						</Router>
					</PersistGate>
				</Provider>
			</MuiThemeProvider>
		);
	}
}

export default App;
