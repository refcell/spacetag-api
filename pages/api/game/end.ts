import { database, admin } from '@/lib';

/*
 * /api/game/end?playerId={playerUuid}&gameId={gameId}
 * @param playerId
 * @param gameId
*/
export default async (req, res) => {
    try {
        // * Get Game ID
        let playerId = req.query.playerId;
        let gameId = req.query.gameId;
        let user = null
        let game = null

        admin
            .database()
            .ref('game/' + gameId)
            .on('value', (snapshot) => {
                game = snapshot.val();
            });

        // * Remove gameId from user games object
        admin
            .database()
            .ref('user/' + playerId)
            .on('value', (snapshot) => {
                user = snapshot.val();
            });
        
        let new_games = user['games'];
        delete new_games[gameId];

        if(game.creatorID === playerId) {
            // * Create Update Object
            var updates = {};
            updates['/game/' + gameId + "/isPlaying"] = false;
            updates['/user/' + playerId + '/games'] = new_games

             // * Update
            database.update(updates);
            res.status(200).json(updates);
        } else {
            res.status(400).json({error: "You are not the creator of this game."})
        }
    } catch (e) {
        res.status(400).json({error: e})
    }
};