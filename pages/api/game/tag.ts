import {admin, database} from '@/lib';

/*
 * /api/game/tag?playerId={playerWhosJoining}&playerTagged={playerTagged}&gameId={shortGameId}
 * @param playerId
 * @param gameId
 * @param playerTagged
*/
export default async (req, res) => {
    try {
        // * Get Game ID
        let { gameId, playerId, playerTagged } = req.query
        let isPlaying = false
        let game = null
        let user = null

        // * Verify Game isPlaying==true
        admin
            .database()
            .ref('game/' + gameId)
            .on('value', (snapshot) => {
                game = snapshot.val();
                isPlaying = game.isPlaying;
            });
        
        let new_players = game['players'];
        if(Object.keys(new_players).includes(playerId) && Object.keys(new_players).includes(playerTagged)) {
            if(game['whoIsIt'] === playerId) {
                // * Create Update Object
                var updates = {};
                updates['/game/' + gameId + "/whoIsIt"] = playerTagged;
                updates['/game/' + gameId + "/tagHistory/" + Date.now()] = {
                    tagged: playerId, 
                    by: playerTagged,
                    when: Date.now()
                };

                // * Update
                database.update(updates);
                res.status(200).json(updates);
            } else {
                res.status(400).json({error: "This player is not it, cannot tag."})
            }
        } else {
            res.status(400).json({error: "Both players aren't in the game."})
        }
    } catch (e) {
        res.status(400).json({error: e})
    }
};