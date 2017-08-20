const { elt } = require('../../../../utils');

const styles = require('./styles');

/**
 * selectedTable
 *
 * Render table with patient data
 * in model
 * @param  {Object} model
 * @return {Node} - table element
 */
module.exports = model => {
  // Hold temp
  const s = model.selectedPatient;
  // Create Container
  const table = elt('table', { class: styles.table });
  // Prepare fields used
  const data = [
    {
      label: 'Prefix',
      value: s.prefix
    },
    {
      label: 'First name',
      value: s.firstName
    },
    {
      label: 'Last name',
      value: s.lastName
    },
    {
      label: 'Active?',
      value: s.active ? 'true' : 'false'
    },
    {
      label: 'DOB',
      value: s.dateOfBirth.split('T')[0]
    },
    {
      label: 'Address Line 1',
      value: s.addresses[0].line1
    },
    {
      label: 'Country',
      value: s.addresses[0].country
    },
    {
      label: 'Zip Code',
      value: s.addresses[0].zipCode
    },
    {
      label: 'Phone',
      value: s.telecoms[0].value
    }
  ];
  // Map data into table cells
  table.innerHTML = data
    .map(
      item =>
        `
        <tr class="${styles.tableRow}">
          <th class="${styles.tableHead}">${item.label}</th>
          <td class="${styles.tableCell}">${item.value}</td>
        </tr>
        `
    )
    .join('');
  return table;
};
