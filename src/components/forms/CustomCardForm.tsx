'use client';
import React, { useState } from 'react';
import type { BaseFormProps } from '@/types/forms';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';



interface ExcelRow {
  Name?: string;
  Phone1?: string;
  Phone2?: string;
  Email?: string;
  [key: string]: string | undefined;
}

const CustomCardForm = ({ onDataChange }: BaseFormProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<ExcelRow[]>([]);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string>('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if file is Excel
    if (!file.name.endsWith('.xlsx')) {
      setError('Please upload an Excel (.xlsx) file');
      return;
    }

    setFile(file);
    setError('');

    try {
      const workbook = new ExcelJS.Workbook();
      const arrayBuffer = await file.arrayBuffer();
      await workbook.xlsx.load(arrayBuffer);
      
      const worksheet = workbook.getWorksheet(1); // Get first worksheet
      if (!worksheet) {
        throw new Error('No worksheet found');
      }

      const jsonData: ExcelRow[] = [];
      
      // Read rows
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return; // Skip header row
        
        const rowData: ExcelRow = {};
        row.eachCell((cell, colNumber) => {
          const header = worksheet.getRow(1).getCell(colNumber).value?.toString() || '';
          rowData[header] = cell.value?.toString() || '';
        });
        
        jsonData.push(rowData);
      });

      setPreview(jsonData.slice(0, 5)); // Show first 5 rows as preview
      
      // Generate sample QR code for preview
      if (jsonData.length > 0) {
        const sampleData = generateVCardString(jsonData[0]);
        onDataChange(sampleData);
      }
    } catch (error) {
      setError('Error reading Excel file');
      console.error(error);
    }
  };

  const generateVCardString = (row: ExcelRow): string => {
    return `BEGIN:VCARD
VERSION:3.0
FN:${row.Name || ''}
TEL;TYPE=CELL:${row.Phone1 || ''}
TEL;TYPE=CELL:${row.Phone2 || ''}
EMAIL:${row.Email || ''}
END:VCARD`;
  };

  const generateQRCodes = async () => {
    if (!file) return;
  
    setProcessing(true);
    try {
      const workbook = new ExcelJS.Workbook();
      const arrayBuffer = await file.arrayBuffer();
      await workbook.xlsx.load(arrayBuffer);
  
      const worksheet = workbook.getWorksheet(1);
      if (!worksheet) {
        throw new Error('No worksheet found');
      }
  
      const jsonData: ExcelRow[] = [];
  
      // Read rows
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return; // Skip header row
  
        const rowData: ExcelRow = {};
        row.eachCell((cell, colNumber) => {
          const header = worksheet.getRow(1).getCell(colNumber).value?.toString() || '';
          rowData[header] = cell.value?.toString() || '';
        });
  
        jsonData.push(rowData);
      });
  
      // Create a ZIP file
      const zip = new JSZip();
      const folderName = file.name.replace('.xlsx', '');
      const folder = zip.folder(folderName);
  
      // Generate QR code for each row using a canvas
      for (let i = 0; i < jsonData.length; i++) {
        const row = jsonData[i];
        const vCardString = generateVCardString(row);
  
        // Create a temporary canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) continue;
  
        // Create a QR code image
        const qrCode = new Image();
        qrCode.src = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(vCardString)}`;
  
        await new Promise((resolve) => {
          qrCode.onload = () => {
            canvas.width = qrCode.width;
            canvas.height = qrCode.height;
            ctx.drawImage(qrCode, 0, 0);
            resolve(true);
          };
        });
  
        // Convert canvas to a data URL
        const qrDataUrl = canvas.toDataURL('image/png');
        const qrBlob = await fetch(qrDataUrl).then((res) => res.blob());
  
        // Add to ZIP
        folder?.file(`${row.Name || `contact_${i + 1}`}.png`, qrBlob);
      }
  
      // Generate and download ZIP
      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, `${folderName}_QR_Codes.zip`);
  
    } catch (error) {
      setError('Error generating QR codes');
      console.error(error);
    } finally {
      setProcessing(false);
    }
  };
  

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <input
          type="file"
          accept=".xlsx"
          onChange={handleFileUpload}
          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      {preview.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold">Preview (First 5 rows):</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  {Object.keys(preview[0]).map((header) => (
                    <th key={header} className="px-4 py-2 text-left">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {preview.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, i) => (
                      <td key={i} className="border px-4 py-2">{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <button
            onClick={generateQRCodes}
            disabled={processing}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {processing ? 'Generating...' : 'Generate QR Codes'}
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomCardForm;