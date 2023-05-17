 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-analytics.js";
 import { query, orderBy, where, collection, onSnapshot, Timestamp, getFirestore } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional


 
 // Initialize Firebase
 const app = initializeApp(window.firebaseConfig);
 const analytics = getAnalytics(app);
 const db = getFirestore(app)

 
 const getOrders = () => {
  const fechaActual = new Date()
  const anio = fechaActual.getFullYear()
  const mes = fechaActual.getMonth()
  const dia = fechaActual.getDate()

  const fechaInicio = Timestamp.fromDate(new Date(anio, mes, dia, 0, 0, 0)) 
  const fechaFin = Timestamp.fromDate(new Date(anio, mes, dia, 23, 59, 59))

  const productosList = document.getElementById('productosList')
  const q = query(
    collection(db, 'ordenes'),
    orderBy('fecha'),
    where('fecha', '>=', fechaInicio),
    where('fecha', '<=', fechaFin),
    where('completado', '==', false)
  )

  const audio = new Audio('audio.mp3')

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    
    productosList.innerHTML = ''
    const ordenes = []
    querySnapshot.forEach((doc) => {
      const orden = JSON.parse(doc.data().orden)
      ordenes.push({productos: orden.productos})
    })
    ordenes.map(orden => {
      if(ordenes){
        setTimeout(() => {
          audio.play();
        }, 100);
        orden.productos.map(producto => productosList.innerHTML += `<li class='producto'>${producto.nombre} <span>cantidad: ${producto.cantidad}</span></li>`)

      }
    })
  })

  
 }
 getOrders()


