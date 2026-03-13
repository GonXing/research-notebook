import { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { getPostById, CATEGORIES } from '../utils/posts';
import { PostViewer } from '../components/PostViewer';
import { PasswordGate } from '../components/PasswordGate';
import { ArrowLeft } from 'lucide-react';

const SESSION_KEY = (id: string) => `unlocked_${id}`;

export const PostDetail = () => {
  // Route: /post/:id/* — id is the category slug, * is the filename slug
  const { id, '*': slug } = useParams<{ id: string; '*': string }>();
  const fullId = slug ? `${id}/${slug}` : id;
  const post = fullId ? getPostById(fullId) : undefined;
  const category = post ? CATEGORIES.find(c => c.id === post.category) : undefined;

  // Synchronous initialization — read sessionStorage at mount time, no race condition
  const [unlocked, setUnlocked] = useState<boolean>(() => {
    if (!category?.protected) return true;
    return sessionStorage.getItem(SESSION_KEY(category.id)) === 'true';
  });

  if (!post) {
    return <Navigate to="/" replace />;
  }

  const handleUnlock = () => {
    if (category) {
      sessionStorage.setItem(SESSION_KEY(category.id), 'true');
      setUnlocked(true);
    }
  };

  // Block access if protected and not yet unlocked
  if (category?.protected && !unlocked) {
    return <PasswordGate categoryLabel={category.label} onUnlock={handleUnlock} />;
  }

  const backPath = category ? `/category/${category.id}` : '/';

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <Link to={backPath} className="inline-flex items-center text-sm font-mono text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] transition-colors mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" />
          {category ? `返回 ${category.label}` : '返回列表'}
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.metadata.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm font-mono text-[var(--color-text-muted)] pb-6 border-b border-[var(--color-border-dark)]">
          <time>{post.metadata.date ? new Date(post.metadata.date).toLocaleDateString('zh-CN') : ''}</time>
          {post.metadata.tags && post.metadata.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              •
              {post.metadata.tags.map(tag => (
                <span key={tag}>#{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      <PostViewer content={post.content} category={post.category} />
    </div>
  );
};
