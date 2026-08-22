import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MarkdownMessage({ content }: { content: string }) {
  return (
    <div className="min-w-0 overflow-x-auto break-words text-app-muted">
      <ReactMarkdown
        skipHtml
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ children, href, title }) =>
            href ? (
              <a className="font-bold text-app-accent underline underline-offset-2" href={href} rel="noreferrer noopener" target="_blank" title={title}>
                {children}
              </a>
            ) : (
              <span>{children}</span>
            ),
          blockquote: ({ children }) => <blockquote className="border-l-2 border-app-line pl-3 italic">{children}</blockquote>,
          code: ({ children }) => (
            <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-[0.85em] text-app-ink">
              {children}
            </code>
          ),
          h1: ({ children }) => <h3 className="text-base font-extrabold text-app-ink">{children}</h3>,
          h2: ({ children }) => <h4 className="text-sm font-extrabold text-app-ink">{children}</h4>,
          h3: ({ children }) => <h5 className="text-sm font-bold text-app-ink">{children}</h5>,
          li: ({ children }) => <li className="my-0.5">{children}</li>,
          ol: ({ children }) => <ol className="my-2 list-decimal space-y-0.5 pl-5">{children}</ol>,
          p: ({ children }) => <p className="my-2 first:mt-0 last:mb-0">{children}</p>,
          pre: ({ children }) => (
            <pre className="my-2 max-w-full overflow-x-auto rounded-md bg-slate-900 p-3 text-xs leading-relaxed text-slate-100 [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-inherit">
              {children}
            </pre>
          ),
          table: ({ children }) => <table className="my-2 w-full border-collapse text-left text-xs">{children}</table>,
          td: ({ children }) => <td className="border border-app-line px-2 py-1 align-top">{children}</td>,
          th: ({ children }) => <th className="border border-app-line bg-app-panel px-2 py-1 font-bold text-app-ink">{children}</th>,
          ul: ({ children }) => <ul className="my-2 list-disc space-y-0.5 pl-5">{children}</ul>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
