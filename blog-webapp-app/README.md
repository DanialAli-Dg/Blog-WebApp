
# Blog Web App

This project is a full-stack blog application built with Next.js for the frontend, Apollo Client and GraphQL for the backend, and Firebase for image storage.

## Getting Started

### Setting Up Locally

To set up and run the project on your local machine, follow these steps:

1. **Clone the project:**
   ```bash
   git clone https://github.com/your-repo/blog-webapp.git
   cd blog-webapp
   ```

2. **Install Frontend Dependencies:**
   Open a terminal and run the following command to install the required frontend dependencies:
   ```bash
   npm i
   ```

3. **Install Backend Dependencies:**
   Open another terminal, navigate to the `server` folder, and install the required backend dependencies:
   ```bash
   cd server
   npm i
   ```

4. **Run the Frontend:**
   After the dependencies are installed, start the Next.js frontend server:
   ```bash
   npm run dev
   ```

5. **Run the Backend:**
   In the terminal for the backend, start the GraphQL server:
   ```bash
   node index.mjs
   ```

6. **Access the Application:**
   - The frontend will be available at: `http://localhost:3000`
   - The GraphQL server will be running at: `http://localhost:4000/graphql`

## Stack

- **Frontend**: Next.js
- **Backend**: GraphQL with Apollo Client
- **Storage**: Firebase for image uploads (using Firebase Storage, which is similar to S3)

## Features

- **HTML Content in Posts**: While creating a post, you can include content with basic HTML tags like `<p>`, `<h1>`, and `<ol>`. The post renderer is designed to support rendering HTML, allowing for headings, sub-headings, lists, underlines, and more, enabling rich formatting for your blog posts.

- **Search Functionality**: Easily search for posts by title or author. This feature helps users quickly find relevant posts without browsing through all content.

- **Categories and Tags**: Posts can be categorized using tags. This allows users to view groups of posts that share the same tag, making it easier to explore related content.

## Additional Information

This project uses Firebase for image storage. To store images, the application integrates with Firebase Storage, which allows efficient and scalable handling of media files.


