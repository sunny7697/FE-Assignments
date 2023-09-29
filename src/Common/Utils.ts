import { IContact } from './module';

export function getIndexToInsertContact(
  sortedList: IContact[],
  newContact: IContact
) {
  let low = 0;
  let high = sortedList?.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const comparisonResult = compareContacts(sortedList[mid], newContact);

    if (comparisonResult === 0) {
      return mid;
    } else if (comparisonResult < 0) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return low;
}

function compareContacts(contactA: IContact, contactB: IContact) {
  const firstNameComparison = contactA.first_name.localeCompare(
    contactB.first_name
  );
  if (firstNameComparison !== 0) {
    return firstNameComparison;
  }
  return contactA.last_name.localeCompare(contactB.last_name);
}
