import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js"
import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js"


const firebaseConfig = {
	apiKey: "AIzaSyDkjZlYedUGvCTCZG3D4IRHNbxjInOMoa8",
	authDomain: "gymceska-b9b4c.firebaseapp.com",
	databaseURL: "https://gymceska-b9b4c-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "gymceska-b9b4c",
	storageBucket: "gymceska-b9b4c.appspot.com",
	messagingSenderId: "513344353318",
	appId: "1:513344353318:web:260f4bee62af1323eca2e7",
	measurementId: "G-X28NJQT6ZK"
}
const app = initializeApp(firebaseConfig)

const database = getDatabase(app)

// database init ↑ 

// stahování úkolů

const dbRef = ref(database)
get(child(dbRef, "ukoly2")).then((snapshot) => {
	if (snapshot.exists()) {
		console.log(snapshot.val())

		// tvoření htmlka

		const divNadpis = document.createElement("div")
		divNadpis.className = "d-flex justify-content-center"

		const h1 = document.createElement('h1')
		h1.innerText = "Úkoly"
		h1.className = "mt-1"

		divNadpis.append(h1)

		const ul = document.createElement('ul')

		ul.className = "list-group list-group-flush"

		for (let ukol of snapshot.val()) {
			const li = document.createElement('li')

			li.className = "list-group-item d-flex justify-content-start align-items-start"

			const input = document.createElement("input")
			const div1 = document.createElement("div")
			const div2 = document.createElement("div")
			const div3 = document.createElement("div")
			const span = document.createElement("span")

		
			let today = new Date()
			let dd = today.getDate()
			let mm = today.getMonth() + 1
			let jeToNaZitraNeboDneska = ukol["datum"] == String(dd) + ". " + String(mm) + "." 
			|| ukol["datum"] == String(dd + 1) + ". " + String(mm) + "."

			input.type = "checkbox"
			input.className = "form-check-input me-2" 
			input.onclick = function(ev) {
				if (input.checked) {
					span.className = "badge bg-success rounded-pill"
				} else {
					if (jeToNaZitraNeboDneska) {
						span.className = "badge bg-danger rounded-pill"
					} else {
						span.className = "badge bg-primary rounded-pill"
					}
				}
			}

			div1.className = "fw-bold me-2"
			div1.innerHTML = ukol["predmet"]
		
			div2.innerHTML = ukol["nazev"]

			div3.className = "flex-fill"

			span.innerHTML = ukol["datum"]
			if (jeToNaZitraNeboDneska) {
				span.className = "badge bg-danger rounded-pill"
			} else {
				span.className = "badge bg-primary rounded-pill"
			}

			li.append(input)
			li.append(div1)
			li.append(div2)
			li.append(div3)
			li.append(span)

			ul.append(li)
		}

		const body = document.querySelector('body')

		body.append(divNadpis)
		body.append(ul)


		console.log("neco neco")

		// když to není:

	} else {
		console.log("No data available")
	}
}).catch((error) => {
  	console.error(error)
})
