'use client';

import React, { useState } from 'react';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import QRCode from 'qrcode';

interface BaseFormProps {
  onDataChange: (data: string) => void;
}

const CustomCardForm: React.FC<BaseFormProps> = ({ onDataChange }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<Record<string, string | undefined>[]>([]);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string>('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    if (!uploadedFile.name.endsWith('.xlsx')) {
      setError('Please upload a valid Excel (.xlsx) file');
      return;
    }

    setFile(uploadedFile);
    setError('');

    try {
      const workbook = new ExcelJS.Workbook();
      const arrayBuffer = await uploadedFile.arrayBuffer();
      await workbook.xlsx.load(arrayBuffer);

      const worksheet = workbook.getWorksheet(1);
      if (!worksheet) throw new Error('No worksheet found');

      // Extract headers correctly
      const rowValues = worksheet.getRow(1).values;
      const headers: string[] = Array.isArray(rowValues)
        ? rowValues.slice(1).map((val) => (val ? val.toString().trim() : ''))
        : [];

      if (headers.length === 0) throw new Error('No valid headers found.');

      // Extract rows
      const jsonData: Record<string, string | undefined>[] = [];
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return; // Skip header row

        const rowData: Record<string, string | undefined> = {};
        headers.forEach((header, index) => {
          const cellValue = row.getCell(index + 1).value;
          rowData[header] = cellValue ? cellValue.toString().trim() : '';
        });

        jsonData.push(rowData);
      });

      setPreview(jsonData.slice(0, 5));
      if (jsonData.length > 0) onDataChange(generateQRString(jsonData[0]));
    } catch (err) {
      setError('Error processing Excel file');
      console.error(err);
    }
  };

  const generateQRString = (row: Record<string, string | undefined>): string => {
    return Object.values(row)
      .filter((value) => value && value.trim() !== '')
      .join('\n');
  };

  const generateQRCodes = async () => {
    if (!file) return;

    setProcessing(true);
    try {
      const workbook = new ExcelJS.Workbook();
      const arrayBuffer = await file.arrayBuffer();
      await workbook.xlsx.load(arrayBuffer);

      const worksheet = workbook.getWorksheet(1);
      if (!worksheet) throw new Error('No worksheet found');

      const rowValues = worksheet.getRow(1).values || []; // Ensure it's always an array
      const headers: string[] = Array.isArray(rowValues)
        ? rowValues.slice(1).map((val) => (val ? val.toString().trim() : ''))
        : [];

      const jsonData: Record<string, string | undefined>[] = [];
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return;

        const rowData: Record<string, string | undefined> = {};
        headers.forEach((header, index) => {
          rowData[header] = row.getCell(index + 1).value?.toString().trim() || '';
        });

        jsonData.push(rowData);
      });

      const zip = new JSZip();
      const folderName = file.name.replace('.xlsx', '');
      const folder = zip.folder(folderName);

      for (let i = 0; i < jsonData.length; i++) {
        const row = jsonData[i];
        const qrDataString = generateQRString(row);

        const qrDataUrl = await QRCode.toDataURL(qrDataString);
        const qrBlob = await fetch(qrDataUrl).then((res) => res.blob());
        folder?.file(`${row['Name'] || `contact_${i + 1}`}.png`, qrBlob);
      }

      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, `${folderName}_QR_Codes.zip`);
    } catch (err) {
      setError('Error generating QR codes');
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg shadow-lg bg-gray-100">
      <div className="flex flex-col gap-2">
        <input
          type="file"
          accept=".xlsx"
          onChange={handleFileUpload}
          className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      {preview.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Preview (First 5 rows):</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm bg-white rounded-lg shadow-md">
              <thead>
                <tr className="bg-blue-600 text-white">
                  {Object.keys(preview[0]).map((header) => (
                    <th key={header} className="px-4 py-2 border border-gray-300 text-left">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {preview.map((row, index) => (
                  <tr key={index} className="odd:bg-gray-100 even:bg-gray-200">
                    {Object.keys(preview[0]).map((key, i) => (
                      <td key={i} className="border px-4 py-2 border-gray-300 text-gray-900">
                        {row[key] || '-'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={generateQRCodes}
            disabled={processing}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
          >
            {processing ? 'Generating...' : 'Generate QR Codes'}
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomCardForm;
