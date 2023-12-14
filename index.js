let logout =document.querySelector("#logout")
let UrlId = new URLSearchParams(location.search);
let id = UrlId.get("id");

let existingData = JSON.parse(localStorage.getItem(id)) || { userData: {} };
let findData = existingData.userData || {};
console.log(findData.value)


let content = document.querySelector("#content");
let tabledata = document.querySelector("#tablecontent");
let addEmp = document.querySelector("#addEmp");



logout.addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.removeItem(findData.username);
    window.location.href = "./login.html";
  });

function updateEmployeeList(userData) {
    
    tabledata.innerHTML=""
    let i=0;
    Object.values(userData).forEach((user) => {
        tabledata.innerHTML += `
        <div class="head1">
            <div class="employee-item row row-cols-7 d-flex align-items-center py-2">
                <div class="col No">${++i}</div>
                <div class="col fname">${user.firstname}</div>
                <div class="col lname">${user.lastname}</div>
                <div class="col eml">${user.email}</div>
                <div class="col sal">${user.salary}</div>
                <div class="col dat">${user.date}</div>
                <div class="col act d-flex gap-2 align-items-center justify-content-center">
                    <button class="btn btn-success" onclick="updateUserData(${user.userId})">Update</button>
                    <button class="btn btn-danger" onclick="deleteUserData(${user.userId})">Delete</button>
                </div>
            </div>
        </div>
        `;
    });
}

function updateUserData(userId)
{
    window.location.href = `./AddEmp.html?id=${id}&userId=${userId}`;
}
function deleteUserData(userId)
{    
    delete existingData.userData[userId];
    localStorage.setItem(id, JSON.stringify(existingData));
    updateEmployeeList(existingData.userData);
}

addEmp.addEventListener("click",function(){
    window.location.href=`./AddEmp.html?id=${id}`
})

// content.innerHTML=`<h1>Welcome ${existingData.username}</h1>`
// console.log(findData);

tabledata.innerHTML=""
// console.log(findData.userdata)
let i=0;

if(findData==undefined || findData=="")
{
    tabledata.innerHTML="<h3>UserData Not Present</h3>"
}
else
{
    updateEmployeeList(findData);
}
