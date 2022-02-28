
// menu bars/icon
function myFunction(x) {
  x.classList.toggle("change");
  navigation.classList.toggle("change");
}


let noOfCharac=150;
let contents=document.querySelectorAll('.content');
contents.forEach(content=>{
  if (content.textContent.length<noOfCharac){
    content.nextElementSibling.style.display="none";
  } else{
    let displayText=content.textContent.slice(0, noOfCharac);
    let moreText=content.textContent.slice(noOfCharac);

    content.innerHTML=`${displayText} <span class="dots">...</span><span class="hide more">${moreText}</span>`;
  };
})

//readmore function

function readMore(btn){
  let post=btn.parentElement;
  // console.log(post)
  post.querySelector(".dots").classList.toggle("hide");
  post.querySelector(".more").classList.toggle("hide");
  btn.textContent=="Read Less"? btn.textContent="Read More": btn.textContent="Read Less"
}





// // read more and read less function
// function readMoreReadLess() {
//   var dots = document.querySelectorAll(".dots");
//   var moreText = document.querySelector(".more");
//   var btnText = document.querySelector(".myBtn");
//   // var dots = document.getElementById("dots");
//   // var moreText = document.getElementById("more");
//   // var btnText = document.getElementById("myBtn");

//   if (dots.style.display === "none") {
//     dots.style.display = "inline";
//     btnText.innerHTML = "Read more";
//     moreText.style.display = "none";
//   }
//   else {
//     dots.style.display = "none";
//     btnText.innerHTML = "Read less";
//     moreText.style.display = "inline";
//   }
// }




