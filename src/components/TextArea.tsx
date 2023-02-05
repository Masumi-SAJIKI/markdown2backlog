import { ChangeEvent, FC } from 'react';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';

export interface Props {
  id: string;
  label: string;
  value: string;
  icon: JSX.Element;
  onClickIcon: () => void;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextArea: FC<Props> = ({ id, label, value, icon, onClickIcon, onChange }) => {
  return (
    <FormControl sx={{ width: '100%' }} variant="outlined">
      <InputLabel htmlFor={`input-${id}`}>{label}</InputLabel>
      <OutlinedInput
        id={`input-${id}`}
        type="text"
        multiline
        label={label}
        rows={20}
        value={value}
        onChange={onChange}
        sx={{ width: '100%', alignItems: 'flex-start' }}
        endAdornment={
          <InputAdornment position="end" sx={{ marginTop: 1.5, marginRight: 1 }}>
            <IconButton onClick={onClickIcon} onMouseDown={onClickIcon} edge="end">
              {icon}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};
