import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http: HttpClient) { }
  postCall(serviceName: string, data: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers, withCredentials: false };
    const url = environment.apiUrl + serviceName;
    console.log( JSON.stringify(data));
    return this.http.post(url, JSON.stringify(data), options);
  }
  getCall(serviceName: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const options = { headers: headers, withCredentials: false };
    const url = environment.apiUrl + serviceName;
    //return this.http.post(url, data, options);
    return this.http.get(url, options);
  }
  getAuthHeaderCall(serviceName: any,token:any) {

    const headers=new HttpHeaders({
      Authorization:token
    });
    //const options = { headers: headers, withCredentials: true };
    const url = environment.apiUrl + serviceName;
    return this.http.get(url, {headers,withCredentials: false});
  }
  putCall(serviceName:any,data:any,token:any){
    const headers=new HttpHeaders({
      'Content-Type':'application/json',
      Authorization:token
    });
    const url = environment.apiUrl + serviceName;
    console.log(JSON.stringify(token));
    return this.http.put(url,JSON.stringify(data),{headers,withCredentials:false});
  }
  postCallToken(serviceName:any,data:any,token:any){
    const headers=new HttpHeaders({
      'Content-Type':'application/json',
      Authorization:token
    });
    const url = environment.apiUrl + serviceName;
    return this.http.post(url,JSON.stringify(data),{headers,withCredentials:false});
  }
  //================================= XXXXXXXXX ===========================================
  uploadUserDp(uploadImageData:any,serviceName:any,token:any){
    const headers=new HttpHeaders({
      Authorization:token
    });
    const url = environment.apiUrl + serviceName;
     return this.http.post(url, uploadImageData, {headers,observe: 'response' });
  }
  uploadCoachingDp(uploadImageData:any,serviceName:any,token:any){
    const headers=new HttpHeaders({
      Authorization:token
    });
    const url = environment.apiUrl + serviceName;
     return this.http.post(url, uploadImageData, {headers,observe: 'response' });
  }
}
