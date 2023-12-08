import React, { Component, Fragment } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { logoutAPI } from '../actions/auth';
class NavigationBar extends Component {
	handleLogout = () => {
		this.props.logout().then(
			(res) => {
				console.log(res);
				this.props.history.push('/login');
			},
			(err) => {
				console.log(err.response);
			}
		);
	};

	render() {
		const { isAuthenticated } = this.props.auth;

		const GuestNav = (
			<Fragment>
				<LinkContainer to="/login">
					<Nav.Link className="text-primary">Login</Nav.Link>
				</LinkContainer>
			</Fragment>
		);

		const UserNav = (
			<Fragment>
				<LinkContainer to="/admin">
					<Nav.Link className="text-primary">Admin</Nav.Link>
				</LinkContainer>
				<Nav.Link className="text-primary" onClick={this.handleLogout}>
					Logout
				</Nav.Link>
			</Fragment>
		);

		return (
			<Navbar expand="lg" bg="dark" data-bs-theme="dark">
				<Container>
					<Navbar.Brand className="text-white">Master Admin</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<LinkContainer to="/">
								<Nav.Link className="text-primary">Home</Nav.Link>
							</LinkContainer>
						</Nav>
						<Nav className="justify-content-end">
							{isAuthenticated ? UserNav : GuestNav}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		);
	}
}

const reduxState = (state) => ({
	auth: state.auth,
});

const reduxDispatch = (dispatch) => ({
	logout: () => dispatch(logoutAPI()),
});

export default withRouter(connect(reduxState, reduxDispatch)(NavigationBar));
