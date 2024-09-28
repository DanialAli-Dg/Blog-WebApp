import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

// Utility function to generate slug
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')  // Replace non-alphanumeric characters with dashes
    .replace(/(^-|-$)/g, '');      // Remove leading/trailing dashes
};

// Ensure slug uniqueness by appending a number if necessary
const generateUniqueSlug = (slug, posts) => {
  let uniqueSlug = slug;
  let counter = 1;
  while (posts.some((post) => post.slug === uniqueSlug)) {
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }
  return uniqueSlug;
};

// Get the directory name equivalent to __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express app
const app = express();

// Enable CORS for requests from http://localhost:3000
app.use(cors({ origin: 'http://localhost:3000' }));



// Mock database (updated to include imageUrl, category, and slug)
let posts = [
  {
    id: '7',
    title: 'Understanding JavaScript Closures',
    body: `
      <h1>Introduction to Closures</h1>
      <p>Closures are a powerful feature in JavaScript that allow a function to remember its lexical scope even when the function is executed outside that scope.</p>
      <h2>How Closures Work</h2>
      <ol>
        <li>A closure is created every time a function is created.</li>
        <li>It gives access to variables from an outer function, even after the outer function has returned.</li>
        <li>This makes closures very useful in scenarios like event handlers and callbacks.</li>
      </ol>`,
    author: 'Alice Johnson',
    publishedDate: new Date().toISOString(),
    category: 'JavaScript',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/blogapp-18b25.appspot.com/o/images%2FJavaScriptClosures.png?alt=media&token=1493fb1a-c691-40e4-a38a-40e8e3308f47',
    slug: 'understanding-javascript-closures'
  },
  {
    id: '6',
    title: 'Introduction to React Hooks',
    body: `
      <h1>React Hooks</h1>
      <p>React Hooks let you use state and other React features without writing a class.</p>
      <h2>Commonly Used Hooks</h2>
      <ul>
        <li><b>useState</b>: Allows you to add state to functional components.</li>
        <li><b>useEffect</b>: Runs side effects in function components.</li>
        <li><b>useContext</b>: Provides a way to pass data through the component tree without having to pass props down manually at every level.</li>
      </ul>`,
    author: 'Bob Martin',
    publishedDate: new Date().toISOString(),
    category: 'React',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/blogapp-18b25.appspot.com/o/images%2FreactHooks.png?alt=media&token=812eea73-8e9d-4716-b2f4-89378ab144b1',
    slug: 'introduction-to-react-hooks'
  },
  {
    id: '5',
    title: 'CSS Grid vs Flexbox',
    body: `
      <h1>CSS Grid and Flexbox Comparison</h1>
      <p>Both CSS Grid and Flexbox are powerful layout tools. However, they are used in different scenarios.</p>
      <h2>When to Use Flexbox</h2>
      <p>Flexbox is best for laying out items in a single dimension (row or column).</p>
      <h2>When to Use CSS Grid</h2>
      <p>CSS Grid excels in two-dimensional layouts, allowing for control over both rows and columns.</p>`,
    author: 'Carol Lee',
    publishedDate: new Date().toISOString(),
    category: 'CSS',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/blogapp-18b25.appspot.com/o/images%2FCSSGridvsFlexbox.png?alt=media&token=d548a352-23e3-48af-ba32-c5b163a18441',
    slug: 'css-grid-vs-flexbox'
  },
  {
    id: '4',
    title: 'Building a REST API with Node.js',
    body: `
      <h1>Node.js and REST APIs</h1>
      <p>Node.js makes it easy to build scalable network applications. One common use case is creating REST APIs.</p>
      <h2>Steps to Build a REST API</h2>
      <ol>
        <li>Set up a new Node.js project.</li>
        <li>Install Express.js to handle routes.</li>
        <li>Create route handlers for different HTTP methods.</li>
      </ol>
      <p>With these steps, you can quickly set up a REST API that interacts with a database.</p>`,
    author: 'David Kim',
    publishedDate: new Date().toISOString(),
    category: 'Node.js',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/blogapp-18b25.appspot.com/o/images%2FRestFulApisNodeJS.jpeg?alt=media&token=0f6e14df-7dd3-4e3b-bc81-4081d1ece170',
    slug: 'building-rest-api-with-nodejs'
  },
  {
    id: '3',
    title: 'Responsive Web Design with CSS Media Queries',
    body: `
      <h1>Media Queries in CSS</h1>
      <p>Media queries are a key part of making websites responsive. They allow you to apply different styles depending on the screen size.</p>
      <h2>Basic Example</h2>
      <pre><code>@media (max-width: 600px) {
        .container {
          flex-direction: column;
        }
      }</code></pre>
      <p>This media query changes the layout to a column direction when the screen width is less than 600px.</p>`,
    author: 'Eve Turner',
    publishedDate: new Date().toISOString(),
    category: 'CSS',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/blogapp-18b25.appspot.com/o/images%2FMediaQueries.jpeg?alt=media&token=5c685c79-234d-4ba1-83e3-56d8516e00ff',
    slug: 'responsive-web-design-with-css-media-queries'
  },
  {
    id: '2',
    title: 'What’s New in ES2023',
    body: `
      <h1>ES2023 Features</h1>
      <p>JavaScript continues to evolve, and the latest edition, ES2023, introduces new features that enhance the developer experience.</p>
      <h2>Key Features</h2>
      <ul>
        <li>New built-in methods for handling strings and arrays.</li>
        <li>Performance improvements for large datasets.</li>
        <li>Better support for asynchronous operations.</li>
      </ul>`,
    author: 'John Smith',
    publishedDate: new Date().toISOString(),
    category: 'JavaScript',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/blogapp-18b25.appspot.com/o/images%2FES2023.jpeg?alt=media&token=83bc6d20-b5f8-40ed-be69-7721a083c28e',
    slug: 'whats-new-in-es2023'
  },
  {
    id: '1',
    title: 'How to Use Firebase Storage for File Uploads',
    body: `
      <h1>Firebase Storage for File Uploads</h1>
      <p>Firebase Storage is a cloud storage solution that allows you to upload and serve files directly from Firebase.</p>
      <h2>Basic Steps</h2>
      <ol>
        <li>Initialize Firebase in your project.</li>
        <li>Create a reference to the storage bucket.</li>
        <li>Upload files using the Firebase SDK.</li>
      </ol>
      <p>This makes it easy to handle file uploads for your web or mobile applications.</p>`,
    author: 'Jane Doe',
    publishedDate: new Date().toISOString(),
    category: 'Firebase',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/blogapp-18b25.appspot.com/o/images%2Ffirebase.jpeg?alt=media&token=df865388-42b3-413c-a649-1afc6c310e27',
    slug: 'how-to-use-firebase-storage-for-file-uploads'
  }
];


