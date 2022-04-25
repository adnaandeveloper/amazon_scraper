const express = require('express');
const request = require('request-promise');
const app = express();
const PORT = process.env.PORT || 5001;

//const apiKey = 'ce85ccfc42944d2745b37b35cf02bc4a';
//const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

const generateScraperUrl = (apiKey) =>
  `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Welcome to Amazon Scraper API');
});

// get product Details
app.get('/products/:productId', async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.params;

  try {
    const response = await request(
      `${generateScraperUrl(
        baseUrl
      )}&url=https://www.amazon.com/dp/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

// get product reviews

app.get('/products/:productId/reviews', async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.params;

  try {
    const response = await request(
      `${generateScraperUrl(
        baseUrl
      )}&url=https://www.amazon.com/product-reviews/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

// get product Offers/tilbud macnaha
app.get('/products/:productId/offers', async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.params;
  try {
    const response = await request(
      `${generateScraperUrl(
        baseUrl
      )}&url=https://www.amazon.com/gp/offer-listing/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

// Get search result
app.get('/search/:searchQuery', async (req, res) => {
  const { searchQuery } = req.params;
  const { api_key } = req.params;

  try {
    const response = await request(
      `${generateScraperUrl(
        baseUrl
      )}&url=https://www.amazon.com/s?k=/${searchQuery}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
