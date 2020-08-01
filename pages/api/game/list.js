import firebase from '../../../lib/firebase';

export default (req, res) => {
  firebase
    .collection('game')
    .get()
    .then((doc) => {
      res.json(doc.data());
    })
    .catch((error) => {
      res.json({ error });
    });
};
