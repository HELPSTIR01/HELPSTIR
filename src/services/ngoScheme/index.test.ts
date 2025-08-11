import { addNGOScheme } from './index';
import { initializeApollo } from '@/lib/ApolloGraphql';

// Mock the Apollo client
jest.mock('@/lib/ApolloGraphql', () => ({
  initializeApollo: jest.fn().mockReturnValue({
    mutate: jest.fn()
  })
}));

describe('NGO Scheme Service', () => {
  const mockNGOSchemeData = {
    ngoName: 'Test NGO',
    location: 'Test Location',
    latitude: '40.7128',
    longitude: '-74.0060',
    programs: [
      {
        name: 'Education Program',
        capacity: 50,
        ageCriteria: '6-18',
        educationLevel: 'Primary'
      },
      {
        name: 'Health Program',
        capacity: 100,
        ageCriteria: '0-60',
        educationLevel: 'Any'
      }
    ]
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call the GraphQL mutation with the correct variables', async () => {
    // Mock the mutation response
    const mockResponse = {
      data: {
        addNGOScheme: {
          ngoName: 'Test NGO',
          location: 'Test Location',
          latitude: '40.7128',
          longitude: '-74.0060',
          programs: [
            {
              name: 'Education Program',
              capacity: 50,
              availableCapacity: 50,
              ageCriteria: '6-18',
              educationLevel: 'Primary'
            },
            {
              name: 'Health Program',
              capacity: 100,
              availableCapacity: 100,
              ageCriteria: '0-60',
              educationLevel: 'Any'
            }
          ]
        }
      }
    };

    (initializeApollo().mutate as jest.Mock).mockResolvedValue(mockResponse);

    // Call the function
    const result = await addNGOScheme(mockNGOSchemeData);

    // Check if the mutation was called with the correct variables
    expect(initializeApollo().mutate).toHaveBeenCalledWith({
      mutation: expect.anything(),
      variables: {
        ngoName: mockNGOSchemeData.ngoName,
        location: mockNGOSchemeData.location,
        latitude: mockNGOSchemeData.latitude,
        longitude: mockNGOSchemeData.longitude,
        programs: mockNGOSchemeData.programs
      }
    });

    // Check if the function returns the correct data
    expect(result).toEqual(mockResponse.data.addNGOScheme);
  });

  it('should handle errors correctly', async () => {
    // Mock an error response
    const mockError = new Error('GraphQL error');
    (initializeApollo().mutate as jest.Mock).mockRejectedValue(mockError);

    // Call the function and expect it to throw
    await expect(addNGOScheme(mockNGOSchemeData)).rejects.toThrow('GraphQL error');
  });
});
