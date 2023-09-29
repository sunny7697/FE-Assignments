export function getIndexToInsertContact(sortedList: any, newContact: any) {
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

function compareContacts(contactA: any, contactB: any) {
  const firstNameComparison = contactA.first_name.localeCompare(
    contactB.first_name
  );
  if (firstNameComparison !== 0) {
    return firstNameComparison;
  }
  return contactA.last_name.localeCompare(contactB.last_name);
}
