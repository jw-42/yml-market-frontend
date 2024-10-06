export interface XMLValidator {
  categories?: XMLCategory[],
  offers: XMLOffer[]
}

export interface XMLCategory {
  id: string,
  value: string
}

export interface XMLOffer {
  count: number,
  available: number,
  options: {
    main: {
      name?: string,
      description?: string,
      picture?: string,
      price?: string,
    },
  }
}

export interface XMLElement {
  value: number|string|undefined
}

export interface XMLTransformOffer {
  value: number|string|undefined
}