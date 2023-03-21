import { $ } from "./helper.js";
import { quotePromises } from './fetchQuotes.js';

// Call the displayQuotes function when the window is loaded
window.addEventListener('load', displayQuotes);

// VARS
let currentLetter = '';
let currentDetails = null;

// LOGIC
async function displayQuotes() {
  try {
    const quoteList = $('#quote-list');

    if (!quoteList) {
      console.log("Error: Could not find the ul");
      return;
    }

    const quotes = await Promise.all(quotePromises);
    const quotesSet = new Set(quotes);

    quoteList.innerHTML = '';

    Array.from(quotesSet).sort().forEach((quote) => {
      const startingLetter = quote.charAt(0).toUpperCase();

      if (startingLetter !== currentLetter) {
        appendCurrentDetails(quoteList);
        createNewDetails(startingLetter);
      }

      addQuoteToList(quote);
    });

    appendCurrentDetails(quoteList);
  } catch (error) {
    console.error("Error:", error);
  }
}

function appendCurrentDetails(quoteList) {
  if (currentDetails !== null) {
    quoteList.appendChild(currentDetails);
  }
}

function createNewDetails(startingLetter) {
  currentDetails = document.createElement('details');
  const summary = document.createElement('summary');
  const ul = document.createElement('ul');
  summary.textContent = `${startingLetter}`;
  currentDetails.appendChild(summary);
  currentDetails.appendChild(ul);
  currentLetter = startingLetter;
}

function addQuoteToList(quote) {
  const li = document.createElement('li');
  li.textContent = quote;
  li.addEventListener('click', () => {
    console.log(li.textContent);
    alert(li.textContent);
  });
  currentDetails.querySelector('ul').appendChild(li);
}
