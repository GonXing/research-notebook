import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';


interface PostViewerProps {
  content: string;
  category: string;
}

export const PostViewer = ({ content, category }: PostViewerProps) => {
  return (
    <article className="prose prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeSlug, rehypeKatex, rehypeHighlight]}
        components={{
          img: ({ node, ...props }) => {
            // If the src is relative (doesn't start with http or /), prefix it
            const isRelative = props.src && !props.src.startsWith('http') && !props.src.startsWith('/');
            const src = isRelative ? `/posts/${category}/${props.src}` : props.src;
            return <img {...props} src={src} />;
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
};
