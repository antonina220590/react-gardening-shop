import { Link } from 'react-router-dom';
import styles from './CategorySection.module.css';
import CategoryHeader from '../CategoryHeader';
import { useGetAllCategoriesQuery } from '../../store/api/apiSlice';
import { categoriesMap } from '@/data/categories';

export default function CategorySection() {
  const {
    data: backendCategories,
    isLoading,
    isError,
  } = useGetAllCategoriesQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: Could not load categories. Please try again later.</p>;
  }

  return (
    <section className={styles.category}>
      <div className="container">
        <CategoryHeader
          title={'Categories'}
          pathTo={'/categories'}
          btnText={'All categories'}
        />
        <div className={styles.categories}>
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
                <div className={styles.category_card}>
                  <img src={categoryVisual.image} alt={categoryVisual.title} />
                  <p className={styles.card_title}>{categoryVisual.title}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
