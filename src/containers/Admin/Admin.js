import React, { Component, Fragment } from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';

import { logoutAPI } from '../../actions/auth';
import Product from '../Product/Product';

class Admin extends Component {
	render() {
		return (
			<Fragment>
				<Container className="mt-5">
					<p>Admin Dashboard</p>
					<hr />
					<Product />
				</Container>
			</Fragment>
		);
	}
}

const reduxState = (state) => ({
	message: state.auth,
});

const reduxDispatch = (dispatch) => ({
	logout: () => dispatch(logoutAPI()),
});

export default connect(reduxState, reduxDispatch)(Admin);
