import { database } from '@/lib/firebase';

/*
 * /api/game/list
*/
export default async (req, res) => {
    let result = {res: []};
    try {
        database
        .child('game')
        .on('child_added', (doc) => {
            result.res.push(doc);
        })
        res.status(200).json(result);
    } catch (e) {
        res.status(400).json({error: e})
    }
};
