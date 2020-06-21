
import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from 'body-parser'
import rp from 'request-promise'
import * as admin from "firebase-admin"
const serviceAccount = require('../firebaseCredential.json');
import SearchHistory from "../model";
import { promises } from "fs";
const db = require('../firebase')

 
const app = express();



app.use(helmet());
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/search-history', async (req, res)=>{
  try{
    const allHistory = await SearchHistory.getHistory()
    res.status(200).json({history: allHistory})
  }catch(error){
    res.status(404).json({error})
  }
})


app.post('/', async (req, res)=>{

    const querySearch: string = req.body.querySearch
    const geoFence : number = req.body.geoFence
    const latitude : number  = req.body.latitude
    const longitude : number = req.body.longitude
    console.log(querySearch, geoFence, latitude, longitude)
 
    interface RequestObject {
        uri: string;
        headers: object;
        json: boolean;
    }

    let uri: string = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${querySearch}&location=${latitude},${longitude}&region=ng&radius=${geoFence}&key=${process.env.GOOGLE_API}`


    const options: RequestObject = {
        uri: uri,
      
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true 
    }

    try{
      const searchDb = new SearchHistory(
        querySearch, 
        geoFence, 
        latitude, 
        longitude,
      )
      // store the class instances in the db
      searchDb.createHistory()
      const responseData: object = await rp(options)
      res.status(201).json({data: responseData})
    }catch(error){
        console.log(error)
        res.status(500).json({error: 'server error '})
    }
})


interface ClosingSer{
  close: any
}



  const server = app.listen(process.env.PORT, () => {
 
    console.log(`Listening on port ${process.env.PORT}`);
    });


  type ModuleId = string | number;

  interface WebpackHotModule {
    hot?: {
      data: any;
      accept(
        dependencies: string[],
        callback?: (updatedDependencies: ModuleId[]) => void,
      ): void;
      accept(dependency: string, callback?: () => void): void;
      accept(errHandler?: (err: Error) => void): void;
      dispose(callback: (data: any) => void): void;
    };
  }
  
  declare const module: WebpackHotModule;
  
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => server.close());
  }
  