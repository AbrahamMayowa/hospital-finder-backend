
import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';

interface ExpressRequest extends Request{
    userId: string| null,
}

const getAuthTokenMiddleware = async(req:ExpressRequest, res:Response, next:NextFunction) => {
    
    if (
      req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
        const token: string = req.headers.authorization.split(' ')[1];
        const userInfo = await admin.auth().verifyIdToken(token);
        req.userId = userInfo.uid;
    } else {
      req.userId = null
    }
    next();
  }
export default getAuthTokenMiddleware
  