import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/get-shop-list', async (req, res) => {
    const response = await fetch('https://api.yelp.com/v3/businesses/search?term=icecream&location=Alpharetta&sort_by=rating&limit=5', {
        headers: {
            "Authorization": "Bearer tSa2b9vbjHFENpR7kp6_-0gUn2mEu2mwZv0POUglz1bpmvmXznhQwiarEOLTSZb52G3gFtgYMRsPFBWFwPga7lFgUEhFtmqPtcbHC8Kpp-fy8gQXCjgTL-dbHKlEY3Yx"
        }
    });
    const shopData = await response.json();
    res.send(shopData);
});

app.listen(port, () => console.log(`Listening on port ${port}`));