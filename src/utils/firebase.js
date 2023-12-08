import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyA1v5frS7nkcQ3gmIOF_8n-LmCjUPMZ3pA',
	authDomain: 'blog-post-5bc34.firebaseapp.com',
	databaseURL: 'https://blog-post-5bc34-default-rtdb.firebaseio.com',
	projectId: 'blog-post-5bc34',
	storageBucket: 'blog-post-5bc34.appspot.com',
	messagingSenderId: '488181300923',
	appId: '1:488181300923:web:05683500975d614295b39e',
	measurementId: 'G-0SQ6BXDVEY',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
