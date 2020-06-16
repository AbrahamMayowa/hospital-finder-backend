import React, { useState, useEffect} from 'react';
import './App.css';
import { Input, Select} from 'antd'
import{Loading} from './components/Loading'
import { logDOM } from '@testing-library/react';


function App() {
  const { Search} = Input
  const {Option} = Select

  
  

  interface Result{
    business_Status: string | null
     formatted_address: string | null
     geometry: object | null
     name: string
     rating: number
     user_rating_total: number
     photo: any[]
     distance: number
  }

  interface Hospitals{
    hospitals: object | undefined
    error: object | undefined
    loading: boolean
  }

  interface Input{
    searchQuery: string | undefined,
    radius: number | undefined,
    latitude: number | undefined,
    longitude: number | undefined,
    error: string | undefined

  }

  interface ErrorCode{
    code: number
  }
  
  interface CooordObject{ 
    longitude: number
    latitude: number
  }
  
  interface Coords{
    coords: CooordObject
  }

 

  const [locationData, setLocationData] = useState<Hospitals | null>(null)
  const [searchInput, setSearchInput] = useState<Input | null>(null)

  const handleDispatch= async ()=>{
      setLocationData({
        hospitals: locationData?.hospitals,
        error: locationData?.error,
        loading: true
      })
      console.log(locationData)
      try{
      const response = await fetch('/',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          querySearch: searchInput?.searchQuery,
          geoFence: searchInput?.radius,
          latitude: searchInput?.latitude,
          longitude: searchInput?.latitude,
        })
      })
      if(!response.ok){
        throw new Error('Server error')
      }
      const resData: object = await response.json()
      setLocationData({hospitals: resData, error: undefined, loading: false})
      console.log(locationData)
      }catch(error){
        console.log(error)
        setLocationData({
          hospitals: locationData?.hospitals,
          error: error,
          loading: false
        })
      }
  }


  const handleGeoPermission=()=>{
    navigator.geolocation.getCurrentPosition(
      displayLocationInfo,
      handleLocationError,
      { timeout: 5000 }
    );
  }
  const displayLocationInfo=(position: Coords)=>{
    const lng = position.coords.longitude
    const lat = position.coords.latitude

    setSearchInput({
      searchQuery: searchInput?.searchQuery, 
      radius: searchInput?.radius, 
      latitude: lat, 
      longitude: lng,
      error: ''
    })

  }

  const handleLocationError=(error: ErrorCode)=>{
    setSearchInput({
      searchQuery: searchInput?.searchQuery, 
      radius: searchInput?.radius, 
      latitude: searchInput?.latitude, 
      longitude: searchInput?.longitude,
      error: 'Permission to get your location denied. Location finder cannot without knowing your location'
    })
    
  }


  const handleSelectChange=(value: number)=>{
    setSearchInput({
      searchQuery: searchInput?.searchQuery, 
      radius: value, 
      latitude: searchInput?.latitude, 
      longitude: searchInput?.longitude,
      error: searchInput?.error
    })
  }

  const handleSearchQuery=(value: string)=>{
    setSearchInput({
      searchQuery: value, 
      radius: searchInput?.radius, 
      latitude: searchInput?.latitude, 
      longitude: searchInput?.longitude,
      error: searchInput?.error
    })
  }

  useEffect(()=>{
    handleGeoPermission()
  }, [])

  return (
    <div className="App">
     
      <div className='header-wrapper'>
        <div className='website-name'>
          HospitalFinder
        </div>
        <div className='text-wrapper'>
        <p className='header-main-text'>Find nearest hospital around you</p>
        <p className='header-sec-text'>Emergency situation require quick findings</p>
        </div>
        <div className='input-wrapper'>
        <Search
        placeholder="Input location text"
        enterButton="Search"
        size="large"
        className='search'
        onSearch={value => {
          handleSearchQuery(value)
          handleDispatch()
        }}
        />
        <Select
        style={{ width: 200 }}
        placeholder="Choose a radius"
        onChange={handleSelectChange}
        className='select'
        >
        <Option value={10000} >10km</Option>
        <Option value={20000}>20km</Option>
        <Option value={30000}>30km</Option>
        <Option value={50000}>50km</Option>
        </Select>
          
        </div>
      </div>
     
        {locationData?.loading && <Loading />}
        <Loading />
       

    </div>
  );
}

export default App;
