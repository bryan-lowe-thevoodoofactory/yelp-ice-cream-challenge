import React, { useEffect, useState } from 'react';
import { Card, Image } from 'semantic-ui-react';

export default function ShopList() {
    const [shopList, setShopList] = useState([]);

    useEffect(() => {
        const fetchYelpData = async () => {
            // gather ice cream businesses
            const response = await fetch("http://localhost:5000/api/get-shop-list");
            const shopData = await response.json();
        
            // Validate and set data
            if (Array.isArray(shopData) && shopData.length) {
                setShopList(shopData);
            }
        }
      
        fetchYelpData().catch(console.error);
    }, []);

    const renderShopList = () => (
        shopList.map((shop, index) => (
            <Card key={index}>
                <Image src={shop.image} wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{shop.businessName}</Card.Header>
                    <Card.Meta>
                        <p>{shop.address1} {shop.address2}</p>
                        <p>{shop.city}, {shop.state} {shop.zipCode}</p>
                    </Card.Meta>
                    <Card.Description>
                        <p>{shop.review}</p>
                        <p>{shop.reviewer}</p>
                    </Card.Description>
                </Card.Content>
            </Card>
        ))
    );

    return (
        <Card.Group>
            {shopList.length ? renderShopList() : (
                <Card>
                    <Card.Content>
                        <Card.Header>Cannot Retrieve Data. Check backend/config.js and ensure the API has been added.</Card.Header>
                    </Card.Content>
                </Card>
            )}
        </Card.Group>
    );
}