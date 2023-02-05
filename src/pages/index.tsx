import { ChangeEvent, FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Grid, Link, Typography } from '@mui/material';
import { convertBacklogNotation } from 'logics';
import { FileCopyOutlined } from '@mui/icons-material';
import BackspaceIcon from '@mui/icons-material/Backspace';
import GitHubIcon from 'assets/github-mark.svg';
import { initialInput } from 'store';
import { TextArea } from 'components/TextArea';

const Index: FC = () => {
  const [input, setInput] = useState<string>(initialInput);
  const convert = useMemo(() => convertBacklogNotation(input), [input]);
  const [converted, setConverted] = useState<string>(convert);

  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value), []);
  const handleBacklogChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => setConverted(e.target.value), []);
  const handleClear = useCallback(() => setInput(''), []);
  const handleCopy = useCallback(() => navigator.clipboard.writeText(converted), [converted]);

  useEffect(() => setConverted(convert), [convert]);

  return (
    <Grid container spacing={2} sx={{ marginY: 2 }}>
      <Grid item xs={6}>
        <TextArea
          id="markdown"
          label="Markdown"
          value={input}
          icon={<BackspaceIcon />}
          onClickIcon={handleClear}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={6}>
        <TextArea
          id="backlog"
          label="Backlog"
          value={converted}
          icon={<FileCopyOutlined />}
          onClickIcon={handleCopy}
          onChange={handleBacklogChange}
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
        <Typography>
          左のテキストフィールドにMarkdown記法の文章を記入すると右側にBacklog記法で変換したものが表示されます。
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Index;
