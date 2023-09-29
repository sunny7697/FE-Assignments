import { gql, useQuery } from '@apollo/client';

const GET_CONTACT_DETAILS = gql`
  query GetContactDetail($id: Int!) {
    contact_by_pk(id: $id) {
      last_name
      id
      first_name
      created_at
      phones {
        number
      }
    }
  }
`;

const useContactDetails = (id: number) => {
  const { data, loading, error } = useQuery(GET_CONTACT_DETAILS, {
    variables: { id },
  });

  return { data, loading, error };
};

export default useContactDetails;
