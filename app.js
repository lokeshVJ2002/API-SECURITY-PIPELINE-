const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(express.json());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { error: 'Too many requests, please try again later.' }
});
app.use(limiter);

const users = {
    '101': { id: '101', name: 'Alice', secret: 'Alice confidential record' },
    '102': { id: '102', name: 'Bob', secret: 'Bob confidential record' }
};

app.get('/health', (req, res) => {
    res.json({ status: 'API is operational' });
});

// SECURED BOLA ENDPOINT
app.get('/api/users/:id', (req, res) => {
    const authHeader = req.headers['authorization'];
    
    // Authorization Check: Reject if missing or unauthorized
    if (!authHeader || authHeader !== `Bearer token-for-${req.params.id}`) {
        return res.status(403).json({ error: 'Forbidden: Access denied to this resource' });
    }

    const user = users[req.params.id];
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
});

app.listen(3000, () => {
    console.log('Target API running on http://localhost:3000');
});
