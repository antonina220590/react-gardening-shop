import Select, {
  type ActionMeta,
  type MultiValue,
  type SingleValue,
} from 'react-select';
import { customSelectStyles, type SortOptionType } from './SelectStyle';
import styles from './FilterPanelComponent.module.css';
import { sortOptions } from '@/data/selectOptions';

type FilterPanelComponentProps = {
  priceRange: { from: string; to: string };
  onPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  discountOnly: boolean;
  onDiscountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sortOrder: string;
  onSortChange: (value: string) => void;
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
        <Select
          inputId="sort_order"
          options={sortOptions}
          value={sortOptions.find((option) => option.value === sortOrder)}
          onChange={handleSelectChange}
          styles={customSelectStyles}
          classNamePrefix="react-select"
        />
      </div>
    </div>
  );
}
