const mongoose = require('mongoose');
const User = require('../models/User')
const Portfilio = require('../models/Portfilio')

// Get All Portfolio
const getPortFolio = async (req, res) => {
    try {
        const portfolio = await Portfilio.find();
        res.status(200).json(portfolio)

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
};

// Get All Portfolio
const getUserPortFolio = async (req, res) => {
    const { id } = req.params;
    try {
        await Portfilio.find({ creator: `${id}` }).exec((err, result) => {
            if (err) {
                res.status(500).json({ message: 'Error has occured' })
            } else {
                res.status(200).json(result)
            }
        })


    } catch (error) {
        res.status(404).json({ message: error.message })
    }
};

// Get Portfolio By ID
const getPortFolioByID = async (req, res) => {
    const { portfolio_id } = req.params;

    try {
        const portfolio = await Portfilio.findById(portfolio_id);
        res.status(200).json(portfolio)

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
};

// Create Portfolio
const createPortfolio = async (req, res) => {
    const portfolio = req.body;
    const newPortfolio = new Portfilio({ ...portfolio, creator: req.userId, createdAt: new Date().toString() });


    try {
        await newPortfolio.save();

        res.status(201).json(newPortfolio);
    } catch (error) {
        console.log(error)
        res.status(409).json({ message: error.message });
    }
};

// Edit Portfolio
const editPortfolio = async (req, res) => {
    const { id } = req.params; // _id for mongo id
    const portfolio = req.body;
    const options = { new: true };

    try {
        const updatePortfolio = await Portfilio.findByIdAndUpdate(id, portfolio, options);
        res.status(201).json(updatePortfolio)
    } catch (error) {
        console.log(error)
        res.status(409).json({ message: error.message });
    }
};

const deletePortfolio = async (req, res) => {
    const { id } = req.params;

    await Portfilio.findByIdAndRemove(id);

    res.json({ message: `Post deleted successfully` })
};

module.exports = { getPortFolio, createPortfolio, getUserPortFolio, getPortFolioByID, editPortfolio, deletePortfolio }