import { initializeApp } from "firebase/app";

export default defineNuxtPlugin(() => {
  initializeApp({
    projectId: "bee-learn",
    measurementId: "G-VPL3JN01D0",
    messagingSenderId: "555382338219",
    storageBucket: "bee-learn.appspot.com",
    authDomain: "bee-learn.firebaseapp.com",
    apiKey: "AIzaSyB8_d-YisIv-yrQ18r9uEaFfbrzNu4nx2Y",
    appId: "1:555382338219:web:4f0bbbebd6fe9ced4d7dee",
  });
});
