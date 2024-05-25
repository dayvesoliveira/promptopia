'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Post } from '@app/interfaces/post';
import { FormsEvent } from '@utils/events';

import Form from '@components/Form';

const initialPost = {
  prompt: '',
  tag: '',
};

function CreatePrompt() {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState<Post>(initialPost);

  const createPrompt = async (event: FormsEvent) => {
    event.preventDefault();

    setSubmitting(true);

    try {
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: session?.user?.id,
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
      handleSubmit={createPrompt}
      submitting={submitting}
      post={post}
      type="Create"
      setPost={setPost}
    />
  );
}

export default CreatePrompt;
