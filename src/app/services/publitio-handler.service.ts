import { Injectable } from '@angular/core';
import PublitioAPI from 'publitio_js_sdk';

@Injectable({
  providedIn: 'root'
})
export class PublitioHandlerService {
  private API_KEY = 'Lxn0sjGHu6ipVGdB9QQ7';
  private API_SECRET = 'jGbGsmWvJdh8QDjudWD9Sm2XT0bNZVh1';
  constructor() { }
  getList(folderName: string): Promise<any> {
    const publitio = new PublitioAPI(this.API_KEY, this.API_SECRET);
    return publitio.call('/files/list', 'GET', { offset: '0', limit: '10', folder: folderName })
      .then(response => {
        console.log(response);
        return response;
        //console.log(response.files[0].public_id);

      })
      .catch(error => { console.log(error) })
  }
  getFile(fileId:any): Promise<any> {
    const publitio = new PublitioAPI(this.API_KEY, this.API_SECRET);
    return publitio.call('/files/show/' + fileId, 'GET')
      .then(response => {
        console.log(response);
        return response;
        //console.log(response.files[0].public_id);

      })
      .catch(error => { console.log(error) })
  }
  updateFile(postData: any): Promise<any> {
    const publitio = new PublitioAPI(this.API_KEY, this.API_SECRET);
    return publitio.call('/files/update/' + postData.file_id, 'PUT', {
      title: postData.title,
      description: postData.description,
      tags: postData.tags,
      privacy: '1',
      option_download: '0',
      option_ad: '1',
      folder: postData.folder
    }).then((data) => { console.log(data) })
      .catch((error) => { console.log(error) })
  }
  uploadFile(postData: any, itemData: any): Promise<any> {
    console.log(itemData);
    const publitio = new PublitioAPI(this.API_KEY, this.API_SECRET);
    return publitio.uploadFile(postData, 'file', {
      public_id: itemData.name,
      description: itemData.description,
      folder: itemData.coaching_id,
      title: itemData.name
    })
      .then((data) => { console.log(data); return data })
      .catch((error) => { console.log(error) })
  }
  uploadUserDp(postData: any, itemData: any): Promise<any> {
    console.log(itemData);
    const publitio = new PublitioAPI(this.API_KEY, this.API_SECRET);
    return publitio.uploadFile(postData, 'file', {
      public_id: itemData.name,
      description: itemData.description,
      folder: itemData.folder_name,
      title: itemData.name
    })
      .then((data) => { console.log(data); return data })
      .catch((error) => { console.log(error) })
  }
  createFolder(folderName: any): Promise<any> {
    const publitio = new PublitioAPI(this.API_KEY, this.API_SECRET);
    // Create a new folder, with options name=MyFolder, parent_id=4vZsZBGa
    return publitio.call('/folders/create', 'POST', {
      name: folderName
    }).then((data) => { console.log(data); return data })
      .catch((error) => { console.log(error) })
  }
  deleteFile(fileID: any): Promise<any> {
    const publitio = new PublitioAPI(this.API_KEY, this.API_SECRET);
    return publitio.call('/files/delete/' + fileID, 'DELETE')
      .then((data) => { console.log(data); return data })
      .catch((error) => { console.log(error) })
  }
}
