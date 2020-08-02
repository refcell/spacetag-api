import { database } from '@/lib';


/*
 * /api/game/end?creatorId={playerUuid}&tagDistance={tagDistance}
 * @param tagDistance
 * @param tagDistance
*/
export default async (req, res) => {
    try {
        // * Get Game ID
        let newGameID = database.child('game').push().key
        let { creatorId, tagDistance } = req.query;

        // * New Game Entry
        let postData = {
            creatorID: creatorId,
            tagDistance: tagDistance,
            isPlaying: true,
            whoIsIt: creatorId,
            players: {
                [creatorId]: creatorId
            },
            tagHistory: {},
            gameID: newGameID
        };

        // * Create Update Object
        var updates = {};
        updates['/game/' + newGameID] = postData;
        updates['/user/' + creatorId + '/games/' + newGameID] = postData;

        // * Update
        database.update(updates);
        res.status(200).json(updates);
    } catch (e) {
        res.status(400).json({error: e})
    }
};