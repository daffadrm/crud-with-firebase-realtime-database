import React, { Component, Fragment } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';

import RegisterForm from './RegisterForm';
import { registerAPI } from '../../actions/auth';
import background from '../../assets/images/hand-background.jpg';

class Register extends Component {
	handleSubmit = (data) => {
		return this.props.register(data).then(
			(res) => {
				console.log(res);
			},
			(err) => {
				console.log(err.response);
				// validasi async / validasi ke server ketika terjadi error pada server
				throw new SubmissionError({
					_error: 'Email has been used',
				});
			}
		);
	};

	render() {
		const { handleSubmit } = this;
		const { message } = this.props.message;

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
					<Container
						className="h-100 d-flex justify-content-center align-self-center"
						style={{}}
					>
						<Row className="w-100">
							<Col
								md={4}
								className="mx-auto bg-white p-3 rounded align-self-center"
							>
								<h2 className="text-center">Register</h2>
								{message && (
									<div className="alert alert-success">{message}</div>
								)}
								<hr />

								<RegisterForm onSubmit={handleSubmit} />
								<div className="d-inline">Already have an account? </div>
								<div className="d-inline">
									<LinkContainer to="/login">
										<button type="button" className="btn btn-link pt-0">
											Login
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

const reduxState = (state) => ({
	message: state.auth,
});

const reduxDispatch = (dispatch) => ({
	register: (data) => dispatch(registerAPI(data)),
});

export default connect(reduxState, reduxDispatch)(Register);
