const { BadRequestError } = require('../error');
const GetPlaces = async(req,res,next)=>{
  const { query } = req.query; // e.g., Delhi
  try {
    if(!query || query.trim()===''){
         throw new BadRequestError('Query must be provided');
    }
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=15`, {
      headers: {
        'User-Agent': 'YourAppNameHere/1.0 (your@email)',
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch data from Nominatim' });
  }
}
module.exports={GetPlaces}