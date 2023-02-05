/* eslint-disable @typescript-eslint/no-empty-function */
import { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Grid, IconButton, InputAdornment, OutlinedInput, Typography } from '@mui/material';
import { convertBacklogNotation } from 'logics';
import { FileCopyOutlined } from '@mui/icons-material';

const Index: FC = () => {
  const [input, setInput] = useState<string>(`# 見出し1
* あいうえお
	
## 見出し2
- [ ] hoge
		- [ ] fuga
			- [ ] fuga2
				- [ ] fuga3
	
### 見出し3
1. あいうえお
2. かきくけこ
3. さしすせそ`);
  const convert = useMemo(() => convertBacklogNotation(input), [input]);

  const [converted, setConverted] = useState<string>(convert);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  useEffect(() => setConverted(convert), [convert]);

  const [showPassword] = useState(false);
  return (
    <Grid container spacing={2} sx={{ marginY: 2 }}>
      <Grid item xs={6}>
        <TextField
          id="outlined-multiline-static"
          label="Markdown"
          multiline
          rows={20}
          defaultValue={input}
          sx={{ width: '100%' }}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={6}>
        {/* <TextField
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={20}
          defaultValue={converted}
          value={converted}
          sx={{ width: '100%' }}
        /> */}
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          multiline
          rows={20}
          defaultValue={converted}
          value={converted}
          sx={{ width: '100%', alignItems: 'flex-start' }}
          endAdornment={
            <InputAdornment position="end" sx={{ marginTop: 1.5, marginRight: 1 }}>
              <IconButton aria-label="toggle password visibility" onClick={() => {}} onMouseDown={() => {}} edge="end">
                <FileCopyOutlined />
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </Grid>
      <Grid item xs={6}>
        <Typography>README</Typography>
      </Grid>
    </Grid>
  );
};

export default Index;
