'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check, AlertCircle } from 'lucide-react';

type FormState = { name: string; email: string; message: string };
type Status = 'idle' | 'submitting' | 'success' | 'error';

const CONTACT_INFO = [
  { icon: <Mail className="h-4 w-4" aria-hidden />, label: 'Email', value: 'paulxu155@gmail.com' },
  { icon: <Phone className="h-4 w-4" aria-hidden />, label: 'Phone', value: '+1 (123) 456-7890' },
  { icon: <MapPin className="h-4 w-4" aria-hidden />, label: 'Location', value: 'Toronto, Canada' },
];

export default function ContactPanel() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormState>({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  const validate = () => {
    const next: FormState = { name: '', email: '', message: '' };
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.email.trim()) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email address';
    if (!form.message.trim()) next.message = 'Message is required';
    else if (form.message.trim().length < 10) next.message = 'Message should be at least 10 characters';
    setErrors(next);
    return !next.name && !next.email && !next.message;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('submitting');
    // No backend in a static export — simulate a successful send.
    setTimeout(() => {
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1200);
  };

  const inputClass = (field: keyof FormState) =>
    `w-full border bg-black px-3 py-2 text-sm text-chic-fg placeholder:text-chic-muted/70 focus:outline-none focus:ring-1 focus:ring-chic-cyan ${
      errors[field] ? 'border-red-500' : 'border-chic-border focus:border-chic-cyan'
    }`;

  return (
    <div className="grid h-full gap-6 p-5 sm:p-6 md:grid-cols-2">
      <div className="space-y-5">
        <div>
          <h3 className="text-lg font-semibold text-chic-fg">Get in touch</h3>
          <p className="mt-2 text-sm leading-relaxed text-chic-muted">
            Open to discussing new projects, ideas, or opportunities. Drop a message and I&apos;ll
            get back to you.
          </p>
        </div>
        <ul className="space-y-3">
          {CONTACT_INFO.map((item) => (
            <li key={item.label} className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center border border-chic-border text-chic-cyan">
                {item.icon}
              </span>
              <span>
                <span className="block text-[11px] uppercase tracking-wider text-chic-muted">
                  {item.label}
                </span>
                <span className="text-sm text-chic-fg">{item.value}</span>
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
          <input id="name" name="name" type="text" value={form.name} onChange={handleChange} className={inputClass('name')} />
          {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-xs uppercase tracking-wider text-chic-muted">
            Email
          </label>
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange} className={inputClass('email')} />
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
          disabled={status === 'submitting'}
          className="inline-flex w-full items-center justify-center gap-2 rounded bg-chic-cyan px-4 py-2 text-sm font-medium text-black transition-all hover:bg-chic-cyan/90 hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'idle' && (<><Send className="h-4 w-4" aria-hidden /> Send message</>)}
          {status === 'submitting' && 'Sending…'}
          {status === 'success' && (<><Check className="h-4 w-4" aria-hidden /> Message sent!</>)}
          {status === 'error' && (<><AlertCircle className="h-4 w-4" aria-hidden /> Error sending</>)}
        </button>
      </form>
    </div>
  );
}
