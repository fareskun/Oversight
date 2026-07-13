import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyAeRL6eD8wk1FC4MhbiabBxdXqI87yE2F8',
  authDomain: 'oversight-128c1.firebaseapp.com',
  projectId: 'oversight-128c1',
  storageBucket: 'oversight-128c1.firebasestorage.app',
  messagingSenderId: '836463033233',
  appId: '1:836463033233:web:4cc92f8a0b8e1d9f117830',
  measurementId: 'G-8WHQJC6W5C',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
getAnalytics(app)
