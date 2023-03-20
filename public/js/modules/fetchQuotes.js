export const quotePromises = [];

fetchQuotes();

// An async function to fetch all quotes using the Kanye.rest API
export async function fetchQuotes() {
  // Loop through the API calls and add their promises to the array
  let failedRequests = 0;
  for (let i = 0; i < 100 && failedRequests < 3; i++) { // Fetching 100 quotes or until 3 consecutive failed requests
    // Make an API call using fetch and extract the quote from the response
    const promise = fetch('https://api.kanye.rest')
      .then(response => response.json())
      .then(data => data.quote)
      .catch(error => {
        console.log(error);
        failedRequests++;
        throw error;
      });

    // Add the promise to the array
    quotePromises.push(promise);
  }
  console.log(`${quotePromises.length} quotes fetched`);
}

