import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { db } from '../../utils/firebase';
import Swal from 'sweetalert2';
import { collection, doc, getDoc, updateDoc, addDoc } from 'firebase/firestore';

const AddProductModal = (props) => {
	const [form, setForm] = useState({
		title: '',
		subject: '',
	});

	useEffect(() => {
		const fetchDocById = async () => {
			// Create DocumentReference
			const docRef = doc(db, 'todos', props.id); // db = getFirestore()

			// Fetch document
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				setForm({
					...docSnap.data(),
				});
			} else {
				setForm({});
			}
		};

		if (props.id === '') {
			setForm({
				title: '',
				subject: '',
			});
		} else {
			fetchDocById();
		}
	}, [props.id]);

	const handleAddProduct = () => {
		if (form.title !== '') {
			addDoc(collection(db, 'todos'), {
				...form,
			});
			setForm({});
		}
		Swal.fire({
			position: 'center',
			icon: 'success',
			title: 'Data berhasil ditambahkan',
			showConfirmButton: false,
			timer: 1500,
		});
		props.onHide();
	};

	const handleEdit = async (title, subject) => {
		await updateDoc(doc(db, 'todos', props.id), {
			title: title,
			subject: subject,
		});
		Swal.fire({
			position: 'center',
			icon: 'success',
			title: 'Data berhasil diubah',
			showConfirmButton: false,
			timer: 1500,
		});
		props.onHide();
	};

	const addProductHandler = () => {
		if (form.title === '' && form.subject === '') {
			Swal.fire({
				title: 'Oops!',
				icon: 'error',
				text: 'Harap lengkapi data.',
				confirmButtonColor: true,
				cancelButtonColor: true,
			});
		} else if (form.title === '') {
			Swal.fire({
				title: 'Oops!',
				icon: 'error',
				text: 'Nama barang tidak boleh kosong.',
				confirmButtonColor: true,
				cancelButtonColor: true,
			});
		} else if (form.subject === '') {
			Swal.fire({
				title: 'Oops!',
				icon: 'error',
				text: 'Ketarangan barang tidak boleh kosong.',
				confirmButtonColor: true,
				cancelButtonColor: true,
			});
		} else {
			props.id ? handleEdit(form.title, form.subject) : handleAddProduct();
		}
	};

	return (
		<>
			<Modal
				{...props}
				size="md"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter" className="heading">
						{props.id === '' ? 'Tambah Barang' : 'Edit Barang'}
					</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<div className="container">
						<div className="form-floating mb-3">
							<input
								onChange={(e) => {
									setForm({
										...form,
										title: e.target.value,
									});
								}}
								required
								type="text"
								className="form-control"
								id="floatingInput"
								placeholder="name@example.com"
								value={form.title}
							/>
							<label for="floatingInput">Nama Barang</label>
						</div>
					</div>
					<div className="container">
						<div className="form-floating mb-3">
							<input
								onChange={(e) => {
									setForm({
										...form,
										subject: e.target.value,
									});
								}}
								required
								type="text"
								className="form-control"
								id="floatingInput"
								placeholder="0"
								value={form.subject}
							/>
							<label for="floatingInput">Merk</label>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<input
						onClick={() => addProductHandler()}
						// onClick={() => handleEdit(form.title, form.subject)}
						// onClick={() => props.onHide()}
						closeButton
						className="auth-btn text-primary btn main-color"
						type="submit"
						value="Simpan"
					/>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default AddProductModal;
