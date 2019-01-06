export const fields: FieldCreator[] = [
  {
    id: 'subiect',
    required: true
  },
  {
    id: 'tip',
    type: 'select',
    options: ['bug', 'enhacement', 'feature', 'other'],
    default: 'bug',
    required: true
  },
  {
    id: 'mesaj',
    required: true,
    type: 'textarea',
    placeholder: 'Părerea / Sugestia / Critica ta'
  }
]
