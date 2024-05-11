import express from 'express';
import user from  '../models/user.js';
import role from '../models/role.js';
import order from '../models/order.js';
import bcrypt from 'bcrypt';

const router  = express.Router();


// Create
router.post('/', async (req, res) => {
    try {
        const { firstname, lastname, weight, address, date, remarks, phoneno, email, time, isActive } = req.body;
        const newUser = new user({
            firstname, lastname, weight, address, date, remarks, phoneno, email, time, isActive
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


//Create Role...
router.post('/signUp', async (req, res, next) => {
    try {
        const newRole = new role(req.body);
        await newRole.save();
        // console.log('dnsbfd',newUser);
        res.status(201).json(newRole);
        return res.send("role created");
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

//Update Role...
router.put('/signUp/:id', async (req, res, next) => {
    try {
        const Role  = await role.findById({_id: req.params.id});
        if(Role){
            const newData = await role.findByIdAndUpdate(
                req.params.id,
                {$set: req.body},
                {new: true}
            )
        }
        res.status(200).send("role updated");
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

//get all roles...
router.get('/allRole', async (req, res, next) => {
    try {
        const Roles = await role.find({});
        res.json(Roles);
    } catch (err) {
        res.status(400).json({ error: err.message });        
    }
})

//delete role...
router.delete('/deleteRole/:id', async (req, res, next) => {
    try {
        // console.log('dsds');
        const id = req.params.id;
        const Roles = await role.findById({_id: id});
        if(Roles){
            await role.findByIdAndDelete(id);
            return res.status(200).send("role deleted");
        }else{
            console.log('no roles exist with this id');
            return res.status(404).send("roles not found")
        }
        // res.sendStatus(204);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

//Create User (register)...
router.post('/register', async (req, res, next) => {
    const role = await order.find({role: 'user'});
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new order({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashPassword,
        roles: role
    });
    await newUser.save();
    return res.status(200).send("User Registered")
});

//Login User...
router.post('/login', async(req, res, next) => {
    try {
        const user = await order.findOne({email: req.body.email});
        if(!user){
            return res.status(404).send("user not found");
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isPasswordCorrect){
            return res.status(404).send("Password is incorrect!");
        }
        return res.status(200).send("LogIn is success!");
    } catch (error) {
        res.status(400).json({ error: err.message });        
    }
})

export default router;