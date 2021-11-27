import {environment} from '../../../environments/environment';
import {ImageKitResponse} from '../../models/image-kit';
import {generateNamedTransformation} from './image-kit.util';

const controller = new AbortController();

export class UploadAdapter {
  private loader: any;
  private url = 'https://upload.imagekit.io/api/v1/files/upload';
  constructor( loader ) {
    // The file loader instance to use during the upload.
    this.loader = loader;
  }

  // Starts the upload process.
  upload() {
    return new Promise((resolve, reject) => {
      this.loader.file
        .then(async (file) => {
          const fd = new FormData();
          fd.append('publicKey', environment.imageKitPublicKey);
          fd.append('file', file);
          fd.append('fileName', file.name);
          fd.append('folder', '/article_images/');
          fd.append('useUniqueFileName', 'false');
          // get auth tokens
          const request = await fetch(`${environment.proxyUrl}/auth`, {
            method: 'GET'
          });
          const body = await request.json();
          fd.append('signature', body.signature || '');
          fd.append('expire', body.expire || 0);
          fd.append('token', body.token);
          // upload images
          fetch(this.url, {
            method: 'POST',
            body: fd,
          }).then(response => response.json())
            .then((res: ImageKitResponse) => {
              resolve({default: res.url});
            }).catch(err => {
              reject(err);
          });
        });
    });
  }

  // Aborts the upload process.
  abort() {
    // Reject the promise returned from the upload() method.
    controller.abort();
  }
}
