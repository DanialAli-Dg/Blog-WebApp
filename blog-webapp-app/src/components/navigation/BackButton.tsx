// src/components/BackButton.tsx
'use client';

import React from 'react';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import styles from './styles.module.sass';

const BackButton: React.FC = () => {
  const router = useRouter();

  return (
    <Button
      type="primary"
      icon={<ArrowLeftOutlined />}
      onClick={() => router.back()}
      className={styles.backButton}
    >
      Back
    </Button>
  );
};

export default BackButton;
    