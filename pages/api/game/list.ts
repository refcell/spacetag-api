import { database } from '@/lib';

/*
 * /api/game/list
*/
export default (req, res) => {
    let result = {res: []};
    try {
        database
        .child('game')
        .on('child_added', (doc) => {
            result.res.push(doc);
        })
        res.status(200).json(JSON.stringify(result));
    } catch (e) {
        res.status(400).json({error: e})
    }
};
