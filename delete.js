const table = document.querySelector("#empTable");
let tableData = [];
function generateId() {
  if (empDataDb.length === 0) {
    return 25100; // starting ID
  } else {
    // get last employee's ID and increment by 1
    let lastId = empDataDb[empDataDb.length - 1].id;
    return lastId + 1;
  }
}

function loadData() {
  tableData = JSON.parse(localStorage.getItem("tableData")) || [];
  tableData.forEach((rowData) => {
    let row = document.createElement("tr");
    row.id = rowData[0];
    rowData.forEach((inpData) => {
      let inp = document.createElement("td");
      inp.innerText = inpData;
      row.appendChild(inp);
    });
    if (window.location.pathname.includes("delete.html")) {
      let inp = document.createElement("td");
      inp.innerHTML = `<button type="button" class="btn btn-danger" id="${rowData[0]}">Delete</button>`;
      row.appendChild(inp);
    }

    table.appendChild(row);
  });
}

function saveToLocal() {
  localStorage.setItem("tableData", JSON.stringify(tableData));
}

loadData();

if (table) {
  table.addEventListener("click", (event) => {
    if (event.target.innerText === "Delete") {
      let delIdx = -1;
      let empId = parseInt(event.target.id);
      tableData.forEach((ele, idx) => {
        if (ele[0] == empId) {
          delIdx = idx;
        }
      });
      if (delIdx != -1) {
        tableData.splice(delIdx, 1);
        saveToLocal();

        let delRow = document.getElementById(empId);
        if (delRow) delRow.remove();
      }
    }
  });
}
