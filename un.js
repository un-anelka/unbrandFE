console.log("Start tests here")

//SignIn page
  
//Declaration
const loginform=document.querySelector(".login-form");
const password3=document.getElementById("password3");
const signInError=document.getElementById("signInError");
const username1= document.getElementById("username1");
const submit1=document.getElementById("submit1")


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
//Event listeners
submit1.addEventListener("click", signInFunc);

//Functions
function signInFunc(e){
  e.preventDefault();
  
  if (username1.value==0 || password3.value==0){
      signInError.innerHTML="Please fill empty fields";
      password3.classList.add("UN-added")
  }
  else{
      
      // app.auth().signInWithEmailAndPassword(username1.value, password3.value)
      auth.signInWithEmailAndPassword(username1.value, password3.value)
      .then((userCredential) => {
        alert("Successfully loggen In");
        console.log("lOGGED IN");
        loginform.reset();
        window.location.href="./dashboard.html";
        
})
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
        });
      console.log("hfhhhj", username1.value)
  }
}

 //Sign up page
  
//Declaration
