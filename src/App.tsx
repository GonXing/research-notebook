import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { PostDetail } from './pages/PostDetail';
import { CategoryPage } from './pages/CategoryPage';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route 
            path="category/:id" 
            element={<CategoryPageWithKey />} 
          />
          <Route 
            path="post/:id/*" 
            element={<PostDetailWithKey />} 
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// Wrapper components to ensure key-based remounting via URL params
const CategoryPageWithKey = () => {
  const { id } = useParams();
  return <CategoryPage key={id} />;
};

const PostDetailWithKey = () => {
  const { id } = useParams();
  return <PostDetail key={id} />;
};

export default App;

