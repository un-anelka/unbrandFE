//Logged out method
const loginform=document.querySelector(".login-form");
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
const logout=document.getElementById("logout");

logout.addEventListener("click", logoutFunc);

function logoutFunc(e){
  e.preventDefault();
  auth.signOut().then(()=>{
    console.log("User logged out")
  });
}