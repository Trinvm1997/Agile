import { FileUpload } from './file.model';

describe('FileUpload', () => {
  it('should create an instance', () => {
    let file: File;
    expect(new FileUpload(file)).toBeTruthy();
  });
});
