'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaLocationDot, FaPaperPlane, FaCheck, FaCircleExclamation } from 'react-icons/fa6';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const validateForm = () => {
    let valid = true;
    const errors = {
      name: '',
      email: '',
      message: '',
    };

    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
      valid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
      valid = false;
    }

    // Message validation
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
      valid = false;
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message should be at least 10 characters';
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Simulate form submission
    setFormStatus('submitting');
    
    // Simulate API call with timeout
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset form status after a delay
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Contact Me</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
          Have a question or want to work together? Feel free to reach out using the form below or contact information.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
            <p className="text-gray-700 dark:text-gray-300">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
          </div>
          
          <div className="space-y-6 mx-auto md:mx-0 max-w-xs md:max-w-none">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-full text-primary-600 dark:text-primary-400">
                <FaEnvelope className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-medium">Email</h4>
                <p className="text-gray-600 dark:text-gray-400">paul.xu@example.com</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-full text-primary-600 dark:text-primary-400">
                <FaPhone className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-medium">Phone</h4>
                <p className="text-gray-600 dark:text-gray-400">+1 (123) 456-7890</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-full text-primary-600 dark:text-primary-400">
                <FaLocationDot className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-medium">Location</h4>
                <p className="text-gray-600 dark:text-gray-400">Toronto, Canada</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4 text-center">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    formErrors.name ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.name}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    formErrors.email ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.email}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    formErrors.message ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.message && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.message}</p>
                )}
              </div>
              
              <motion.button
                type="submit"
                disabled={formStatus === 'submitting'}
                className="w-full py-2 px-4 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                whileHover={{ scale: formStatus === 'submitting' ? 1 : 1.02 }}
                whileTap={{ scale: formStatus === 'submitting' ? 1 : 0.98 }}
              >
                {formStatus === 'idle' && (
                  <span className="flex items-center justify-center">
                    <FaPaperPlane className="h-4 w-4 mr-2" />
                    Send Message
                  </span>
                )}
                {formStatus === 'submitting' && 'Sending...'}
                {formStatus === 'success' && (
                  <span className="flex items-center justify-center">
                    <FaCheck className="h-4 w-4 mr-2" />
                    Message Sent!
                  </span>
                )}
                {formStatus === 'error' && (
                  <span className="flex items-center justify-center">
                    <FaCircleExclamation className="h-4 w-4 mr-2" />
                    Error Sending
                  </span>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}