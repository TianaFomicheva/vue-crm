import firebase from "firebase";
export default {
  actions: {
    async login({ email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (e) {
        console.log(e);
      }
    },

    getUid() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    },
    async register({ dispatch }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = await dispatch("getUid");
        await firebase.database().ref(`/users/${uid}`).set({
          bill: 10000,
          name,
        });
        console.log(uid);
      } catch (e) {
        console.log(e);
      }
    },
    async logout() {
      await firebase.auth().signOut();
    },
  },
};
