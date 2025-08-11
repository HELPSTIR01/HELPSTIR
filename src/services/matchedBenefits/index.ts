import { gql } from "@apollo/client";
import { initializeApollo } from "@/lib/ApolloGraphql";
import { mockMatchedBenefits } from "./mockData";

// GraphQL query to fetch matched benefits
const GET_MATCHED_BENEFITS = gql`
  query GetMatchedBenefits {
    matchBeneficiariesToPrograms {
      beneficiary {
        id
        name
        age
        gender
        location
        latitude
        longitude
        picture
        educationLevel
        guardianName
        guardianPhone
        enrolledPrograms {
          programName
          ngoName
          enrollmentDate
        }
      }
      matchingPrograms {
        id
        name
        capacity
        ageCriteria
        educationLevel
        availableCapacity
        distance
        ngoId
        ngoName
      }
    }
  }
`;

// GraphQL mutation to accept a beneficiary into a program
const ACCEPT_BENEFICIARY = gql`
  mutation AcceptBeneficiary(
    $beneficiaryId: ID!
    $ngoSchemeId: ID!
    $programId: ID!
  ) {
    enrollBeneficiaryInProgram(
      beneficiaryId: $beneficiaryId
      ngoSchemeId: $ngoSchemeId
      programId: $programId
    ) {
      success
      message
      beneficiary {
        id
        name
        age
      }
      program {
        id
        name
        capacity
        ageCriteria
        educationLevel
        availableCapacity
      }
    }
  }
`;

// Function to calculate distance between two points using Haversine formula
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  if (!lat1 || !lon1 || !lat2 || !lon2) {
    return Infinity; // Return a large value if coordinates are missing
  }

  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

// Function to fetch matched benefits
export async function getMatchedBenefits() {
  try {
    const { data, errors } = await initializeApollo().query({
      query: GET_MATCHED_BENEFITS,
      fetchPolicy: "network-only", // Don't use cache for this query
    });
    console.log("GraphQL response:", data);

    if (errors) {
      console.error("GraphQL errors:", errors);
      throw new Error("Failed to fetch matched benefits");
    }

    // Sort matching programs by distance for each beneficiary
    /*  if (data.matchBeneficiariesToPrograms) {
      data.matchBeneficiariesToPrograms.forEach(
        (match: {
          beneficiary: {
            latitude: string;
            longitude: string;
          };
          matchingPrograms: Array<{
            organization: { latitude: string; longitude: string };
          }>;
        }) => {
          if (
            match.beneficiary &&
            match.matchingPrograms &&
            match.matchingPrograms.length > 0
          ) {
            const beneficiaryLat = parseFloat(match.beneficiary.latitude);
            const beneficiaryLon = parseFloat(match.beneficiary.longitude);

            // Sort programs by distance
            match.matchingPrograms.sort(
              (
                a: {
                  organization: { latitude: string; longitude: string };
                },
                b: {
                  organization: { latitude: string; longitude: string };
                }
              ) => {
                const distanceA = calculateDistance(
                  beneficiaryLat,
                  beneficiaryLon,
                  parseFloat(a.organization.latitude),
                  parseFloat(a.organization.longitude)
                );

                const distanceB = calculateDistance(
                  beneficiaryLat,
                  beneficiaryLon,
                  parseFloat(b.organization.latitude),
                  parseFloat(b.organization.longitude)
                );

                return distanceA - distanceB; // Sort by ascending distance
              }
            );
          }
        }
      );
    }
*/
    return data.matchBeneficiariesToPrograms;
  } catch (error) {
    console.error("Error fetching matched benefits:", error);
    // Fallback to mock data if there's an error
    console.log("Falling back to mock data due to error");
    return [];
  }
}

export async function acceptBeneficiary(
  beneficiaryId: string,
  programId: string,
  ngoId?: string
) {
  console.log("Accepting beneficiary:", {
    beneficiaryId,
    ngoId,
    programId,
  });
  try {
    const { data, errors } = await initializeApollo().mutate({
      mutation: ACCEPT_BENEFICIARY,
      variables: {
        beneficiaryId,
        ngoSchemeId: ngoId,
        programId,
      },
    });

    if (errors) {
      console.error("GraphQL errors:", errors);
      throw new Error("Failed to accept beneficiary");
    }

    return data.acceptBeneficiary;
  } catch (error) {
    console.error("Error accepting beneficiary:", error);
    throw error;
  }
}
