import {
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
} from 'nuqs/server'

const CATEGORY_VALUES = ['all', 'course', 'template', 'service'] as const
const SORT_VALUES = ['newest', 'price-asc', 'price-desc', 'name'] as const

export const storeParamsParsers = {
  q: parseAsString.withDefault(''),
  category: parseAsStringLiteral(CATEGORY_VALUES).withDefault('all'),
  sort: parseAsStringLiteral(SORT_VALUES).withDefault('newest'),
  page: parseAsInteger.withDefault(1),
}
