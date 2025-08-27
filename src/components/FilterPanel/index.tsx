import {
  type ActionMeta,
  type MultiValue,
  type SingleValue,
} from 'react-select';
import StyledSelect from '../ui/Select';
import styles from './FilterPanel.module.css';
import { sortOptions } from '@/data/selectOptions';
import type { SortOptionType } from '../ui/Select/SelectStyle';

type FilterPanelProps = {
  priceRange: { from: string; to: string };
  onPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  discountOnly: boolean;
  onDiscountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sortOrder: string;
  onSortChange: (value: string) => void;
  pathname: string;
};

export default function FilterPanel({
  priceRange,
  onPriceChange,
  discountOnly,
  onDiscountChange,
  sortOrder,
  onSortChange,
  pathname,
}: FilterPanelProps) {
  const handleSelectChange = (
    newValue: SingleValue<SortOptionType> | MultiValue<SortOptionType>,
    _actionMeta: ActionMeta<SortOptionType>
  ) => {
    if (newValue && !Array.isArray(newValue)) {
      const singleValue = newValue as SortOptionType;
      onSortChange(singleValue.value);
    }
  };

  return (
    <div className={styles.panel}>
      <div className={styles.group}>
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
          className={styles.input}
        />
        <input
          type="number"
          name="to"
          placeholder="to"
          value={priceRange.to}
          onChange={onPriceChange}
          className={styles.input}
        />
      </div>
      {pathname !== '/sales' && (
        <div className={styles.group}>
          <label htmlFor="discounted">Discounted items</label>
          <input
            id="discounted"
            type="checkbox"
            checked={discountOnly}
            onChange={onDiscountChange}
            className={styles.checkbox}
          />
        </div>
      )}
      <div className={styles.group}>
        <label htmlFor="sort_order">Sorted</label>
        <StyledSelect
          inputId="sort_order"
          options={sortOptions}
          value={sortOptions.find((option) => option.value === sortOrder)}
          onChange={handleSelectChange}
        />
      </div>
    </div>
  );
}
