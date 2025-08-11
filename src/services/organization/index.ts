import { gql } from "@apollo/client";
import { initializeApollo } from "@/lib/ApolloGraphql";
import { HelpstirFormData } from "@/components/HelpstirForm/HelpstirForm";

const ADD_ORGANIZATION_MUTATION = gql`
  mutation AddOrganization(
    $organizationName: String!,
    $email: String!,
    $registeredAddress: String!,
    $city: String!,
    $pinCode: String!,
    $state: String!,
    $mobileNo: String!,
    $locationPin: String!,
    $hasParentOrg: Boolean!,
    $parentOrg: ParentOrgInput,
    $causes: [String!]!,
    $specificAreas: [String!]!,
    $bio: String!,
    $accountManager: AccountManagerInput!
  ) {
    addOrganization(
      organizationName: $organizationName,
      email: $email,
      registeredAddress: $registeredAddress,
      city: $city,
      pinCode: $pinCode,
      state: $state,
      mobileNo: $mobileNo,
      locationPin: $locationPin,
      hasParentOrg: $hasParentOrg,
      parentOrg: $parentOrg,
      causes: $causes,
      specificAreas: $specificAreas,
      bio: $bio,
      accountManager: $accountManager
    ) {
      id
      organizationName
      email
    }
  }
`;

export async function addOrganization(formData: any) {
  try {
    const { data } = await initializeApollo().mutate({
      mutation: ADD_ORGANIZATION_MUTATION,
      variables: {
        organizationName: formData.organizationName,
        email: formData.email,
        registeredAddress: formData.registeredAddress,
        city: formData.city,
        pinCode: formData.pinCode,
        state: formData.state,
        mobileNo: formData.mobileNo,
        locationPin: formData.locationPin,
        hasParentOrg: formData.hasParentOrg,
        parentOrg: formData.hasParentOrg ? formData.parentOrg : null,
        causes: formData.causes,
        specificAreas: formData.specificAreas,
        bio: formData.bio,
        accountManager: formData.accountManager
      }
    });
    
    return data.addOrganization;
  } catch (error) {
    console.error('Error adding organization:', error);
    throw error;
  }
}