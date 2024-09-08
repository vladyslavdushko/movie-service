import styles from './AddToWatchListBtn.module.css';
import addToWatchList from '../../images/addToWatchList.svg';
const AddToWatchListBtn = ({ handleAddToWatchLater }) => {
  return (
    <div className={styles.button_container}>
      <button className={styles.watchLaterButton} type="button" onClick={handleAddToWatchLater}>
        <img src={addToWatchList} alt="add-to-watchlist" className={styles.add_to_watchlist_img} />
        Add to watchlist
      </button>
    </div>
  );
};

export default AddToWatchListBtn;
