'use client';

import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';

// Import form components
import VCardForm from '../components/forms/VCardForm';
import EmailForm from '../components/forms/EmailForm';
import URLForm from '../components/forms/URLForm';
import TextForm from '../components/forms/TextForm';
import SMSForm from '../components/forms/SMSForm';
import WiFiForm from '../components/forms/WiFiForm';
import CustomCardForm from '../components/forms/CustomCardForm';

const QRCodeGenerator = () => {
  const [activeTab, setActiveTab] = useState('url');
  const [qrData, setQRData] = useState('');
  const [scanTracking, setScanTracking] = useState(false);

  const tabs = [
    { id: 'url', label: 'URL', icon: '🌐' },
    { id: 'vcard', label: 'VCARD', icon: '📇' },
    { id: 'customcard', label: 'CustomCARD', icon: '📇' },
    { id: 'text', label: 'TEXT', icon: '📝' },
    { id: 'email', label: 'E-MAIL', icon: '📧' },
    { id: 'sms', label: 'SMS', icon: '💬' },
    { id: 'wifi', label: 'WIFI', icon: '📶' },
    { id: 'bitcoin', label: 'BITCOIN', icon: '₿' },
    { id: 'twitter', label: 'TWITTER', icon: '🐦' },
    { id: 'facebook', label: 'FACEBOOK', icon: 'f' },
    { id: 'pdf', label: 'PDF', icon: '📄' },
    { id: 'mp3', label: 'MP3', icon: '🎵' },
    { id: 'app', label: 'APP STORES', icon: '📱' },
  ];

  const renderForm = () => {
    switch (activeTab) {
      case 'url': return <URLForm onDataChange={setQRData} />;
      case 'vcard': return <VCardForm onDataChange={setQRData} />;
      case 'customcard': return <CustomCardForm onDataChange={setQRData} />;
      case 'text': return <TextForm onDataChange={setQRData} />;
      case 'email': return <EmailForm onDataChange={setQRData} />;
      case 'sms': return <SMSForm onDataChange={setQRData} />;
      case 'wifi': return <WiFiForm onDataChange={setQRData} />;
      default: return <URLForm onDataChange={setQRData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex items-center justify-center p-4">
      <motion.div
        className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Left Section */}
        <motion.div 
          className="bg-gray-800 rounded-xl shadow-md p-6"
          whileHover={{ scale: 1.02 }}
        >
          {/* Tabs Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mb-6">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setQRData('');
                }}
                className={`p-2 rounded-lg flex flex-col items-center justify-center text-sm 
                  ${activeTab === tab.id ? 'bg-blue-500 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-lg mb-1">{tab.icon}</span>
                <span className="text-xs">{tab.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Dynamic Form */}
          {renderForm()}

          {/* Scan Tracking Toggle */}
          <div className="mt-4 flex items-center">
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={scanTracking}
                onChange={(e) => setScanTracking(e.target.checked)}
                className="form-checkbox h-4 w-4 text-blue-500"
              />
              <span>Scan tracking</span>
            </label>
          </div>
        </motion.div>

        {/* Right Section - QR Code Preview */}
        <motion.div 
          className="bg-gray-800 rounded-xl shadow-md p-6 flex flex-col items-center"
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-full max-w-[300px] aspect-square flex items-center justify-center bg-gray-700 p-4 rounded-lg border">
            {qrData ? (
              <QRCodeSVG value={qrData} size={250} level="H" includeMargin={true} />
            ) : (
              <div className="text-gray-400 text-center">QR Code will appear here</div>
            )}
          </div>
          <div className="mt-6 flex gap-4">
            <motion.button
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
              disabled={!qrData}
              whileHover={{ scale: 1.05 }}
            >
              DOWNLOAD
            </motion.button>
            <motion.button
              className="border border-green-500 text-green-500 px-6 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50"
              disabled={!qrData}
              whileHover={{ scale: 1.05 }}
            >
              PRINT QUALITY
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default QRCodeGenerator;
