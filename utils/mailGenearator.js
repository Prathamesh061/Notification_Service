const Mailgen = require("mailgen");

// Configure mailgen by setting a theme and your product info
module.exports = new Mailgen({
  theme: "salted",
  product: {
    name: "Heylack",
    link: "https://twitter.com/Hey_lack",
  },
});
