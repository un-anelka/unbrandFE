//varibales initialization
const submit=document.querySelector("#subSend");
const subText=document.querySelector("#subText");

const blogtitle = document.getElementById("blog_title");
const blogcontent = document.getElementById("blog_content");
const upload = document.getElementById("upload");
let blogmanager = document.querySelector(".blogmanager");
let btnSubmit = document.querySelector(".btnUpdate");
let signOut = document.querySelector("#logout");



// const update=document.querySelector(".update");
// upload.addEventListener("click", addPost)
const token = JSON.parse(localStorage.getItem("storedtoken"))

// GET ALL BLOGS
fetch("http://localhost:4400/getAllcontacts",{
    headers: {
        "Accept":"application/json, text/plain, */*",
        "Content-type":"application/json",
        'Authorization': `Bearer ${token}`
    }})

    .then(res => res.json())
    .then(querrydata => {

        // console.log(data)
        console.log(querrydata.data)
        const retrivedArray = querrydata.data;


        let output = "";


        retrivedArray.forEach(element => {


            // let str=text_truncate(element.content)


            output += `
            <fieldset ${element._id}>
                <div>
                    <p id=${element.name} name="name"> <span>Name: </span> Name</p>
                </div>
                <div>
                    <p id=${element.email} name="email"> <span>Email: </span> Email</p>
                </div>
                <div>
                    <p class="textarea" id=${element.message} style="min-height: 40px; border: 2px solid #c4c4c4">hjkh</p>
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
    // console.log(e.target.className)
    let url = "http://localhost:4400/deleteblog";
    const token = JSON.parse(localStorage.getItem('storedtoken'));

    if (e.target.className === "myBtn") {
        window.location.href = `../Singlepage/single.html#${id}`;
    }

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
        console.log("edit post");
        const parent = e.target.parentElement.parentElement;
        // console.log(parent);
        let title_content = parent.querySelector("#title").textContent;
        let blog_content = parent.querySelector("#blogcontent").textContent;
        // console.log(blog_content)
        blogtitle.value = title_content;
        blogcontent.value = blog_content;

    }
    if (updateBtnpressed) {

        let url = "http://localhost:4400/updateblog"
        fetch(`${url}/${id}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                title: blogtitle.value,
                content: blogcontent.value
            })
        })
            .then(res => res.json())
            .then(() => location.reload())
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


