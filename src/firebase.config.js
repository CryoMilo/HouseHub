import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCtp_yvqEOo-CToKeWHfojKIuKwJJH4anY",
	authDomain: "house-hub-cb108.firebaseapp.com",
	projectId: "house-hub-cb108",
	storageBucket: "house-hub-cb108.appspot.com",
	messagingSenderId: "382668833322",
	appId: "1:382668833322:web:156407295f57ff8851f953",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
