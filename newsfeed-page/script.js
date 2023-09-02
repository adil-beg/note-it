const noteItButton = document.getElementById('notesBar'); // Get the button by its ID
noteItButton.addEventListener('click', createNewTweet);

function createNewTweet() {
  const notesBar = document.querySelector('.notes-bar'); // Get the input element
  const newTweetContent = notesBar.value; // Get the value of the input

  if (newTweetContent.trim() === '') {
    // Check if the input is empty or only contains whitespace
    alert('Please enter some text before noting down your thoughts.');
    return;
  }

  const newTweetElement = document.createElement('div');
  newTweetElement.classList.add('tweet');

  newTweetElement.innerHTML = `
  <div class="head">
    <div class="profile-image">
      <img src="/images/adil-profile-pic.jpeg">
    </div>
    <div class="name-address">
      <div class="name">Adil Del Rey</div>
      <div class="address"><a href="https://www.twitter.com/adildelrey" target="_blank">@adildelrey</a></div>
    </div>
    <div>
      <button class="follow-btn">Follow</button>
    </div>
  </div>
  <div class="tweet-content">
    <p>${newTweetContent}</p> <!--The code that allows for text to show up on the tweet-->
  </div>
  <div class="foot">
    <div class="date">23 Aug 23</div>
    <div class="tweet-actions">
      <button class="like-btn">Like</button>
      <button class="comment-btn">Comment</button>
      <button class="hide-btn">Hide</button>
    </div>
  </div>
  `;

  setupTweetFunctionality(newTweetElement); // Apply event listeners to new tweet
  const container = document.querySelector('.container');
  container.insertBefore(newTweetElement, container.firstChild); // Insert new tweet at the beginning
  notesBar.value = ''; // Clear the input
}

const notesBar = document.querySelector('.notes-bar');
const charCount = document.querySelector('.char-count');

notesBar.addEventListener('input', updateCharCount);

function updateCharCount() {
  const maxLength = 50;
  const currentLength = notesBar.value.length;
  const charsLeft = maxLength - currentLength;
  
  charCount.textContent = charsLeft;

  if (charsLeft < 0) {
    charCount.style.color = '#f21d59d8';
  } else if (charsLeft < 10) {
    charCount.style.color = '#e28743';
  } else {
    charCount.style.color = 'rgb(151, 150, 150)';
  }
}

// Get all the tweet elements
const tweetElements = document.querySelectorAll('.tweet');

// Define the common event listeners and functionalities
function setupTweetFunctionality(tweetElement) {
  const followBtn = tweetElement.querySelector('.follow-btn');
  const likeBtn = tweetElement.querySelector('.like-btn');
  const commentBtn = tweetElement.querySelector('.comment-btn');
  const hideBtn = tweetElement.querySelector('.hide-btn');
  const tweetContent = tweetElement.querySelector('.tweet-content p');
  const originalTweetContent = tweetContent.textContent;

  followBtn.addEventListener('click', function () {
    if (followBtn.textContent === 'Follow') {
      followBtn.textContent = 'Following';
      followBtn.classList.add('following');
    } else {
      followBtn.textContent = 'Follow';
      followBtn.classList.remove('following');
    }
  });

  let likeCount = 0;
  likeBtn.addEventListener('click', () => {
    likeCount++;
    likeBtn.textContent = `Liked ${likeCount}`;
    likeBtn.style.backgroundColor = '#f21d59d8';
    likeBtn.style.color = 'white';
    const heart = document.createElement('div');
    heart.classList.add('heart');
    tweetElement.appendChild(heart);
    setTimeout(() => {
      heart.remove();
    }, 1000); // Duration of the animation in milliseconds
  });

  commentBtn.addEventListener('click', function () {
    alert('This feature is currently unavailable.');
  });

  hideBtn.addEventListener('click', function () {
    if (hideBtn.textContent === 'Hide') {
      hideBtn.textContent = 'Unhide';
      hideBtn.classList.add('hidden');
      tweetContent.textContent = '';
    } else {
      hideBtn.textContent = 'Hide';
      hideBtn.classList.remove('hidden');
      tweetContent.textContent = originalTweetContent; // Restore the original tweet content
    }
  });
}

// Apply the common functionalities to all tweet elements
tweetElements.forEach(tweetElement => {
  setupTweetFunctionality(tweetElement);
});

/*
Notes:
- Make sure you place the event listener setup outside of the createNewTweet function so that it doesn't create duplicate listeners.
- With these changes, when you enter text in the input box and click the "Note it!" button, a new tweet will be created at the top of the tweet container with the content you entered. The new tweet will also have the same interactivity and buttons as the existing tweets.
- Remember to place the event listener setup for the "Note it!" button and the createNewTweet function in your JavaScript code, after the initial setup of the existing tweet functionality.
*/