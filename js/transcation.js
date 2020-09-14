var auth=firebase.auth();
var firestore=firebase.firestore();
var transcationId=location.hash.substring(1,location.hash.length);

var fetchTranscation= async (transcationId) =>{
    var singleTranscation=await firestore.collection("transcation").doc(transcationId).get()
    console.log(singleTranscation.data());
}



//auth listner

auth.onAuthStateChanged(async(user)=>{
    if(user)
    {
         uid=user.uid;
        // console.log(uid);
        fetchTranscation(transcationId)
    }
    else{
        location.assign('./index.html')
        console.log("logged out");
    }
})