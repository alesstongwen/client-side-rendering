// Add DOM selectors to target input and UL movie list
const inp = document.querySelector("input");
const myMovieList = document.querySelector("ul");

let movieHistory = JSON.parse(localStorage.getItem("movieHistory")) || [];

const movieHistoryCard = document.getElementById("movieHistoryCard");

// Create the table structure
const tableContainer = document.createElement("div");
tableContainer.id = "tableContainer";
const table = document.createElement("table");
table.className = "table";
table.id = "movieTable";
const tableHead = document.createElement("thead");
const tableHeadRow = document.createElement("tr");
["Movie Name", "Watched Count"].forEach((headerText) => {
  const th = document.createElement("th");
  th.textContent = headerText;
  tableHeadRow.appendChild(th);
});
tableHead.appendChild(tableHeadRow);
const tableBody = document.createElement("tbody");
tableBody.id = "tableBody";
table.appendChild(tableHead);
table.appendChild(tableBody);
tableContainer.appendChild(table);

// Append the table to the movie history card
movieHistoryCard.appendChild(tableContainer);
const tableBodyForm = document.getElementById("tableBody");
// Example of a simple function that clears the input after a user types something in
const clearInput = () => (inp.value = "");

const validateForm = (userInput) => {
  if (userInput === "") {
    alert("Please enter a movie name!");
    return false;
  }
  return true;
};

const generateTable = (table, data) => {
  const rows = data.map((element) => {
    const row = table.insertRow();
    Object.values(element).forEach((value) => {
      const cell = row.insertCell();
      const text = document.createTextNode(value);
      cell.appendChild(text);
    });
    return row;
  });
  return rows;
};

const movieCount = (movie) => {
  movie = movie.toLowerCase();
  const index = movieHistory.findIndex((item) => item.movie === movie);
  if (index !== -1) {
    movieHistory[index].count++;
  } else {
    movieHistory.push({ movie, count: 1 });
  }
  localStorage.setItem("movieHistory", JSON.stringify(movieHistory));
};
const clearMovies = () => {
  // To delete all children of the <ul></ul> (meaning all <li>'s)..we can wipe out the <ul>'s innerHTML
  myMovieList.innerHTML = "";
};
const filterMovie = () => {
  const filteredInput = document.getElementById("filter");
  filteredInput.addEventListener("input", (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const movies = Array.from(myMovieList.getElementsByTagName("li"));

    movies.forEach((movie) => {
      const title = movie.textContent.toLowerCase();
      if (title.includes(searchTerm)) {
        movie.style.display = "block";
      } else {
        movie.style.display = "none";
      }
    });
  });
};
filterMovie();
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
  tableBodyForm.innerHTML = "";
  generateTable(tableBodyForm, movieHistory);
  // Step 6: Call the clearInput function to clear the input field
  clearInput();
};
generateTable(tableBodyForm, movieHistory);
