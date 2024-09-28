'use client';

import React, { useState, useEffect, ChangeEvent } from "react";
import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Image from "next/image";
import IntegrationSearchInputField from "../../inputs/searchField/index";
import cn from "classnames";
import styles from "./styles.module.sass";
import { formatDistanceToNow, parseISO } from 'date-fns';

interface Blog {
  id: number;
  name: string,
  title: string;
  content: string;
  category: string;
  author: string;
  publishedDate: string;
  imageUrl: string;
  slug: string;
}

interface ArticleMenuProps {
  data: Blog[];
  handlePrevious: () => void;
  handleNext: () => void;
  hasMorePosts: boolean;
  page: number;
}

const ArticleMenu: React.FC<ArticleMenuProps> = ({ data, handlePrevious, handleNext, hasMorePosts, page }) => {
  const [allPlatforms, setAllPlatforms] = useState<Blog[]>(data);
  const [displayedPlatforms, setDisplayedPlatforms] = useState<Blog[]>(data);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Update state when data prop changes
  useEffect(() => {
    console.log('ArticleMenu: data prop changed:', data);
    setAllPlatforms(data);
    setDisplayedPlatforms(data);
  }, [data]);

  const handleJobClick = (slug: string) => {
    // Navigate to blog detail page using slug
    window.location.href = `/posts/${slug}`;
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filteredPlatforms = allPlatforms.filter(
      (p) =>
        p.title.toLowerCase().includes(value) ||
        p.author.toLowerCase().includes(value) ||
        p.publishedDate.toLowerCase().includes(value)
    );
    setDisplayedPlatforms(filteredPlatforms);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setSearchTerm(""); // Reset search term on category change

    const filteredPlatforms =
      category === "All"
        ? allPlatforms
        : allPlatforms.filter((p) => p.category === category);

    setDisplayedPlatforms(filteredPlatforms);
  };

  return (
    <>
      <div className={styles.BG}>
        <div>
          <div className={styles.Container}>
            <div className={styles.Menu}>
              <div className={styles.Search}>
                <div className={styles.SearchTitle}>
                  Search{" "}
                  <span className={styles.SearchIcon}>
                    <SearchOutlined />
                  </span>
                </div>
                <div className={styles.SearchBox}>
                  <IntegrationSearchInputField
                    placeHolder="Input search text"
                    size="large"
                    onInputChange={handleSearchChange}
                  />
                </div>
              </div>

              <div className={styles.CreatePost}>
                <Button
                  type="primary"
                  size="large"
                  onClick={() => window.location.href = '/create-post'}
                >
                  Create Post
                </Button>
              </div>

              <div className={styles.Categories}>
                <div className={styles.CategoriesTitle}>Categories</div>
                {[
                  "All",
                  ...Array.from(
                    new Set(allPlatforms?.map((item) => item.category))
                  ),
                ]?.map((category) => (
                  <div
                    key={category}
                    className={cn(styles.Button, {
                      [styles.Selected]: selectedCategory === category,
                    })}
                  >
                    <Button
                      type="primary"
                      size="middle"
                      title={category}
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.Data}>
              <div className={styles.CatBoxData}>
                {displayedPlatforms?.map((cat) => (
                  <div
                    key={cat.id}
                    className={styles.ArticleBoxCard}
                    onClick={() => handleJobClick(cat.slug)}
                  >
                    <Image
                      src={cat.imageUrl ? cat.imageUrl : '/default-image'}
                      alt={'image'}
                      height={208}
                      width={293}
                    />
                    <div className={styles.BodyArticle}>
                      <div className={styles.TagArticle}>
                        <p className={styles.TagArticleText}>
                          {cat.category}
                        </p>
                      </div>
                      <div className={styles.TextArticle}>
                        <h1 className={styles.TextArticleText}>
                          {cat.title}
                        </h1>
                      </div>
                      <div className={styles.DatenAuthorArticle}>
                        <p className={styles.AuthorArticle}>{cat.author}</p>
                        <p className={styles.DateArticle}>
                          {formatDistanceToNow(parseISO(cat.publishedDate), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', width: '100%' }}>
                <Button
                  onClick={handlePrevious}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!hasMorePosts}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleMenu;
