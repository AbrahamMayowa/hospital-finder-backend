
import * as admin from "firebase-admin"
//import {db} from './firebase'



class SearchHistory{
    querySearch: string
    geoFence: number
    latitude: number
    longitude: number
    actionDate: any

  constructor(querySearch: string, geoFence: number, latitude: number, longitude: number){
      this.querySearch = querySearch;
      this.geoFence = geoFence;
      this.latitude = latitude;
      this.longitude = longitude;
      this.actionDate = new Date()
  }

  createHistory=()=>{
    let db = admin.firestore()
      let docRef = db.collection('searchHistory').doc();
      docRef.set({
       querySearch: this.querySearch,
       geoFence: this.geoFence,
       latitude: this.latitude,
       longitude: this.longitude,
       ActionDate: new Date()
      });
  }

  static getHistory = async ()=>{
    let db = admin.firestore()
    const searchCollection = db.collection('searchHistory')
    const result = await searchCollection.get()
    const docResult = result.docs.map(item=> item.data())
    return docResult
  }

}

export default SearchHistory