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
      console.error('Analysis error:', error);
      if (error.status === 429 || String(error.message || '').toLowerCase().includes('quota')) {
        ctx.status = 429;
        ctx.body = { error: 'Gemini API Quota exceeded. Please try again later.' };
        return;
      }
      ctx.status = 500;
      ctx.body = { error: error.message || 'Analysis failed' };
    }
  });

  return router;
}
