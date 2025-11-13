import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export class AIService {
  /**
   * Generate a chat completion using OpenAI
   */
  static async generateChatResponse(
    messages: ChatMessage[],
    model: string = 'gpt-3.5-turbo'
  ): Promise<string> {
    try {
      const completion = await openai.chat.completions.create({
        model,
        messages,
        temperature: 0.7,
        max_tokens: 500,
      });

      return completion.choices[0]?.message?.content || 'No response generated';
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw new Error('Failed to generate AI response');
    }
  }

  /**
   * Generate a support ticket response suggestion
   */
  static async generateTicketResponse(
    ticketDescription: string,
    conversationHistory: string[] = []
  ): Promise<string> {
    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: `You are a helpful customer support assistant. Generate a professional and empathetic response to the customer's issue.`,
      },
      ...conversationHistory.map((msg, idx) => ({
        role: (idx % 2 === 0 ? 'user' : 'assistant') as 'user' | 'assistant',
        content: msg,
      })),
      {
        role: 'user',
        content: ticketDescription,
      },
    ];

    return this.generateChatResponse(messages);
  }

  /**
   * Generate email campaign content
   */
  static async generateEmailContent(
    topic: string,
    tone: 'professional' | 'casual' | 'friendly' = 'professional'
  ): Promise<{ subject: string; body: string }> {
    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: `You are a marketing copywriter. Generate engaging email content with a ${tone} tone.`,
      },
      {
        role: 'user',
        content: `Create an email campaign about: ${topic}. Return JSON with 'subject' and 'body' fields.`,
      },
    ];

    try {
      const response = await this.generateChatResponse(messages, 'gpt-4');
      const parsed = JSON.parse(response);
      return {
        subject: parsed.subject || 'Untitled Campaign',
        body: parsed.body || '',
      };
    } catch (error) {
      return {
        subject: `Campaign: ${topic}`,
        body: 'Email content could not be generated. Please write your content manually.',
      };
    }
  }

  /**
   * Analyze customer sentiment
   */
  static async analyzeSentiment(text: string): Promise<'positive' | 'neutral' | 'negative'> {
    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: 'Analyze the sentiment of the following text. Respond with only one word: positive, neutral, or negative.',
      },
      {
        role: 'user',
        content: text,
      },
    ];

    try {
      const response = await this.generateChatResponse(messages);
      const sentiment = response.toLowerCase().trim();
      if (sentiment.includes('positive')) return 'positive';
      if (sentiment.includes('negative')) return 'negative';
      return 'neutral';
    } catch (error) {
      return 'neutral';
    }
  }
}
