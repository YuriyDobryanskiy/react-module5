import { useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import { useLocation, useSearchParams } from 'react-router-dom';

import { requestMoviesByKeyword } from '../services/api';
import MoviesList from '../components/MovieList/MovieList';
import MoviesSearch from '../components/MoviesSearch/MoviesSearch';
import NotFoundPage from './NotFoundPage';

const MoviesPage = () => {
  const [movieQuery, setMovieQuery] = useSearchParams();
  const [searchResult, setSearchResult] = useState([]);
  const [loaderState, setLoaderState] = useState(false);
  const [showList, setShowList] = useState(false);
  const userMovieQuery = movieQuery.get('query') ?? '';
  const location = useLocation();

  const changeQuery = evt => {
    setMovieQuery({ query: evt });
  };

  useEffect(() => {
    if (userMovieQuery === '') return;
    setShowList(false);
    const getMovieByKeyword = async () => {
      try {
        setLoaderState(true);
        const {
          data: { results },
        } = await requestMoviesByKeyword(userMovieQuery);
        setSearchResult(
          results.filter(result => {
            return result.poster_path !== null;
          })
        );
        setShowList(true);
      } catch (error) {
        console.log('error');
      } finally {
        setLoaderState(false);
      }
    };
    getMovieByKeyword();
  }, [userMovieQuery]);

  return (
    <div style={{ padding: '16px' }}>
      <MoviesSearch query={userMovieQuery} changeQuery={changeQuery} />
      {loaderState && <Loader />}
      {searchResult.length > 0 && userMovieQuery !== '' && showList && (
        <MoviesList trendingMoviesList={searchResult} />
      )}
      {searchResult.length === 0 && userMovieQuery !== '' && !loaderState && (
        <div>
          {' '}
          <p
            style={{
              textAlign: 'center',
              marginTop: '100px',
              fontWeight: '500',
            }}
          >
            Такого фільму не знайдено
          </p>
        </div>
      )}
      {location.search !== '' && location.search.length < 8 && <NotFoundPage />}
    </div>
  );
};

export default MoviesPage;
