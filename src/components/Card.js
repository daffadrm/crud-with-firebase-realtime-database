import React from 'react';
import { Container } from 'react-bootstrap';

export const Card = (data) => {
	return (
		<>
			<Container>
				<div className="row row-cols-4">
					{data.data.map((item) => (
						<div className="col-6 col-md-4 mb-4">
							<div className="card border-primary">
								<div className="card-body">
									<h5 className="card-title">Nama</h5>
									<p className="card-text">{item.title}</p>
									<h5 className="card-title">Merk</h5>
									<p className="card-text"> {item.subject}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</Container>
		</>
	);
};
