export const convertHeadline = (text: string) => text.replaceAll('#', '*');
export const convertBacklogNotation = (text: string) => {
  const aa = convertHeadline(text.replaceAll(/[*|+] /g, '- '));
  const bb = aa
    .split(/\n/)
    .map((t) => {
      const x = t.match(/^[\s\S]+?-[\s\S]/);
      const x2 = t.match(/^[\s\S]+?-/);
      if (x && x2) {
        const x3 = x[0].replace('-', '').replace(' ', '').replaceAll('  ', '-').replaceAll(/\t/g, '-');
        return t.replace(x2[0], x3);
      }
      return t.replace(/^\d\./i, '+');
    })
    .join('\n');
  return bb;
};
// export const convertBold = (text: string) => text.match(/\*\**.\*\*/i)?.map((text) => text.replace('**', '"'));
