import frontMatter from 'front-matter';

export interface PostMetadata {
  title: string;
  date: string;
  tags: string[];
  category?: string;
}

export interface Post {
  id: string;
  category: string;
  metadata: PostMetadata;
  content: string;
}

export interface CategoryConfig {
  id: string;
  label: string;
  description: string;
  protected: boolean;
}

// Category definitions — protected ones require the password gate
export const CATEGORIES: CategoryConfig[] = [
  { id: 'quant-research', label: '量化研究', description: '美股因子与波动率研究', protected: false },
  { id: 'cs-lab', label: '计算机实验', description: '服务器、Docker、系统折腾记录', protected: false },
  { id: 'mfe-journey', label: '申研之路', description: '备战 2027 金融工程硕士的心路历程', protected: true },
  { id: 'daily', label: '碎碎念', description: '关于市场的感悟与随笔', protected: true },
];

// The password check is kept client-side via btoa encoding.
// This provides light "keep casual visitors out" protection for a personal blog.
// Hash stored: btoa("184321")
export const PROTECTED_HASH = 'MTg0MzIx';

export const checkPassword = (input: string): boolean =>
  btoa(input) === PROTECTED_HASH;

// Vite glob: eagerly import all markdown files from all category subdirectories
const postFiles = import.meta.glob('/posts/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export const getAllPosts = (): Post[] => {
  return Object.keys(postFiles)
    .filter((filepath) => {
      // Exclude Obsidian metadata, templates, and hidden folders
      const isTemplate = filepath.includes('/Templates/');
      const isHidden = filepath.split('/').some(part => part.startsWith('.'));
      return !isTemplate && !isHidden;
    })
    .map((filepath) => {
      try {
        const raw = postFiles[filepath];
        // Derive category from the folder name: /posts/quant-research/foo.md -> quant-research
        const parts = filepath.replace('/posts/', '').split('/');
        const category = parts.length > 1 ? parts[0] : 'daily';
        const filename = parts[parts.length - 1];
        const id = `${category}/${filename.replace('.md', '')}`;

        const { attributes, body } = frontMatter<PostMetadata>(raw);
        
        // Ensure date is valid, otherwise use a safe fallback
        const dateStr = attributes.date ? String(attributes.date) : '';
        const timestamp = new Date(dateStr).getTime();
        if (isNaN(timestamp)) {
          console.warn(`Invalid date in post ${id}: ${dateStr}`);
        }

        return { id, category, metadata: attributes as PostMetadata, content: body };
      } catch (err) {
        console.error(`Error parsing post at ${filepath}:`, err);
        return null; // Will be filtered out
      }
    })
    .filter((p): p is Post => p !== null)
    .sort((a, b) => {
      const dateA = new Date(a.metadata.date).getTime() || 0;
      const dateB = new Date(b.metadata.date).getTime() || 0;
      return dateB - dateA;
    });
};

export const getPostsByCategory = (category: string): Post[] =>
  getAllPosts().filter((p) => p.category === category);

export const getPostById = (id: string): Post | undefined =>
  getAllPosts().find((p) => p.id === id);

