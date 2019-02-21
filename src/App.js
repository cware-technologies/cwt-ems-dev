import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';

const theme = createMuiTheme(
	{
		palette: {
			primary: {
				main: '#0071BC',
			},
			secondary: {
				main: '#29ABE2',
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
		}
	}
)

class App extends Component {
	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<Router>
					<React.Fragment>
						<CssBaseline />
						<div className="App">
							<Route path='/signin' component={ SignIn } />
							<Route exact path='/' component={ Dashboard }/>
						</div>
					</React.Fragment>	
				</Router>
			</MuiThemeProvider>
		);
	}
}

export default App;
