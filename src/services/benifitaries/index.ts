import { gql } from "@apollo/client";
import { initializeApollo } from "@/lib/ApolloGraphql";
const ADD_BENIFICARY = gql`
     mutation AddBeneficiary(
      $name: String!, 
      $age: Int!, 
      $gender: String!, 
      $location: String!, 
      $latitude: Float,
      $longitude: Float,
      $picture: String, 
      $educationLevel: String!, 
      $guardianName: String!, 
      $guardianPhone: String!
    ) {
      addBeneficiary(
        name: $name, 
        age: $age, 
        gender: $gender, 
        location: $location, 
        latitude: $latitude,
        longitude: $longitude,
        picture: $picture, 
        educationLevel: $educationLevel, 
        guardianName: $guardianName, 
        guardianPhone: $guardianPhone
      ) {
        id
        name
      }
    }
`;

export async function addBeneficiary(formData:any, picture : string) {
  try {
    const { data, errors } = await initializeApollo().mutate({
      mutation: ADD_BENIFICARY,
      variables: {
        name: formData.name,
        age: parseInt(formData.age, 10),
        gender: formData.gender,
        location: formData.location,
        latitude: formData.latitude || null,
        longitude: formData.longitude || null,
        picture: picture,
        educationLevel: formData.educationLevel,
        guardianName: formData.guardianName,
        guardianPhone: formData.guardianPhone,  
      }
    });
    
    if (errors) {
      console.error('GraphQL errors:', errors);
      throw new Error('Failed to add beneficiary');
    }

    return data.addBeneficiary;
  } catch (error) {
    console.error('Error adding organization:', error);
    throw error;
  }
}
