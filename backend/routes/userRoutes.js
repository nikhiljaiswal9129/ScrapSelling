import express from 'express';
import user from  '../models/user.js';

const router  = express.Router();


// Create
router.post('/', async (req, res) => {
    try {
        const { firstname, lastname, weight, address, date, remarks, phoneno, email, time } = req.body;
        const newUser = new user({
            firstname, lastname, weight, address, date, remarks, phoneno, email, time
        });
        await newUser.save();
        // console.log('dnsbfd',newUser);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
  
// Read
router.get('/', async (req, res) => {
    try {
        const users = await user.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
  
// Update
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { firstname, lastname, weight, address, date, remarks, phoneno, email, time } = req.body;
        const users = await user.findByIdAndUpdate(id, { firstname, lastname, weight, address, date, remarks, phoneno, email, time }, { new: true });
        res.json(users);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete
router.delete('/:id', async (req, res) => {
    try {
        // console.log('dsds');
        const { id } = req.params;
        await user.findByIdAndDelete(id);
        // console.log('dsds');
        res.sendStatus(204);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


export default router;