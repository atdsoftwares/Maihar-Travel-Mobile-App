// import {React, SafeAreaView, ScrollView} from 'react-native';
// import Viewpagesearchbar from '../Components/Viewpagesearchbar';
// import Viewpagecard from '../Components/Viewpagecard';
// import Viewpagefilters from '../Components/Viewpagefilters';
// import {useEffect, useState} from 'react';
// import {StyleSheet} from 'react-native';
// import {API_URL, PROJECT_ID} from '@env';

// const Viewpage = ({navigation}) => {
//   const [hotelData, setHotelData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const fetchHotelData = async () => {
//     try {
//       const response = await fetch(API_URL, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-Appwrite-Project': PROJECT_ID, // Your Project ID
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch hotel data');
//       }

//       const data = await response.json();

//       setHotelData(data.documents);
//       return data.documents; // Assuming the response has a 'documents' field
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setIsLoading(false); // Ensure loading state is set to false after fetching
//     }
//   };

//   const filteredHotelsByName = hotelData.filter(hotel =>
//     hotel.HotelName.toLowerCase().includes(searchQuery.toLowerCase()),
//   );

//   useEffect(() => {
//     fetchHotelData();
//   }, []);

//   return (
//     <SafeAreaView>
//       <ScrollView style={styles.container}>
//         <Viewpagesearchbar
//           searchQuery={searchQuery}
//           setSearchQuery={setSearchQuery}
//         />
//         <Viewpagefilters
//           hotelData={hotelData} // Your hotel data from API
//           setHotelData={setHotelData}
//           fetchHotelData={fetchHotelData}
//         />

//         <Viewpagecard
//           navigation={navigation}
//           filteredHotelsByName={filteredHotelsByName}
//           isLoading={isLoading}
//         />

//         {/* // <Pagination /> */}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'white',
//     height: '100%',
//   },
// });

// export default Viewpage;

// updated code
// import React, {useEffect, useState} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   ActivityIndicator,
//   View,
//   Button,
//   Text,
// } from 'react-native';
// import Viewpagesearchbar from '../Components/Viewpagesearchbar';
// import Viewpagecard from '../Components/Viewpagecard';
// import Viewpagefilters from '../Components/Viewpagefilters';
// import {API_URL, PROJECT_ID} from '@env';

// const Viewpage = ({navigation}) => {
//   const [hotelData, setHotelData] = useState([]); // Fetched data
//   const [filteredData, setFilteredData] = useState([]); // Data after filtering
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const pageSize = 25; // Define the number of items per page

//   const getData = async page => {
//     try {
//       // Fetch data from API_URL with pagination
//       const response = await fetch(
//         `${API_URL}?page=${page}&limit=${pageSize}`,
//         {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'X-Appwrite-Project': PROJECT_ID, // Include your Project ID if needed
//           },
//         },
//       );
//       console.log(response);

//       if (!response.ok) {
//         throw new Error('Failed to fetch data');
//       }

//       const data = await response.json();

//       if (!data.documents) {
//         throw new Error('No documents found.');
//       }

//       console.log('🚀 ~ getData ~ page:', data);
//       setHotelData(data.documents); // Store the fetched data
//       setTotalPages(Math.ceil(data.total / pageSize)); // Calculate total pages based on total records
//       setFilteredData(data.documents); // Set filtered data initially to all fetched data
//     } catch (error) {
//       console.error('Error fetching hotel data:', error);
//     } finally {
//       setIsLoading(false); // Set loading state to false after fetching
//     }
//   };

//   const applyFilter = () => {
//     const filtered = hotelData.filter(hotel =>
//       hotel.HotelName.toLowerCase().includes(searchQuery.toLowerCase()),
//     );
//     setFilteredData(filtered); // Update filtered data based on search query
//   };

//   useEffect(() => {
//     getData(currentPage); // Fetch data for the current page
//   }, [currentPage]); // Fetch new data when currentPage changes

//   useEffect(() => {
//     applyFilter(); // Apply filtering whenever search query changes
//   }, [searchQuery, hotelData]); // Re-apply filtering when search query or hotel data changes

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1); // Increment page number
//     }
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1); // Decrement page number
//     }
//   };

//   return (
//     <SafeAreaView>
//       <ScrollView style={styles.container}>
//         <Viewpagesearchbar
//           searchQuery={searchQuery}
//           setSearchQuery={setSearchQuery}
//         />
//         <Viewpagefilters
//           hotelData={hotelData}
//           setHotelData={setHotelData}
//           getData={getData}
//         />

