let API = "http://localhost:8000/contacts";
// let createContactButton = document.querySelector(".createContactButton");
// let AddContactDiv = document.querySelector(".AddContactDiv");

// createContactButton.addEventListener("click", (e) => {
//   AddContactDiv.style.display = "block";
// });

// let submitContact = document.querySelector("#submitContact");
// let contactsList = document.querySelector(".contactsList");
// submitContact.addEventListener("click", (e) => {
//   e.preventDefault();
//   AddContactDiv.style.display = "none";
//   contactsList.innerHTML += `<li>
//   <div class="contactCard">
//     <div class="contactDetails">
//       <div class="img">
//         <img src="./images/skybox.svg" class="contactPhoto" alt="" />
//       </div>
//       <div class="text">
//         <span>Ariet</span> <span>Sagyndykov</span><br />
//         <span>755100557</span>
//       </div>
//     </div>
//     <div class="twoButtons">
//       <button>Delete</button>

//       <button>Edit</button>
//     </div>
//   </div>
// </li>`;
// });
// let API = "http://localhost:8000/todos";

let selectedRow = null;

function onFormSubmit() {
  if (validate()) {
    let formData = readFormData();
    if (selectedRow == null) insertNewRecord(formData);
    else updateRecord(formData);
    resetForm();
  }
}

function readFormData() {
  let formData = {};
  formData["fullName"] = document.getElementById("fullName").value;
  formData["lastName"] = document.getElementById("lastName").value;
  formData["phoneNumber"] = document.getElementById("phoneNumber").value;
  formData["photo"] = document.getElementById("photo").files[0]
    ? URL.createObjectURL(document.getElementById("photo").files[0])
    : "";
  return formData;
}

function insertNewRecord(data) {
  let table = document
    .getElementById("contactList")
    .getElementsByTagName("tbody")[0];
  let newRow = table.insertRow(table.length);
  cell1 = newRow.insertCell(0);
  cell1.innerHTML = data.fullName;
  cell2 = newRow.insertCell(1);
  cell2.innerHTML = data.lastName;
  cell3 = newRow.insertCell(2);
  cell3.innerHTML = data.phoneNumber;
  cell4 = newRow.insertCell(3);
  cell4.innerHTML = `<img src="${data.photo}" alt="Photo" width="50" height="50"/>`;
  cell5 = newRow.insertCell(4);
  cell5.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                               <a onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
  document.getElementById("fullName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("phoneNumber").value = "";
  document.getElementById("photo").value = "";
  selectedRow = null;
}

function onEdit(td) {
  selectedRow = td.parentElement.parentElement;
  document.getElementById("fullName").value = selectedRow.cells[0].innerHTML;
  document.getElementById("lastName").value = selectedRow.cells[1].innerHTML;
  document.getElementById("phoneNumber").value = selectedRow.cells[2].innerHTML;
}

function updateRecord(formData) {
  selectedRow.cells[0].innerHTML = formData.fullName;
  selectedRow.cells[1].innerHTML = formData.lastName;
  selectedRow.cells[2].innerHTML = formData.phoneNumber;
  if (formData.photo) {
    selectedRow.cells[3].innerHTML = `<img src="${formData.photo}" alt="Photo" width="50" height="50"/>`;
  }
}

function onDelete(td) {
  if (confirm("Are you sure to delete this record ?")) {
    row = td.parentElement.parentElement;
    document.getElementById("contactList").deleteRow(row.rowIndex);
    resetForm();
  }
}

function validate() {
  isValid = true;
  if (document.getElementById("fullName").value == "") {
    isValid = false;
    document.getElementById("fullNameValidationError").classList.remove("hide");
  } else {
    isValid = true;
    if (
      !document
        .getElementById("fullNameValidationError")
        .classList.contains("hide")
    )
      document.getElementById("fullNameValidationError").classList.add("hide");
  }
  return isValid;
}
document.querySelector(".createContactButton").addEventListener("click", () => {
  document.getElementById("section-2").scrollIntoView({ behavior: "smooth" });
});

document.querySelector(".viewContactsButton").addEventListener("click", () => {
  document.getElementById("section-2").scrollIntoView({ behavior: "smooth" });
});
