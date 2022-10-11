import React, { useEffect, useState } from 'react';
import { Card, Image } from 'semantic-ui-react';

export default function ShopList() {

    const [shopList, setShopList] = useState([]);

    useEffect(() => {
        const fetchYelpData = async () => {
          const shopData = await fetch("/api/get-shop-list");
          console.log("Shop Data", shopData);
        }
      
        fetchYelpData().catch(console.error);
      }, [])

    return (
        <Card.Group>
            <Card>
                <Image src='https://s3-media2.fl.yelpcdn.com/bphoto/bSzSbY0bSSMkLhX7qc7iwg/o.jpg' wrapped ui={false} />
                <Card.Content>
                    <Card.Header>Sweet Charlie's</Card.Header>
                    <Card.Meta>
                        <p>580 E Crossville Rd</p>
                        <p>Roswell, GA 30075</p>
                    </Card.Meta>
                    <Card.Description>
                        <p>It's smells great as soon as you walk in. Everyone is so friendly. This place is an whole experience from picking your ice cream, to watching them make it...</p>
                        <p>Dej C.</p>
                    </Card.Description>
                </Card.Content>
            </Card>
        </Card.Group>
    );
}