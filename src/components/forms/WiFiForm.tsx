'use client';

import React, { useState, useEffect } from 'react';
import { BaseFormProps } from '@/types/forms';

const WiFiForm = ({ onDataChange }: BaseFormProps) => {
  const [formData, setFormData] = useState({
    ssid: '',
    password: '',
    encryption: 'WPA'
  });

  useEffect(() => {
    const { ssid, password, encryption } = formData;
    if (ssid) {
      const wifiString = `WIFI:T:${encryption};S:${ssid};P:${password};;`;
      onDataChange(wifiString);
    } else {
      onDataChange('');
    }
  }, [formData, onDataChange]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Network Name (SSID):
        </label>
        <input
          type="text"
          value={formData.ssid}
          onChange={(e) => setFormData(prev => ({ ...prev, ssid: e.target.value }))}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Enter WiFi network name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password: (optional)
        </label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Enter WiFi password"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Encryption:
        </label>
        <select
          value={formData.encryption}
          onChange={(e) => setFormData(prev => ({ ...prev, encryption: e.target.value }))}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="WPA">WPA/WPA2</option>
          <option value="WEP">WEP</option>
          <option value="nopass">No Encryption</option>
        </select>
      </div>
    </div>
  );
};

export default WiFiForm;