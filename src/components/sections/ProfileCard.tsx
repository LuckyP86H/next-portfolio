import { site } from '@content/site';

type Row = { key: string; value: string | readonly string[]; accent?: boolean };

const ROWS: Row[] = [
  { key: 'role', value: site.role },
  { key: 'company', value: site.company, accent: true },
  { key: 'since', value: site.since },
  { key: 'education', value: site.education },
  { key: 'location', value: site.location },
  { key: 'focus', value: site.focus },
];

/**
 * Quick facts rendered as a JSON object: scannable at a glance, real text for crawlers,
 * and every value comes from `site.ts`, so nothing here can drift out of date on its own.
 * A row whose value is a list (e.g. multiple degrees) pretty-prints as a JSON array
 * instead of one dense joined string, which reads much less cluttered.
 */
export default function ProfileCard() {
  return (
    <div className="flex h-full flex-col justify-center p-4 text-[13px] sm:p-5">
      <p className="text-chic-muted" aria-hidden>
        {'{'}
      </p>
      <dl className="grid grid-cols-1 gap-x-8 gap-y-2 py-2 pl-4 sm:grid-cols-2 lg:grid-cols-1">
        {ROWS.map((row) =>
          Array.isArray(row.value) ? (
            <div key={row.key} className="min-w-0">
              <dt className="text-chic-muted">&quot;{row.key}&quot;: [</dt>
              <dd className="flex flex-col gap-0.5 pl-4">
                {row.value.map((item, i) => (
                  <span key={item} className="min-w-0 break-words text-chic-fg">
                    &quot;{item}&quot;
                    {i < row.value.length - 1 ? ',' : ''}
                  </span>
                ))}
              </dd>
              <span className="text-chic-muted">]</span>
            </div>
          ) : (
            <div key={row.key} className="flex min-w-0 items-baseline gap-2">
              <dt className="w-[13ch] shrink-0 text-chic-muted">&quot;{row.key}&quot;:</dt>
              <dd
                className={`min-w-0 break-words ${row.accent ? 'text-chic-cyan' : 'text-chic-fg'}`}
              >
                &quot;{row.value}&quot;
              </dd>
            </div>
          )
        )}
      </dl>
      <p className="text-chic-muted" aria-hidden>
        {'}'}
      </p>
    </div>
  );
}
