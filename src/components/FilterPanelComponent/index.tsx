import styles from './FilterPanelComponent.module.css';

type FilterPanelComponentProps = {
  priceRange: { from: string; to: string };
  onPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  discountOnly: boolean;
  onDiscountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sortOrder: string;
  onSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  pathname: string;
};

export default function FilterPanelComponent({
  priceRange,
  onPriceChange,
  discountOnly,
  onDiscountChange,
  sortOrder,
  onSortChange,
  pathname,
}: FilterPanelComponentProps) {
  return (
    <div className={styles.panel}>
      <div className={styles.filter_group}>
        <label htmlFor="price_from" className={styles.label}>
          Price
        </label>
        <input
          id="price_from"
          type="number"
          name="from"
          placeholder="from"
          value={priceRange.from}
          onChange={onPriceChange}
        />
        <input
          type="number"
          name="to"
          placeholder="to"
          value={priceRange.to}
          onChange={onPriceChange}
        />
      </div>
      {pathname !== '/sales' && (
        <div className={styles.filter_group}>
          <label htmlFor="discounted">Discounted items</label>
          <input
            id="discounted"
            type="checkbox"
            checked={discountOnly}
            onChange={onDiscountChange}
          />
        </div>
      )}
      <div className={styles.filter_group}>
        <label htmlFor="sort_order">Sorted</label>
        <select id="sort_order" value={sortOrder} onChange={onSortChange}>
          <option value="default">by default</option>
          <option value="price_asc">price: low-high</option>
          <option value="price_desc">price: high-low</option>
          <option value="newest">newest</option>
        </select>
      </div>
    </div>
  );
}
