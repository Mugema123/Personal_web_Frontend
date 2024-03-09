import { useFetcher } from '../../api';
import { useSearchParams } from 'react-router-dom';
import Blogs from './elements/Blogs';
import Categories from './elements/Categories';
import FeatureBlog from './elements/FeatureBlog';
import { useEffect, useState } from 'react';
import DataChecker from '../global/DataChecker';
import Searchbar from '../global/Searchbar';

export const Blog = () => {
  const [searchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const [page, setPage] = useState(currentPage);

  const [currentCategory, setCurrentCategory] = useState();
  const {
    data: categoriesData,
    isError: categoriesError,
    isLoading: categoriesLoading,
  } = useFetcher('/posts/getAllCategories');

  const {
    data: blogsData,
    isError: blogsError,
    isLoading: blogsLoading,
  } = useFetcher(
    `/posts/getAllPosts?page=${page}&perPage=5` +
      (currentCategory ? `&category=${currentCategory}` : ``),
  );

  const categories = categoriesData?.allCategories || [];

  const [firstBlog, ...blogs] = blogsData?.allAvailablePosts || [];

  const pagination = blogsData?.paginationDetails || {};

  useEffect(() => {
    setPage(currentPage);
    window.scrollTo({
      behavior: 'smooth',
      top: 170,
    });
  }, [currentPage]);

  const currentCategoryData = categories.find(
    item => item.slug === currentCategory,
  );

  return (
    <div>
      {!blogsLoading && !firstBlog && !blogsError ? (
        <div className="flex flex-col justify-center h-screen w-full items-center py-12 text-center">
          <img src="/src/assets/images/noData1.png" alt="empty image" />
          <p className="text-cyan-600 text-xl">
            There are no blogs available yet!
          </p>
        </div>
      ) : (
        <div className="md:p-8 md:px-16 mt-20">
          {firstBlog ? <FeatureBlog blog={firstBlog} /> : null}
          <Searchbar
            currentLabel={currentCategoryData?.name || 'All'}
            selectItems={[
              { value: null, label: 'All' },
              ...categories.map(item => ({
                value: item.slug,
                label: item.name,
              })),
            ]}
            onSearch={value => setCurrentCategory(value)}
          />
          <h1 className="text-xl font-semibold my-4 mx-4 md:mx-0">
            Other posts
          </h1>
          <div className="flex flex-col md:flex-row items-start space-y-8 md:space-y-0 md:space-x-10">
            <DataChecker
              title={'Blogs'}
              isLoading={blogsLoading}
              isError={blogsError}
              isWhiteMode={true}
            >
              <Blogs
                setNewPage={page => {
                  setPage(page);
                }}
                pages={pagination.totalPages}
                page={page}
                blogs={
                  !currentCategory
                    ? blogs
                    : blogs.filter(
                        blog =>
                          blog.categoryDetails.slug ===
                          currentCategory,
                      )
                }
              />
            </DataChecker>
            <DataChecker
              title={'Categories'}
              isLoading={categoriesLoading}
              isError={categoriesError}
              isEmpty={!categories.length}
            >
              <Categories
                onClick={slug => setCurrentCategory(slug)}
                active={currentCategory}
                categoriesData={categories}
              />
            </DataChecker>
          </div>
        </div>
      )}
    </div>
  );
};
