import React from 'react';
import { Field, reduxForm, reset } from 'redux-form';

import { ReduxForm } from '../../components/ReduxForm';

// validasi sync/langsung untuk form
const validate = (values) => {
	const errors = {};
	if (!values.name) {
		errors.name = 'Name Required';
	}
	if (!values.email) {
		errors.email = 'Email Required';
	}
	if (!values.password) {
		errors.password = 'Password Required';
	}
	return errors;
};

// ketika telah berhasil di submit maka form akan di kosongkan
const afterSubmit = (result, dispatch) => {
	dispatch(reset('register'));
};

const RegisterForm = (props) => {
	const { error, handleSubmit } = props;

	return (
		<form onSubmit={handleSubmit}>
			<Field
				placeholder="Enter your Email"
				name="email"
				label="Email"
				component={ReduxForm}
				type="email"
			/>
			<Field
				placeholder="Enter your Password"
				name="password"
				label="Password"
				component={ReduxForm}
				type="password"
			/>
			{error && <div className="alert alert-danger">{error}</div>}
			<button
				className="btn btn-primary btn-block mt-2 mb-2 w-100"
				type="submit"
			>
				Register
			</button>
		</form>
	);
};

export default reduxForm({
	form: 'register',
	validate,
	onSubmitSuccess: afterSubmit,
})(RegisterForm);
