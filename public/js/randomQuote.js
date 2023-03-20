// Import necessary modules
import { $ } from "./modules/helper.js";
import { fetchQuotes, quotePromises } from "./modules/fetchQuotes.js";
import { showError } from "./modules/states.js";

// VARS

// LOGIC

// Function to get a random quote
async function getQuotes(quoteTextfield, quoteButton) {
  // Check if there are any quotes left to fetch, and fetch them if necessary
  if (quotePromises.length === 0) {
    quotePromises.push(...await fetchQuotes());
  }

  // Select a random quote promise from the array
  const quoteIndex = Math.floor(Math.random() * quotePromises.length);
  const quotePromise = quotePromises.splice(quoteIndex, 1)[0];

  try {
    // Await the resolution of the quote promise
    const quote = await quotePromise;

    // Set up the cursor animation for the quote text
    const caret = `<img src="./assets/icons/caret.svg" alt="caret">`;
    const cursor = `<span id="caret"> ${caret} </span>`;
    let index = 0;

    // Function to "type out" the quote one character at a time
    function type() {
      if (index < quote.length) {
        quoteTextfield.innerHTML = `" ${quote.substring(0, index + 1)} ."${cursor}`;
        index++;
        setTimeout(type, 50);
      } else {
        // Re-enable the quote button once the typing animation is finished
        quoteButton.disabled = false;
        quoteButton.querySelector('svg').classList.remove('active');
      }
    }

    // If the quote textfield exists, start the typing animation
    if (quoteTextfield) {
      quoteButton.disabled = true;
      quoteButton.querySelector('svg').classList.add('active');
      quoteTextfield.innerHTML = '';
      type();
    }

  } catch (error) {
    // If there is an error, log it to the console and show the error message
    console.log(error);
    showError();
  }
}



// Event Listeners

// Event listener for the quote button and error message close button
document.addEventListener('click', function(event) {
  // Get references to the quote button and quote textfield
  const quoteButton = $('#quoteButton');
  const quoteTextfield = $('#quote');

  // If the click target is the quote button, get a new quote
  if (event.target === quoteButton) {
    getQuotes(quoteTextfield, quoteButton);
  }
  // If the click target is the error message close button, hide the error message
  else if (event.target.closest('#error a')) {
    const errorDiv = $('#error');
    errorDiv.classList.remove('active'); // WEGHALEN.
  }
});
