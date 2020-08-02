import {admin, database} from '@/lib';

/*
 * /api/game/leave?playerId={playerWhosJoining}&gameId={shortGameId}
 * @param playerId
 * @param gameId
*/
export default async (req, res) => {
    try {
        // * Get Game ID
        let { gameId, playerId } = req.query
        let isPlaying = false;
        let game = null
        let user = null;

        // * Verify Game isPlaying==true
        admin
            .database()
            .ref('game/' + gameId)
            .on('value', (snapshot) => {
                game = snapshot.val();
                isPlaying = game.isPlaying;
            });
        
        let new_players = game['players'];
        delete new_players[playerId];
        if(Object.keys(new_players).length == 0) {
            isPlaying = false;
        }

        // * Remove gameId from user games object
        admin
            .database()
            .ref('user/' + playerId)
            .on('value', (snapshot) => {
                user = snapshot.val();
            });
        
        let new_games = user['games'];
        delete new_games[gameId];

        // * Create Update Object
        var updates = {};
        updates['/game/' + gameId + "/players"] = new_players;
        updates['/game/' + gameId + "/isPlaying"] = isPlaying;
        updates['/user/' + req.query.creatorId + '/games'] = new_games;

        // * Update
        database.update(updates);
        res.status(200).json(updates);
    } catch (e) {
        res.status(400).json({error: e})
    }
};