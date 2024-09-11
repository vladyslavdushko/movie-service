/* eslint-disable no-unused-vars */
import { initializeApp } from 'firebase/app';
import { getAuth, getRedirectResult, onAuthStateChanged } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { doc, getFirestore, setDoc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

const firebaseConfig = {
  apiKey: 'AIzaSyAGZQMahB8tqBG5-m_a2PCDreNyW3as6nM',
  authDomain: 'movie-service-1d436.firebaseapp.com',
  projectId: 'movie-service-1d436',
  storageBucket: 'movie-service-1d436.appspot.com',
  messagingSenderId: '1063429897518',
  appId: '1:1063429897518:web:93b057ba06ecb254958ebf'
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
console.log(auth, 'auth');

export const provider = new GoogleAuthProvider();

export const db = getFirestore();

export const addToWatchLater = async (movieData, userId) => {
  try {
    const movieDocRef = doc(db, 'watchLater', userId, 'movies', movieData.id.toString());

    await setDoc(movieDocRef, movieData);
  } catch (error) {
    throw error.message;
  }
};

export const removeFromWatchLater = async (movieId, userId) => {
  try {
    const movieDocRef = doc(db, 'watchLater', userId, 'movies', movieId.toString());

    await deleteDoc(movieDocRef);
    return;
  } catch (error) {
    throw error.message;
  }
};

export const getWatchLaterMovies = async (userId) => {
  try {
    const moviesRef = collection(db, 'watchLater', userId, 'movies');
    const movieSnapshot = await getDocs(moviesRef);

    const movieList = movieSnapshot.docs.map((doc) => doc.data());
    return movieList;
  } catch (error) {
    console.error('Error fetching watch later movies:', error);
    return [];
  }
};

export const redirectResult = async (_, thunkAPI) => {
  try {
    const result = await getRedirectResult(auth);
    return result;
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue(error.message);
  }
};
