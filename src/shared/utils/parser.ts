import { QualifiedAttribute, QualifiedTag, SAXParser } from 'sax';
import { XMLAttribute, XMLElement } from '@shared/types/parser';

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
    return (this.file) ? this.file.type === "text/xml" : false;
  }

  async xml2obj() {
    return new Promise<XMLElement>((resolve, reject) => {
      const parser = new SAXParser(true, { trim: true, normalize: true });

      let xmlArray: XMLElement[] = [];
      let stack: XMLElement[] = [];
      let currentAttributes: XMLAttribute[] = [];

      parser.onopentag = (tag: QualifiedTag) => {
        let obj: XMLElement = {
          name: tag.name,
          attributes: currentAttributes,
          children: []
        }

        if (stack.length === 0) {
          xmlArray.push(obj);
        } else {
          let parent = stack[stack.length - 1];
          parent.children.push(obj);
        }

        stack.push(obj);
        currentAttributes = [];
      }

      parser.ontext = (text: string) => {
        if (stack.length > 0) {
            let parent = stack[stack.length - 1];
            parent.text = text;
        }
      }

      parser.onclosetag = () => {
        stack.pop();
      }

      parser.onattribute = (attr: QualifiedAttribute) => {
        switch (attr.name) {
          case "id":
          case "group_id":
            currentAttributes.push({
              name: attr.name,
              value: attr.value
            });
            break;

          case "available":
            currentAttributes.push({
              name: attr.name,
              value: (attr.value === "true")
            });
            break;

          default:
            currentAttributes.push({
              name: attr.name,
              value: attr.value
            });
        }
      }

      parser.onerror = (error: Error) => reject(error);
      parser.onend = () => resolve(xmlArray[0]);

      const reader = new FileReader();

      reader.onload = (event: ProgressEvent<FileReader>) => {
        const content = event.target?.result as string;

        parser.write(content);
        parser.end();
      }

      reader.onerror = (event: ProgressEvent<FileReader>) => {
        console.error("Can't read this file", event.target?.error);
        reject(event.target?.error);
      }

    })
  }

  async validate() {}

}