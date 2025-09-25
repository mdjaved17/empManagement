const addBtn = document.querySelector("#addBtn");
const inputs = document.querySelectorAll("input");
let tableData = [];

let empDataDb = getFromLocal();

function saveToLocal() {
  localStorage.setItem("tableData", JSON.stringify(empDataDb));
}

function getFromLocal() {
  const storedData = localStorage.getItem("tableData");
  return storedData ? JSON.parse(storedData) : [];
}


function saveData() {
  console.log("inside saveData");
  let tables = document.querySelectorAll("table tr");
  console.log(tables);

  tables.forEach((row, idx) => {
    console.log(row);

    if (idx !== 0) {
      let rowData = [];
      row.querySelectorAll("td").forEach((inp) => {
        rowData.push(inp.innerText);
      });
      tableData.push(rowData);
    }
  });
  localStorage.setItem("tableData", JSON.stringify(tableData));
  console.log("before end saveData");
}

function generateId() {
  if (empDataDb.length === 0) {
    return 25100; // starting ID
  } else {
    // get last employee's ID and increment by 1
    console.log(empDataDb[empDataDb.length - 1]);
    console.log(empDataDb[empDataDb.length - 1][0]);
    
    
    let lastId = empDataDb[empDataDb.length - 1][0];
    return lastId + 1;
  }
}

if(addBtn){
addBtn.addEventListener("click", function () {
//   console.log("inside addBTN");

  let empInp = false;
  inputs.forEach((inp) => {
    if (inp.value.trim() === "") {
      empInp = true;
    }
  });

  if (empInp) {
    alert("Please fill all details");
    return;
  }

  let tempData = [];
  tempData.push(generateId());
  inputs.forEach((inp) => {
    tempData.push(inp.value.trim());
    inp.value="";
  });

  empDataDb.push(tempData);
  saveToLocal();
  alert("Employee details saved")
});
}

  // inputs.forEach((inp, idx) => {
  //   let data = document.createElement("td");
  //   data.innerText = inp.value;
  //   inp.value = "";
  // });

  // let row = document.createElement("tr");
  // inputs.forEach((inp, idx)=>{
  //     let data= document.createElement("td");
  //     data.innerText=inp.value;

  //     row.appendChild(data);
  //     inp.value="";
  // })

  // if (table) {
  //     table.appendChild(row);
  // }
  // console.log("inside addBTN -- before save");
  // saveData();

