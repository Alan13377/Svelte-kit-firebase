// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyATgG-pCEzAa-qzEqaS4Sxb8c7G_VsFnLs',
	authDomain: 'crud-auth-b89ad.firebaseapp.com',
	projectId: 'crud-auth-b89ad',
	storageBucket: 'crud-auth-b89ad.appspot.com',
	messagingSenderId: '1034040466211',
	appId: '1:1034040466211:web:0949f51b0eabad16c3ca96'
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
