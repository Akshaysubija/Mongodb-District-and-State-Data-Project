const District = require('../models/districtModel');
const State = require('../models/stateModel');

// Add a new district
const addDistrict = async (req, res) => {
    const { name, population, state_id } = req.body;
    try {
        const state = await State.findById(state_id);
        if (!state) return res.status(404).json({ message: 'State not found' });

        const district = new District({ name, population, state_id });
        await district.save();
        res.status(201).json({ message: 'District added successfully', district });
    } catch (err) {
        res.status(400).json({ message: 'Invalid data or state reference', error: err.message });
    }
};

// Update district population
const updateDistrictPopulation = async (req, res) => {
    const { name } = req.params;
    const { population } = req.body;
    try {
        const district = await District.findOne({ name });
        if (!district) return res.status(404).json({ message: 'District not found' });
        district.population = population;
        await district.save();
        res.json({ message: 'District population updated', district });
    } catch (err) {
        res.status(400).json({ message: 'Invalid data', error: err.message });
    }
};

// Delete district
const deleteDistrict = async (req, res) => {
    const { name } = req.params;
    try {
        const district = await District.findOneAndDelete({ name });
        if (!district) return res.status(404).json({ message: 'District not found' });
        res.json({ message: 'District deleted', district });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Group districts by state and sort
const groupDistrictsByState = async (req, res) => {
    try {
        const districts = await District.aggregate([
            {
                $group: {
                    _id: '$state_id',
                    totalPopulation: { $sum: '$population' },
                    districts: { $push: '$name' }
                }
            },
            { $sort: { totalPopulation: -1 } }
        ]);
        res.json({ districts });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Join states with districts
const joinStatesWithDistricts = async (req, res) => {
    try {
        const districts = await District.aggregate([
            {
                $lookup: {
                    from: 'states',
                    localField: 'state_id',
                    foreignField: '_id',
                    as: 'state_info'
                }
            }
        ]);
        res.json({ districts });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = {
    addDistrict,
    updateDistrictPopulation,
    deleteDistrict,
    groupDistrictsByState,
    joinStatesWithDistricts,
};
