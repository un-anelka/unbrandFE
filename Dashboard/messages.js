


//varibales initialization
const submit = document.querySelector("#subSend");
const subText = document.querySelector("#subText");

let blogmanager = document.querySelector(".blogmanager");
let btnSubmit = document.querySelector(".btnUpdate");
let signOut = document.querySelector("#logout");

const querry = document.getElementById("querry");
const qemail = document.getElementById("qemail");
const qname = document.getElementById("qname");
const qmessage = document.querySelector(".qtextarea");

const token = JSON.parse(localStorage.getItem("storedtoken"))

if (!token) {
    window.location.href = "../signIn/SignIn.html"
}


// GET ALL BLOGS
fetch("https://my-brandun.herokuapp.com/getAllcontacts", {
    headers: {
        "Accept": "application/json, text/plain, */*",
        "Content-type": "application/json",
        'Authorization': `Bearer ${token}`
    }
})

    .then(res => res.json())
    .then(querrydata => {

        // console.log(data)
        console.log(querrydata.data)
        const retrivedArray = querrydata.data;


        let output = "";


        retrivedArray.forEach(element => {
            output += `
            <fieldset id=${element._id}>
                <div>
                    <p id="name" name="name"> <span>Name: </span> ${element.name}</p>
                </div>
                <div>
                    <p id="email" name="email"> <span>Email: </span>${element.email}</p>
                </div>
                <div>
                    <p class="textarea" id="message" style="min-height: 40px; border: 2px solid #c4c4c4">${element.message}</p>
                </div>
                <div class="blog-two">
                    <button class="delete-post" id="delete-post">Delete</button>
                    <button class="edit" id="edit-post">Edit</button>
                    <button class="update" id="update-post" >Update</button>

                </div>
        </fieldset>  
            `;
        });
        blogmanager.innerHTML = output
    }
    )



//FUnction update version 2

blogmanager.addEventListener("click", (e) => {

    e.preventDefault();
    let deleteBtnpressed = e.target.id == "delete-post";
    let editBtnpressed = e.target.id == "edit-post";
    let updateBtnpressed = e.target.id == "update-post";
    let id = e.target.parentElement.parentElement.id
    // console.log(e.target.parentElement.parentElement)
    // console.log(id);
    let url = "https://my-brandun.herokuapp.com/deletecontact";
    const token = JSON.parse(localStorage.getItem('storedtoken'));


    // Delete request
    if (deleteBtnpressed) {
        console.log("remove post");
        // console.log(id);
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
        // console.log("edit post");
        const parent = e.target.parentElement.parentElement;

        let querymessage = parent.querySelector("#message").textContent;
        let queryemail = parent.querySelector("#email").textContent;
        let queryname = parent.querySelector("#name").textContent;

        // blogtitle.value = title_content;
        qemail.value = queryemail;
        qname.value = queryname;
        qmessage.value = querymessage;

    }
    if (updateBtnpressed) {
        // console.log("edit post");
        console.log(id)
        let url = "https://my-brandun.herokuapp.com/updatecontact"
        fetch(`${url}/${id}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: qname.value,
                email: qemail.value,
                message: qmessage.value
            })
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                location.reload();

            })
    }

})



signOut.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("User logged out");
    localStorage.removeItem('storedtoken');
    window.location.href = '../signin/signIn.html';
})








submit.addEventListener("click", (e) => {
    e.preventDefault();
    fetch("https://my-brandun.herokuapp.com/createsubscription", {
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


