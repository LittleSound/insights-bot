import type { Readability } from '@mozilla/readability'

export type WebArticle = NonNullable<ReturnType<Readability['parse']>>
