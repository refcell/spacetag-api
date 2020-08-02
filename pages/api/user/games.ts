import {admin} from '@/lib';

/*
 * /api/user/games?playerId={playerId}
 * @param playerId
*/
export default async (req, res) => {
    let result = {res: []};
    let playerId = req.query.playerId

    try {
        admin
            .database()
            .ref('user/' + playerId)
            .on('value', (snapshot) => {
                result.res.push(snapshot);
            });

        res.status(200).json(result);
    } catch (e) {
        res.status(400).json({error: e})
    }
};