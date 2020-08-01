import firebase from '../../../lib/firebase';

export default (req, res) => {
  firebase
    .collection('user')
    .get()
    .then((doc) => {
      res.json(doc.data());
    })
    .catch((error) => {
      res.json({ error });
    });
};
