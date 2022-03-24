const userAdd=document.querySelector(".userList");
const userCount=document.querySelector("#usercount");
const firstname=document.querySelector('#lastname');
const lastname=document.querySelector('#firstname');
const email=document.querySelector('#email');
const role=document.querySelector('#role');

// console.log(userAdd)
const token = JSON.parse(localStorage.getItem("storedtoken"))

console.log(token)
// GET ALL USERS
fetch("http://localhost:4400/getAllUsers", {
    // method: "GET",
    headers: {
        "Accept":"application/json, text/plain, */*",
        "Content-type":"application/json",
        'Authorization': `Bearer ${token}`
    }})
    .then(res => res.json())
    .then(userdata => {

        console.log(userdata.users)
        // console.log(userdata.data)
        const retrivedArray = userdata.users;


        let output="";
        // let blogmanager= document.querySelector(".blogmanager");

        retrivedArray.forEach(user => {

            // console.log(user)
            // let str=text_truncate(user.content)

            output+=`
            <ul class="user" id=${user._id}>
                    <li class="Firstname">
                        <label for="firstname">Firstname</label>: <span id="user_firstname">${user.firstname}</span>
                    </li>
                    <li class="Lastname">
                        <label for="lastname">lastname</label>: <span id="user_lastname">${user.lastname}</span>
                    </li>
                    <li class="Email">
                        <label for="email">email</label>: <span id="user_email">${user.email}</span>
                    </li>
                    <li class="Role">
                        <label for="role">role</label>: <span id="user_role">${user.role}</span>
                    </li>
                    <li class="button">
                        <button id="deleteuser">deleteUser</button>
                        <button id="edituser">editUser</button>
                        <button id="update">updateUser</button>
                    </li>
                    
                </ul>
            `;
        });
        userAdd.innerHTML=output;
        userCount.innerHTML=retrivedArray.length;
    })
    

//FUnction update version 2

userAdd.addEventListener("click", (e)=>{
   
    e.preventDefault();

    console.log(e.target.id)
    // console.log(e.target.parentElement.parentElement)
    let deleteBtnpressed=e.target.id=="deleteuser";
    let editBtnpressed=e.target.id=="edituser";
    let updateBtnpressed=e.target.id=="update";
    let id=e.target.parentElement.parentElement.id 
    let url="http://localhost:4400/deleteUser";
    const token=JSON.parse(localStorage.getItem('storedtoken'));

    // Delete request
    if(deleteBtnpressed){
        // console.log("remove post");
        fetch(`${url}/${id}`, {
            method: "DELETE",
            headers: {
                "Accept":"application/json, text/plain, */*",
                "Content-type":"application/json",
                'Authorization': `Bearer ${token}`
        }})
        .then(res=>res.json())
        .then(()=>location.reload())
    }

    if (editBtnpressed){
        console.log("edit user");
        const parent=e.target.parentElement.parentElement;
        console.log(parent);
        let user_firstname =parent.querySelector("#user_firstname").textContent;
        let user_lastname =parent.querySelector("#user_lastname").textContent;
        let user_email =parent.querySelector("#user_email").textContent;
        let user_role =parent.querySelector("#user_role").textContent;
        // console.log(blog_content)
        firstname.value=user_firstname;
        lastname.value=user_lastname;
        email.value=user_email;
        role.value=user_role;

    }
    if (updateBtnpressed){
        console.log("updated users");
    let url="http://localhost:4400/updateUser"
        fetch(`${url}/${id}`,{
            method: "PUT",
            headers: {
                "Accept":"application/json, text/plain, */*",
                "Content-type":"application/json",
                'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            firstname: firstname.value,
            lastname: lastname.value,
            email: email.value,
            role: role.value
        })
    })
    .then (res=>res.json())
    .then(()=> location.reload())
}
})

const submit=document.querySelector("#subSend");
const subText=document.querySelector("#subText");



submit.addEventListener("click", (e)=>{
    e.preventDefault();
    fetch("http://localhost:4400/createsubscription", {
    method: "POST",
    headers: {
        "Accept":"application/json, text/plain, */*",
        "Content-type":"application/json"
    },
    body: JSON.stringify({email: subText.value})
})
    .then(res => res.json())
    .then(subscriptiondata => {
        // res.json(subscriptiondata)
        console.log(subscriptiondata);
        location.reload();
    })

// console.log("clicked")
// console.log(subText.value)

})
