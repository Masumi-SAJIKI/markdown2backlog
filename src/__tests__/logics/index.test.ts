import { convertBacklogNotation, convertHeadline } from 'logics';

describe('見出し', () => {
  it.each([
    ['# 見出し1', '* 見出し1'],
    ['## 見出し2', '** 見出し2'],
    ['### 見出し3', '*** 見出し3'],
    ['#### 見出し4', '**** 見出し4'],
  ])('convert %s to %s', (input, converted) => {
    expect(convertHeadline(input)).toBe(converted);
  });
});

// describe('太字', () => {
//   it.each([
//     ['**太字**', '"太字"'],
//     ['** 太字 **', '" 太字 "'],
//   ])('convert %s to %s', (input, converted) => {
//     expect(convertHeadline(input)).toBe(converted);
//   });
// });

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
			- [x] piyo2
				- [x] fuga3
				- [x] piyo3

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
