/* eslint-disable no-unused-vars */
import { initializeApp } from 'firebase/app';
import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { arrayUnion, doc, getDoc, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
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

export const provider = new GoogleAuthProvider();

export const db = getFirestore();

// функція для додавання фільму в список "переглянути пізніше"
export const addToWatchLater = async (movieData, userId) => {
  try {
    // Створюємо шлях до документа
    if (!movieData.id || !userId) {
      throw new Error('Movie ID or User ID is missing');
    }

    // Формуємо шлях до документа за допомогою userId і movieId
    const movieDocRef = doc(db, 'watchLater', userId, 'movies', movieData.id.toString());

    // Використовуємо setDoc для створення або оновлення документа
    await setDoc(movieDocRef, movieData);

    console.log('Movie added to watch later successfully');
  } catch (error) {
    console.error('Error adding movie to watch later:', error);
  }
};

import { collection, getDocs } from 'firebase/firestore';

export const getWatchLaterMovies = async (userId) => {
  try {
    const moviesRef = collection(db, 'watchLater', userId, 'movies');
    const movieSnapshot = await getDocs(moviesRef);

    // Отримуємо масив фільмів
    const movieList = movieSnapshot.docs.map((doc) => doc.data());
    return movieList;
  } catch (error) {
    console.error('Error fetching watch later movies:', error);
    return [];
  }
};
