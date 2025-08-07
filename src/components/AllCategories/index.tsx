import { useGetAllCategoriesQuery } from '@/store/api/apiSlice';
import styles from './AllCategories.module.css';
import ErrorLoadComponent from '../ErrorLoadComponent';
import { categoriesMap } from '@/data/categories';
import { Link } from 'react-router-dom';
import SpinnerComponent from '../SpinnerComponent';

export default function AllCategories() {
  const {
    data: backendCategories,
    isLoading,
    isError,
  } = useGetAllCategoriesQuery();

  let content;

  if (isLoading) {
    content = <SpinnerComponent />;
  } else if (isError) {
    content = <ErrorLoadComponent />;
  } else if (backendCategories) {
    content = (
      <div className={styles.categories_grid}>
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
              <div className={styles.categories_card}>
                <img src={categoryVisual.image} alt={categoryVisual.title} />
                <p className={styles.categories_card_title}>
                  {categoryVisual.title}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <section className={styles.categories_container}>
      <div className="container">
        <h1 className={styles.categories_title}>Categories</h1>
        {content}
      </div>
    </section>
  );
}
