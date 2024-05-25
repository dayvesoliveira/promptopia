'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Post } from '@app/interfaces/post';
import { FormsEvent } from '@utils/events';

import Form from '@components/Form';
import { features } from 'process';

const initialPost = {
  prompt: '',
  tag: '',
};

function UpdatePrompt() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState<Post>(initialPost);

  const promptId = searchParams.get('id');

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      if (data) {
        const { prompt, tag } = data;

        setPost({
          prompt,
          tag,
        });
      }
    };

    getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (event: FormsEvent) => {
    event.preventDefault();

    if (!promptId) alert('Prompt ID not found');

    setSubmitting(true);

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) router.push('/');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      handleSubmit={updatePrompt}
      submitting={submitting}
      post={post}
      type="Update"
      setPost={setPost}
    />
  );
}

export default UpdatePrompt;
