import { useParams } from 'react-router-dom';
import { useGetProductsByCategoryIdQuery } from '../../store/api/apiSlice';

export default function ProductsByCategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { data, isLoading, isError } = useGetProductsByCategoryIdQuery(
    categoryId as string
  );

  if (!categoryId) return <div>Category not found.</div>;
  if (isLoading) return <div>Loading products...</div>;
  if (isError) return <div>Error loading products.</div>;

  return (
    <div className="container">
      <h1>{data?.category?.title}</h1>

      <div>
        {data?.data?.map((product) => (
          <div key={product.id}>
            <p>{product.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
