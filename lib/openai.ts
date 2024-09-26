// const OpenAI = require('openai')

import OpenAI from 'openai'

export class OpenAIAssistant {
    openai: OpenAI

    assistantId: string
    threadId: string | undefined

    constructor(secretKey: string, assistantId: string, threadId?: string) {
        this.openai = new OpenAI({
            apiKey: secretKey
        })
        this.assistantId = assistantId
        this.threadId = threadId
    }

    async createThread() {
        const thread = await this.openai.beta.threads.create()
        this.threadId = thread.id
    }

    async createMessage(question: string) {
        if (!this.threadId) throw new Error('Please specify a thread')
        await this.openai.beta.threads.messages.create(this.threadId, {
            role: 'user',
            content: question
        })
        return this.createRun();
    }

    async createRun() {
        if (!this.threadId) throw new Error('Please specify a thread')
        const run = await this.openai.beta.threads.runs.create(this.threadId, {
            assistant_id: this.assistantId
        })
        let runStatus = await this.openai.beta.threads.runs.retrieve(
            this.threadId,
            run.id
        )

        // Polling mechanism to see if runStatus is completed
        // This should be made more robust.
        while (runStatus.status !== 'completed') {
            await new Promise(resolve => setTimeout(resolve, 2000))
            runStatus = await this.openai.beta.threads.runs.retrieve(
                this.threadId,
                run.id
            )
        }
        // Get the last assistant message from the messages array
        const messages = await this.openai.beta.threads.messages.list(
            this.threadId
        )

        // Find the last message for the current run
        const lastMessageForRun = messages.data
            .filter(
                message => message.run_id === run.id && message.role === 'assistant'
            )
            .pop()

        return lastMessageForRun
    }
}
