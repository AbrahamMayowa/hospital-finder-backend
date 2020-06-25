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
    type: []
}



const mainResolver = {
    //resolve places finding logic and populate user search history
    getSearch: async function({searchInput}:InputObject, req:ExpressRequest){
        let query;
        let additionQuery
        if(searchInput.searchType === 'pharmacy'){
            additionQuery = 'pharmacies'
            query= `${additionQuery} in ${searchInput.querySearch}`
        }else if(searchInput.searchType === 'clinics'){
            additionQuery = 'clinics'
            query= `${additionQuery} in ${searchInput.querySearch}`
        }else if(searchInput.searchType === 'medical offices'){
            additionQuery = 'medical offices'
            query= `${additionQuery}  ${searchInput.querySearch}`
        }else{
            additionQuery = 'hospitals'
            query= `${additionQuery} in ${searchInput.querySearch}`
        }
        
        console.log(query)
        if(!req.userId){
            //user is not authenticated
            throw Error('Access Forbidding')
        }

       
        //`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=hospitals in ${ searchInput.querySearch}&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,user_ratings_total&locationbias=circle:${searchInput.geoFence}@${searchInput.latitude},${searchInput.longitude}&key=${process.env.GOOGLE_API}`
        let uri: string = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&location=${searchInput.latitude},${searchInput.longitude}&region=ng&radius=${searchInput.geoFence}&key=${process.env.GOOGLE_API}`
        
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
            query, 
            searchInput.geoFence, 
            searchInput.latitude, 
            searchInput.longitude,
            userId,
            searchInput.searchType
        )
          // store the class instances in the db
        searchDb.createHistory()

        const responseData: ApiResponse = await rp(options)
        console.log(responseData)
        
          
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
            console.log(allHistory)
            return allHistory.map(item=>{
                let itemSplit = item.querySearch.split(' ')
                const updateSplite = itemSplit.slice(2)
                const updatedQuery = updateSplite.join(' ')
                return {
                    latitude: item.latitude,
                    longitude: item.longitude,
                    querySearch: updatedQuery,
                    geoFence: item.geoFence,
                    searchType: item.searchType
                }
            })
        }catch(error){
            console.log(error)
            throw error
        }
       
        
    }


}

export default mainResolver






