
import * as admin from "firebase-admin"
import { userInfo } from "os"
//import {db} from './firebase'



class SearchHistory{
    querySearch: string
    geoFence: number
    latitude: number
    longitude: number
    actionDate: any
    userId: string

  constructor(querySearch: string, geoFence: number, latitude: number, longitude: number, userId: string){
      this.querySearch = querySearch;
      this.geoFence = geoFence;
      this.latitude = latitude;
      this.longitude = longitude;
      this.actionDate = new Date();
      this.userId = userId
  }

  createHistory=()=>{
    let db = admin.firestore()
      let docRef = db.collection('searchHistory').doc();
      docRef.set({
       querySearch: this.querySearch,
       geoFence: this.geoFence,
       latitude: this.latitude,
       longitude: this.longitude,
       actionDate: this.actionDate,
       userId: this.userId
      });
  }

  static getHistory = async (userId:string)=>{
    let db = admin.firestore()
    const searchCollection = db.collection('searchHistory')
    const result = await searchCollection.get()
    // only search history of authenticated user will be return
    return result.docs.filter(item=> item.data().userId === userId)
    //return docResult.filter(item=> item.userId === userId)
  }

}

export default SearchHistory