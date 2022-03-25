//varibales initialization

let select = document.getElementById("select");
const blogtitle = document.getElementById("blog_title");
const blogcontent = document.getElementById("blog_content");
const upload = document.getElementById("upload");
let blogmanager = document.querySelector(".blogmanager");
let btnSubmit = document.querySelector(".btnUpdate");
let signOut = document.querySelector("#logout");
let token = JSON.parse(localStorage.getItem('storedtoken'));

if (!token) {
    window.location.href = "../signIn/SignIn.html"
}
// GET ALL BLOGS
fetch("http://localhost:4400/getAllblogs")
    .then(res => res.json())
    .then(blogdata => {

        // console.log(data)
        console.log(blogdata.data)
        const retrivedArray = blogdata.data;


        let output = "";
        // let blogmanager= document.querySelector(".blogmanager");

        retrivedArray.forEach(element => {


            // console.log(` ${element._id}`)
            // console.log(element.title)
            // console.log(element.content)
            // console.log(element)
            //console.log(text_truncate(element.content))
            let str = text_truncate(element.content)
            //     let blogmanager= document.querySelector(".blogmanager");


            //     let div=document.createElement("div");
            //     div.setAttribute("id", `${element._id}`);

            //     let blog_one=document.createElement("div")
            //     let blog_two=document.createElement("div")
            //     let blog_image=document.createElement("div")
            //     let blog_content=document.createElement("div")

            // //     //Setting attributes
            //     blog_one.classList="blog-one";
            //     blog_two.classList="blog-two";
            //     blog_image.classList="blog-image";
            //     blog_content.classList="content";



            //     blog_content.innerHTML=`
            //                                 <h2 id="title#${element._id}">${element.title}</h2>
            //                                 <p id="blogcontent#${element._id}"> ${str}</p>


            //                            `
            //     blog_image.innerHTML=`
            //                             <img src="../images/M.E.png" alt="blog image blog" data-id=${element.title}> 
            //                            `
            //     blog_two.innerHTML=`
            //                             <a id=${element._id} class="myBtn" href=./linksingle.html#${element._id}>ReadMore</a>
            //                             <button type="submit"><i class="fa fa-comment" style="color: rgb(32, 21, 16);"></i></button>
            //                             <button class="delete#${element._id}" onclick="deletePost(this.id)">Delete</button>
            //                             <button class="edit" id="edit#${element._id}" onclick="editPost(this.id)">Edit</button>
            //                             <button class="update" id="update#${element._id}" onclick="updatePost(this.id)">Update</button>
            //                             <p><span class="comments">${element.comments.length}</span>Comments</p>
            //                       `


            //     blog_one.appendChild(blog_content);
            //     blog_one.appendChild(blog_image);


            //     div.appendChild(blog_one);
            //     div.appendChild(blog_two);
            //     blogmanager.appendChild(div)

            // // new format
            //<img src="../images/M.E.png" alt="blog image blog" data-id=${element.title}>

            output += `
            <div id=${element._id}>
            <div class="blog-one">
                <div class="content">
                    <h2 id="title">${element.title}</h2>
                    <p id="blogcontent"> ${str}</p>
                </div>
                <div class="blog-image">

                    
                    <img src=${element.image} alt="blog image blog" data-id=${element.title}>
                </div>

            </div>
            <div class="blog-two">
                                <a id=${element._id} class="myBtn" href=../Singlepage/single.html#${element._id}>ReadMore</a>
                                <button class="delete-post" id="delete-post">Delete</button>
                                <button class="edit" id="edit-post">Edit</button>
                                <button class="update" id="update-post" >Update</button>
                                <p><span class="comments">${element.comments.length}</span>Comments</p>
            </div>
        </div>
            `;
        });
        blogmanager.innerHTML = output
    }
    )

{/* <button type="submit"><i class="fa fa-comment" style="color: rgb(32, 21, 16);"></i></button> */ }

