// Add DOM selectors to target input and UL movie list
const inp = document.querySelector("input");
const myMovieList = document.querySelector("ul");
const movieHistoryContainer = document.getElementById("tableContainer");
let movieHistory = [];

const movieHistoryCard = document.getElementById("movieHistoryCard");

// Create the table structure
const tableContainer = document.createElement("div");
tableContainer.id = "tableContainer";
const table = document.createElement("table");
table.className = "table";
const tableHead = document.createElement("thead");
const tableHeadRow = document.createElement("tr");
["Movie Name", "Watched Count"].forEach((headerText) => {
  const th = document.createElement("th");
  th.textContent = headerText;
  tableHeadRow.appendChild(th);
});
tableHead.appendChild(tableHeadRow);
const tableBody = document.createElement("tbody");
tableBody.id = "movieHistoryTable";
table.appendChild(tableHead);
table.appendChild(tableBody);
tableContainer.appendChild(table);

// Append the table to the movie history card
movieHistoryCard.appendChild(tableContainer);

// Example of a simple function that clears the input after a user types something in
const clearInput = () => (inp.value = "");

const validateForm = (userInput) => {
  if (userInput === "") {
    alert("Please enter a movie name!");
    return false;
  }
  return true;
};

// Call the function to create the movie history table
createMovieHistoryTable();

const movieHistoryContent = () => {};

const generateTable = (table, data) => {
  const rows = data.map((element) => {
    const row = table.insertRow();
    Object.values(element).forEach((value) => {
      const cell = row.inserCell();
      const text = document.createTextNode(value);
      cell.appendChild(text);
    });
    return row;
  });
  return rows;
};

const movieCount = (movie) => {
  const index = movieHistory.findIndex((item) => item.movie === movie);
  if (index !== -1) {
    movieHistory[index].count++;
  } else {
    movieHistory.push({ movie, count: 1 });
  }
  movieHistoryContainer.innerHTML = "";
  generateTable(movieHistoryContainer, movieHistory);
};
const clearMovies = () => {
  // To delete all children of the <ul></ul> (meaning all <li>'s)..we can wipe out the <ul>'s innerHTML
  myMovieList.innerHTML = "";
};

// This function is executed when the user clicks [ADD MOVIE] button.
const addMovie = () => {
  // Step 1: Get value of input
  let userTypedText = inp.value;
  if (!validateForm(userTypedText)) {
    return;
  }
  // Step 2: Create an empty <li></li>
  let li = document.createElement("li"); // <li></li>

  // Step 3: Prepare the text we will insert INTO that li ^...example: Harry Potter
  let textToInsert = document.createTextNode(userTypedText);

  // Step 4: Insert text into li
  // <li>Harry Potter </li>
  li.appendChild(textToInsert);

  // Step 5: Insert the <li>Harry Potter</li> INTO the <ul>
  myMovieList.appendChild(li);

  movieCount(userTypedText);
  // Step 6: Call the clearInput function to clear the input field
  clearInput();
};
