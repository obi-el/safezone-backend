import LocationModel from "../../models/LocationModel";

export async function addLocation(req, res) {
	const {
		locations
	} = req.body;

	if(!locations) {
		res.status(400).json({ result: 'Post failed, Missing Parameter'})
	}

	try {
		await LocationModel.insertMany(locations);
		res.status(200).json({ result: 'Locations Added' })
	} catch (err) {
		console.log('addLocation Error:', err);
		res.status(500).json({ result: 'Failed to add Locations' });
	}
}

export async function getLocation(req, res) {
	const {
		fromTimestamp,
		toTimestamp
	} = req.query;

	if(!fromTimestamp || !toTimestamp) {
		res.status(400).json({ result: 'Get failed, Missing Parameter'})
	}

	try {
		const result = await LocationModel
			.find({ visitTime: { $gte: fromTimestamp, $lte: toTimestamp }  })
			.sort({ visitTime: 'asc' })
			.exec();

		res.status(200).json({ result: result.map(res => ({ location: res.location, visitTime: res.visitTime })) });
	} catch(err) {
		console.log('getLocation Error:', err);
		res.status(500).json({ result: 'Failed to get Location' });
	}
}
