import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs } from '../../api';

const Searchbar = ({
  currentLabel = 'All',
  selectItems = [],
  onSearch = value => {},
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const componentRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClickOutside = event => {
    if (
      componentRef.current &&
      !componentRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  const handleChange = async e => {
    if (!isOpen) setIsOpen(true);
    if (!e.target.value) {
      setResults([]);
      setInputValue('');
    }
    setTimeout(() => {
      setInputValue(e.target.value);
    }, 2000);
  };
  const [results, setResults] = useState([]);
  useMemo(() => {
    if (inputValue) {
      async function search() {
        try {
          setLoading(true);
          setError('');
          const resultsData = await getBlogs({ keyword: inputValue });
          setResults(
            resultsData?.data?.allAvailablePosts?.map(post => ({
              slug: post.slug,
              title: post.title,
            })) || [],
          );
        } catch (error) {
          setError(
            'Something went wrong, please try again',
            error.message,
          );
          setResults([]);
        } finally {
          setLoading(false);
        }
      }
      search();
    }
  }, [inputValue]);

  const onSubmit = (event, value) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex">
        <label
          htmlFor="location-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Searchbar
        </label>
        <div className="relative w-full" ref={componentRef}>
          <input
            type="search"
            className="block px-3 p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 placeholder:text-sm dark:text-white dark:focus:border-blue-500"
            placeholder="Search for a blog"
            onChange={handleChange}
          />
          {isOpen && (
            <div className="bg-gray-600 absolute top-12 left-0 w-full z-20 h-52 shadow-lg rounded-sm overflow-auto">
              {results.length === 0 && (
                <div className="text-sm text-center h-52 rounded-lg flex justify-center items-center">
                  {!inputValue && (
                    <span>Type your search above..</span>
                  )}
                  {inputValue && !error && (
                    <span>
                      {loading ? 'Searching' : 'No results found'} for{' '}
                      <span className="font-semibold">
                        {inputValue}
                      </span>
                      ...
                    </span>
                  )}
                  {inputValue && error && <span>{error}</span>}
                </div>
              )}
              {results.map((item, index) => (
                <Link
                  to={'/blog/' + item.slug}
                  target="_blank"
                  key={index}
                >
                  <div className="w-full border-b px-4 py-2 text-sm hover:bg-slate-300 hover:text-white">
                    {item.title}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default Searchbar;
