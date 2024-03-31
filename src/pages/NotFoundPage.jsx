import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <h2>Виникла помилка</h2>
      <Link to="/" className={styles.backToHome}>
        Головна
      </Link>
    </div>
  );
};

export default NotFoundPage;
