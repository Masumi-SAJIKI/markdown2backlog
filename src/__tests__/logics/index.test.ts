import {
  convertBacklogNotation,
  convertBulletPointsWithIndent,
  convertBulletPointsToHyphen,
  convertHeadline,
  convertNumberPoints,
} from 'logics';

describe('見出し', () => {
  it.each([
    ['# 見出し1', '* 見出し1'],
    ['## 見出し2', '** 見出し2'],
    ['### 見出し3', '*** 見出し3'],
    ['#### 見出し4', '**** 見出し4'],
    [
      `# 見出し1
## 見出し2
### 見出し3
#### 見出し4`,
      `* 見出し1
** 見出し2
*** 見出し3
**** 見出し4`,
    ],
  ])('convert %s to %s', (input, converted) => {
    expect(convertHeadline(input)).toBe(converted);
  });
});

describe('ネストあり箇条書き', () => {
  it.each([
    ['* テスト', '- テスト'],
    ['- test', '- test'],
    ['    - test', '-- test'], //半角スペース
    ['    - test', '-- test'], // tabスペース
    ['      - test', '--- test'],
    ['      - test', '--- test'],
    ['        - test', '---- test'],
    ['        - test', '---- test'],
    ['- [ ] test', '- [ ] test'],
    ['- [x] test', '- [x] test'],
    ['    - [ ] test', '-- [ ] test'],
    ['    - [ ] test', '-- [ ] test'],
    ['      - [ ] test', '--- [ ] test'],
    ['      - [ ] test', '--- [ ] test'],
    ['        - [ ] test', '---- [ ] test'],
    ['        - [ ] test', '---- [ ] test'],
    ['* test', '- test'],
    ['    * test', '-- test'],
    ['    * test', '-- test'],
    ['      * test', '--- test'],
    ['      * test', '--- test'],
    ['        * test', '---- test'],
    ['* [ ] test', '- [ ] test'],
    ['* [x] test', '- [x] test'],
    ['    * [ ] test', '-- [ ] test'],
    ['    * [ ] test', '-- [ ] test'],
    ['      * [ ] test', '--- [ ] test'],
    ['      * [ ] test', '--- [ ] test'],
    ['        * [ ] test', '---- [ ] test'],
    // ['+ test', '- test'],
    // ['    + test', '-- test'],
    // ['    + test', '-- test'],
    // ['      + test', '--- test'],
    // ['      + test', '--- test'],
    // ['        + test', '---- test'],
    // ['        + test', '---- test'],
    // ['+ [ ] test', '- [ ] test'],
    // ['+ [x] test', '- [x] test'],
    // ['    + [ ] test', '-- [ ] test'],
    // ['    + [ ] test', '-- [ ] test'],
    // ['      + [ ] test', '--- [ ] test'],
    // ['      + [ ] test', '--- [ ] test'],
    // ['        + [ ] test', '---- [ ] test'],
    // ['        + [ ] test', '---- [ ] test'],
    ['- test-hoge', '- test-hoge'],
    ['    - test-hoge', '-- test-hoge'],
    ['    - test - hoge', '-- test - hoge'],
    ['# テスト', '# テスト'],
    ['# テスト-hoge', '# テスト-hoge'],
    ['# テスト - hoge', '# テスト - hoge'],
    ['** test **', '** test **'],
    ['**test**', '**test**'],
    ['**test**', '**test**'],
  ])('convert %s to %s', (input, converted) => {
    expect(convertBulletPointsWithIndent(input)).toBe(converted);
  });
});

describe('箇条書き', () => {
  it.each([
    ['- test', '- test'],
    ['* test', '- test'],
    ['+ test', '- test'],
    ['- [ ] test', '- [ ] test'],
    ['- [x] test', '- [x] test'],
    ['* [ ] test', '- [ ] test'],
    ['* [x] test', '- [x] test'],
    ['+ [ ] test', '- [ ] test'],
    ['+ [x] test', '- [x] test'],
  ])('convert %s to %s', (input, converted) => {
    expect(convertBulletPointsToHyphen(input)).toBe(converted);
  });
});

describe('番号付きリスト', () => {
  it.each([
    ['1. テスト', '+ テスト'],
    ['1. test', '+ test'],
  ])('convert %s to %s', (input, converted) => {
    expect(convertNumberPoints(input)).toBe(converted);
  });
});

describe('変換', () => {
  const input = `
# 見出し1
* あいうえお
+ かきくけこ

## 見出し2
- [ ] hoge
    - [ ] fuga
    - [ ] piyo
      - [ ] fuga2
			- [ ] piyo2
        - [ ] fuga3
				- [ ] piyo3
- [x] hoge
		- [x] fuga
		- [x] piyo
			- [x] fuga2
      - [x] piyo2 - 10h3m1
        - [x] fuga3 - 10h2
        - [x] piyo3 - 10h3
* [ ] hoge
    * [ ] fuga
    * [ ] piyo
      * [ ] fuga2 - 10h3m4
      * [ ] piyo2 - 10h3m5
        * [ ] fuga3 - 10h6
        * [ ] piyo3 - 10h7
* [x] hoge
    * [x] fuga
    * [x] piyo
      * [x] fuga2
      * [x] piyo2
        * [x] fuga3
        * [x] piyo3

### 見出し3
1. あいうえお
2. かきくけこ
3. さしすせそ
`;
  const output = `
* 見出し1
- あいうえお
- かきくけこ

** 見出し2
- [ ] hoge
-- [ ] fuga
-- [ ] piyo
--- [ ] fuga2
--- [ ] piyo2
---- [ ] fuga3
---- [ ] piyo3
- [x] hoge
-- [x] fuga
-- [x] piyo
--- [x] fuga2
--- [x] piyo2 - 10h3m1
---- [x] fuga3 - 10h2
---- [x] piyo3 - 10h3
- [ ] hoge
-- [ ] fuga
-- [ ] piyo
--- [ ] fuga2 - 10h3m4
--- [ ] piyo2 - 10h3m5
---- [ ] fuga3 - 10h6
---- [ ] piyo3 - 10h7
- [x] hoge
-- [x] fuga
-- [x] piyo
--- [x] fuga2
--- [x] piyo2
---- [x] fuga3
---- [x] piyo3

*** 見出し3
+ あいうえお
+ かきくけこ
+ さしすせそ
`;
  it.each([[input, output]])('convert %s to %s', (input, converted) => {
    expect(convertBacklogNotation(input)).toBe(converted);
  });
});
