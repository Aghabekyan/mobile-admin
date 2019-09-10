interface IUploadedFile {
  id: number;
  path: string;
  isActive: boolean;
  uploadedFileID: number;
  copyrights: ICopyright[];
}
