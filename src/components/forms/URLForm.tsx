'use client';

import React, { useState, useEffect } from 'react';
import { BaseFormProps } from '@/types/forms';

const URLForm = ({ onDataChange }: BaseFormProps) => {
  const [url, setUrl] = useState('');
  const [size, setSize] = useState(128); // Default size

  useEffect(() => {
    onDataChange(url);
  }, [url, onDataChange]);

  return (
    <div className="space-y-4">
      {/* Input URL */}
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

      {/* Print Quality Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select QR Code Size (Print Quality)
        </label>
        <select
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="w-full p-2 border rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
        >
          <option value={128}>Small (128x128)</option>
          <option value={256}>Medium (256x256)</option>
          <option value={512}>Large (512x512)</option>
        </select>
      </div>

      <p className="text-sm text-gray-500 italic">
        Your QR Code will be generated automatically <br />
        <strong>Scroll and see</strong>
      </p>
    </div>
  );
};

export default URLForm;