import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: 'AIzaSyDtnj9IA6Hb3s2KCEzQ70SZwJtAbMCh1UU',

  authDomain: 'estera-cpfl.firebaseapp.com',

  projectId: 'estera-cpfl',

  storageBucket: 'estera-cpfl.appspot.com',

  messagingSenderId: '228733162452',

  appId: '1:228733162452:web:5303e2e09f467e3e59bc41',

  measurementId: 'G-FYJPFG6449',
}

// Initialize Firebase

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const fire = getFirestore(app)
