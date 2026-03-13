import { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { CATEGORIES, getPostsByCategory } from '../utils/posts';
import { PasswordGate } from '../components/PasswordGate';

const SESSION_KEY = (id: string) => `unlocked_${id}`;

export const CategoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const category = CATEGORIES.find(c => c.id === id);

  if (!category) return <Navigate to="/" replace />;

  // Synchronous initialization — no useEffect race condition
  // If the category is not protected, consider it always unlocked.
  // If it is protected, only unlock if sessionStorage confirms it.
  const [unlocked, setUnlocked] = useState<boolean>(() => {
    if (!category.protected) return true;
    return sessionStorage.getItem(SESSION_KEY(id!)) === 'true';
  });

  const handleUnlock = () => {
    sessionStorage.setItem(SESSION_KEY(id!), 'true');
    setUnlocked(true);
  };

  // Always show gate for protected categories until explicitly unlocked
  if (category.protected && !unlocked) {
    return <PasswordGate categoryLabel={category.label} onUnlock={handleUnlock} />;
  }

  const posts = getPostsByCategory(id!);

  return (
    <div className="animate-in fade-in duration-500">
      <header className="mb-10 border-b border-[var(--color-border-dark)] pb-6">
        <h1 className="text-3xl font-bold mb-1">{category.label}</h1>
        <p className="text-[var(--color-text-muted)] text-sm">{category.description}</p>
      </header>

      {posts.length === 0 ? (
        <p className="text-[var(--color-text-muted)] italic text-sm">
          此栏目暂无文章，可在 <code className="text-xs bg-[var(--color-surface-dark)] px-1 rounded">posts/{id}/</code> 目录下添加 .md 文件。
        </p>
      ) : (
        <div className="space-y-8">
          {posts.map(post => (
            <article key={post.id} className="group">
              <Link to={`/post/${post.id}`} className="block">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                  <h2 className="text-xl font-bold group-hover:text-[var(--color-brand-primary)] transition-colors">
                    {post.metadata.title || 'Untitled'}
                  </h2>
                  <time className="text-sm font-mono text-[var(--color-text-muted)] md:ml-4 shrink-0 mt-1 md:mt-0">
                    {post.metadata.date ? new Date(post.metadata.date).toLocaleDateString('zh-CN') : ''}
                  </time>
                </div>
                <div className="flex gap-2 flex-wrap mt-1">
                  {(post.metadata.tags || []).map((tag: string) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded bg-[var(--color-surface-dark)] border border-[var(--color-border-dark)] text-[var(--color-text-muted)] font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
