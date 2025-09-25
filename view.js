const table = document.querySelector("#empTable");

function generateId() {
  if (empDataDb.length === 0) {
    return 25100; // starting ID
  } else {
    // get last employee's ID and increment by 1
    let lastId = empDataDb[empDataDb.length - 1].id;
    return lastId + 1;
  }
}

let tbody = document.querySelector("tbody");

function loadData() {
  let tableData = JSON.parse(localStorage.getItem("tableData")) || [];
  tableData.forEach((rowData) => {
    let row = document.createElement("tr");
    row.id = rowData[0];
    rowData.forEach((inpData) => {
      let inp = document.createElement("td");
      inp.innerText = inpData;
      row.appendChild(inp);
    });
    // if (window.location.pathname.includes("delete.html")) {
    //   let inp = document.createElement("td");
    //   inp.innerHTML = `<button type="button" class="btn btn-danger">Delete</button>`;
    //   row.appendChild(inp);
    // }

    tbody.appendChild(row);
  });
}

loadData();

// delete
