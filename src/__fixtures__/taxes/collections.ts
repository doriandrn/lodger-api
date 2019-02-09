export default [
  {
    name: 'masini',
    schema: {
      title: 'masina',
      version: 0,
      type: 'object',
      properties: {
        name: {
          type: 'string',
          primary: true
        },
        color: {
          type: 'string'
        }
      }
    }
  },
  {
    name: 'sosete',
    schema: {
      title: 'soseta',
      version: 0,
      type: 'object',
      properties: {
        name: {
          type: 'string',
          index: true
        },
        lungime: {
          type: 'number'
        }
      }
    }
  }
]
