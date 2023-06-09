import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  PromptTemplate,
  SystemMessagePromptTemplate,
} from 'langchain/prompts'

export const summarizeWebsiteTemplate = ChatPromptTemplate.fromPromptMessages([
  SystemMessagePromptTemplate.fromTemplate(
    '你是我的网页文章阅读助理。我将为你提供文章的标题、作'
    + '者、所抓取的网页中的正文等信息，然后你将对文章做出总结。\n请你在总结时满足以下要求：'
    + '1. 首先如果文章的标题不是中文的请依据上下文将标题信达雅的翻译为简体中文并放在第一行'
    + '2. 然后从我提供的文章信息中总结出一个三百字以内的文章的摘要'
    + '3. 最后，你将利用你已有的知识和经验，对我提供的文章信息提出 3 个具有创造性和发散思维的问题'
    + '4. 请用简体中文进行回复'
    + '最终你回复的消息格式应像这个例句一样（例句中的双花括号为需要替换的内容）：\n'
    + '<简体中文标题，可省略>\n\n摘要：<文章的摘要>\n\n关联提问：\n1. <关联提问 1>\n2. <关联提问 2>\n2. <关联提问 3>',
  ),
  HumanMessagePromptTemplate.fromTemplate(
    '文章标题：{title}\n'
    + '文章作者：{by}\n'
    + '文章正文：{content}',
  ),
])

export const loadSummarizationTemplate = new PromptTemplate({
  template: '写下以下文章片段的摘要，摘要的字数在 500 字以内：\n\n"{text}"\n\n摘要:',
  inputVariables: ['text'],
})
