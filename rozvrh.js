import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";


const firebaseConfig = {
	apiKey: "AIzaSyDkjZlYedUGvCTCZG3D4IRHNbxjInOMoa8",
	authDomain: "gymceska-b9b4c.firebaseapp.com",
	databaseURL: "https://gymceska-b9b4c-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "gymceska-b9b4c",
	storageBucket: "gymceska-b9b4c.appspot.com",
	messagingSenderId: "513344353318",
	appId: "1:513344353318:web:260f4bee62af1323eca2e7",
	measurementId: "G-X28NJQT6ZK"
};
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);


const dbRef = ref(database);
get(child(dbRef, `ukoly`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());

	const h1 = document.createElement('h1');
	h1.innerText = "Úkoly"

	const ul = document.createElement('ul')

	for (let ukol of snapshot.val()) {
		const li = document.createElement('li')

		li.innerHTML = ukol["datum"] + " – " + ukol["predmet"] + " – " + ukol["nazev"]

		ul.append(li)
	}

	const body = document.querySelector('body');

	body.append(h1);
	body.append(ul)

  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});