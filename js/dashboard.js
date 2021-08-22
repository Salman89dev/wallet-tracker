var auth=firebase.auth()
var firestore=firebase.firestore();
var nameDiv=document.querySelector(".nameDiv h4")
console.log(nameDiv)
// console.log(data.createdAt.toDate().toISOString().split("T")[0])
var uid=location.hash.substring(1, location.hash.length);

var fetchUserInfo=async (uid)=>
{
    try {
        var userInfo=await firestore.collection("users").doc(uid).get();
        var data=userInfo.data();
        return data;
    
    } catch (error) {
        console.log(error.message)
    }
}


// AUTH LISTNER
auth.onAuthStateChanged(async(user)=>
{
    if(user)
    {
        var {uid,email}=user;
        var userInfo=await fetchUserInfo(uid);
        // setting userNamee
       nameDiv.innerHTML=userInfo.displayName;
        
    }
    else
    {
        console.log("logged out")
    }
})