/* eslint-disable no-unused-vars */
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { doc, getFirestore, setDoc, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAGZQMahB8tqBG5-m_a2PCDreNyW3as6nM',
  authDomain: 'https://movie-service-seven.vercel.app',
  projectId: 'movie-service-1d436',
  storageBucket: 'movie-service-1d436.appspot.com',
  messagingSenderId: '1063429897518',
  appId: '1:1063429897518:web:93b057ba06ecb254958ebf'
};

// const firebaseConfig = {
//   apiKey: 'AIzaSyAGZQMahB8tqBG5-m_a2PCDreNyW3as6nM',
//   authDomain: 'movie-service-1d436.firebaseapp.com',
//   projectId: 'movie-service-1d436',
//   storageBucket: 'movie-service-1d436.appspot.com',
//   messagingSenderId: '1063429897518',
//   appId: '1:1063429897518:web:93b057ba06ecb254958ebf'
// };

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

export const db = getFirestore();

export const addToWatchLater = async (movieData, userId) => {
  try {
    if (!movieData.id || !userId) {
      throw new Error('Movie ID or User ID is missing');
    }

    const movieDocRef = doc(db, 'watchLater', userId, 'movies', movieData.id.toString());

    await setDoc(movieDocRef, movieData);

    console.log('Movie added to watch later successfully');
  } catch (error) {
    console.error('Error adding movie to watch later:', error);
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
