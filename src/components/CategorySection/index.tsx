import { Link } from 'react-router-dom';
import styles from './CategorySection.module.css';
import CategoryHeader from '../ui/CategoryHeader';
import { useGetAllCategoriesQuery } from '../../store/api/apiSlice';
import { categoriesMap } from '@/data/categories';
import ErrorLoadComponent from '../ui/ErrorMessage';
import Spinner from '../ui/Spinner';

export default function CategorySection() {
  const {
    data: backendCategories,
    isLoading,
    isError,
  } = useGetAllCategoriesQuery();

  let content;

  if (isLoading) {
    content = <Spinner />;
  } else if (isError) {
    content = <ErrorLoadComponent />;
  } else if (backendCategories) {
    content = (
      <div className={styles.grid}>
        {backendCategories?.slice(0, 4).map((backendCategory) => {
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
        <CategoryHeader
          title={'Categories'}
          pathTo={'/categories'}
          btnText={'All categories'}
        />
        {content}
      </div>
    </section>
  );
}
