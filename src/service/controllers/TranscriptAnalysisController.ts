import Router from '@koa/router';

export interface AnalyzeTranscriptCommand {
  execute: (req: { transcript: string; questions: string[] }) => Promise<{ answeredQuestions: string[] }>;
}

export function createTranscriptAnalysisController(command: AnalyzeTranscriptCommand) {
  const router = new Router();

  router.post('/api/analyze-transcript', async (ctx) => {
    const { transcript, questions } = ctx.request.body as any;

    if (!transcript || !questions) {
      ctx.status = 400;
      ctx.body = { error: 'Transcript and questions are required' };
      return;
    }

    try {
      const responseDto = await command.execute({ transcript, questions });
      ctx.body = responseDto;
    } catch (error: any) {
      console.error('Analysis error details:', {
        message: error.message,
        status: error.status,
        response: error.response?.data || error.response,
        stack: error.stack,
      });

      if (error.status === 429) {
        ctx.status = 429;
        ctx.body = {
          error: 'Rate limit exceeded',
          details: 'You hit the 20 requests per day limit for gemini-2.5-flash on the free tier. Try again later.',
          originalError: error.message,
        };
        return;
      }

      ctx.status = 500;
      ctx.body = {
        error: 'Analysis failed',
        details: error.message,
      };
    }
  });

  return router;
}
