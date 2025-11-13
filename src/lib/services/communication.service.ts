import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export class CommunicationService {
  /**
   * Send SMS message
   */
  static async sendSMS(to: string, message: string): Promise<any> {
    try {
      const result = await client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to,
      });
      return result;
    } catch (error) {
      console.error('SMS sending error:', error);
      throw new Error('Failed to send SMS');
    }
  }

  /**
   * Make a phone call
   */
  static async makeCall(
    to: string,
    twimlUrl: string
  ): Promise<any> {
    try {
      const call = await client.calls.create({
        url: twimlUrl,
        to,
        from: process.env.TWILIO_PHONE_NUMBER,
      });
      return call;
    } catch (error) {
      console.error('Call initiation error:', error);
      throw new Error('Failed to initiate call');
    }
  }

  /**
   * Send bulk SMS messages
   */
  static async sendBulkSMS(
    recipients: string[],
    message: string
  ): Promise<{ success: number; failed: number; results: any[] }> {
    const results = await Promise.allSettled(
      recipients.map(to => this.sendSMS(to, message))
    );

    return {
      success: results.filter(r => r.status === 'fulfilled').length,
      failed: results.filter(r => r.status === 'rejected').length,
      results: results.map((r, idx) => ({
        to: recipients[idx],
        status: r.status,
        result: r.status === 'fulfilled' ? r.value : r.reason,
      })),
    };
  }

  /**
   * Get call recording
   */
  static async getCallRecording(callSid: string): Promise<string | null> {
    try {
      const recordings = await client.recordings.list({ callSid, limit: 1 });
      if (recordings.length > 0) {
        return `https://api.twilio.com${recordings[0].uri.replace('.json', '.mp3')}`;
      }
      return null;
    } catch (error) {
      console.error('Error fetching recording:', error);
      return null;
    }
  }

  /**
   * Get call details
   */
  static async getCallDetails(callSid: string): Promise<any> {
    try {
      return await client.calls(callSid).fetch();
    } catch (error) {
      console.error('Error fetching call details:', error);
      throw new Error('Failed to fetch call details');
    }
  }
}
