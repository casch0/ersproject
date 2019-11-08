import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private httpClient: HttpClient) { }

  async uploadHttp(selectedFile: File){

    const url = 'http://localhost:8081/Project1/S3Upload';

    const data = await this.httpClient.post(url, selectedFile).toPromise();

    return JSON.parse(JSON.stringify(data));
  }
}
