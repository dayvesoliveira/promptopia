import Prompt from '@app/api/models/prompt';
import { connectToDB } from '@utils/database';

import type { NextApiRequest, NextApiResponse } from 'next';

// GET (read)
export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectToDB();

    const promptId = req?.query.id;

    const prompt = await Prompt.findById(promptId).populate('creator');

    if (!prompt) {
      return new Response('Prompt not found!', { status: 404 });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to fetch all prompts', { status: 500 });
  }
};

// PATCH

export const PATCH = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectToDB();

    const promptId = req?.query.id;

    const entityPrompt = await Prompt.findById(promptId).populate('creator');
    if (!entityPrompt) {
      return new Response('Prompt not found!', { status: 404 });
    }

    const payload = req?.body;
    entityPrompt.prompt = payload.prompt;
    entityPrompt.tag = payload.tag;

    await entityPrompt.save();

    return new Response(JSON.stringify(entityPrompt), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to fetch all prompts', { status: 500 });
  }
};

// DELETE

export const DELETE = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectToDB();

    const promptId = req?.query.id;

    await Prompt.findByIdAndDelete(promptId);

    return new Response('Prompt deleted!', { status: 204 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to fetch all prompts', { status: 500 });
  }
};
