import { admin } from '@/lib';

/*
 * /api/game/locations?gameId={shortGameId}
 * @param gameId
*/
export default async (req, res) => {
    try {
        // * Get Game ID
        let { gameId } = req.query
        let game_users = null;
        let result = {}

        // * Get all users in the game
        admin
            .database()
            .ref('game/' + gameId)
            .on('value', (snapshot) => {
                game_users = snapshot.val().players;
            });

            console.log(game_users)
        // * For each user, get location
        if(game_users != null && game_users != [] && Object.keys(game_users)) {
            Object.keys(game_users).map((id) => {
                admin
                .database()
                .ref('user/' + id)
                .on('value', (snapshot) => {
                    result[id] = snapshot.val();
                })
            })
        }

        // * Return user 
        res.status(200).json(result);
    } catch (e) {
        res.status(400).json({error: e})
    }
};