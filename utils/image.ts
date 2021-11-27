import axios from 'axios';
export function showAvatar(url) {
    return url ? url : '/images/default-user-avatar.png';
}

export function getObjectURL(imageObj) {
    return URL.createObjectURL(imageObj);
}
/*
* Imagekit.io is the default image processing service for thinkinary
*  User this service to upload files to imagekit
*  check out the documentation to add your custom methods to this service...
* */
import {ImageKitResponse} from '../models/image-kit';

export class ImageKitService {
  static url = 'https://upload.imagekit.io/api/v1/files/upload';

  constructor() { }

   static upload(file, fileName, folder = '/article_images/'): Promise<ImageKitResponse> {
    return new Promise(async(resolve, reject) => {
        try {
            const fd = new FormData();
            fd.append('publicKey', 'public_ncxty35WRxSDwNis3bjWjAZv3E0=');
            fd.append('file', file);
            fd.append('fileName', fileName);
            fd.append('folder', folder);
            fd.append('useUniqueFileName', 'true');
            // get auth tokens
            const request = await axios.get(`/api/imagekit/auth`);
            const body = await request.data;

            fd.append('signature', body.signature || '');
            fd.append('expire', body.expire || 0);
            fd.append('token', body.token);
            // upload images
            const _request = await axios.post(this.url, fd);
            resolve(_request.data);
        } catch(e) {
            reject(e)
        }
    })
  }
  /*
  * Delete file
  * */
  static deleteFile(fileId: string) {
    return axios.post(`/api/imagekit/delete?fileId=${fileId}`);
  }

}

