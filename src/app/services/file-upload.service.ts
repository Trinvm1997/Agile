import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUpload } from '../models/file.model';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private basePathAvatar = '/uploads';
  private basePathContribution = '/downloads';



  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage) { }
  
  pushFileToStorage(fileUpload: FileUpload): Observable<number> {
    const filePath = `${this.basePathAvatar}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload);
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

  private saveFileData(fileUpload: FileUpload): void {
    this.db.list(this.basePathAvatar).push(fileUpload);
  }

  getFiles(numberItems): AngularFireList<FileUpload> {
    return this.db.list(this.basePathAvatar, ref =>
      ref.limitToLast(numberItems));
  }

  deleteFile(fileUpload: FileUpload): void {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this.basePathAvatar).remove(key);
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePathAvatar);
    storageRef.child(name).delete();
  }

  pushFileToStorageContribution(fileUpload: FileUpload): Observable<number> {
    const filePath = `${this.basePathContribution}/${fileUpload.file.name.replace(/ /g,"")}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileDataContribution(fileUpload);
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

  private saveFileDataContribution(fileUpload: FileUpload): void {
    this.db.list(this.basePathContribution).push(fileUpload);
  }

  getFilesContribution(numberItems): AngularFireList<FileUpload> {
    return this.db.list(this.basePathContribution, ref =>
      ref.limitToLast(numberItems));
  }

  deleteFileContribution(fileUpload: FileUpload): void {
    this.deleteFileDatabaseContribution(fileUpload.key)
      .then(() => {
        this.deleteFileStorageContribution(fileUpload.name);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabaseContribution(key: string): Promise<void> {
    return this.db.list(this.basePathContribution).remove(key);
  }

  private deleteFileStorageContribution(name: string): void {
    const storageRef = this.storage.ref(this.basePathContribution);
    storageRef.child(name).delete();
  }
}
