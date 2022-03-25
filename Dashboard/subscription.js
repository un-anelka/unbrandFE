const subText = document.querySelector("#subText");
const submit = document.querySelector("#subSend");
const subscribers = document.querySelector("#subcriberscount");
const userAdd = document.querySelector(".userList");



// console.log(userAdd)
const token = JSON.parse(localStorage.getItem("storedtoken"))
if (!token) {
    window.location.href = "../signIn/SignIn.html"
}
console.log(token)
// GET ALL USERS
fetch("http://localhost:4400/getAllsubscriptions/", {
    // method: "GET",
    headers: {
        "Accept": "application/json, text/plain, */*",
        "Content-type": "application/json",
        'Authorization': `Bearer ${token}`
    }
})
    .then(res => res.json())
    .then(subscriptiondata => {

        console.log(subscriptiondata.data)
        // console.log(userdata.data)
        const retrivedArray = subscriptiondata.data;


        let output = "";

        retrivedArray.forEach(user => {

            console.log(user)
            // let str=text_truncate(user.content)

            output += `
            <ul class="email" id=${user._id}>
                    
                    <li class="Email">
                        <label for="email">email</label>: <span id="user_email">${user.email}</span>
                    </li>
                    
                    <li class="button">
                        <button id="deleteuser">deleteUser</button>
                        <button id="edituser">editUser</button>
                        <button id="update">updateUser</button>
                    </li>
                    
                </ul>
            `;
        });
        userAdd.innerHTML = output;
        subscribers.innerHTML = retrivedArray.length;
    })


//FUnction update version 2

userAdd.addEventListener("click", (e) => {

    e.preventDefault();

    console.log(e.target.id)
    console.log(e.target.parentElement.parentElement)
    let deleteBtnpressed = e.target.id == "deleteuser";
    let editBtnpressed = e.target.id == "edituser";
    let updateBtnpressed = e.target.id == "update";
    let id = e.target.parentElement.parentElement.id
    let url = "http://localhost:4400/deletesubscription";
    const token = JSON.parse(localStorage.getItem('storedtoken'));

    // Delete request
    if (deleteBtnpressed) {
        // console.log("remove post");
        fetch(`${url}/${id}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(() => location.reload())
    }

    if (editBtnpressed) {
        console.log("edit user");
        const parent = e.target.parentElement.parentElement;
        console.log(parent);

        let user_email = parent.querySelector("#user_email").textContent;
        // let user_role =parent.querySelector("#user_role").textContent;
        // console.log(blog_content)

        email.value = user_email;
        // role.value=user_role;

    }
    if (updateBtnpressed) {
        console.log("updated users");
        let url = "http://localhost:4400/updatesubscription"
        fetch(`${url}/${id}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({

                email: email.value
            })
        })
            .then(res => res.json())
            .then(() => location.reload())
    }
})


// const subText=document.querySelector("#subText");
console.log(subText)
// const submit=document.querySelector("#subSend");
console.log(submit)


// const submit=document.querySelector("#subSend");
// const subText=document.querySelector("#subText");



submit.addEventListener("click", (e) => {
    e.preventDefault();
    fetch("http://localhost:4400/createsubscription", {
        method: "POST",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-type": "application/json"
        },
        body: JSON.stringify({ email: subText.value })
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

