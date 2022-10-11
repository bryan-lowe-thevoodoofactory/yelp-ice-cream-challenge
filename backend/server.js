import config from './config.js';
import cors from 'cors';
import express from 'express';
import fetch from 'node-fetch';

const app = express();
app.use(cors({
    origin: 'http://localhost:3000'
}));
const port = process.env.PORT || 5000;

app.get('/api/get-shop-list', async (req, res) => {
    const headers = {
        "Authorization": `Bearer ${config.apiKey}`
    };

    // retrieve ice cream shops
    const businessResponse = await fetch('https://api.yelp.com/v3/businesses/search?term=icecream&location=Alpharetta&sort_by=rating&limit=5', {
        headers 
    });
    const businessData = await businessResponse.json();
    
    let shopData = [];
    if (Array.isArray(businessData.businesses)) {
        for (let i = 0; i < businessData.businesses.length; i++) {
            const business = businessData.businesses[i];
            // retreive business review
            const reviewResponse = await fetch(`https://api.yelp.com/v3/businesses/${business.id}/reviews`, {
                headers 
            });
            const reviewList = await reviewResponse.json();
            const reviewData = !!reviewList.reviews && Array.isArray(reviewList.reviews) ? reviewList.reviews[0] : {};
            
            // construct shop data
            let reviewEntry = {};
            if (!!business.name && !!reviewData.user && !!reviewData.text) {
                reviewEntry = {
                    businessName: business.name,
                    image: business.image_url,
                    address1: business.location.address1,
                    address2: business.location.address2,
                    city: business.location.city,
                    state: business.location.state,
                    zipCode: business.location.zip_code,
                    reviewer: !!reviewData.user ? reviewData.user.name : "",
                    review: reviewData.text || ""
                };
            }
            shopData.push(reviewEntry)
        }
    }
    res.send(shopData);
});

app.listen(port, () => console.log(`Listening on port ${port}`));