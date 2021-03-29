import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import firebase from "firebase/app";
import "firebase/storage";

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

  downloadCreateRef() {
    // [START storage_download_create_ref]
    // Create a reference with an initial file path and name
    var storage = firebase.storage();
    var pathReference = storage.ref('download.zip');

    // Create a reference from a Google Cloud Storage URI
    var gsReference = storage.refFromURL('gs://comp1640-976c9.appspot.com/download.zip');

    // Create a reference from an HTTPS URL
    // Note that in the URL, characters are URL escaped!
    var httpsReference = storage.refFromURL('https://firebasestorage.googleapis.com/b/comp1640-976c9.appspot.com/o/download.zip');
    // [END storage_download_create_ref]
  }

  downloadViaUrl() {
    const storageRef = firebase.storage().ref();

    // [START storage_download_via_url]
    storageRef.child('download.zip').getDownloadURL()
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'
        url = "gs://comp1640-976c9.appspot.com/download.zip";
        // This can be downloaded directly:
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
          var blob = xhr.response;
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
