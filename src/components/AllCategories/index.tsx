import { Link } from 'react-router-dom';
import { useGetAllCategoriesQuery } from '@/store/api/apiSlice';
import styles from './AllCategories.module.css';
import ErrorMessage from '../ui/ErrorMessage';
import { categoriesMap } from '@/data/categories';
import Spinner from '../ui/Spinner';

export default function AllCategories() {
  const {
    data: backendCategories,
    isLoading,
    isError,
  } = useGetAllCategoriesQuery();

  let content;

  if (isLoading) {
    content = <Spinner />;
  } else if (isError) {
    content = <ErrorMessage />;
  } else if (backendCategories) {
    content = (
      <div className={styles.grid}>
        {backendCategories?.map((backendCategory) => {
          const categoryVisual = categoriesMap.find(
            (item) => item.id === Number(backendCategory.id)
          );
          if (!categoryVisual) {
            return null;
          }

          return (
            <Link
              key={backendCategory.id}
              to={`/categories/${backendCategory.id}`}
            >
              <div className={styles.card}>
                <img
                  className={styles.cardImage}
                  src={categoryVisual.image}
                  alt={categoryVisual.title}
                />
                <p className={styles.cardTitle}>{categoryVisual.title}</p>
              </div>
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <section className={styles.wrapper}>
      <div className="container">
        <h1 className={styles.title}>Categories</h1>
        {content}
      </div>
    </section>
  );
}
