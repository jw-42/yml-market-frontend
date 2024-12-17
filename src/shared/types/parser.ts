export interface XMLValidator {
  categories?: XMLCategory[],
  offers: XMLSummary,
  items?: XMLTransformOffer[]
}

export interface XMLCategory {
  id: string,
  value: string
}

export interface XMLSummary {
  count: number,
  available: number,
  options: {
    main: XMLSummaryMainOptions,
    param: XMLSummaryParamsOptions,
    picture: XMLSummaryPicturesOptions
  }
}

export interface XMLSummaryMainOptions {
  name?: string[],
  description?: string[],
  picture?: string[],
  price?: string[],
}

export interface XMLSummaryParamsOptions {
  lotsOfProperties?: string[],
  maximumValuesForProperty?: string[]
}

export interface XMLSummaryPicturesOptions {
  lotsOfPictures?: string[],
  wrongSize?: string[]
}

export interface XMLElement {
  name: string,
  attributes: XMLAttribute[],
  children: XMLElement[],
  text?: string
}

export interface XMLTransformOffer {
  id?: string,
  group_id?: string,
  name?: string,
  description?: string,
  price?: number,
  pictures?: string[],
  params?: XMLParam[]
}

export interface XMLAttribute {
  name: string,
  value?: string|number|object|boolean
}

export interface XMLParam {
  name: string,
  value: string
}