import React, { Fragment, useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Card } from '../../components/Card';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../../utils/firebase';

const Home = () => {
	const [data, setData] = useState([]);
	useEffect(() => {
		const q = query(collection(db, 'todos'));
		const unsub = onSnapshot(q, (querySnapshot) => {
			let todosArray = [];
			querySnapshot.forEach((doc) => {
				todosArray.push({ ...doc.data(), id: doc.id });
			});
			setData(todosArray);
		});
		return () => unsub();
	}, []);

	return (
		<Fragment>
			<Container className="mt-5">
				<p>Dashboard</p>
				<hr />
				<Card data={data} />
			</Container>
		</Fragment>
	);
};

export default Home;
