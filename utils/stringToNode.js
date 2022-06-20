/**
 * 将字符串转换成富文本的node格式
 * @param {String} keyword 关键词
 * @param {String} value 输入的值
 */
export default function (keyword, value) {
  const re = new RegExp(value)      // 设置正则
  const findWord = keyword.match(re)   // 匹配word

  if (findWord) {   // 匹配成功
    const word1 = keyword.slice(0, findWord[0].length)
    const node1 = {
      name: "span",
      attrs: {
        style: "color: #3bd196"
      },
      children: [{
        type: "text",
        text: word1
      }]
    }

    const word2 = keyword.slice(value.length)
    const node2 = {
      name: "span",
      attrs: {
        style: "color: #000"
      },
      children: [{
        type: "text",
        text: word2
      }]
    }
    return [node1, node2]
  } else {  // 匹配失败则返回keyword
    const node = {
      name: "span",
      attr: {style: "color: #000"},
      children: [{
        type: "text",
        text: keyword
      }]
    }
    return [node]
  }
  
}