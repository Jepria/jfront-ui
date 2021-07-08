import {} from "@jfront/core-rest"
import { Item } from "./types"
import { ConnectorCrud, ResultSet, ConnectorSearch } from "@jfront/core-rest"

export let id = 0

const makeData = () => {
  const arr: Item[] = []
  id += 1
  arr.push({
    id: String(id),
    name: "test",
    description: "test value",
    code: "1",
    status: "new",
    cities: ["Moscow"],
    categories: ["leaf1"],
    types: ["fine"],
    activeDate: new Date().toISOString(),
  })
  id += 1
  arr.push({
    id: String(id),
    name: "test2",
    description: "test value",
    code: "2",
    status: "archived",
    cities: ["Samara"],
    categories: ["leaf2"],
    types: ["bad"],
    activeDate: new Date().toISOString(),
  })
  return arr
}

const items: Item[] = makeData()

const findById = (id: string) => items.find((record) => record.id === id)

const deleteItem = (value: string) => {
  const item = findById(value)
  if (item) {
    items.splice(items.indexOf(item), 1)
  }
}

const addItem = (value: Item) => {
  items.push(value)
}

export class SearchApi extends ConnectorSearch<Item> {
  /**
   * Search request.
   * @param {string} query query string
   * @param {string} cacheControl Cache-control header value
   */
  search = (query: string, cacheControl?: string): Promise<ResultSet<Item>> => {
    return new Promise((resolve, reject) => {
      resolve({
        resultsetSize: items.length,
        data: items,
      })
    })
  }
}

export class CrudApi extends ConnectorCrud<Item, string, Item, Item> {
  /**
   * Creating a new record.
   * @param {CreateDto} createDto record create DTO
   * @param {boolean} getRecordById optional flag, if true getRecordById will be called after create (default true).
   * @returns {Promise<Dto | string>} Promise with DTO or string ID of created record, if getRecordById===false
   */
  create = (
    createDto: Item,
    getRecordById?: boolean,
  ): Promise<Item | string> => {
    return new Promise((resolve, reject) => {
      addItem(createDto)
      resolve(createDto)
    })
  }
  /**
   * Record updating.
   * @param {string} id record primary id
   * @param {UpdateDto} updateDto record update DTO
   * @param {boolean} getRecordById optional flag, if true getRecordById will be called after create (default true).
   * @returns {Promise<Dto | void>} Promise with DTO or nothing if getRecordById===false
   */
  update = (
    id: string,
    updateDto: Item,
    getRecordById?: boolean,
  ): Promise<Item | void> => {
    throw new Error("not supported")
  }
  /**
   * Record deletion.
   * @param {string} id record id
   */
  delete = (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      deleteItem(id)
      resolve()
    })
  }
  /**
   * Get record by id.
   * @param {string} id record id
   */
  getRecordById = (id: string): Promise<Item> => {
    return new Promise((resolve, reject) => {
      const result = findById(id)
      if (result) {
        resolve(result)
      } else {
        reject()
      }
    })
  }
}
