
var lastScrollTop; // This Varibale will store the top position

navbar = document.getElementById('navbar'); // Get The NavBar

window.addEventListener('scroll',function(){
 //on every scroll this funtion will be called
  
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  //This line will get the location on scroll
  
  if(scrollTop > lastScrollTop){ //if it will be greater than the previous
    navbar.style.top='-140px';
    //set the value to the negetive of height of navbar 
  }
  
  else{
    navbar.style.top='0';
  }
  
  lastScrollTop = scrollTop; //New Position Stored
});



//to get current year
const currentYear = new Date().getFullYear();
const yearElement = document.getElementById("currentYear");
yearElement.textContent = currentYear;
 


// Function to toggle the sidebar
function toggleMenu() {
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.getElementById("main-content");
  
  if (sidebar.style.width === "300px") {
      sidebar.style.width = "0";
      mainContent.style.marginLeft = "0";
  } else {
      sidebar.style.width = "300px";
      mainContent.style.marginLeft = window.innerWidth > 768 ? "300px" : "0";
  }
}
