import { NavLink, useLocation } from 'react-router-dom';
import styles from './MovieList.module.css';

const MoviesList = ({ trendingMoviesList }) => {
  const location = useLocation();
  return (
    <ul className={styles.list}>
      {trendingMoviesList.map(({ id: movieId, title }) => {
        return (
          <li key={movieId} className={styles.listItem}>
            <NavLink
              to={`/movies/${movieId}`}
              className={styles.listLink}
              state={location}
            >
              <p>{title}</p>
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};

export default MoviesList;
