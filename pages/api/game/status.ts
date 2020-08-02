import {admin, database} from '@/lib';

/*
 * /api/game/status?gameId={shortGameId}
 * @param gameId
*/
export default async (req, res) => {
    try {
        // * Get Game ID
        let gameId = req.query.gameId
        
        // * Verify Game isPlaying==true
        let isPlaying = false;
        let players = []
        let game = null
        let playerSnapshot = null
        admin
            .database()
            .ref('game/' + gameId)
            .on('value', (snapshot) => {
                game = snapshot.val();
                isPlaying = game.isPlaying;
                players = game.players;
            });


        res.status(200).json({isPlaying, players});
    } catch (e) {
        res.status(400).json({error: e})
    }
};
