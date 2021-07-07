import { Option } from "@jfront/core-rest"

export type Item = {
  id: string
  name?: string
  description?: string
  code?: string
  status?: string
  cities?: string[]
  categories?: string[]
  types?: string[]
  activeDate?: string
}

export type CreateItem = {
  id: string
  name?: string
  description?: string
  code?: string
  status?: string
  cities?: string[]
  categories?: string[]
  types?: Option<string>[]
  activeDate: string
}
