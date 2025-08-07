import type { StylesConfig } from 'react-select';

export type SortOptionType = {
  value: string;
  label: string;
};

export const customSelectStyles: StylesConfig<SortOptionType> = {
  control: (provided) => ({
    ...provided,
    border: '1px solid #dddddd',
    borderRadius: '10px',
    padding: '3px 8px',
    width: '200px',
    outline: 'none',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#E0E0E0',
    },
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '10px',
    marginTop: '4px',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#F5F5F5' : 'white',
    color: state.isSelected ? '#282828' : '#A3A3A3',
    cursor: 'pointer',
  }),
  indicatorSeparator: () => ({ display: 'none' }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: '#282828',
    transition: 'all .2s ease',
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'none',
  }),
};
