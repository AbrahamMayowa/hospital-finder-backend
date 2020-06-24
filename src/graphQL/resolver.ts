import SearchHistory from '../../model'
const serviceAccount = require('../../firebaseCredential.json')
import rp from 'request-promise'
import validator from 'validator'
import * as admin from "firebase-admin"
const db = require('../../firebase')
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

interface InputObject{
    searchInput: SearchInput
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
    user_ratings_total: number
}

interface DataObject{
    results: EachSearch[]
}

interface ApiResponse{
    results: EachSearch[]
}



const mainResolver = {
    //resolve places finding logic and populate user search history
    getSearch: async function({searchInput}:InputObject, req:ExpressRequest){
        if(!req.userId){
            //user is not authenticated
            throw Error('Access Forbidding')
        }
        let uri: string = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchInput.querySearch}&location=${searchInput.latitude},${searchInput.longitude}&region=ng&radius=${searchInput.geoFence}&key=${process.env.GOOGLE_API}`
        
        try{
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
            searchInput.querySearch, 
            searchInput.geoFence, 
            searchInput.latitude, 
            searchInput.longitude,
            userId
        )
          // store the class instances in the db
        searchDb.createHistory()

        const responseData: ApiResponse = await rp(options)
          
        //return array of object
        return responseData.results.map(item => ({
                formatted_address: item.formatted_address,
                name: item.name,
                user_rating_total: item.user_ratings_total
          })
        )
        }catch(error){
            throw error
        }
    },

    getHistory: async function(args:any, req:ExpressRequest){
        if(!req.userId){
            //user is not authenticated
            throw Error('Access Forbidding')
        }
        try{
            const allHistory: any[] = await SearchHistory.getHistory(req.userId)
            return allHistory.map(item=>{
                return {
                    latitude: item.latitude,
                    longitude: item.longitude,
                    querySearch: item.querySearch
                }
            })
        }catch(error){
            console.log(error)
            throw error
        }
       
        
    }


}

export default mainResolver






