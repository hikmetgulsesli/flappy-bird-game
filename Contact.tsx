import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      <Helmet>
        <title>Contact - AIToolPeak</title>
        <meta name="description" content="Contact AIToolPeak - We'd love to hear from you about AI tools reviews, partnerships, or general inquiries." />
      </Helmet>
      <div className="max-w-2xl mx-auto px-4 py-16 lg:py-24">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-[--text-muted] mb-8">
          Have questions about our reviews or want to suggest a tool for review? We'd love to hear from you.
        </p>

        {status === 'success' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800 font-medium">Thank you for your message! We'll get back to you soon.</p>
          </div>
        )}

        {status === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800 font-medium">Something went wrong. Please try again or email us directly.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-[--border] bg-[--bg] focus:outline-none focus:ring-2 focus:ring-[--primary] focus:border-transparent"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-[--border] bg-[--bg] focus:outline-none focus:ring-2 focus:ring-[--primary] focus:border-transparent"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium mb-2">
              Subject *
            </label>
            <select
              id="subject"
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-[--border] bg-[--bg] focus:outline-none focus:ring-2 focus:ring-[--primary] focus:border-transparent"
            >
              <option value="">Select a subject</option>
              <option value="review-request">Request a Tool Review</option>
              <option value="general">General Inquiry</option>
              <option value="feedback">Site Feedback</option>
              <option value="partnership">Partnership</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-[--border] bg-[--bg] focus:outline-none focus:ring-2 focus:ring-[--primary] focus:border-transparent resize-none"
              placeholder="Tell us what's on your mind..."
            />
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full px-6 py-3 bg-[--primary] text-white font-medium rounded-lg hover:bg-[--primary-hover] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {status === 'submitting' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </>
  );
}
