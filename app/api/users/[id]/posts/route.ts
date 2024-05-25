import Prompt from '@app/api/models/prompt';
import { connectToDB } from '@utils/database';

import type { NextApiRequest, NextApiResponse } from 'next';

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectToDB();

    const creator = req?.query.id;

    const prompts = await Prompt.find({
      creator,
    }).populate('creator');

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to fetch prompts created by user', {
      status: 500,
    });
  }
};
