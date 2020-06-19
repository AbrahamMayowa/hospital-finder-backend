
import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from 'body-parser'
import rp from 'request-promise'
import path from 'path'



 
const PORT: number = parseInt(process.env.PORT as string, 10);
 
const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))



app.post('/', async (req, res)=>{
    const querySearch: string = req.body.querySearch
    const geoFence : number | null = req.body.geoFence
    const latitude : number | null = req.body.latitude
    const longitude : number | null = req.body.longitude
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
    const responseData: object = await rp(options)
    res.status(200).json({data: responseData})
    }catch(error){
        console.log(error)
        res.status(500).json({error: 'server error '})
    }
})


const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
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
  