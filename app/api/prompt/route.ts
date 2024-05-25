import Prompt from '@app/api/models/prompt';
import { connectToDB } from '@utils/database';

export const GET = async (req: Request, res: Response) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({}).populate('creator');

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to fetch all prompts', { status: 500 });
  }
};
