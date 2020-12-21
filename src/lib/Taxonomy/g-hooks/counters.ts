export default (collectionName: Taxonomie) => ({
  inc: (data: LodgerDocument) => (data.state.counters[collectionName] += 1, data),
  dec: (data: LodgerDocument) => (data.state.counters[collectionName] -= 1, data)
})
