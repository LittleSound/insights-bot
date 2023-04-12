/***
 * 判断是否包含 CJK 字符
 */
export function containsCJKChar(str: string): boolean {
  // \u4E00-\u9FFF 是中文字符集
  // \u3400-\u4DFF\u3131-\uD79D 是韩语字符集
  // ぁ-んァ-ン 是日语五十音字符集
  // 中文 字母 数字 1-12
  const reg = /^[\u4E00-\u9FFF\u3400-\u4DFF\u3131-\uD79Dぁ-んァ-ンA-Za-z0-9]{1,50}$/
  return reg.test(str)
}
