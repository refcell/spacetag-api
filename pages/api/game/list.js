import firebase from '../../../lib/firebase';

export default async (req, res) => {
    let result = {res: []};
    try {
        await firebase
        .child('game')
        .on('child_added', (doc) => {
            //console.log(doc)
            result.res.push(doc.key);
        })
        res.status(200).json(result);
    } catch (e) {
        res.status(400).json({error: e})
    }
};
