import { database } from '@/lib';

/*
 * /api/user/update-location?userId=userId&latitude=lat&longitude=long
 * @param userId (string)
 * @param latitude (string)
 * @param longitude (string)
*/
export default async (req, res) => {
    try {
        let { userId, latitude, longitude, } = req.query;



        // * Create Update Object
        var updates = {};
        updates['/user/' + userId + '/location/longitude'] = longitude;
        updates['/user/' + userId + '/location/latitude'] = latitude;

        // * Update
        database.update(updates);
        res.status(200).json(updates);
    } catch (e) {
        res.status(400).json({error: e})
    }
};
