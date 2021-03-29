import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import firebase from "firebase/app";
import "firebase/storage";
import * as fileSaver from 'file-saver';

const baseUrl = 'https://fgwmag.herokuapp.com/api/Home/Download';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(
    private http: HttpClient,
    private db: AngularFireDatabase,
    private storage: AngularFireStorage) { }

  download(): Observable<any> {
    return this.http.get(`${baseUrl}`);
  }


  downloadViaUrl() {
    const storageRef = firebase.storage().ref();

    // [START storage_download_via_url]
    storageRef.child('download.zip').getDownloadURL()
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'
        url = "https://firebasestorage.googleapis.com/v0/b/comp1640-976c9.appspot.com/o/download.zip?alt=media&token=49e6bc0e-8cf8-414d-8c0a-802df117fa0c";
        // This can be downloaded directly:
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
          var blob = xhr.response;
          fileSaver.saveAs(blob, 'contributions.zip');
        };
        xhr.open('GET', url);
        xhr.send();

      })
      .catch((error) => {
        // Handle any errors
        console.log(error);
      });
    // [END storage_download_via_url]
  }
}
