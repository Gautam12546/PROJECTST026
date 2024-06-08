import React, { useEffect, useState, useRef } from 'react';
import QRCode from 'react-qr-code';
import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';

function Qr_code({ setShowModel1 }) {
  const [cookies] = useCookies(['token']);
  const [value, setValue] = useState('');
  const qrCodeRef = useRef();

  useEffect(() => {
    if (cookies.token) {
      const decodedToken = jwtDecode(cookies.token);
      setValue(decodedToken.data);
    }
  }, [cookies]);

  const handleDownload = () => {
    const svg = qrCodeRef.current.querySelector('svg');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');

      const downloadLink = document.createElement('a');
      downloadLink.href = pngFile;
      downloadLink.download = 'qr-code.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <> 
      <div className='flex justify-end w-full'>
        <button onClick={handleDownload} className='mx-3 py-2 px-3 font-semibold rounded-lg bg-orange-500 my-4'>
          Download
        </button>
      </div>
       
      <div className='w-full h-[80%] flex justify-center items-center' ref={qrCodeRef}>
        <QRCode
          size={300}
          value={value}
          viewBox={`0 0 256 256`}
        />
      </div>
      <button className='w-full py-3 px-4 bg-orange-500 text-xl rounded-md font-semibold my-5' onClick={() => setShowModel1(false)}>
        Back
      </button>
    </>
  );
}

export default Qr_code;
