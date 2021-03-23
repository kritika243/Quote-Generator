const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

let apiQuotes = []

// Show Loading
function loading() {
  loader.hidden = false
  quoteContainer.hidden = true
}

// Hide Loading
function complete() {
  loader.hidden = true
  quoteContainer.hidden = false
}

// Show new Quote
function newQuote() {
  loading()
  // random quote from api quote aaray
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]

  // from the api array
  // check if author value is null in the api array and replace it with "Unknown"
  if (!quote.author) {
    authorText.textContent = 'Unknown'
  } else {
    authorText.textContent = quote.author
  }
  // check quote length and apply styling accordingly
  if (quote.text.length > 125) {
    quoteText.classList.add('long-quote')
  } else {
    quoteText.classList.remove('long-quote')
  }
  // Set Quote, hide loader
  quoteText.textContent = quote.text
  complete()
}

// Get quotes from API
async function getQuotes() {
  loading()
  const apiUrl = 'https://type.fit/api/quotes'
  try {
    const response = await fetch(apiUrl)
    apiQuotes = await response.json()
    newQuote()
  } catch (error) {
    // catch error here
    alert('Sorry something went wrong :(')
  }
}

// Tweett Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
  window.open(twitterUrl, '_blank')
}

// Event listeners
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

// on load
getQuotes()
