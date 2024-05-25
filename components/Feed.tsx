'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import PromptCardList from './PromptCardList';

import { Post } from '@app/interfaces/post';

const Feed = () => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);

  const [searchText, setSearchText] = useState<string>('');
  const [searchTimeout, setSearchTimeout] = useState<number | undefined>();
  const [searchedResults, setSearchedResults] = useState<Post[]>([]);

  const fetchPosts = async () => {
    const response = await fetch('/api/posts');
    const data = await response.json();
    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchtext: string): Post[] => {
    const regex = new RegExp(searchtext, 'i'); // 'i' flag for case-insensitive search
    return allPosts.filter(
      item =>
        regex.test(item?.creator?.username) ||
        regex.test(item?.tag) ||
        regex.test(item?.prompt),
    );
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    clearTimeout(searchTimeout);

    setSearchText(event.currentTarget.value);

    const timeout = setTimeout(() => {
      const searchResult = filterPrompts(event.currentTarget.value);
      setSearchedResults(searchResult);
    }, 500);

    // debounce method
    setSearchTimeout(+timeout);
  };

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
