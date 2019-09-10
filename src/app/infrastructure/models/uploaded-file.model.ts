export class UploadedFile implements IUploadedFile {
 public id: number;
 public path: string;
 public isActive: boolean;
 public copyrights: ICopyright[];
 public uploadedFileID: number;

  constructor(src: IUploadedFile) {
    this.id = src.id || 0;
    this.uploadedFileID = src.uploadedFileID || 0;
    this.path = src.path || '';
    this.isActive = src.isActive || false;
    this.copyrights = src.copyrights || [];
  }
}
