// import { useState } from 'react';

// function URLShortener() {
//   const [url, setUrl] = useState('');
//   const [shortcode, setShortcode] = useState('');
//   const [expiry, setExpiry] = useState('');
//   const [error, setError] = useState('');
//   const [urls, setUrls] = useState(JSON.parse(localStorage.getItem('shortenedUrls') || '[]'));

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!isValidUrl(url)) {
//       setError('Please enter a valid URL');
//       return;
//     }
//     if (urls.length >= 5) {
//       setError('Limit of 5 URLs reached');
//       return;
//     }
//     const existingShortcode = urls.find(u => u.shortenedUrl.endsWith(shortcode));
//     if (shortcode && existingShortcode) {
//       setError('Shortcode already in use');
//       return;
//     }
//     const expiryMinutes = expiry ? parseInt(expiry) : 30;
//     const newShortcode = shortcode || generateShortcode();
//     const shortenedUrl = `${window.location.origin}/s/${newShortcode}`;
//     const newUrl = { originalUrl: url, shortenedUrl, created: new Date(), expiry: new Date(Date.now() + expiryMinutes * 60000), clicks: 0, clicksData: [] };
//     const updatedUrls = [...urls, newUrl];
//     localStorage.setItem('shortenedUrls', JSON.stringify(updatedUrls));
//     setUrls(updatedUrls);
//     setUrl('');
//     setShortcode('');
//     setExpiry('');
//     setError('');
//   };

//   const isValidUrl = (string) => {
//     try {
//       new URL(string);
//       return true;
//     } catch (_) {
//       return false;
//     }
//   };

//   const generateShortcode = () => {
//     let newShortcode;
//     do {
//       newShortcode = Math.random().toString(36).substr(2, 6);
//     } while (urls.some(u => u.shortenedUrl.endsWith(newShortcode)));
//     return newShortcode;
//   };

//   return (
//     <div style={{ padding: '1rem' }}>
//       <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Shorten URL</h1>
//       <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
//         <input
//           type="text"
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//           placeholder="Enter URL"
//           style={{ border: '1px solid #ccc', padding: '0.5rem', marginBottom: '0.5rem', width: '100%' }}
//         />
//         <input
//           type="text"
//           value={shortcode}
//           onChange={(e) => setShortcode(e.target.value)}
//           placeholder="Optional Shortcode"
//           style={{ border: '1px solid #ccc', padding: '0.5rem', marginBottom: '0.5rem', width: '100%' }}
//         />
//         <input
//           type="number"
//           value={expiry}
//           onChange={(e) => setExpiry(e.target.value)}
//           placeholder="Expiry in minutes (optional)"
//           style={{ border: '1px solid #ccc', padding: '0.5rem', marginBottom: '0.5rem', width: '100%' }}
//         />
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//         <button type="submit" style={{ backgroundColor: '#007bff', color: 'white', padding: '0.5rem' }}>
//           Shorten
//         </button>
//       </form>
//     </div>
//   );
// }

// export default URLShortener;

import { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

function URLShortener() {
  const [url, setUrl] = useState('');
  const [shortcode, setShortcode] = useState('');
  const [expiry, setExpiry] = useState('');
  const [error, setError] = useState('');
  const [shortenedResult, setShortenedResult] = useState(null);
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    setUrls(JSON.parse(localStorage.getItem('shortenedUrls') || '[]'));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidUrl(url)) {
      setError('Please enter a valid URL');
      return;
    }
    if (urls.length >= 5) {
      setError('Limit of 5 URLs reached');
      return;
    }
    const existingShortcode = urls.find(u => u.shortenedUrl.endsWith(shortcode));
    if (shortcode && existingShortcode) {
      setError('Shortcode already in use');
      return;
    }
    const expiryMinutes = expiry ? parseInt(expiry) : 30;
    const newShortcode = shortcode || generateShortcode();
    const shortenedUrl = `http://localhost:3000/s/${newShortcode}`;
    const newUrl = { originalUrl: url, shortenedUrl, created: new Date(), expiry: new Date(Date.now() + expiryMinutes * 60000), clicks: 0, clicksData: [] };
    const updatedUrls = [...urls, newUrl];
    localStorage.setItem('shortenedUrls', JSON.stringify(updatedUrls));
    setUrls(updatedUrls);
    setShortenedResult({ shortenedUrl, expiry: new Date(Date.now() + expiryMinutes * 60000) });
    setUrl('');
    setShortcode('');
    setExpiry('');
    setError('');
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const generateShortcode = () => {
    let newShortcode;
    do {
      newShortcode = Math.random().toString(36).substr(2, 6);
    } while (urls.some(u => u.shortenedUrl.endsWith(newShortcode)));
    return newShortcode;
  };

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>Shorten URL</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField fullWidth margin="normal" value={url} onChange={(e) => setUrl(e.target.value)} label="Enter URL" variant="outlined" />
        <TextField fullWidth margin="normal" value={shortcode} onChange={(e) => setShortcode(e.target.value)} label="Optional Shortcode" variant="outlined" />
        <TextField fullWidth margin="normal" value={expiry} onChange={(e) => setExpiry(e.target.value)} label="Expiry in minutes (optional)" variant="outlined" />
        {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Shorten</Button>
        {shortenedResult && (
          <Box mt={2}>
            <Typography>Shortened URL: {shortenedResult.shortenedUrl}</Typography>
            <Typography>Expires: {shortenedResult.expiry.toString()}</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default URLShortener;