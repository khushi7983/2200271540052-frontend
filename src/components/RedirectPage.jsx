// import { useParams } from 'react-router-dom';
// import { useEffect } from 'react';

// function RedirectPage() {
//   const { shortcode } = useParams();
//   const urls = JSON.parse(localStorage.getItem('shortenedUrls') || '[]');
//   const url = urls.find(u => u.shortenedUrl.endsWith(shortcode));

//   useEffect(() => {
//     if (url && new Date() < url.expiry) {
//       const updatedUrl = { ...url, clicks: (url.clicks || 0) + 1, clicksData: [...(url.clicksData || []), { timestamp: new Date(), source: 'direct', location: 'Unknown' }] };
//       const newUrls = urls.map(u => u.shortenedUrl === url.shortenedUrl ? updatedUrl : u);
//       localStorage.setItem('shortenedUrls', JSON.stringify(newUrls));
//       window.location.href = url.originalUrl;
//     } else if (url) {
//       window.location.href = '/'; // Redirect to home if expired
//     }
//   }, [shortcode, url]);

//   return <div style={{ padding: '1rem' }}>Redirecting...</div>;
// }

// export default RedirectPage;

import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';

function RedirectPage() {
  const { shortcode } = useParams();
  const urls = JSON.parse(localStorage.getItem('shortenedUrls') || '[]');
  const url = urls.find(u => u.shortenedUrl.endsWith(shortcode));

  useEffect(() => {
    if (url && new Date() < url.expiry) {
      const updatedUrl = { ...url, clicks: (url.clicks || 0) + 1, clicksData: [...(url.clicksData || []), { timestamp: new Date(), source: 'direct', location: 'Unknown' }] };
      const newUrls = urls.map(u => u.shortenedUrl === url.shortenedUrl ? updatedUrl : u);
      localStorage.setItem('shortenedUrls', JSON.stringify(newUrls));
      window.location.href = url.originalUrl;
    } else if (url) {
      window.location.href = 'http://localhost:3000/'; // Redirect to home if expired
    }
  }, [shortcode, url]);

  return (
    <Box p={2}>
      <Typography>Redirecting...</Typography>
    </Box>
  );
}

export default RedirectPage;