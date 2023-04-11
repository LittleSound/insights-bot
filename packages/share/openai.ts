import { ChatOpenAI } from 'langchain/chat_models'
import { TokenTextSplitter } from 'langchain/text_splitter'
import { OpenAI } from 'langchain/llms'
import { CallbackManager } from 'langchain/callbacks'
import type { LLMResult } from 'langchain/schema'
import { loadSummarizationChain } from 'langchain/chains'
import { loadSummarizationTemplate, summarizeWebsiteTemplate } from './promptTemplates/summarizeWebsite'

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

// debug
// TODO: use env
const verbose = false

const callbackManager = verbose
  ? CallbackManager.fromHandlers({
    handleLLMStart: async (llm: { name: string }, prompts: string[]) => {
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(llm, null, 2))
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(prompts, null, 2))
    },
    handleLLMEnd: async (output: LLMResult) => {
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(output, null, 2))
    },
    handleLLMError: async (err: Error) => {
      console.error(err)
      console.error('type:', typeof (err as any)?.response, (err as any)?.response?.data)
    },
  })
  : undefined

const model = new OpenAI({
  temperature: 0,
  modelName: GPTModelName.GPT3Dot5Turbo,
  verbose,
  callbackManager,
  maxTokens: 600,
})
const chat = new ChatOpenAI({ temperature: 0, modelName: GPTModelName.GPT3Dot5Turbo, verbose, callbackManager }, { basePath: `${process.env.OPENAI_API_HOST}/v1` })

const splitter = new TokenTextSplitter({
  encodingName: 'cl100k_base',
  chunkSize: 3000,
  chunkOverlap: 30,
})

export async function summarizeWithQuestionsAsSimplifiedChinese(title: string, by: string, content: string) {
  const chunks = await splitter.createDocuments([content])
  let currentContent = content
  if (chunks.length > 1) {
    const summaryChain = loadSummarizationChain(model,
      {
        prompt: loadSummarizationTemplate,
        combinePrompt: loadSummarizationTemplate,
        combineMapPrompt: loadSummarizationTemplate,
      },
    )
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
