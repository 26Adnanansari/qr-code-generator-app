'use client';

import React, { useState, useEffect } from 'react';
import { BaseFormProps } from '@/types/forms';

const URLForm = ({ onDataChange }: BaseFormProps) => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    onDataChange(url);
  }, [url, onDataChange]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Enter your website
        </label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="https://example.com"
        />
      </div>
      <p className="text-sm text-gray-500 italic">
        Your QR Code will be generated automatically
      </p>
    </div>
  );
};

export default URLForm;