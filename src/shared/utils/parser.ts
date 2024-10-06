export class YMLParser {

  private readonly file: File;

  constructor (file: File) {
    this.file = file;
  }

  getFileSize() {
    return (this.file) ? this.file.size / 1024 / 1024 : 0;
  }

  hasCorrectSize() {
    return (this.file) ? (
      (this.file.size / 1024 / 1024 <= 8) &&
      (this.file.size / 1024 / 1024 > 0)
    ) : false
  }

  hasCorrectType() {
    return (this.file) ? (
      (this.file.type === "text/xml") ||
      (this.file.type === "text/plain")
    ) : false;
  }

  async xml2obj() {}

  async validate() {}

}