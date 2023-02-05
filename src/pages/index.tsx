/* eslint-disable @typescript-eslint/no-empty-function */
import { ChangeEvent, FC, useCallback, useEffect, useMemo, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Grid, IconButton, InputAdornment, Link, OutlinedInput, Typography } from '@mui/material';
import { convertBacklogNotation } from 'logics';
import { FileCopyOutlined } from '@mui/icons-material';
import GitHubIcon from 'assets/github-mark.svg';

const Index: FC = () => {
  const initialInput = useMemo(
    () => `# 見出し1
* あいうえお
	
## 見出し2
- [ ] hoge
    - [ ] fuga
      - [ ] fuga2
        - [ ] fuga3
		
### 見出し3
1. あいうえお
2. かきくけこ
		- hoge
		- fuga
		- piyo
3. さしすせそ`,
    []
  );
  const [input, setInput] = useState<string>(initialInput);
  const convert = useMemo(() => convertBacklogNotation(input), [input]);

  const [converted, setConverted] = useState<string>(convert);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };
  useEffect(() => setConverted(convert), [convert]);
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(converted);
  }, [converted]);
  return (
    <Grid container spacing={2} sx={{ marginY: 2 }}>
      <Grid item xs={6}>
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={20}
          placeholder={input}
          sx={{ width: '100%' }}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={6}>
        <OutlinedInput
          id="outlined-adornment-password"
          type="text"
          multiline
          rows={20}
          defaultValue={converted}
          value={converted}
          sx={{ width: '100%', alignItems: 'flex-start' }}
          endAdornment={
            <InputAdornment position="end" sx={{ marginTop: 1.5, marginRight: 1 }}>
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleCopy}
                onMouseDown={() => {}}
                edge="end"
              >
                <FileCopyOutlined />
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" component="span">
          Markdown 2 Backlog
        </Typography>
        <Typography variant="h6" component="span" sx={{ mx: 1 }}>
          {process.env.npm_package_version || 'v0.1.0'}
        </Typography>
        <Link href="https://github.com/Masumi-SAJIKI/markdown2backlog" target="_blank">
          <img src={GitHubIcon} style={{ width: 28 }} />
        </Link>
        <Typography>プレースホルダーに記載してあるMarkdown記法をBacklog記法に変換できます。</Typography>
      </Grid>
    </Grid>
  );
};

export default Index;
