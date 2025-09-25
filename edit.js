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
    if (window.location.pathname.includes("modifyList.html")) {
      let inp = document.createElement("td");
      inp.innerHTML = `
  <button type="button" class="btn btn-dark" id="${rowData[0]}">
    <i class="fa-solid fa-pen-to-square"></i>
  </button>
`;

      row.appendChild(inp);
    }
    if (table) {
      table.appendChild(row);
    }
  });
}

function saveToLocal() {
  localStorage.setItem("tableData", JSON.stringify(tableData));
}

loadData();

if (table) {
  table.addEventListener("click", (event) => {
    let btn = event.target.closest("button");
    if (btn && btn.id) {
      let empId = btn.id;
      window.location.href = `edit.html?id=${empId}`;
      //   let updIdx = -1;
      //   tableData.forEach((ele, idx) => {
      //     if (ele[0] == empId) {
      //       updIdx = idx;
      //     }
      //   });
      //   if (updIdx != -1) {
      //   }
    }
  });
}

// retrieving data

let params = new URLSearchParams(window.location.search);
let empId = params.get("id");

tableData = JSON.parse(localStorage.getItem("tableData")) || [];
let emp = tableData.find((e) => e[0] == empId);

if (emp) {
  let fields = [
    "empName",
    "empPhone",
    "empRole",
    "empEmail",
    "empAddress",
    "empSalary",
  ];
  fields.forEach((field, i) => {
    document.querySelector(`#${field}`).value = emp[i + 1];
    // +1 kyunki emp[0] = id hai
  });
}

// updating data

let fields = [
  "empName",
  "empPhone",
  "empRole",
  "empEmail",
  "empAddress",
  "empSalary",
];

let updBtn = document.querySelector("#editForm");
if (updBtn) {
  updBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (event.target.innerText === "Update") {
      let updIdx = tableData.findIndex((e) => e[0] == empId);
      if (updIdx !== -1) {
        // empId first element
        tableData[updIdx] = [empId];

        fields.forEach((field) => {
          tableData[updIdx].push(document.querySelector(`#${field}`).value);
        });

        localStorage.setItem("tableData", JSON.stringify(tableData));
        alert("Employee Updated!");
        window.location.href = "modifyList.html"; // back to list
      }
    }
  });
}
