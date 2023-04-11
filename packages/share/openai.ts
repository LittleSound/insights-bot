import { ChatOpenAI } from 'langchain/chat_models'
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

const chat = new ChatOpenAI({ temperature: 0, modelName: GPTModelName.GPT3Dot5Turbo }, { basePath: `${process.env.OPENAI_API_HOST}/v1` })

export async function summarizeWithQuestionsAsSimplifiedChinese(title: string, by: string, content: string) {
  const resp = await chat.callPrompt(
    await summarizeWebsiteTemplate.formatPromptValue({ title, by, content }),
  )
  return resp.text
}
