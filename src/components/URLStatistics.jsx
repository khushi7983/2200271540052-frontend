// import { useState, useEffect } from 'react';

// function URLStatistics() {
//   const [urls, setUrls] = useState([]);

//   useEffect(() => {
//     const savedUrls = JSON.parse(localStorage.getItem('shortenedUrls') || '[]');
//     setUrls(savedUrls.map(url => ({
//       ...url,
//       clicksData: url.clicksData || [{ timestamp: new Date(), source: 'direct', location: 'Unknown' }]
//     })));
//   }, []);

//   return (
//     <div style={{ padding: '1rem' }}>
//       <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>URL Statistics</h1>
//       <ul style={{ marginTop: '1rem' }}>
//         {urls.map((url, index) => (
//           <li key={index} style={{ border: '1px solid #ccc', padding: '0.5rem', marginBottom: '0.5rem' }}>
//             <p>Shortened URL: {url.shortenedUrl}</p>
//             <p>Created: {url.created.toString()}</p>
//             <p>Expiry: {url.expiry.toString()}</p>
//             <p>Clicks: {url.clicks || 0}</p>
//             <ul>
//               {url.clicksData.map((click, i) => (
//                 <li key={i} style={{ marginTop: '0.25rem' }}>
//                   <p>Timestamp: {click.timestamp.toString()}</p>
//                   <p>Source: {click.source}</p>
//                   <p>Location: {click.location}</p>
//                 </li>
//               ))}
//             </ul>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default URLStatistics;

import { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

function URLStatistics() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const savedUrls = JSON.parse(localStorage.getItem('shortenedUrls') || '[]');
    setUrls(savedUrls.map(url => ({
      ...url,
      clicksData: url.clicksData || [{ timestamp: new Date(), source: 'direct', location: 'Unknown' }]
    })));
  }, []);

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>URL Statistics</Typography>
      <List>
        {urls.map((url, index) => (
          <ListItem key={index} sx={{ border: '1px solid #ccc', mb: 1 }}>
            <ListItemText
              primary={`Shortened URL: ${url.shortenedUrl}`}
              secondary={
                <>
                  <Typography component="span">Created: {url.created.toString()}</Typography><br />
                  <Typography component="span">Expiry: {url.expiry.toString()}</Typography><br />
                  <Typography component="span">Clicks: {url.clicks || 0}</Typography>
                  {url.clicksData && url.clicksData.length > 0 && (
                    <Box mt={1}>
                      {url.clicksData.map((click, i) => (
                        <Box key={i} sx={{ ml: 2 }}>
                          <Typography>Timestamp: {click.timestamp.toString()}</Typography>
                          <Typography>Source: {click.source}</Typography>
                          <Typography>Location: {click.location}</Typography>
                        </Box>
                      ))}
                    </Box>
                  )}
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default URLStatistics;