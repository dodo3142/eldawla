const express = require('express');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const app = express();


app.use(express.json());


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    return res.status(200).json({});
  }
  next();
});


const users = [];


app.use(express.static('.'));


app.get('/api/users', (req, res) => {

  const safeUsers = users.map(user => ({
    id: user.id,
    email: user.email,
    name: user.name
  }));
  res.json(safeUsers);
});


app.post('/api/signup', async (req, res) => {
  try {

    const existingUser = users.find(user => user.email === req.body.email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    const user = {
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    };


    users.push(user);


    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.post('/api/login', async (req, res) => {
  try {

    const user = users.find(user => user.email === req.body.email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }


    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }


    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      message: 'Login successful'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});








app.post('/api/rooms', (req, res) => {
  try {
    const roomsFilePath = path.join(__dirname, 'rooms.json');
    let roomsData;
    try {
      const fileContent = fs.readFileSync(roomsFilePath, 'utf8');
      roomsData = JSON.parse(fileContent);
    } catch (error) {
      roomsData = { rooms: [] };
    }   
    roomsData.rooms.push(req.body);
    
    fs.writeFileSync(roomsFilePath, JSON.stringify(roomsData, null, 2), 'utf8');
    
    res.status(201).json({ 
      message: 'Room added successfully',
      room: req.body
    });
  } catch (error) {
    console.error('Error adding room:', error);
    res.status(500).json({ message: error.message });
  }
});


app.get('/api/rooms', (req, res) => {
  try {
    const roomsFilePath = path.join(__dirname, 'rooms.json');
    const fileContent = fs.readFileSync(roomsFilePath, 'utf8');
    const roomsData = JSON.parse(fileContent);
    
    res.json(roomsData);
  } catch (error) {
    console.error('Error reading rooms:', error);
    res.status(500).json({ message: error.message });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});