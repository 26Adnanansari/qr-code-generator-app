'use client';

import React, { useState, useEffect } from 'react';
import { BaseFormProps } from '@/types/forms';

const SMSForm = ({ onDataChange }: BaseFormProps) => {
  const [formData, setFormData] = useState({
    phone: '',
    message: ''
  });

  useEffect(() => {
    const { phone, message } = formData;
    if (phone || message) {
      const smsString = `sms:${phone}${message ? `?body=${encodeURIComponent(message)}` : ''}`;
      onDataChange(smsString);
    } else {
      onDataChange('');
    }
  }, [formData, onDataChange]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number:
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Enter phone number"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Message: (optional)
        </label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 min-h-[100px]"
          placeholder="Enter your message"
        />
      </div>
    </div>
  );
};

export default SMSForm;