import { Post } from '@app/interfaces/post';
import { FC } from 'react';
import PrompCard from './PrompCard';

type ProfileProps = {
  name: string;
  desc: string;
  data: any[];
  handleEdit?: (post: Post) => void;
  handleDelete?: (post: Post) => void;
};

const Profile: FC<ProfileProps> = ({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
}) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>

      <p className="desc text-fel">{desc}</p>

      <div className="mt-10 prompt_layout">
        {data?.map(post => (
          <PrompCard
            key={post.id}
            post={post}
            handleEdit={() => handleEdit?.(post)}
            handleDelete={() => handleDelete?.(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
