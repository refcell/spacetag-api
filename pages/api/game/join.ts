import {admin, database} from '@/lib/firebase';

/*
 * /api/game/join?playerId={playerWhosJoining}&gameId={shortGameId}
 * @param playerId
 * @param gameId
*/
export default async (req, res) => {
    try {
        // * Get Game ID
        let gameId = req.query.gameId
        let playerId = req.query.playerId
        
        // * Verify Game isPlaying==true
        let isPlaying = false;
        let game = null
        admin
            .database()
            .ref('game/' + gameId)
            .on('value', (snapshot) => {
                game = snapshot.val();
                isPlaying = game.isPlaying;
            });

        // * Create Update Object
        var updates = {};
        updates['/game/' + gameId + "/players/" + playerId] = playerId;
        updates['/user/' + req.query.creatorId + '/games/' + gameId] = gameId;

        // * Update
        database.update(updates);
        res.status(200).json(updates);
    } catch (e) {
        res.status(400).json({error: e})
    }
};