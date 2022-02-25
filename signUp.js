const firstname=document.getElementById('firstname');
const lastname=document.getElementById('lastname');
const loginform=document.querySelector(".login-form");
const submit=document.getElementById("submit");
const password1=document.getElementById("password1");
const password2=document.getElementById("password2");
const error=document.getElementById("error");
const username= document.getElementById("username")


const firebaseConfig = {
  apiKey: "AIzaSyD8LxqcJ40-58DcRiSnG77MnqAw1DYDOm8",
  authDomain: "un-r-s-personal.firebaseapp.com",
  projectId: "un-r-s-personal",
  storageBucket: "un-r-s-personal.appspot.com",
  messagingSenderId: "871701200823",
  appId: "1:871701200823:web:982677c4cc95b0155bf232",
  // measurementId: "G-444SZGC124"
};
let app= firebase.initializeApp(firebaseConfig);
const auth=app.auth();
const db=app.firestore();

// //Event listeners
submit.addEventListener("click", submitFunc);
  
// //Functions
function submitFunc(e){
  e.preventDefault();
  console.log("Hello UN")
  if (firstname.value==0 || lastname.value==0 || username.value ==0 || password1.value==0 ||password2.value==0){
      error.innerHTML="Please fill empty fields"
  }
  
  else if (password1.value!=password2.value){
      error.innerHTML="Password mismatch"
  }
  
  else{

    // app.auth().createUserWithEmailAndPassword(username.value, password1.value)
     auth.createUserWithEmailAndPassword(username.value, password1.value)
    .then((userCredential) => {
        alert("Successfully registered, Please signin");
        console.log("Registered");
        window.location.href="./signin.html";
        loginform.reset();
      })
    .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    loginform.reset();
    // ..
      });
     
  } 
}


//Logged out method
// const loginform=document.querySelector(".login-form");
// const firebaseConfig = {
//   apiKey: "AIzaSyD8LxqcJ40-58DcRiSnG77MnqAw1DYDOm8",
//   authDomain: "un-r-s-personal.firebaseapp.com",
//   projectId: "un-r-s-personal",
//   storageBucket: "un-r-s-personal.appspot.com",
//   messagingSenderId: "871701200823",
//   appId: "1:871701200823:web:982677c4cc95b0155bf232",
//   // measurementId: "G-444SZGC124"
// };
// let app= firebase.initializeApp(firebaseConfig);
// const auth=app.auth();
// const db=app.firestore();
const logout=document.getElementById("logout");
logout.addEventListener("click", logoutFunc);


function logoutFunc(e){
  e.preventDefault();
  auth.signOut().then(()=>{
    console.log("User logged out")
  });
}