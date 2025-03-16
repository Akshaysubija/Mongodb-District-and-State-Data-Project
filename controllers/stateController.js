const State = require('../models/stateModel');

// Add a new state //
const addState = async (req, res) => {
    const { name, population, area } = req.body;
    try {
        const state = new State({ name, population, area });
        await state.save();
        res.status(201).json({ message: 'State added successfully', state });
    } catch (err) {
        res.status(400).json({ message: 'State already exists or invalid data', error: err.message });
    }
};

// Get the population of a specific state //
const getStatePopulation = async (req, res) => {
    const { name } = req.params;
    try {
        const state = await State.findOne({ name });
        if (!state) return res.status(404).json({ message: 'State not found' });
        res.json({ population: state.population });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get all states //
const getAllStates = async (req, res) => {
    try {
        const states = await State.find();
        res.json({ states });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Calculate total population of all states //
const getTotalPopulation = async (req, res) => {
    try {
        const states = await State.find();
        const totalPopulation = states.reduce((acc, state) => acc + state.population, 0);
        res.json({ totalPopulation });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Calculate average population density //
const getAverageDensity = async (req, res) => {
    try {
        const states = await State.find();
        const densities = states.map(state => ({
            name: state.name,
            density: state.population / state.area,
        }));
        res.json({ densities });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = {
    addState,
    getStatePopulation,
    getAllStates,
    getTotalPopulation,
    getAverageDensity,
};
