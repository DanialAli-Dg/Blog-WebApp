'use client'


import React from "react";
import { App, Spin, Button } from "antd";
import ArticleMenu from "../../components/menu/article/index";
import { gql, useQuery } from '@apollo/client';
import styles from './styles.module.sass'

// Fetch total number of posts
const GET_POSTS_COUNT = gql`
  query GetPostsCount {
    totalPosts: postsCount
  }
`;

// Fetch posts based on page and limit
const GET_POSTS = gql`
  query GetPosts($page: Int!, $limit: Int!) {
    posts(page: $page, limit: $limit) {
      id
      title
      body
      author
      publishedDate
      category
      slug
      imageUrl
    }
  }
`;

interface Blog {
  id: number;
  name: string;
  title: string;
  content: string;
  category: string;
  author: string;
  publishedDate: string;
  imageUrl: string;
  slug: string;
}

export default function Page() {
  const [page, setPage] = React.useState(1);
  const limit = 6;

  const { data: totalCountData } = useQuery(GET_POSTS_COUNT);
  const totalCount = totalCountData?.totalPosts || 0;

  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: { page, limit },
    fetchPolicy: 'cache-and-network',
  });

  if (loading && !data)
    return (
      <div className={styles.spinnerContainer}>
        <Spin size="large" style={{ color: '#91D0AD' }} />
      </div>
    );

  if (error) return <p>Error loading posts.</p>;

  const blogs: Blog[] = data?.posts || [];
  const hasMorePosts = page * limit < totalCount;

  console.log('Page: blogs data:', blogs);

  const handleNext = () => {
    if (hasMorePosts) {
      setPage((prevPage) => {
        const newPage = prevPage + 1;
        return newPage;
      });
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage((prevPage) => {
        const newPage = prevPage - 1;
        return newPage;
      });
    }
  };

  return (
    <App>
      <ArticleMenu
        data={blogs}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        hasMorePosts={hasMorePosts}
        page={page}
      />
    </App>
  );
}
