import { QualifiedAttribute, QualifiedTag, SAXParser } from 'sax';
import { XMLAttribute, XMLElement, XMLTransformOffer, XMLValidator } from '@shared/types/parser';
import { YMLParserConsts } from '@shared/consts/validator.config';

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

  xml2obj() {
    return new Promise<XMLElement>((resolve, reject) => {
      const parser = new SAXParser(true, { trim: true, normalize: true });

      const xmlArray: XMLElement[] = [];
      const stack: XMLElement[] = [];
      let currentAttributes: XMLAttribute[] = [];

      parser.onopentag = (tag: QualifiedTag) => {
        const obj: XMLElement = {
          name: tag.name,
          attributes: currentAttributes,
          children: []
        }

        if (stack.length === 0) {
          xmlArray.push(obj);
        } else {
          const parent = stack[stack.length - 1];
          parent.children.push(obj);
        }

        stack.push(obj);
        currentAttributes = [];
      }

      parser.ontext = (text: string) => {
        if (stack.length > 0) {
          const parent = stack[stack.length - 1];
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
      }

      if (this.file.type.includes("xml") || this.file.type.includes("text")) {
        reader.readAsText(this.file);
      } else {
        reject("File type is invalid");
      }

    })
  }

  async validate(obj: XMLElement, extended: boolean = false) {
    return new Promise<XMLValidator>((resolve, reject) => {
      const waitList: XMLElement[] = [obj];
      const offers: XMLElement[] = [];

      let currentElement: XMLElement;

      for (let i = 0; i < waitList.length; i++) {
        currentElement = waitList[i];

        if (currentElement.name === "offers") {
          if (currentElement.children.length) {
            offers.push(...currentElement.children);
          } else {
            reject("Can't find any offers");
          }
        } else if (currentElement.children.length) {
          waitList.push(...currentElement.children);
        }
      }

      if (offers.length) {
        const validator: XMLValidator = {
          offers: {
            count: offers.length,
            available: 0,
            options: {
              main: {},
              param: {},
              picture: {}
            }
          }
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const params: any = {};
        const items: XMLTransformOffer[] = [];

        offers.forEach((offer) => {
          let offerId: string|undefined = undefined;
          const transformOffer: XMLTransformOffer = {
            id: undefined,
            name: undefined,
            description: undefined,
            pictures: [],
            price: undefined            
          };
          let available: boolean = true;

          offer.attributes.forEach((attr: XMLAttribute) => {
            switch (attr.name) {
              case "id":
                offerId = attr.value?.toString();

                if (extended) {
                  transformOffer.id = offerId ? offerId : undefined;
                }
                break;

              case "available":
                available = (attr.value !== false)
            }
          });

          if (offerId) {
            let name, description, picture, price: boolean = false;
            const picturesList: string[] = [];
            let paramsList: string[] = [];

            offer.children.forEach((tag) => {
              switch (tag.name) {
                case "name":
                  if (
                    tag.text &&
                    tag.text?.length > YMLParserConsts.offerNameMinLength && 
                    tag.text?.length < YMLParserConsts.offerNameMaxLength
                  ) {
                    name = true;

                    if (extended) {
                      transformOffer.name = tag.text;
                    }
                  }
                  break;

                case "description":
                  if (
                    tag.text &&
                    tag.text?.length > YMLParserConsts.offerDescriptionMinLength && 
                    tag.text?.length < YMLParserConsts.offerDescriptionMaxLength
                  ) {
                    description = true;

                    if (extended) {
                      transformOffer.description = tag.text;
                    }
                  }
                  break;

                case "picture":
                  if (tag.text && tag.text.length) {
                    picture = true;
                    picturesList.push(tag.text);

                    if (extended) {
                      transformOffer.pictures?.push(tag.text);
                    }
                  }
                  break;

                case "price":
                  price = true;

                  if (extended) {
                    transformOffer.price = Number(tag.text?.replace(/\s/g, ""));
                  }
                  break;

                case "param":
                  tag.attributes.forEach((attr: XMLAttribute) => {
                    if (attr.name === "name" && attr.value) {
                      if (attr.value.toString() in params) {
                        let find: boolean = false;

                        for (const key in params[attr.value.toString()]) {
                          if (params[attr.value.toString()][key] === tag.text) {
                            find = true;
                          }

                          if (!find && attr.value) {
                            params[attr.value.toString()] = [ tag.text ];
                          }
                        }
                      } else  if (attr.value) {
                        params[attr.value.toString()] = tag.text;
                      }

                      if (paramsList) {
                        paramsList.push(attr.value.toString());
                      } else {
                        paramsList = [attr.value.toString()];
                      }

                      if (extended) {
                        if (transformOffer.params?.length) {
                          transformOffer.params.push({
                            name: attr.name,
                            value: attr.value.toString()
                          });
                        } else {
                          transformOffer.params = [{
                            name: attr.name,
                            value: attr.value.toString()
                          }]
                        }
                      }
                    }
                  })
                  break;

                default:
                  break;
              }
            });

            if (!name) {
              if (validator.offers.options.main.name) {
                validator.offers.options.main.name.push(offerId);
              } else {
                validator.offers.options.main.name = [ offerId ];
              }
              available = false;
            }

            if (!description) {
              if (validator.offers.options.main.description) {
                validator.offers.options.main.description.push(offerId);
              } else {
                validator.offers.options.main.description = [ offerId ];
              }
              available = false;
            }

            if (!picture) {
              if (validator.offers.options.main.picture) {
                validator.offers.options.main.picture.push(offerId);
              } else {
                validator.offers.options.main.picture = [ offerId ];
              }
              available = false;
            } else if (picturesList.length > 5) {
              if (validator.offers.options.picture.lotsOfPictures) {
                validator.offers.options.picture.lotsOfPictures.push(offerId);
              } else {
                  validator.offers.options.picture.lotsOfPictures = [ offerId ];
              }
              available = false;
            }

            if (!price) {
              if (validator.offers.options.main.price) {
                  validator.offers.options.main.price.push(offerId);
              } else {
                  validator.offers.options.main.price = [ offerId ];
              }
              available = false;
            }

            if (paramsList.length > YMLParserConsts.maxPropertyForProduct) {
              if (validator.offers.options.param.lotsOfProperties) {
                  validator.offers.options.param.lotsOfProperties.push(offerId);
              } else {
                  validator.offers.options.param.lotsOfProperties = [ offerId ];
              }
              available = false;
            }
          }

          if (available) {
            validator.offers.available++;

            if (
              transformOffer.id && transformOffer.name &&
              transformOffer.description && transformOffer.price &&
              transformOffer.pictures?.length
            ) {
              items.push(transformOffer);
            }
          }

        });

        if (extended) {
          validator.items = items;
        }

        for (const key in params) {
          if (params[key]?.length > YMLParserConsts.maxPropertyValues) {
            if (validator.offers.options.param.maximumValuesForProperty) {
              validator.offers.options.param.maximumValuesForProperty.push(key);
            } else {
              validator.offers.options.param.maximumValuesForProperty = [ key ];
            }
          }
        }

        resolve(validator);

      } else {
        reject("No offers found");
      }
    })
  }

}