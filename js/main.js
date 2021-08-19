var auth=firebase.auth(); 
var firestore=firebase.firestore();

var signUpFormArea=document.querySelector(".signUpFormArea")
var signInFormArea=document.querySelector(".signInFormArea")
var fullNameSignUp=document.querySelector(".fullNameSignUp")
var emailSignIn=document.querySelector(".emailSignIn")
var passwordSignIn=document.querySelector(".passwordSignIn")
var emailSignUp=document.querySelector(".emailSignUp")
var passwordSignUp=document.querySelector(".passwordSignUp")



var signUpFormSubmisson= async (e)=>
{
    e.preventDefault();
    try {
        var fullName=fullNameSignUp.value;
        var email=emailSignUp.value;
        var password=passwordSignUp.value;
        var signedIn=await auth.createUserWithEmailAndPassword(email,password)
        var signedInInfo={
            fullName:fullName,
            email:email,
        }
        await firestore.collection("users").doc(signedIn.user.uid).set(signedInInfo)
        
    } catch (error) {
        console.log(error.message)
    }
}


var signInFormSubmisson= async (e)=>
{
    e.preventDefault();
    try {
        var email=emailSignIn.value;
        var password=passwordSignIn.value;
        await auth.signInWithEmailAndPassword(email,password);
        console.log("done")
    } catch (error) {
        console.log(error.message)
    }
}


signUpFormArea.addEventListener("submit",(e)=>signUpFormSubmisson(e) )


signInFormArea.addEventListener("submit",(e)=> signInFormSubmisson(e) )