const express = require('express');
const app = express();
const PORT = 3000;

app.get('/api/vision-mission', (req, res) => {
    res.json({
        vision: "Your Vision here",
        mission: ["Mission 1", "Mission 2"]
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