// Define GraphQL schema
const typeDefs = gql`
  type Post {
    id: ID!
    title: String!
    body: String!
    author: String!
    publishedDate: String!
    imageUrl: String
    category: String!  
    slug: String!       # Added slug
  }

  type Query {
    posts(page: Int!, limit: Int!): [Post!]!
    post(id: ID!): Post
    postBySlug(slug: String!): Post   # Added query to get post by slug
    postsCount: Int!  # Add query for total number of posts
  }

  type Mutation {
    createPost(title: String!, body: String!, author: String!, imageUrl: String, category: String!): Post!  # Added category argument
  }
`;

// Define GraphQL resolvers
const resolvers = {
  Query: {
    posts: (_, { page, limit }) => {
      const start = (page - 1) * limit;
      const end = start + limit;
      return posts.slice(start, end);
    },
    post: (_, { id }) => posts.find((post) => post.id === id),
    postBySlug: (_, { slug }) => posts.find((post) => post.slug === slug),   // Resolver to get post by slug
    postsCount: () => posts.length,  // Return the total count of posts
  },
  Mutation: {
    createPost: async (_, { title, body, author, imageUrl, category }) => {  
      // Generate slug
      const baseSlug = generateSlug(title);
      const slug = generateUniqueSlug(baseSlug, posts);

      const newPost = {
        id: String(posts.length + 1),
        title,
        body,
        author,
        publishedDate: new Date().toISOString(),
        imageUrl,
        category,
        slug,  // Add generated slug to new post object
      };

      posts.unshift(newPost);
      return newPost;
    },
  },
};

// Create Apollo server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();
server.applyMiddleware({ app });

// Serve static files (for uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Start the Express server
app.listen({ port: 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
});
