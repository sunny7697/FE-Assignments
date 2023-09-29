import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const DELETE_CONTACT_MUTATION = gql`
  mutation DeleteContact($id: Int!) {
    delete_contact_by_pk(id: $id) {
      first_name
      last_name
      id
    }
  }
`;

export function useDeleteContact() {
  const [deleteContactMutation, { loading, error, data }] = useMutation(
    DELETE_CONTACT_MUTATION
  );

  const executeDeleteContact = async (id: number) => {
    let data = null,
      error = null;
    try {
      const resp = await deleteContactMutation({
        variables: {
          id,
        },
      });
      data = resp;
    } catch (err: any) {
      error = err?.message;
    } finally {
      return { data, error };
    }
  };

  return {
    executeDeleteContact,
    data,
    loading,
    error,
  };
}
