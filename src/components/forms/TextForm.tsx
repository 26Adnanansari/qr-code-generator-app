'use client';

import React, { useState, useEffect } from 'react';
import { BaseFormProps } from '@/types/forms';

const TextForm = ({ onDataChange }: BaseFormProps) => {
  const [text, setText] = useState('');

  useEffect(() => {
    onDataChange(text);
  }, [text, onDataChange]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Enter your text
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 min-h-[150px]"
          placeholder="Your text will be generated automatically"
        />
      </div>
      <div className="flex items-center">
        <span className="text-sm text-gray-500">
          Upload any file (.jpg, .pdf, .mp3, .docx, .pptx)
        </span>
        <input
          type="file"
          className="hidden"
          accept=".jpg,.pdf,.mp3,.docx,.pptx"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setText(file.name);
            }
          }}
        />
      </div>
    </div>
  );
};

export default TextForm;