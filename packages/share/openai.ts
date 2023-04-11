import { ChatOpenAI } from 'langchain/chat_models'
import { TokenTextSplitter } from 'langchain/text_splitter'
import { OpenAI } from 'langchain/llms'
import { loadSummarizationChain } from 'langchain/chains'
import { summarizeWebsiteTemplate } from './promptTemplates/summarizeWebsite'

export enum GPTModelName {
  GPT432K0314 = 'gpt-4-32k-0314',
  GPT432K = 'gpt-4-32k',
  GPT40314 = 'gpt-4-0314',
  GPT4 = 'gpt-4',
  GPT3Dot5Turbo0301 = 'gpt-3.5-turbo-0301',
  GPT3Dot5Turbo = 'gpt-3.5-turbo',
  GPT3TextDavinci003 = 'text-davinci-003',
  GPT3TextDavinci002 = 'text-davinci-002',
  GPT3TextCurie001 = 'text-curie-001',
  GPT3TextBabbage001 = 'text-babbage-001',
  GPT3TextAda001 = 'text-ada-001',
  GPT3TextDavinci001 = 'text-davinci-001',
  GPT3DavinciInstructBeta = 'davinci-instruct-beta',
  GPT3Davinci = 'davinci',
  GPT3CurieInstructBeta = 'curie-instruct-beta',
  GPT3Curie = 'curie',
  GPT3Ada = 'ada',
  GPT3Babbage = 'babbage',
}

const model = new OpenAI({ temperature: 0 })
const chat = new ChatOpenAI({ temperature: 0, modelName: GPTModelName.GPT3Dot5Turbo }, { basePath: `${process.env.OPENAI_API_HOST}/v1` })

const splitter = new TokenTextSplitter({
  encodingName: 'cl100k_base',
  chunkSize: 3000,
  chunkOverlap: 30,
})

export async function summarizeWithQuestionsAsSimplifiedChinese(title: string, by: string, content: string) {
  const chunks = await splitter.createDocuments([content])
  let currentContent = content
  if (chunks.length > 1) {
    const summaryChain = loadSummarizationChain(model)
    const summaryContent = await summaryChain.call({
      input_documents: chunks.splice(0, 4),
    })
    currentContent = summaryContent.text
  }

  const resp = await chat.callPrompt(
    await summarizeWebsiteTemplate.formatPromptValue({ title, by, content: currentContent }),
  )
  return resp.text
}
