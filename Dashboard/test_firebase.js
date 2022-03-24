//variables
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
// const auth = app.auth();
// const db = app.firestore();


let select = document.getElementById("select");
const blogtitle=document.getElementById("blog_title");
const blogcontent=document.getElementById("blog_content");


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



//Upload process
document.getElementById("upload").onclick = function (e) {
    e.preventDefault();
    // ImgName = document.getElementById("namebox").value;
    var uploadTask = firebase.storage().ref("Images_Test_OUTing/.png").put(files[0]);


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
                console.log("Hello mister", ImgUrl)

            //     db.collection("UserBlogs")
            //     .add({
            //     title: blogtitle.value,
            //     content: blogcontent.value,
            //     link: ImgUrl,
            //     CreatedAt: Date.now(),
            //     timestamp: firebase.firestore.FieldValue.serverTimestamp()
            // },
            
            // {
            //     merge: true
            // })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
                alert("Blog was created successfully");
               
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
                
            });

        }
    );


// // delete the document
// docRef.doc("lKjNIwEkjP537Ela6fhJ").delete();

    // console.log("Hello UN",blogcontent.value, blogtitle.value)
}


// Retrieving information





db.collection("UserBlogs").get().then((snapshot) => {
                    snapshot.docs.forEach((doc) => {
                        console.log(`${doc.id}=>${doc.data().title}`);
                  



let blogmanager= document.querySelector(".blogmanager");
let dd=doc.data();            

let ahref=document.createElement("a");
ahref.href=dd.link;

let blog_one=document.createElement("div")
let blog_two=document.createElement("div")
let blog_image=document.createElement("div")
let blog_content=document.createElement("div")

//Setting attributes
blog_one.classList="blog-one";
blog_two.classList="blog-two";
blog_image.classList="blog-image";
blog_content.classList="content";



blog_content.innerHTML=`
                            <h2 class="title">${dd.title}</h2>
                            <p> ${doc.data().content}} Use textarea here!</p>

                       `
blog_image.innerHTML=`
                        <img src=${dd.link} alt="blog image blog" data-id=${dd.title}> 

                       `
blog_two.innerHTML=`
                        <button onclick="readMore(this)" id="myBtn" class="myBtn">Read more</button>
                        <button type="submit"><i class="fa fa-comment" style="color: rgb(32, 21, 16);"></i></button>
                        <button class="delete">Delete</button>
                        <button class="update">Update</button>
                        <p><span class="comments">6</span>Comments</p>
                  `


blog_one.appendChild(blog_content);
blog_one.appendChild(blog_image);

ahref.appendChild(blog_one);
ahref.appendChild(blog_two);

blogmanager.appendChild(ahref);

                    });
                    });

