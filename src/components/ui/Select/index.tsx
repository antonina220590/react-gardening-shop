import Select, { type Props } from 'react-select';
import { customSelectStyles } from './SelectStyle';

type BaseOption = {
  value: string;
  label: string;
};
export default function StyledSelect<OptionType extends BaseOption>(
  props: Props<OptionType>
) {
  return (
    <Select
      {...props}
      styles={
        customSelectStyles as unknown as import('react-select').StylesConfig<
          OptionType,
          boolean,
          import('react-select').GroupBase<OptionType>
        >
      }
      classNamePrefix="react-select"
    />
  );
}
