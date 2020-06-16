import React from 'react';

interface LocationInterface{
    business_Status: string | null
     formatted_address: string | null
     geometry: object | null
     name: string
     rating: number
     user_rating_total: number
     photo: any[]
     distance: number
 }
 
interface LocationProps {
    locationDetails: LocationInterface
}

export const LocationCard=({locationDetails}: LocationProps)=>{
    return(
        <div className='card-wrapper'>
            <div className='card-image-wrapper'>
                {locationDetails.photo[0].html_attribute[0]}
            </div>
            <div className='card-info'>
                <h2 className='name'>{locationDetails.name}</h2>
                <div className='address-distance'>
                    <span className='address'>{locationDetails.formatted_address}</span>
                    <span className='distance'>{locationDetails.distance}</span>
                </div>
                <div className='business-rating'>
                    <span className='business-status'>{locationDetails.business_Status}</span>
                    <span className='rating'>{locationDetails.rating}</span>
                </div>
            </div>
        </div>
    )
}