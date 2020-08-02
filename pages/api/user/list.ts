import { database } from '@/lib/firebase';

/*
 * /api/user/list
*/
export default async (req, res) => {
    let result = {res: []};
    try {
        database
        .child('user')
        .on('child_added', (doc) => {
            result.res.push(doc.key);
        })
        res.status(200).json(result);
    } catch (e) {
        res.status(400).json({error: e})
    }
};
