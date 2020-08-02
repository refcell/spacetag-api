import { database } from '@/lib';

/*
 * /api/user/create?displayName={displayName}&location={location}
 * @param displayName
 * @param location
*/
export default async (req, res) => {
    try {
        // * Get Game ID
        let playerId = database.child('user').push().key
        let { displayName, location } = req.query;

        // * New Game Entry
        let user = {
            playerID: playerId,
            games: {},
            displayName: displayName,
            location: location
        };

        // * Create Update Object
        var updates = {};
        updates['/user/' + playerId] = user;

        // * Update
        database.update(updates);
        res.status(200).json(updates);
    } catch (e) {
        res.status(400).json({error: e})
    }
};