const express = require('express');
const request = require('request');

const app = express();

// Endpoint to get IP, city and ISP details of a given IP address
app.get('/ip-details', (req, res) => {
  const apiKey = 'c202b88145d341ea98cd4e4f3cac5e7a'; // Replace with your API key from https://ipgeolocation.io/
  const ip = req.query.ip;

  if (!ip) {
    return res.status(400).json({ error: 'IP address is required' });
  }

  const url = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${ip}&fields=city,country_name,country_code2,country_capital,calling_code,district,city,zipcode,state_prov,latitude,longitude,time_zone,currency,country_flag,continent_code,continent_name,country_tld,languages,isp,organization,connection_type`;

  request(url, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const data = JSON.parse(body);
      res.json(data);
    } else {
      res.status(response.statusCode).json({ error: error });
    }
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
