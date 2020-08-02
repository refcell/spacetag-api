import { admin } from '@/lib';

/*
 * /api/game/locations?gameId={shortGameId}
 * @param gameId
*/
export default async (req, res) => {
    try {
        // * Get Game ID
        let { gameId } = req.query
        let game_users = [];
        let result = {}

        // * Get all users in the game
        admin
            .database()
            .ref('game/' + gameId)
            .on('value', (snapshot) => {
                game_users = snapshot.val().players;
            });

        // * For each user, get location
        game_users.forEach((id) => {
            admin
            .database()
            .ref('user/' + id)
            .on('value', (snapshot) => {
                result[id] = snapshot.val();
            })
        })

        // * Return user 
        res.status(200).json(result);
    } catch (e) {
        res.status(400).json({error: e})
    }
};