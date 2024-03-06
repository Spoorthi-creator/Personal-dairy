import { initializeApp } from "firebase/app";
import { getFirestore,collection, addDoc,setDoc,doc,getDocs,getDoc, query, where,deleteDoc } from "firebase/firestore";
import { getAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword ,sendPasswordResetEmail,signOut,onAuthStateChanged} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyB0tuboJsMyXa9Yb1jQYHuJT-VAVCzluzM",
  authDomain: "my-journal-c1912.firebaseapp.com",
  projectId: "my-journal-c1912",
  storageBucket: "my-journal-c1912.appspot.com",
  messagingSenderId: "242882627294",
  appId: "1:242882627294:web:c93e315d3e6907b0d5244f"
};

//  if(!firebase.apps.length){
//   firebase.initializeApp(firebaseConfig);
// }
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth=getAuth(app);
// Initialize Firebase
export {app,db,setDoc,getDocs, query,deleteDoc, where,collection,addDoc,doc,getDoc,getAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword,auth,sendPasswordResetEmail,signOut,onAuthStateChanged}









// // Import the functions you need from the SDKs you need
// import firebase from 'firebase';
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyB0tuboJsMyXa9Yb1jQYHuJT-VAVCzluzM",
//   authDomain: "my-journal-c1912.firebaseapp.com",
//   projectId: "my-journal-c1912",
//   storageBucket: "my-journal-c1912.appspot.com",
//   messagingSenderId: "242882627294",
//   appId: "1:242882627294:web:c93e315d3e6907b0d5244f"
// };

// // Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);

// export default firebase.firestore();
