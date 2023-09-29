import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const ADD_CONTACT_MUTATION = gql`
  mutation AddContactWithPhones(
    $first_name: String!
    $last_name: String!
    $phones: [phone_insert_input!]!
  ) {
    insert_contact(
      objects: {
        first_name: $first_name
        last_name: $last_name
        phones: { data: $phones }
      }
    ) {
      returning {
        first_name
        last_name
        id
        phones {
          number
        }
      }
    }
  }
`;

export function useAddContact() {
  const [addContactMutation, { loading, error, data }] =
    useMutation(ADD_CONTACT_MUTATION);

  const executeAddContact = async (
    firstName: string,
    lastName: string,
    phones: Array<{ number: string }>
  ) => {
    let data = null,
      error = null;
    try {
      const res = await addContactMutation({
        variables: {
          first_name: firstName,
          last_name: lastName,
          phones,
        },
      });
      data = res;
    } catch (err: any) {
      error = err;
    } finally {
      return { data, error };
    }
  };

  return {
    executeAddContact,
    data,
    loading,
    error,
  };
}
