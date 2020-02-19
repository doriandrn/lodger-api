export default {
  defaults: {
    fields: {}
  },
  taxonomies: {
    asociatie: {
      name: 'Association',
      plural: 'Associations',
      fields: {

      },
      form: {
        added: 'Association added',
        add: 'New Association',
        edit: 'Edit Association Data'
      }
    }
  },
  errors: {
    index: {
      missingDB: 'Missing database',
      invalidPluginDefinition: 'Invalid plugin definition',
      couldNotWriteFile: 'Cannot write file %%'
    }
  }
}
