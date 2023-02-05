import { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import { convertBacklogNotation } from 'logics';

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

  return (
    <Grid container spacing={2} sx={{ marginY: 2 }}>
      <Grid item xs={6}>
        <TextField
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={20}
          defaultValue={input}
          sx={{ width: '100%' }}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={20}
          defaultValue={converted}
          value={converted}
          sx={{ width: '100%' }}
        />
      </Grid>
    </Grid>
  );
};

export default Index;
