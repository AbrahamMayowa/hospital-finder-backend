import SearchHistory from '../model'
const serviceAccount = require('../firebaseCredential.json')
import rp from 'request-promise'
import validator from 'validator'
import * as admin from "firebase-admin"
const db = require('../firebase')
import {Request} from 'express'
import { userInfo } from 'os';
import { maxHeaderSize } from 'http';


interface SearchInput{
   querySearch: string
   geoFence: number
   latitude: number
   longitude: number
   searchType: string
}

interface RequestObject {
    uri: string
    headers: object
    json: boolean
}

interface ExpressRequest extends Request{
    userId: string
}

interface EachSearch{
    formatted_address: string
    name: string
    user_rating_total: number
}

interface DataObject{
    results: EachSearch[]
}

interface ApiResponse{
    data: DataObject
}



const mainResolver = {
    //resolve places finding logic and populate user search history
    getSearch: async function({querySearch, geoFence, latitude, longitude, searchType}:SearchInput, req:ExpressRequest){
        
        let uri: string = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${querySearch}&location=${latitude},${longitude}&region=ng&radius=${geoFence}&key=${process.env.GOOGLE_API}`
    
        // api resquest configuration
        const options: RequestObject = {
            uri: uri,
          
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true 
        }
        
        // req.userId populated from auth custom middleware
        const userId = req.userId

        // user specific seearch history
        const searchDb = new SearchHistory(
            querySearch, 
            geoFence, 
            latitude, 
            longitude,
            userId
        )
          // store the class instances in the db
        searchDb.createHistory()

        const responseData: ApiResponse = await rp(options)
          
        //return array of object
        return responseData.data.results.map(item => ({
           
                formatted_address: item.formatted_address,
                name: item.name,
                user_rating_total: item.user_rating_total
          })
        )
    },

    getHistory: async function(args:any, req:ExpressRequest){
        const allHistory: any[] = await SearchHistory.getHistory(req.userId)
        return allHistory.map(item=>{
            return {
                latitude: item.latitude,
                longitude: item.longitude,
                querySearch: item.querySearch
            }
        })
    }


}

export default mainResolver






