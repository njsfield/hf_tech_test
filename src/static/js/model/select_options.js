/**
 * selectOptions
 * @type {Object}
 */
module.exports = {
  sort: {
    value: '',
    options: [
      {
        label: 'First Name (Ascending)',
        value: 'firstName%20ASC'
      },
      {
        label: 'First Name (Descending)',
        value: 'firstName%20DESC'
      },
      {
        label: 'Last Name (Ascending)',
        value: 'lastName%20ASC'
      },
      {
        label: 'Last Name (Descending)',
        value: 'lastName%20DESC'
      },
      {
        label: 'Date of Birth (Ascending)',
        value: 'dateOfBirth%20ASC'
      },
      {
        label: 'Date of Birth (Descending)',
        value: 'dateOfBirth%20DESC'
      }
    ]
  }
};
