import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function CommunityDetails() {
    const { communityId } = useParams();
    const [community, setCommunity] = useState(null);

    useEffect(() => {
        const fetchCommunityDetails = async () => {
            try {
                const response = await fetch(`http://localhost:4000/postData/CommunityView/${communityId}`);
                const data = await response.json();
                setCommunity(data);
            } catch (error) {
                console.error("Error fetching community details:", error);
            }
        };

        // Only fetch if `community` is not already set (or when communityId changes)
        if (!community && communityId) {
            fetchCommunityDetails();
        }

    }, [communityId, community]);

    if (!community) return <p>Loading...</p>;

    console.log(community);

    return (
        <div>
            <h1>{community.data.cn}</h1>
            <img src={`http://localhost:4000/${community.data.photo}`} alt={community.data.cn} />
            <p>{community.data.description}</p>
            <p>Location: {community.data.location}</p>
            {/* Add more fields as needed */}
        </div>
    );
}

export default CommunityDetails;
