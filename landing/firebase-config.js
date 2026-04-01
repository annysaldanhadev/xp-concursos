const firebaseConfig = {
  apiKey: "AIzaSyDYZUgcsN7bmDIoDYprbWmaJHoIth0JqGM",
  authDomain: "lp-xpconcursos.firebaseapp.com",
  projectId: "lp-xpconcursos",
  storageBucket: "lp-xpconcursos.firebasestorage.app",
  messagingSenderId: "1052109789500",
  appId: "1:1052109789500:web:a085f4a9a1f77f03ede639"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