//         {isLoading ? (
//           <View style={styles.loadingContainer}>
//             <ActivityIndicator size="large" color="#0000ff" />
//           </View>
//         ) : (
//           <>
//             <Viewpagecard
//               navigation={navigation}
//               filteredHotelsByName={filteredData} // Use filtered data here
//               isLoading={isLoading}
//             />

//             {/* Pagination Controls */}
//             <View style={styles.paginationContainer}>
//               <Button
//                 title="Previous"
//                 onPress={handlePreviousPage}
//                 disabled={currentPage === 1}
//               />
//               <Text style={styles.pageInfo}>
//                 Page {currentPage} of {totalPages}
//               </Text>
//               <Button
//                 title="Next"
//                 onPress={handleNextPage}
//                 disabled={currentPage === totalPages}
//               />
//             </View>
//           </>
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'white',
//     height: '100%',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   paginationContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//   },
//   pageInfo: {
//     marginHorizontal: 10,
//     fontSize: 16,
//   },
// });

// export default Viewpage;

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  View,
  Button,
  Text,
} from 'react-native';
import Viewpagesearchbar from '../Components/Viewpagesearchbar';
import Viewpagecard from '../Components/Viewpagecard';
import Viewpagefilters from '../Components/Viewpagefilters';
import {Client, Databases, Query} from 'appwrite';

import {API_URL, PROJECT_ID, DATABASE_ID, COLLECTION_ID} from '@env';

// Initialize Appwrite Client
const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(PROJECT_ID);
const databases = new Databases(client);
const databaseId = DATABASE_ID; // Replace with your Database ID
const collectionId = COLLECTION_ID; // Replace with your Collection ID
const batchSize = 88; // Define the number of items per batch

const Viewpage = ({navigation}) => {
  const [hotelData, setHotelData] = useState([]); // Fetched data
  const [filteredData, setFilteredData] = useState([]); // Data after filtering
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [after, setAfter] = useState(null); // Cursor for pagination

  const getData = async () => {
    setIsLoading(true);
    try {
      const queries = [Query.limit(batchSize)];
      if (after) {
        queries.push(Query.cursorAfter(after)); // Use the cursor to fetch subsequent items
      }

      const response = await databases.listDocuments(
        databaseId,
        collectionId,
        queries,
      );

      if (response.documents.length === 0) {
        return; // No more documents to load
      }

      // Append new documents to existing data
      setHotelData(prev => [...prev, ...response.documents]);
      setFilteredData(prev => [...prev, ...response.documents]);
      setAfter(response.documents[response.documents.length - 1].$id); // Update cursor to the last fetched document
    } catch (error) {
      console.error('Error fetching hotel data:', error);
    } finally {
      setIsLoading(false); // Set loading state to false after fetching
    }
  };

  const applyFilter = () => {
    const filtered = hotelData.filter(hotel =>
      hotel.HotelName.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredData(filtered); // Update filtered data based on search query
  };

  useEffect(() => {
    getData(); // Fetch data on component mount
  }, []); // Only run on mount

  useEffect(() => {
    applyFilter(); // Apply filtering whenever search query changes
  }, [searchQuery, hotelData]); // Re-apply filtering when search query or hotel data changes

  const loadMoreData = () => {
    if (!isLoading) {
      getData(); // Fetch more data using cursor
    }
  };

  return (
    <SafeAreaView>
      <ScrollView
        style={styles.container}
        onScroll={({nativeEvent}) => {
          // Check if scrolled near the bottom to load more data
          const isCloseToBottom =
            nativeEvent.layoutMeasurement.height +
              nativeEvent.contentOffset.y >=
            nativeEvent.contentSize.height - 50;

          if (isCloseToBottom) {
            loadMoreData(); // Load more data
          }
        }}
        scrollEventThrottle={16} // Throttle scroll events for better performance
      >
        <Viewpagesearchbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <Viewpagefilters
          hotelData={hotelData}
          setHotelData={setHotelData}
          getData={getData}
        />

        {isLoading && hotelData.length === 0 ? ( // Loading state only when there is no data
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <>
            <Viewpagecard
              navigation={navigation}
              filteredHotelsByName={filteredData} // Use filtered data here
              isLoading={isLoading}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Viewpage;
