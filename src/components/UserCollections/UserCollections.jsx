import { useEffect, useState } from 'react';
import { createCollection, getCollections } from '../../firebase/firebase';
import { useSelector } from 'react-redux';
import { selectToken } from '../../redux/firebaseAuth/selectors';
import toast from 'react-hot-toast';
import styles from './UserCollections.module.css';
import { Link, useLocation } from 'react-router-dom';
const UserCollections = () => {
  const uid = useSelector(selectToken);
  const [userCollection, setUserCollection] = useState([]);
  const [collectionName, setCollectionName] = useState('');
  const location = useLocation();

  useEffect(() => {
    const getCollectionsFromStore = async () => {
      try {
        const data = await getCollections(uid);
        setUserCollection(data);
        return data;
      } catch (error) {
        return toast.error('Failed to fetch collections');
      }
    };

    if (uid) {
      getCollectionsFromStore();
    }
  }, [uid]);

  const handleCreateCollection = async (e) => {
    e.preventDefault();

    if (!collectionName) {
      return toast('Please enter a collection name', { icon: '⚠️' });
    }

    try {
      await createCollection(collectionName, uid);

      setUserCollection((prev) => [...prev, { id: collectionName, name: collectionName }]);
      toast.success('Collection created successfully!');
      return setCollectionName('');
    } catch (error) {
      toast.error('Oops, something went wrong');
      return console.error('Error creating collection:', error);
    }
  };

  return (
    <>
      <form onSubmit={handleCreateCollection} className={styles['collection-form']}>
        <>
          <label htmlFor="collectionName">Enter Collection Name:</label>
          <input
            type="text"
            id="collectionName"
            value={collectionName}
            onChange={(e) => setCollectionName(e.target.value)}
            placeholder="Enter collection name"
          />
        </>
        <button type="submit" className={styles.submit_button}>
          Create Collection
        </button>
      </form>

      <ul className={styles.collections_ul}>
        {userCollection.length > 0 &&
          userCollection.map((collection) => (
            <li key={collection.id} className={styles.collections_ul_li}>
              <Link to={`/user-lists/${collection.id}`} state={location}>
                {collection.name}
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default UserCollections;
