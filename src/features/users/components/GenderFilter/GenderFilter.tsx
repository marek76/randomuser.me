import type { Gender } from '../../types';
import styles from './GenderFilter.module.css';

interface GenderFilterOption {
  value: Gender | null;
  label: string;
}

const OPTIONS: GenderFilterOption[] = [
  { value: null, label: 'All' },
  { value: 'male', label: 'Males' },
  { value: 'female', label: 'Females' },
];

interface GenderFilterProps {
  value: Gender | null;
  onChange: (value: Gender | null) => void;
}

export function GenderFilter({ value, onChange }: GenderFilterProps) {
  return (
    <div className={styles.genderFilter} role="radiogroup" aria-label="Gender filter">
      {OPTIONS.map((option) => (
        <label key={option.label} className={styles.option}>
          <input
            type="radio"
            name="gender-filter"
            checked={value === option.value}
            onChange={() => onChange(option.value)}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
}
