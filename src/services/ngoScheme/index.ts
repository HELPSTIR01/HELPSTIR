import { gql } from "@apollo/client";
import { initializeApollo } from "@/lib/ApolloGraphql";

// Define the Program interface
export interface Program {
  name: string;
  capacity: number;
  ageCriteria?: string;
  educationLevel?: string;
}

// Define the NGOScheme interface
export interface NGOScheme {
  ngoName: string;
  location: string;
  latitude?: string;
  longitude?: string;
  programs: Program[];
}

// Define the GraphQL mutation
const ADD_NGO_SCHEME_MUTATION = gql`
  mutation AddNGOScheme(
    $ngoName: String!,
    $location: String!,
    $latitude: Float,
    $longitude: Float,
    $programs: [ProgramInput]
  ) {
    addNGOScheme(
      ngoName: $ngoName,
      location: $location,
      latitude: $latitude,
      longitude: $longitude,
      programs: $programs
    ) {
      ngoName
      location
      latitude
      longitude
      programs {
        name
        capacity
        availableCapacity
        ageCriteria
        educationLevel
      }
    }
  }
`;

/**
 * Adds a new NGO scheme with programs
 * @param ngoSchemeData - The NGO scheme data
 * @returns The created NGO scheme
 */
export async function addNGOScheme(ngoSchemeData: any) {
  try {
    const { data } = await initializeApollo().mutate({
      mutation: ADD_NGO_SCHEME_MUTATION,
      variables: {
        ngoName: ngoSchemeData.ngoName,
        location: ngoSchemeData.location,
        latitude: ngoSchemeData.latitude || null,
        longitude: ngoSchemeData.longitude || null,
        programs: ngoSchemeData.programs
      }
    });
    
    return data.addNGOScheme;
  } catch (error) {
    console.error('Error adding NGO scheme:', error);
    throw error;
  }
}
