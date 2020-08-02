import { database } from '@/lib';

export default async (req, res) => {
    try {
        // * Get Game ID
        let newGameID = database.child('game').push().key
        let creatorId = req.query.creatorID;

        // * New Game Entry
        let postData = {
            creatorID: req.query.creatorID,
            tagDistance: req.query.tagDistance,
            isPlaying: true,
            whoIsIt: req.query.creatorID,
            players: {
                [creatorId]: creatorId
            },
            tagHistory: {},
            gameID: newGameID
        };

        // * Create Update Object
        var updates = {};
        updates['/game/' + newGameID] = postData;
        updates['/user/' + req.query.creatorId + '/games/' + newGameID] = postData;

        // * Update
        database.update(updates);
        res.status(200).json(updates);
    } catch (e) {
        res.status(400).json({error: e})
    }
};