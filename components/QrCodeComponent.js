import React, { useState, useRef, useEffect } from 'react';
import { QRCode } from 'react-qrcode-logo';
import { HexColorPicker } from 'react-colorful'; // Import HexColorPicker from react-colorful
import { AiOutlineUpload } from 'react-icons/ai';
import styles from '../styles/Qrcode.module.css';

const QrCodeComponent = () => {
  const defaultLogo = null;
  const defaultColor = '#000000';
  const defaultQrCodeData = 'https://github.com/gcoro/react-qrcode-logo';

  const [logo, setLogo] = useState(defaultLogo);
  const [color, setColor] = useState(defaultColor);
  const [qrCodeData, setQrCodeData] = useState(defaultQrCodeData);
  const [showColorPicker, setShowColorPicker] = useState(false); // State to toggle color picker
  const [hexInput, setHexInput] = useState(defaultColor); // Separate state for hex input

  const pickerRef = useRef(); // Reference to color picker for click detection
  const fileInputRef = useRef(null); // Reference for file input

  // Handle logo upload
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      if (img.width === 205 && img.height === 205) {
        setLogo(URL.createObjectURL(file));
      } else {
        alert('The logo must be exactly 205x205 pixels.');
      }
    };
  };

  // Download QR Code
  const downloadQRCode = () => {
    const canvas = document.querySelector('canvas');

    if (canvas) {
      const pngUrl = canvas
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = 'qrcode.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } else {
      alert('There was an issue downloading the QR code. Please try again.');
    }
  };

  // Reset QR Code to its default state
  const resetQRCode = () => {
    setLogo(defaultLogo);
    setColor(defaultColor);
    setQrCodeData(defaultQrCodeData);
    setHexInput(defaultColor); // Reset the hex input as well

    // Clear file input value
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset the file input
    }
  };

  // Handle clicking outside of color picker
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setShowColorPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle user input in the hex code field
  const handleHexInputChange = (e) => {
    const newHex = e.target.value;
    setHexInput(newHex); // Update the input field value

    // Validate if it's a valid hex color and update the color state
    if (/^#[0-9A-F]{6}$/i.test(newHex)) {
      setColor(newHex);
    }
  };

  // Sync color picker changes with the hex input field
  const handleColorChange = (newColor) => {
    setColor(newColor);
    setHexInput(newColor); // Sync the input field with the color picker
  };

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.leftColumn}>
        <h3 className={styles.subTitle}>Egyedi logó feltöltése</h3>

        {/* Modern styled file uploader */}
        <label className={styles.uploadLabel}>
          <AiOutlineUpload className={styles.uploadIcon} />
          <span>Logó feltöltése</span>
          <input
            ref={fileInputRef} // Assign ref to file input
            className={styles.fileInput}
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
          />
        </label>

        <h3 className={styles.subTitle}>QR kód színe</h3>
        <div className={styles.colorPickerWrapper}>
            {/* Editable Hex Input */}
            <input
            type="text"
            className={styles.hexInput}
            value={hexInput}
            onChange={handleHexInputChange}
            maxLength={7} // Limit input length to 7 characters (e.g. "#FFFFFF")
          />
          {/* Color square */}
          <div
            className={styles.colorSquare}
            style={{ backgroundColor: color }}
            onClick={() => setShowColorPicker(!showColorPicker)} // Toggle color picker
          ></div>

 

          {/* Color Picker */}
          {showColorPicker && (
            <div ref={pickerRef} className={styles.colorPicker}>
              <HexColorPicker color={color} onChange={handleColorChange} />
            </div>
          )}
        </div>
      </div>

      <div className={styles.rightColumn}>
        <QRCode
          value={qrCodeData}
          size={250}
          ecLevel="M"
          fgColor={color}
          logoImage={logo}
          logoWidth={80}
          logoHeight={80}
          qrStyle="dots"
          bgColor="transparent"
          removeQrCodeBehindLogo={true}
          eyeRadius={5}
          logoPaddingStyle="square"
          logoPadding={30}
        />
        <div className={styles.buttonGroup}>
          <button onClick={downloadQRCode} className={styles.downloadButton}>
            Letöltés
          </button>
          <button onClick={resetQRCode} className={styles.downloadButton}>
            Alaphelyzet
          </button>
        </div>
      </div>
    </div>
  );
};

export default QrCodeComponent;
