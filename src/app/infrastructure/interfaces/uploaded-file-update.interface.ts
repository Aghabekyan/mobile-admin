interface IUploadedFileUpdate {
  id: number;
  image: File;
  uploadedFileID: number;
  copyrights: ICopyrightUpdate[];
}
