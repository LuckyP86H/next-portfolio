import { Fragment } from 'react';

/**
 * Dependency-free syntax highlighter. A single-pass tokenizer classifies comments,
 * strings, numbers, keywords and function calls, then renders them as colored spans.
 * Language-agnostic enough to cover the JS/TS/Java/Python snippets in the Projects grid,
 * while keeping the static bundle lean (no Prism/Shiki).
 */

const KEYWORDS = [
  'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'import',
  'from', 'export', 'default', 'class', 'new', 'await', 'async', 'public', 'private',
  'protected', 'static', 'void', 'int', 'long', 'double', 'boolean', 'true', 'false',
  'null', 'undefined', 'def', 'self', 'extends', 'implements', 'interface', 'type',
  'enum', 'switch', 'case', 'break', 'continue', 'try', 'catch', 'finally', 'throw',
  'in', 'of', 'do', 'package', 'final', 'this', 'super', 'yield', 'with', 'as', 'record',
];

const PATTERN = new RegExp(
  [
    '(\\/\\/[^\\n]*|#[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)', // 1: comment
    '("(?:\\\\.|[^"\\\\])*"|\'(?:\\\\.|[^\'\\\\])*\'|`(?:\\\\.|[^`\\\\])*`)', // 2: string
    '(\\b\\d[\\d_.]*\\b)', // 3: number
    '\\b(' + KEYWORDS.join('|') + ')\\b', // 4: keyword
    '([A-Za-z_$][\\w$]*)(?=\\s*\\()', // 5: function call
  ].join('|'),
  'g'
);

type Token = { value: string; cls: string };

function tokenize(code: string): Token[] {
  const tokens: Token[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  PATTERN.lastIndex = 0;

  while ((match = PATTERN.exec(code)) !== null) {
    if (match.index > last) {
      tokens.push({ value: code.slice(last, match.index), cls: 'text-chic-fg' });
    }
    let cls = 'text-chic-fg';
    if (match[1]) cls = 'italic text-chic-muted';
    else if (match[2]) cls = 'text-chic-green';
    else if (match[3]) cls = 'text-chic-amber';
    else if (match[4]) cls = 'text-chic-cyan';
    else if (match[5]) cls = 'text-chic-magenta';
    tokens.push({ value: match[0], cls });
    last = match.index + match[0].length;
  }
  if (last < code.length) tokens.push({ value: code.slice(last), cls: 'text-chic-fg' });
  return tokens;
}

type CodeBlockProps = {
  code: string;
  filename?: string;
  language?: string;
  className?: string;
};

export default function CodeBlock({ code, filename, language, className = '' }: CodeBlockProps) {
  const tokens = tokenize(code.replace(/\t/g, '  '));

  return (
    <div className={`overflow-hidden rounded border border-chic-border bg-black ${className}`}>
      {filename && (
        <div className="flex items-center gap-2 border-b border-chic-border bg-chic-panel px-3 py-1.5">
          <span className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
          </span>
          <span className="ml-1 truncate text-xs text-chic-muted">{filename}</span>
          {language && (
            <span className="ml-auto text-[10px] uppercase tracking-wider text-chic-muted">
              {language}
            </span>
          )}
        </div>
      )}
      <pre className="no-scrollbar overflow-x-auto p-3 text-[12.5px] leading-relaxed">
        <code>
          {tokens.map((token, i) => (
            <Fragment key={i}>
              <span className={token.cls}>{token.value}</span>
            </Fragment>
          ))}
        </code>
      </pre>
    </div>
  );
}
