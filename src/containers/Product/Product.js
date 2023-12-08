import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import Swal from 'sweetalert2';

import {
	collection,
	query,
	onSnapshot,
	doc,
	deleteDoc,
} from 'firebase/firestore';

import { db } from '../../utils/firebase';
import AddProductModal from './addProductModal';

const Product = () => {
	const [idProduk, setIdProduk] = useState('');

	const [showAddModal, setShowAddModal] = useState(false);

	const [dataProduct, setDataProduct] = useState([]);

	const handleDelete = async (id) => {
		await deleteDoc(doc(db, 'todos', id));
		Swal.fire({
			position: 'center',
			icon: 'success',
			title: 'Data berhasil dihapus',
			showConfirmButton: false,
			timer: 1500,
		});
	};

	useEffect(() => {
		const q = query(collection(db, 'todos'));
		const unsub = onSnapshot(q, (querySnapshot) => {
			let todosArray = [];
			querySnapshot.forEach((doc) => {
				todosArray.push({ ...doc.data(), id: doc.id });
			});
			setDataProduct(todosArray);
		});
		return () => unsub();
	}, []);

	return (
		<>
			<Container className="mt-5">
				<button
					type="button"
					class="btn btn-primary mb-3"
					data-toggle="modal"
					data-target="#exampleModalCenter"
					onClick={() => {
						setShowAddModal(true);
						setIdProduk('');
					}}
				>
					Tambah Barang
				</button>
				<div class="table-responsive">
					<table class="table table-hover">
						<caption>{dataProduct.length} data ditemukan</caption>
						<thead>
							<tr className="table-primary">
								<th scope="col">Nama</th>
								<th scope="col">Merk</th>
								<th scope="col">Tindakan</th>
							</tr>
						</thead>
						<tbody>
							{dataProduct.map((item) => (
								<tr key={item.id}>
									<th scope="row">{item.title}</th>
									<td>{item.subject}</td>
									<td>
										<button className="btn btn-link">
											<PencilSquare
												color="royalblue"
												onClick={() => {
													setShowAddModal(true);
													setIdProduk(item.id);
												}}
											/>
										</button>
										<button className="btn btn-link">
											<Trash
												color="red"
												onClick={() => handleDelete(item.id)}
											/>
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<AddProductModal
					show={showAddModal}
					onHide={() => setShowAddModal(false)}
					id={idProduk}
					data={dataProduct}
				/>
			</Container>
		</>
	);
};
export default Product;
