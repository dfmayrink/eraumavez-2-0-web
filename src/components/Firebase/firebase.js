import app from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBrRzaVlCzgaNXwR9xeIWGaGud1qNozsEM",
  authDomain: "eraumavezbhz.firebaseapp.com",
  databaseURL: "https://eraumavezbhz.firebaseio.com",
  projectId: "eraumavezbhz",
  storageBucket: "eraumavezbhz.appspot.com",
  messagingSenderId: "160338934426"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
}

export default Firebase;

export const authRef = new Firebase();

