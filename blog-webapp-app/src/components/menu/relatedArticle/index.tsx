
'use client';

import React from 'react';
import Image from 'next/image';
import styles from './styles.module.sass';
import { useRouter } from 'next/navigation';
import { formatDistanceToNow, parseISO } from 'date-fns';

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

interface RelatedArticlesProps {
  blogs: Blog[];
}


const RelatedArticles: React.FC<RelatedArticlesProps> = ({ blogs }) => {
  console.log(blogs)
  const router = useRouter();

  const handleJobClick = (slug: string) => {
    // Navigate to blog detail page using title
    window.location.href = `/posts/${slug}`;
  };

  return (
    <div className={styles.BG}>
      <div className={styles.Container}>
        <div className={styles.Title}>
          <h1>Related Articles</h1>
        </div>
        <div className={styles.Data}>
          {blogs.map((cat) => (
            <div
              key={cat.id}
              className={styles.ArticleBoxCard}
              onClick={() => handleJobClick(cat.slug)}
            >
              <div style={{ width: '100%', height: '13rem', position: 'relative' }}>
                <Image src={cat.imageUrl ? cat.imageUrl : '/path-to-default-image'} alt={cat.title} fill objectFit="cover" />
              </div>
              <div className={styles.BodyArticle}>
                <div className={styles.TagArticle}>
                  <p className={styles.TagArticleText}>{cat.category}</p>
                </div>
                <div className={styles.TextArticle}>
                  <h1 className={styles.TextArticleText}>{cat.title}</h1>
                </div>
                <div className={styles.DatenAuthorArticle}>
                  <p className={styles.AuthorArticle}>{cat.author}</p>
                  <p className={styles.DateArticle}> {formatDistanceToNow(parseISO(cat.publishedDate), { addSuffix: true })}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedArticles;