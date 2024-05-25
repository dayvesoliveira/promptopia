import { FC } from 'react';
import PrompCard from './PrompCard';

import { Post } from '@app/interfaces/post';

interface PromptCardListProps {
  data: Post[];
  handleTagClick: (value: string) => void;
}

const PromptCardList: FC<PromptCardListProps> = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map(post => (
        <PrompCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

export default PromptCardList;
