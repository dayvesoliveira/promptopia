'use client';

import { useState, useEffect, FC } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';

import { Post } from '@app/interfaces/post';

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };

    if (session?.user.id) {
      fetchPosts();
    }
  }, []);

  const handleEdit = (post: Post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post: Post) => {
    const hasConfirmed = confirm(
      'Are you sure you want to delete this prompt?',
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id?.toString()}`, {
          method: 'DELETE',
        });

        const filteredPosts = posts?.filter((p: Post) => p._id === post._id);

        setPosts(filteredPosts ?? []);
      } catch (error) {
        console.log(error);
      }
    }

    //router.push(`/delete-prompt?id=${post._id}`);
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your persoanlise Profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
