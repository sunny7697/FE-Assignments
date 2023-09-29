import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

const GET_CONTACTS_LIST = gql`
  query GetContactList(
    $distinct_on: [contact_select_column!]
    $limit: Int
    $offset: Int
    $order_by: [contact_order_by!]
    $where: contact_bool_exp
  ) {
    contacts: contact_aggregate(distinct_on: $distinct_on, where: $where) {
      aggregate {
        count
      }
    }
    contact(
      distinct_on: $distinct_on
      limit: $limit
      offset: $offset
      order_by: $order_by
      where: $where
    ) {
      created_at
      first_name
      id
      last_name
      phones {
        number
      }
    }
  }
`;

const useContactsList = (offset?: number, limit?: number, where?: object) => {
  const [contacts, setContacts] = useState<any>(null);
  const [isSkip, setIsSkip] = useState(true);

  useEffect(() => {
    const items = localStorage.getItem('regularContacts');
    if (items) {
      setContacts(JSON.parse(items));
    } else setIsSkip(false);
  }, []);

  const { data, loading, error } = useQuery(GET_CONTACTS_LIST, {
    variables: {
      offset,
      limit,
      where,
      distinct_on: ['first_name', 'last_name'],
      order_by: {
        first_name: 'asc',
        last_name: 'asc',
      },
    },
    skip: isSkip,
  });

  if (contacts) {
    return {
      data: { list: contacts, total: (contacts || [])?.length },
      loading: false,
      error: null,
    };
  }

  const newData = {
    list: data?.contact || [],
    total: data?.contacts.aggregate.count,
  };

  return { data: newData, loading, error };
};

export default useContactsList;
