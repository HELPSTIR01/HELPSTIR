import { addOrganization } from './index';
import { getClient } from '@/lib/ApolloGraphql';

// Mock the Apollo client
jest.mock('@/lib/ApolloGraphql', () => ({
  getClient: jest.fn().mockReturnValue({
    mutate: jest.fn()
  })
}));

describe('Organization Service', () => {
  const mockFormData = {
    organizationName: 'Test Organization',
    email: 'test@example.com',
    registeredAddress: '123 Test St',
    city: 'Test City',
    pinCode: '123456',
    state: 'Test State',
    mobileNo: '1234567890',
    locationPin: '123456',
    hasParentOrg: false,
    parentOrg: {
      name: '',
      email: '',
      address: ''
    },
    causes: ['cause1', 'cause2'],
    specificAreas: ['area1', 'area2'],
    bio: 'Test bio',
    accountManager: {
      name: 'Test Manager',
      email: 'manager@example.com',
      password: 'password123',
      confirmPassword: 'password123'
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call the GraphQL mutation with the correct variables', async () => {
    // Mock the mutation response
    const mockResponse = {
      data: {
        addOrganization: {
          id: '123',
          organizationName: 'Test Organization',
          email: 'test@example.com'
        }
      }
    };

    (getClient().mutate as jest.Mock).mockResolvedValue(mockResponse);

    // Call the function
    const result = await addOrganization(mockFormData);

    // Check if the mutation was called with the correct variables
    expect(getClient().mutate).toHaveBeenCalledWith({
      mutation: expect.anything(),
      variables: {
        organizationName: mockFormData.organizationName,
        email: mockFormData.email,
        registeredAddress: mockFormData.registeredAddress,
        city: mockFormData.city,
        pinCode: mockFormData.pinCode,
        state: mockFormData.state,
        mobileNo: mockFormData.mobileNo,
        locationPin: mockFormData.locationPin,
        hasParentOrg: mockFormData.hasParentOrg,
        parentOrg: null, // Since hasParentOrg is false
        causes: mockFormData.causes,
        specificAreas: mockFormData.specificAreas,
        bio: mockFormData.bio,
        accountManager: mockFormData.accountManager
      }
    });

    // Check if the function returns the correct data
    expect(result).toEqual(mockResponse.data.addOrganization);
  });

  it('should handle errors correctly', async () => {
    // Mock an error response
    const mockError = new Error('GraphQL error');
    (getClient().mutate as jest.Mock).mockRejectedValue(mockError);

    // Call the function and expect it to throw
    await expect(addOrganization(mockFormData)).rejects.toThrow('GraphQL error');
  });
});