import styles from './CategorySection.module.css';
import CategoryHeader from '../CategoryHeader';
import { useGetAllCategoriesQuery } from '../../store/api/apiSlice';
import { categoriesMap } from '@/data/categories';

export default function CategorySection() {
  const { data: _categories, isLoading } = useGetAllCategoriesQuery();

  if (isLoading) {
    return <p>Loading...</p>;
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
          {categoriesMap.slice(0, 4).map((category) => (
            <div key={category.id} className={styles.category_card}>
              <img src={category.image} alt={category.title} />
              <p>{category.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
