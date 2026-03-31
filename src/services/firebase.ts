import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBFgIC8ygrSjTVc3ucP5jY0TG0qlI1o_Gg",
  authDomain: "xp-concursos.firebaseapp.com",
  projectId: "xp-concursos",
  storageBucket: "xp-concursos.firebasestorage.app",
  messagingSenderId: "202172612430",
  appId: "1:202172612430:web:9587d382ab5112cd7ce81f",
  measurementId: "G-YN4CXDG76Y"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);