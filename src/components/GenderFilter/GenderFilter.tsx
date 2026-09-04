import type { Gender } from '../../features/users/types';
import './GenderFilter.css';

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
    <div className="gender-filter" role="radiogroup" aria-label="Gender filter">
      {OPTIONS.map((option) => (
        <label key={option.label} className="gender-filter__option">
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