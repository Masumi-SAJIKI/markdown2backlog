export const convertBulletPointsWithIndent = (text: string) => {
  // HACK
  const headText = text.match(/^[\s\S]*?[-|*|+][\s\S]{1}/);
  // const isNumberPoints = text.match(/^[\s\S]*?\d+?\.{1}[\s\S]{1}/);
  const isNumberPoints2 = text.match(/^\d+?\.{1}[\s\S]{1}/);
  const estimate = text.match(/\d[h|m]$/);
  const isNumberPoints = text.replace((estimate || [])[0] || '', '').match(/^[\s\S]*?\d+?\.{1}[\s\S]{1}/);

  if (!headText || isNumberPoints2 || isNumberPoints) {
    return text;
  }
  const convertTabSpace = headText[0].replace(/\t-/g, '-').replaceAll(/\t/g, '-');
  const convertHalfWidthSpace = convertTabSpace.replace(/^\s{4}/, '-').replaceAll('  ', '-');
  const convertHeadBulletPoints = convertHalfWidthSpace.replaceAll(/[*|+] /g, '- ');
  const replaced = convertHeadBulletPoints;
  return text.replace(headText[0], replaced);
};

export const convertHeadline = (multiLineText: string) => multiLineText.replaceAll('#', '*');

export const convertNumberPoints = (text: string) => {
  const headText = text.match(/^[\s\S]*?\d\.[\s\S]{1}/);

  if (!headText) {
    return text;
  }
  const convertTabSpace = headText[0].replace(/\t-/g, '+').replaceAll(/\t/g, '+');
  const convertHalfWidthSpace = convertTabSpace.replace(/^\s{4}/, '+').replaceAll('  ', '+');
  const convertHeadNumber = convertHalfWidthSpace.replaceAll(/\d*?\./g, '+');
  const replaced = convertHeadNumber;
  return text.replace(headText[0], replaced);
};

export const convertBacklogNotation = (text: string) => {
  const converted = text
    .split(/\n/)
    .map((t) => {
      let text = t;
      text = convertBulletPointsWithIndent(text);
      text = convertNumberPoints(text);
      return text;
    })
    .join('\n');
  return convertHeadline(converted);
};
