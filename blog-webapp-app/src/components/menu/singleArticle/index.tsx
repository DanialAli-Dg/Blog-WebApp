'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import cn from 'classnames';
import styles from './styles.module.sass';

interface TocItem {
  id: string;
  title: string;
}

interface Data {
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

interface ArticleMenuSingleProps {
  data: Data;
}

const ArticleMenuSingle: React.FC<ArticleMenuSingleProps> = ({ data }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [toc, setToc] = useState<TocItem[]>([]);
  const [modifiedBody, setModifiedBody] = useState<string>(data.body);

  // Function to parse the body and extract h1 tags for TOC
  useEffect(() => {
    console.log(data.imageUrl)
    const parser = new DOMParser();
    const doc = parser.parseFromString(data.body, 'text/html');
    const headings = doc.querySelectorAll('h1');
    const tocItems: TocItem[] = [];

    headings.forEach((heading, index) => {
      const id = heading.id || `heading-${index}`;
      heading.id = id; // Ensure the heading has an ID for scrolling
      tocItems.push({ id, title: heading.textContent || `Heading ${index + 1}` });
    });

    setToc(tocItems);

    // Serialize the updated document back to a string
    setModifiedBody(doc.body.innerHTML); // Convert the DOM back to a string with updated ids
  }, [data.body]);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    const element = document?.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - 100;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={styles.BG}>
      <div className={styles.Container}>
        <div className={cn(styles.Left)}>
          <div className={styles.Heading}>Outline</div>
          <div
            key="-1"
            className={cn(selectedId === '-1' ? styles.SelectedContent : styles.content)}
            onClick={() => handleSelect('-1')}
          >
            <p>{data.title}</p>
          </div>
          {toc.map((item) => (
            <div
              key={item.id}
              className={cn(selectedId === item.id ? styles.SelectedContent : styles.content)}
              onClick={() => handleSelect(item.id)}
            >
              <p>{item.title}</p>
            </div>
          ))}
        </div>
        <div className={styles.Right}>
          {data.imageUrl && (
            <div className={styles.TitleImage}>
              <Image src={data.imageUrl} alt={data.title} width={800} height={600} />
            </div>
          )}
          {data.title && (
            <div id="-1" className={styles.TitleData}>
              <div className={styles.TitleHeading}>
                <h1>{data.title}</h1>
              </div>
              <div className={styles.TitleAuthorNDate}>
                <div className={styles.Author}>
                  <p>{data.author}</p>
                </div>
                <div className={styles.Date}>
                  <p>{data.date}</p>
                </div>
              </div>
            </div>
          )}
          <div
            className={styles.blogContent}
            dangerouslySetInnerHTML={{ __html: modifiedBody }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ArticleMenuSingle;
