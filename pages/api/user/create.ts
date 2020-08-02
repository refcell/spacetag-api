import { admin, database } from '@/lib';

/*
 * /api/user/create?displayName={displayName}&latitude={latitude}&longitude={longitude}
 * @param displayName
 * @param location
*/
export default async (req, res) => {
    try {
        let { displayName, latitude, longitude, playerId } = req.query;
        let update = false;
        admin
            .database()
            .ref('user/' + playerId)
            .on('value', (snapshot) => {
                if (snapshot.exists()) {
                    update = true;
                }
            });

        // user already exists, so they're re-signing in. Update their location and display name
        if (update) {
            var updates = {};
            updates['/user/' + playerId + '/location/longitude'] = longitude;
            updates['/user/' + playerId + '/location/latitude'] = latitude;
            updates['/user/' + playerId + '/displayName'] = displayName;

            // * Update
            database.update(updates);
            res.status(200).json(updates);
            return;
        }

        // * New Game Entry
        let user = {
            playerID: playerId,
            games: {},
            displayName: displayName,
            location: { latitude, longitude },
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
