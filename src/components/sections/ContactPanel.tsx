'use client';

import { useState, type ReactNode } from 'react';
import { Mail, MapPin, Send, Check } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa6';
import { site } from '@content/site';

type FormState = { name: string; email: string; message: string };
type Status = 'idle' | 'sent';

const EMPTY: FormState = { name: '', email: '', message: '' };

const CONTACT_INFO: { icon: ReactNode; label: string; value: string; href?: string }[] = [
  {
    icon: <Mail className="h-4 w-4" aria-hidden />,
    label: 'Email',
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: <FaLinkedin className="h-4 w-4" aria-hidden />,
    label: 'LinkedIn',
    value: site.linkedin.replace(/^https?:\/\//, ''),
    href: site.linkedin,
  },
  { icon: <MapPin className="h-4 w-4" aria-hidden />, label: 'Location', value: site.location },
];

export default function ContactPanel() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<Status>('idle');

  const validate = () => {
    const next: FormState = { ...EMPTY };
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.email.trim()) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email address';
    if (!form.message.trim()) next.message = 'Message is required';
    else if (form.message.trim().length < 10) next.message = 'Message should be at least 10 characters';
    setErrors(next);
    return !next.name && !next.email && !next.message;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Static export, so there is no backend: hand the message to the visitor's mail client
  // instead of pretending to send it.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const subject = encodeURIComponent(`Portfolio message from ${form.name.trim()}`);
    const body = encodeURIComponent(`${form.message.trim()}\n\n${form.name.trim()} <${form.email.trim()}>`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setStatus('sent');
    window.setTimeout(() => setStatus('idle'), 4000);
  };

  const inputClass = (field: keyof FormState) =>
    `w-full border bg-black px-3 py-2 text-sm text-chic-fg placeholder:text-chic-muted/70 focus:outline-none focus:ring-1 focus:ring-chic-cyan ${
      errors[field] ? 'border-red-500' : 'border-chic-border focus:border-chic-cyan'
    }`;

  return (
    <div className="grid h-full gap-6 p-4 sm:p-6 md:grid-cols-2">
      <div className="space-y-5">
        <div>
          <h3 className="text-lg font-semibold text-chic-fg">Get in touch</h3>
          <p className="mt-2 text-sm leading-relaxed text-chic-muted">
            Open to new projects, ideas, and opportunities. Send a note and I&apos;ll get back to
            you.
          </p>
        </div>
        <ul className="space-y-3">
          {CONTACT_INFO.map((item) => (
            <li key={item.label} className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-chic-border text-chic-cyan">
                {item.icon}
              </span>
              <span className="min-w-0">
                <span className="block text-[11px] uppercase tracking-wider text-chic-muted">
                  {item.label}
                </span>
                {item.href ? (
                  <a
                    href={item.href}
                    {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="break-all text-sm text-chic-fg transition-colors hover:text-chic-cyan"
                  >
                    {item.value}
                  </a>
                ) : (
                  <span className="text-sm text-chic-fg">{item.value}</span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3" noValidate>
        <div>
          <label htmlFor="name" className="mb-1 block text-xs uppercase tracking-wider text-chic-muted">
            Name
          </label>
          <input id="name" name="name" type="text" autoComplete="name" value={form.name} onChange={handleChange} className={inputClass('name')} />
          {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-xs uppercase tracking-wider text-chic-muted">
            Email
          </label>
          <input id="email" name="email" type="email" autoComplete="email" value={form.email} onChange={handleChange} className={inputClass('email')} />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="message" className="mb-1 block text-xs uppercase tracking-wider text-chic-muted">
            Message
          </label>
          <textarea id="message" name="message" rows={4} value={form.message} onChange={handleChange} className={inputClass('message')} />
          {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
        </div>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded bg-chic-cyan px-4 py-2 text-sm font-medium text-black transition-all hover:bg-chic-cyan/90 hover:shadow-glow"
        >
          {status === 'sent' ? (
            <>
              <Check className="h-4 w-4" aria-hidden /> Opening your mail app…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden /> Send message
            </>
          )}
        </button>
        <p className="text-center text-[11px] text-chic-muted">Opens in your default mail app.</p>
      </form>
    </div>
  );
}
