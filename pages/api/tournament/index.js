import getAll from "./getAll";
import create from "./create";
import getOne from "./getOne";

const handler = async (req, res) => {
	if (req.method === 'GET') {
		if(req.query.id){
			await getOne(req, res);
		}else{
			await getAll(req, res);
		}
	}
	else if (req.method === 'POST') {
		await create(req, res);
	}
	else {
		res.status(405).json({ error: 'Method not allowed' });
	}
}

export default handler;