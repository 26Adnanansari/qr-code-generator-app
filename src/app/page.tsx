'use client';

import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';
import { Globe, IdCard, FileText, Mail, MessageCircle, Wifi, Bitcoin, Twitter, Facebook, File, Music, Smartphone } from 'lucide-react';
import VCardForm from '../components/forms/VCardForm';
import EmailForm from '../components/forms/EmailForm';
import URLForm from '../components/forms/URLForm';
import TextForm from '../components/forms/TextForm';
import SMSForm from '../components/forms/SMSForm';
import WiFiForm from '../components/forms/WiFiForm';
import CustomCardForm from '../components/forms/CustomCardForm';

const QRCodeGenerator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('url');
  const [qrData, setQRData] = useState<string>('');
  const [scanTracking, setScanTracking] = useState<boolean>(false);
  const [qrSize, setQRSize] = useState<number>(256);
  const qrRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { id: 'url', label: 'URL', icon: <Globe size={20} /> },
    { id: 'vcard', label: 'VCARD', icon: <IdCard size={20} /> },
    { id: 'customcard', label: 'CustomCARD', icon: <IdCard size={20} /> },
    { id: 'text', label: 'TEXT', icon: <FileText size={20} /> },
    { id: 'email', label: 'E-MAIL', icon: <Mail size={20} /> },
    { id: 'sms', label: 'SMS', icon: <MessageCircle size={20} /> },
    { id: 'wifi', label: 'WIFI', icon: <Wifi size={20} /> },
    { id: 'bitcoin', label: 'BITCOIN', icon: <Bitcoin size={20} /> },
    { id: 'twitter', label: 'TWITTER', icon: <Twitter size={20} /> },
    { id: 'facebook', label: 'FACEBOOK', icon: <Facebook size={20} /> },
    { id: 'pdf', label: 'PDF', icon: <File size={20} /> },
    { id: 'mp3', label: 'MP3', icon: <Music size={20} /> },
    { id: 'app', label: 'APP STORES', icon: <Smartphone size={20} /> },
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

  // QR Code download function
  const downloadQRCode = () => {
    if (!qrRef.current) return;
    const svgElement = qrRef.current.querySelector('svg');
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = qrSize;
      canvas.height = qrSize;
      ctx?.drawImage(img, 0, 0, qrSize, qrSize);
      const pngFile = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.href = pngFile;
      link.download = `qr-code-${qrSize}.png`;
      link.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Section 1 - Form Selection */}
      <section className="h-[120vh] flex justify-center items-center w-full p-10">
        <motion.div
          className="w-full max-w-6xl h-full flex flex-col justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Form Card */}
          <motion.div 
            className="bg-gray-800 rounded-xl shadow-md p-6 w-full h-full flex flex-col justify-between"
            whileHover={{ scale: 1 }}
          >
            {/* Tabs */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-5 mb-6">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`p-2 rounded-lg flex flex-col items-center justify-center text-sm 
                    ${activeTab === tab.id ? 'bg-blue-500 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-lg mb-1">{tab.icon}</span>
                  <span className="text-xs">{tab.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Form Content */}
            {renderForm()}

            {/* Scan Tracking */}
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
        </motion.div>
      </section>

      {/* Section 2 - QR Code Preview */}
      <section className="h-[100vh] flex justify-center items-center w-full p-10">
        <motion.div 
          className="bg-gray-800 rounded-xl shadow-md p-6 w-full max-w-6xl h-full flex flex-col justify-center items-center"
          whileHover={{ scale: 1 }}
        >
          {/* QR Code Size Selection */}
          <div className="mb-4 w-full max-w-[300px]">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Select QR Code Size (Print Quality)
            </label>
            <select
              value={qrSize}
              onChange={(e) => setQRSize(Number(e.target.value))}
              className="w-full p-2 border rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value={128}>Small (128x128)</option>
              <option value={256}>Medium (256x256)</option>
              <option value={512}>Large (512x512)</option>
            </select>
          </div>

          {/* QR Code Display */}
          <div ref={qrRef} className="w-full max-w-[300px] aspect-square flex items-center justify-center bg-gray-700 p-4 rounded-lg border">
            {qrData ? (
              <QRCodeSVG value={qrData} size={qrSize} level="H" includeMargin />
            ) : (
              <div className="text-gray-400 text-center">QR Code will appear here</div>
            )}
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <motion.button
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
              disabled={!qrData}
              whileHover={{ scale: 1.05 }}
              onClick={downloadQRCode}
            >
              DOWNLOAD
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default QRCodeGenerator;
