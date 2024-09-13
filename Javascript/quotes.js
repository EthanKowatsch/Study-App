const motivationBtn = document.getElementById("motivationBtn");
const outputP = document.getElementById("output");

// Quotes generator code
const motivationalQuotes = [
  "You are smart.",
  "You have worked so hard.",
  "You can do this.",
  "You're doing this for a reason.",
  "You're doing amazing and you know that!",
  "It's okay to take a break, that's when you get your best work done",
  "Be confident in yourself, know your studying will pay off.",
  "Think about how good it will feel to be done.",
  "You're not alone, we're all in this together.",
  "You're amazing!",
  "Your hard work will pay off.",
  "I am proud of you, no matter what.",
  "You are stronger than you think.",
  "Never give up on your dreams.",
  "Every day is a new opportunity.",
  "Small steps lead to big achievements.",
  "Hard work beats talent.",
  "Your only limit is your mind.",
  "Embrace the journey!",
  "Believe in yourself!",
  "You are enough just as you are.",
  "Happiness is a journey, not a destination.",
  "Spread love wherever you go.",
  "Enjoy the little things in life.",
  "You are capable of amazing things.",
  "Let your light shine bright.",
  "Every moment is a fresh beginning.",
  "You deserve all the good things.",
  "Life is better when you're laughing.",
  "Positivity is a choice.",
  "Why don't scientists trust atoms? Because they make up everything!",
  "I'm on a seafood diet. I see food, and I eat it!",
  "I told my computer I needed a break, and now it won't stop sending me Kit-Kats!",
  "I'm reading a book on anti-gravity. It's impossible to put down!",
  "Why did the scarecrow win an award? Because he was outstanding in his field!",
  "If at first you don't succeed, then skydiving isn't for you.",
  "I used to be a baker, but I couldn't make enough dough.",
  "I'm not lazy, I'm on energy-saving mode.",
  "Why don't some couples go to the gym? Because some relationships don't work out!",
];

// Generate quote button code
motivationBtn.onclick = function () {
  const quote = getQuote(motivationalQuotes);
  outputP.textContent = quote;
};

// Function to generate quote
function getQuote(quote) {
  // Generate Random Number
  const randIndex = Math.floor(Math.random() * quote.length);

  // Return the quote index
  return quote[randIndex];
}