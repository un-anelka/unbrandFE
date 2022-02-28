// /// first you will need to import what you you need to user in my case I imported below script....
// <script src="https://www.gstatic.com/firebasejs/8.4.3/firebase-app.js"></script>
//   <script src="https://www.gstatic.com/firebasejs/8.4.3/firebase-database.js"></script>
//   <script src="https://www.gstatic.com/firebasejs/8.4.3/firebase-auth.js"></script>
//   <script src="https://www.gstatic.com/firebasejs/8.4.3/firebase-storage.js"></script>
// //This will be the main code with firebase logic
//   <script type="module">

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA5sPlupW_n1XEt6xsw_Y7aAZKltGEFyXw",
    authDomain: "mybrand-df7b7.firebaseapp.com",
    projectId: "mybrand-df7b7",
    storageBucket: "mybrand-df7b7.appspot.com",
    messagingSenderId: "1073877765217",
    appId: "1:1073877765217:web:7f63596f42c5d4ca18ae20",
  };
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  // const database = firebase.getDatabase(app);
  // const auth = firebase.getAuth();
  // const storage = firebase.getStorage(app);
// DOM TO access your button that your will use to subtmit the data
  const addButton = document.getElementById("addBlog");
//Add a a DOM event
  addButton.addEventListener("click", (e) => {
    e.preventDefault();
//Inside this fucntion wil be all logic required to subtmit the data
    // image variable
    const image = document.getElementById("image").files[0];
    const imageName = image.name;
//The above code ca be found also on Firebase Documentation (https://firebase.google.com/docs/database/web/read-and-write?authuser=0),
// (https://firebase.google.com/docs/firestore/quickstart?authuser=0);
//       //refernce a collection
    const storageRef = firebase.storage().ref("images/" + imageName);
    // const imagesRef = ref("images/" + imageName);
    // upload image to selected  storage reference
    var uploadTask = storageRef.put(image);
    uploadTask.on(
      "state_changed",
      function (snapshot) {
        var progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "done");
      },
      function (error) {
        console.log(error.message);
      },


      function () {
        // handle successfully upload here..
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          // getimage downloaded url here and upload to the database
          const title = getInputValue("title");
          // const body = getInputValue("body");
          const blogText = tinymce.activeEditor.getContent();
          // var id;
          var id = Math.floor(Math.random() * 100);
          firebase
            .database()
            .ref("blogs/")
            .push()
            .set(
              {
                title: title,
                // body: body,
                body: blogText,  //>>>>> this is was for getting data body from tinymce plugin it is just an editor
                Image: downloadURL,
                id: id,
              },
              function (error) {
                if (error) {
                  console.log("error whie uploading");
                } else {
                  console.log("successfully uploaded");
                }
              }
            );
        });
    
        //function to get input value
//This was a simple logic that helped me to get my nput from title , image, body
        function getInputValue(id) {
          return document.getElementById(id).value;
        }

    