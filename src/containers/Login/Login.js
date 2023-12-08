import React, { Component, Fragment } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';

import { loginAPI } from '../../actions/auth';
import LoginForm from './LoginForm';
import { LinkContainer } from 'react-router-bootstrap';
import background from '../../assets/images/hand-background.jpg';

class Login extends Component {
	render() {
		const handleSubmit = (data) => {
			return this.props.login(data).then(
				(res) => {
					console.log(res);
					this.props.history.push('/');
				},
				(err) => {
					console.log(err.response);

					// validasi async / validasi ke server ketika terjadi error pada server
					throw new SubmissionError({
						_error: 'Login failed! Email Or Password not correct',
					});
				}
			);
		};

		return (
			<Fragment>
				<div
					style={{
						backgroundImage: 'url(' + background + ')',
						backgroundSize: 'cover',
						backgroundRepeat: 'no-repeat',
						height: '100%',
						backgroundPosition: 'center',
					}}
				>
					<Container className="h-100 d-flex justify-content-center align-self-center">
						<Row className="w-100">
							<Col
								md={4}
								className="mx-auto bg-white p-3 rounded align-self-center"
							>
								<h2 className="text-center">Login</h2>

								<hr />

								<LoginForm onSubmit={handleSubmit} />
								<div className="d-inline">Don't have an account yet? </div>
								<div className="d-inline">
									<LinkContainer to="/register">
										<button type="button" className="btn btn-link pt-0">
											Register
										</button>
									</LinkContainer>
								</div>
							</Col>
						</Row>
					</Container>
				</div>
			</Fragment>
		);
	}
}

const reduxDispatch = (dispatch) => ({
	login: (data) => dispatch(loginAPI(data)),
});

export default connect(null, reduxDispatch)(Login);
