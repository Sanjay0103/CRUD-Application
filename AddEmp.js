let addEmpHead = document.querySelector("h2");
let fname = document.querySelector("#exampleInputFName");
let lname = document.querySelector("#exampleInputLName");
let eml = document.querySelector("#exampleInputEmail");
let sal = document.querySelector("#exampleInputSalary"); // Corrected the ID
let SalDate = document.querySelector("#exampleInputDate"); // Corrected the ID
let subbtn = document.querySelector("#submit");
let cancel = document.querySelector("#cancel");

let UrlId = new URLSearchParams(location.search);
let paramId = UrlId.get("id");
let userId = UrlId.get("userId");

let existingData = JSON.parse(localStorage.getItem(paramId)) || {
  userData: {},
};
let findData = existingData.userData || {};

if (userId !== null) {
  addEmpHead.innerText = "Update Employee Page";
  subbtn.innerText = "Update";
  updateUser(findData);
}

cancel.addEventListener("click", function () {
  window.location.href = `./index.html?id=${paramId}`;
});

subbtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    fname.value === "" ||
    lname.value === "" ||
    eml.value === "" ||
    sal.value === "" ||
    SalDate.value === ""
  ) {
    window.alert("All fields mandatory");
  } else {
    addUpdate();
    window.location.href = `./index.html?id=${paramId}`;
  }
});

function updateUser(findData) {
  const existingUserData = findData[userId];
  if (existingUserData) {
    fname.value = existingUserData.firstname || "";
    lname.value = existingUserData.lastname || "";
    eml.value = existingUserData.email || "";
    sal.value = existingUserData.salary || "";
    SalDate.value = existingUserData.date || "";
  }
}

function newuser(findData) {
  let newUserId = Math.floor(Math.random() * 1000);
  findData[newUserId] = {
    userId: newUserId,
    firstname: fname.value,
    lastname: lname.value,
    email: eml.value,
    salary: sal.value,
    date: SalDate.value,
  };
}

function addUpdate() {
  let findData = existingData.userData || {};
  let existingEmailIndex = Object.values(findData).findIndex(
    (userData) => userData.email === eml.value
  );

  if (existingEmailIndex !== -1 && userId === null) {
    alert("Email already present");
    return;
  }
  if (userId !== null) {
    const existingUserData = findData[userId];
    existingUserData.firstname = fname.value;
    existingUserData.lastname = lname.value;
    existingUserData.email = eml.value;
    existingUserData.salary = sal.value;
    existingUserData.date = SalDate.value;
  } else {
    newuser(findData);
  }

  localStorage.setItem(
    paramId,
    JSON.stringify({ ...existingData, userData: findData })
  );
}
