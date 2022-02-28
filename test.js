var ImgName, ImgUrl;
var files = [];
// var reader=new FileReader();

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
const auth = app.auth();
const db = app.firestore();
// const database= firebase.database();
// const database = getDatabase(initializeApp(firebaseConfig));

// let select = document.getElementById("select")
// select.addEventListener("click", (e) => {
//     // e.preventDefault();
//     var input = document.createElement("input");
//     input.type = 'file';
//     // input.click();

//     input.addEventListener("change", (e) => {
//         files = e.target.files;
//         const reader = new FileReader();
//         reader.addEventListener('load', () => document.getElementById("myimg").src = reader.result);
//         reader.readAsDataURL(files[0])
//     });

//     input.click();
//     //             db.collection("users").add({
//     //     first: "Ada",
//     //     last: "Lovelace",
//     //     born: 1815
//     // })
//     // .then((docRef) => {
//     //     console.log("Document written with ID: ", docRef.id);
//     // })
//     // .catch((error) => {
//     //     console.error("Error adding document: ", error);
//     // });
// })

// //Upload process
// document.getElementById("upload").onclick = function () {
//     ImgName = document.getElementById("namebox").value;
//     var uploadTask = firebase.storage().ref("Images_Test/" + ImgName + ".png").put(files[0]);


//     uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function (snapshot) {
//         var percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
//         console.log(percent + "% done");
//         document.getElementById("UpProgress").innerHTML = `Upload ${percent} %`;
//     },
//         function (error) {
//             alert("error in saving image");
//         },
//         function () {
//             uploadTask.snapshot.ref.getDownloadURL().then(function (url) {
//                 ImgUrl = url;
//                 console.log("Hello mister", ImgUrl)

//                 // });

//                 firebase.database().ref("blogtest").push().set({

//                     // database.ref("blogtest").set({
//                     // firebase.firestore().ref("Pictures/"+ImgName).set({
//                     // db.ref("Pictures/"+ImgName).set({
//                     Name: ImgName,
//                     Link: ImgUrl
//                 });

//                 alert("Image added successfully");
//             }

//             );

//         }
//     );
// }



// retrieval from Documentation
// document.getElementById("retrieve").onclick = function () {
document.body.onload = function () {

  var retrieveFunc = firebase.database().ref('blogtest');
  retrieveFunc.on('value', (snapshot) => {
    const data = snapshot.val();


    for (var [key, value] of Object.entries(data)) {
      // console.log("data are here")
      console.log(key, value)
      // console.log(value.Name)
      // console.log(value.Link)
      // document.getElementById("myimg").src = value.Link;

      // const blogAdmin = document.querySelector(".blogAdmin")
      const blog = document.querySelector(".blog")
      const content_elt = document.createElement("div");
      content_elt.innerHTML = `
                                          <div class="blog-one">
                                            <p class="content"> ${value.Name}</p>
                                            <img src=${value.Link} alt="blog image blog" data-id=${value.Name}>
                                          </div>
                                          <div class="blog-two"> 
                                              <button onclick="readMore(this)" id="myBtn" class="myBtn">Read more</button>
                                              <button type="submit"><i class="fa fa-comment" style="color: rgb(32, 21, 16);"></i></button>
                                          </div>
                              `
      blog.append(content_elt);

      // window.location.href = "./html/blog.html";

    }
  });


}

