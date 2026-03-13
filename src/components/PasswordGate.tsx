import { useState } from 'react';
import { Lock } from 'lucide-react';
import { checkPassword } from '../utils/posts';

interface PasswordGateProps {
  categoryLabel: string;
  onUnlock: () => void;
}

export const PasswordGate = ({ categoryLabel, onUnlock }: PasswordGateProps) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkPassword(input)) {
      setError(false);
      onUnlock();
    } else {
      setError(true);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-24 space-y-6">
      <div className="flex flex-col items-center space-y-3 text-center">
        <Lock className="w-10 h-10 text-[var(--color-brand-accent)] opacity-50" />
        <h2 className="text-2xl font-bold">{categoryLabel}</h2>
        <p className="text-[var(--color-text-muted)] text-sm">此栏目为私密内容，请输入访问密码。</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-3">
        <input
          type="password"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="输入密码..."
          autoFocus
          className="w-full bg-[var(--color-surface-dark)] border border-[var(--color-border-dark)] rounded px-4 py-2 text-sm font-mono text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-brand-primary)] transition-colors"
        />
        {error && (
          <p className="text-red-400 text-xs font-mono">密码错误，请重试。</p>
        )}
        <button
          type="submit"
          className="w-full bg-[var(--color-surface-dark)] border border-[var(--color-border-dark)] hover:border-[var(--color-brand-primary)] text-[var(--color-text-main)] rounded px-4 py-2 text-sm font-mono transition-colors"
        >
          确认
        </button>
      </form>
    </div>
  );
};