function addPost() {
    // e.preventDefault();

    let title = document.getElementById("blog_title");
    let content = document.getElementById("blog_content");
    const token = JSON.parse(localStorage.getItem('storedtoken'));
    // const author=JSON.parse(localStorage.getItem('author'))
    // console.log(token)

    fetch("http://localhost:4400/createBlog", {
        method: "POST",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title: title.value, content: content.value, image: ImgUrl })

    })
        .then(res => res.json())
        .then(posts => {
            console.log(posts);
            alert("Blog has been successfully created");
            location.reload();
        })
        .catch(err => {
            console.log(err);
        })
}


text_truncate = function (str, length, ending) {
    if (length == null) {
        length = 700;
    }
    if (ending == null) {
        ending = '...';
    }
    if (str.length > length) {
        return str.substring(0, length - ending.length) + ending;
    } else {
        return str;
    }
};



//Function update version 2

blogmanager.addEventListener("click", (e) => {

    e.preventDefault();
    let deleteBtnpressed = e.target.id == "delete-post";
    let editBtnpressed = e.target.id == "edit-post";
    let updateBtnpressed = e.target.id == "update-post";
    let id = e.target.parentElement.parentElement.id
    // console.log(e.target.className)

    let token = JSON.parse(localStorage.getItem('storedtoken'));

    if (e.target.className === "myBtn") {
        console.log(e.target.id)
        let thisID = e.target.id;
        window.location.href = `../Singlepage/single.html?id=${id}`;

    }

    // Delete request
    if (deleteBtnpressed) {
        // console.log("remove post");
        let url = "http://localhost:4400/deleteblog";
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
        // return thisID
    }

})

// console.log(thisID)

signOut.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("User logged out");
    localStorage.removeItem('storedtoken');
    window.location.href = '../signin/signIn.html';
})



// function addPost(){
//     // e.preventDefault();

//     let title=document.getElementById("blog_title");
//     let content=document.getElementById("blog_content");
//     const token=JSON.parse(localStorage.getItem('storedtoken'));

//     fetch("http://localhost:4400/createBlog",{
//         method: "POST",
//         headers: {
//             "Accept":"application/json, text/plain, */*",
//             "Content-type":"application/json",
//             'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({title: title.value, content: content.value, image: ImgUrl})

//     })
//     .then(res=>res.json())
//     .then(posts=>{
//         console.log(posts);
//         alert("Blog has been successfully created");
//         location.reload();
//     })
//     .catch(err=>{
//         console.log(err);
//     })

// }



var ImgName, ImgUrl;
var files = [];


// configuration of firebase 

const firebaseConfig = {
    apiKey: "AIzaSyD8LxqcJ40-58DcRiSnG77MnqAw1DYDOm8",
    authDomain: "un-r-s-personal.firebaseapp.com",
    projectId: "un-r-s-personal",
    storageBucket: "un-r-s-personal.appspot.com",
    messagingSenderId: "871701200823",
    appId: "1:871701200823:web:982677c4cc95b0155bf232",
    // measurementId: "G-444SZGC124"
};
//initialization of firebase
let app = firebase.initializeApp(firebaseConfig);



// let select = document.getElementById("select");
// const blogtitle=document.getElementById("blog_title");
// const blogcontent=document.getElementById("blog_content");


select.addEventListener("click", (e) => {
    e.preventDefault();
    var input = document.createElement("input");
    input.type = 'file';
    // input.click();

    input.addEventListener("change", (e) => {
        files = e.target.files;
        const reader = new FileReader();
        reader.addEventListener('load', () => document.getElementById("myimg").src = reader.result);
        reader.readAsDataURL(files[0])
    });

    input.click();
    // console.log("clicked")

})



// Upload process
document.getElementById("upload").onclick = function (e) {
    e.preventDefault();
    // ImgName = document.getElementById("namebox").value;
    // var uploadTask = firebase.storage().ref("ImagesforDemo/.png").put(files[0]);

    ImgName = files[0].name;
    console.log(files[0])


    var uploadTask = firebase.storage().ref("Images_Test_UNUN/" + ImgName).put(files[0]);


    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function (snapshot) {
        var percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
        console.log(percent + "% done");
        document.getElementById("UpProgress").innerHTML = `Upload ${percent} %`;
    },
        function (error) {
            alert("error in saving image");
        },
        function () {
            uploadTask.snapshot.ref.getDownloadURL().then(function (url) {
                ImgUrl = url;
                addPost();
            })
        }
    )

}

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
