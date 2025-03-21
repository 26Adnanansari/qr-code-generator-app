'use client';

import React, { useState, useEffect } from 'react';
import { BaseFormProps } from '../forms/forms';

const EmailForm = ({ onDataChange }: BaseFormProps) => {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    const { email, subject, message } = formData;
    if (email) {
      const mailtoString = `mailto:${email}${
        subject ? `?subject=${encodeURIComponent(subject)}` : ''
      }${
        message ? `${subject ? '&' : '?'}body=${encodeURIComponent(message)}` : ''
      }`;
      onDataChange(mailtoString);
    } else {
      onDataChange('');
    }
  }, [formData, onDataChange]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email:
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Your email"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Subject: (optional)
        </label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Enter email subject"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Message: (optional)
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 min-h-[100px]"
          placeholder="Enter your message"
        />
      </div>
    </div>
  );
};

export default EmailForm;