'use client';

import React, { useState } from 'react';
import { App, Spin } from 'antd';
import { useRouter, useParams } from 'next/navigation';
import { gql, useQuery } from '@apollo/client';

import BackButton from '@/components/navigation/BackButton';
import ArticleMenuSingle from '@/components/menu/singleArticle';
import RelatedArticles from '@/components/menu/relatedArticle';
import styles from './styles.module.sass';

interface TocItem {
  id: string;
  title: string;
}

interface PostData {
  category: string;
  author: string;
  tags: string[];
  _id: number;
  title: string;
  body: string;
  slug: string;
  imageUrl: string;
  toc: TocItem[];
  created_by: number;
  date: string;
}

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

const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: String!) {
    postBySlug(slug: $slug) {
      id
      title
      body
      author
      publishedDate
      category
      imageUrl
    }
  }
`;

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

const Page: React.FC = () => {
  const router = useRouter();
  const { slug } = useParams();

  // State for pagination
  const [page, setPage] = useState(1);

  // Fetch single post by slug
  const {
    loading: postLoading,
    error: postError,
    data: postData,
  } = useQuery(GET_POST_BY_SLUG, {
    variables: { slug },
  });

  // Fetch related posts
  const {
    loading: postsLoading,
    error: postsError,
    data: postsData,
  } = useQuery(GET_POSTS, {
    variables: { page, limit: 5 },
    fetchPolicy: 'cache-and-network',
  });

  // Handle loading states
  if (postLoading || postsLoading) {
    return (
      <div className={styles.spinnerContainer}>
        <Spin size="large" style={{ color: '#91D0AD' }} />
      </div>
    );
  }

  // Handle errors
  if (postError || postsError) {
    return <p>Error loading content.</p>;
  }

  const post: PostData | null = postData?.postBySlug || null;
  const blogs: Blog[] = postsData?.posts || [];

  // Handle case where post is not found
  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <App>
      <BackButton />
      <ArticleMenuSingle data={post} />
      <RelatedArticles blogs={blogs} />
    </App>
  );
};



export default Page;
