'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Input, Button, Upload, message, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { gql, useMutation } from '@apollo/client';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase/firebaseConfig';
import BackButton from '@/components/navigation/BackButton';
import styles from './styles.module.sass';

// GraphQL mutation for creating a post
const CREATE_POST_MUTATION = gql`
  mutation CreatePost($title: String!, $body: String!, $author: String!, $imageUrl: String!, $category: String!) {
    createPost(title: $title, body: $body, author: $author, imageUrl: $imageUrl, category: $category) {
      id
      title
      body
      author
      publishedDate
      imageUrl
      category
    }
  }
`;

export default function CreatePostPage() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [createPost] = useMutation(CREATE_POST_MUTATION);
  const [file, setFile] = useState<File | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (info: any) => {
    const selectedFile = info.file.originFileObj || info.file;
    setFile(selectedFile || null);
    setFileList(selectedFile ? [info.file] : []);
  };

  const uploadImage = async () => {
    if (!file) throw new Error('No file selected');
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const imageUrl = await uploadImage();
      await createPost({
        variables: {
          ...values,
          imageUrl,
        },
      });
      message.success('Post created successfully!');
      router.push('/');
    } catch (error) {
      console.error(error);
      message.error('Failed to create post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <BackButton />
      <div className={styles.container}>
        <h1 className={styles.title}>Create New Post</h1>

        <Spin spinning={loading} tip="Creating post...">
          <Form form={form} layout="vertical" onFinish={onFinish} className={styles.form}>
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: 'Please input the title' }]}
            >
              <Input placeholder="Enter the title" />
            </Form.Item>

            <Form.Item
              name="body"
              label="Content"
              rules={[{ required: true, message: 'Please input the content' }]}
            >
              <Input.TextArea rows={6} placeholder="Enter the content" />
            </Form.Item>

            <Form.Item
              name="author"
              label="Author"
              rules={[{ required: true, message: 'Please input the author name' }]}
            >
              <Input placeholder="Enter the author name" />
            </Form.Item>

            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: 'Please input the category' }]}
            >
              <Input placeholder="Enter the category" />
            </Form.Item>

            <Form.Item
              name="image"
              label="Upload Image"
              valuePropName="fileList"
              getValueFromEvent={(e) => e && e.fileList}
            >
              <Upload
                fileList={fileList}
                beforeUpload={() => false}
                onChange={handleFileChange}
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Select File</Button>
              </Upload>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" disabled={loading}>
                Create Post
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </div>
    </div>
  );
}
