import { Injectable } from '@angular/core';
declare global { interface Window { AdobeDC: any; } }
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViewSDKClientService {
  adobeApiKey = environment.adobeApiKey;
  annotList: any = [];
  pdfRef: any;
  pdfBlob: any;

  readyPromise: Promise<any> = new Promise((resolve) => {
    if (window.AdobeDC) {
      resolve(true);
    } else {
      /* Wait for Adobe Document Services PDF Embed API to be ready */
      document.addEventListener('adobe_dc_view_sdk.ready', () => {
        resolve(true);
      });
    }
  });
  adobeDCView: any;
  ready() {
    return this.readyPromise;
  }
  previewFile(divId: string, viewerConfig: any, fileName: string, displayFilename: any) {
    const config: any = {
      /* Pass your registered client id */
      clientId: this.adobeApiKey // we can import from environment file
    };
    if (divId) { /* Optional only for Light Box embed mode */
      /* Pass the div id in which PDF should be rendered */
      config.divId = divId;
    }
    /* Initialize the AdobeDC View object */
    this.adobeDCView = new window.AdobeDC.View(config);
    /* Invoke the file preview API on Adobe DC View object */
    const previewFilePromise = this.pdfRef = this.adobeDCView.previewFile({
      /* Pass information on how to access the file */
      content: {
        /* Location of file where it is hosted */
        location: {
          url: fileName, // pdf file,
          /*
          If the file URL requires some additional headers, then it can be passed as follows:-
          headers: [
              {
                  key: '<HEADER_KEY>',
                  value: '<HEADER_VALUE>',
              }
          ]
          */
        },
      },
      /* Pass meta data of file */
      metaData: {
        /* file name */
        fileName: displayFilename,
        /* file ID */
        id: 'mmy file id'
      }
    }, viewerConfig);

    const saveOptions = {
      showSaveButton: false,
      autoSaveFrequency: 1
    }
    let that = this;
    this.adobeDCView.registerCallback(
      window.AdobeDC.View.Enum.CallbackType.SAVE_API,
      function (metaData, content, options) {        
        /* Add your custom save implementation here...and based on that resolve or reject response in given format */
        that.pdfBlob = content;
        
        return new Promise((resolve, reject) => {
          resolve({
            code: window.AdobeDC.View.Enum.ApiResponseCode.SUCCESS,
            data: {
              /* Updated file metadata after successful save operation */
              metaData: metaData
            }
          });
        });
      },
      saveOptions
    );
  }
}
