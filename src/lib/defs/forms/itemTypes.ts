/**
 * Private item types for FormItemCreator -> RxDB
 */

enum strings {
  search, select, string, text, textarea
}

enum numbers {
  bani, date, dateTime, number
}

enum arrays {
  array, contactFields, contoare, distribuire,
  furnizori, selApartamente, servicii, scari
}

enum objects {
  object
}

type FormItemTypes = keyof typeof strings |
  keyof typeof numbers |
  keyof typeof arrays |
  keyof typeof objects |
  undefined

export {
  strings,
  numbers,
  arrays,
  objects,
  FormItemTypes
}
