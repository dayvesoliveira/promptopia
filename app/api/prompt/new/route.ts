import Prompt from '@app/api/models/prompt';
import { connectToDB } from '@utils/database';

export const POST = async (req: Request, res: Response) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDB();

    const newPrompt = new Prompt({
      creator: userId,
      tag,
      prompt,
    });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 204 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to create a new prompt', { status: 500 });
  }
};
