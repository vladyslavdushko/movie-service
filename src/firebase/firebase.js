/* eslint-disable no-unused-vars */
import { retry } from '@reduxjs/toolkit/query';
import { initializeApp } from 'firebase/app';
import { getAuth, getRedirectResult, onAuthStateChanged } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import {
  doc,
  getFirestore,
  setDoc,
  collection,
  getDocs,
  deleteDoc,
  query
} from 'firebase/firestore';
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

export const removeFromCollection = async (movieId, userId, collectionName) => {
  try {
    const movieDocRef = doc(
      db,
      'users',
      userId.toString(),
      'collections',
      collectionName.toString(),
      'movies',
      movieId.toString()
    );

    await deleteDoc(movieDocRef);
    console.log(`Movie ${movieId} successfully removed from collection ${collectionName}`);
    return;
  } catch (error) {
    console.error('Error removing movie:', error.message);
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

export const createCollection = async (collectionName, userId) => {
  try {
    if (!collectionName || !userId) {
      throw new Error('Collection name or User ID is missing');
    }

    const collectionDocRef = doc(db, 'users', userId, 'collections', collectionName);

    await setDoc(collectionDocRef, { name: collectionName });

    console.log('Collection created successfully');
  } catch (error) {
    console.error('Error creating collection:', error);
  }
};

export const addToCollection = async (userId, collectionName, movieData) => {
  try {
    const movieDocRef = doc(
      db,
      'users',
      userId.toString(),
      'collections',
      collectionName.toString(),
      'movies',
      movieData.id.toString() // Pass the movie id as the document name
    );
    await setDoc(movieDocRef, movieData);
    console.log('Movie added to collection successfully');
  } catch (error) {
    console.error('Error adding movie to collection:', error);
    throw new Error('Failed to add movie to collection');
  }
};

export const getCollections = async (userId) => {
  try {
    const collectionsRef = collection(db, 'users', userId, 'collections');
    const snapshot = await getDocs(collectionsRef);
    const collections = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    return collections;
  } catch (error) {
    console.error('Error fetching collections:', error);
    return [];
  }
};

export const getMoviesFromCollection = async (userId, collectionId) => {
  try {
    const collectionRef = collection(db, 'users', userId, 'collections', collectionId, 'movies');
    const movieDocs = await getDocs(collectionRef);

    const movies = movieDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    return movies;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw new Error('Failed to fetch movies');
  }
};
