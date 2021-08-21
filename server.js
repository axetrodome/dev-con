const express = require('express');
const connectDB = require('./config/db');
const app = express();
const path = require('path');
const UserRoutes = require('./routes/api/users');
const AuthRoutes = require('./routes/api/auth');
const PostsRoutes = require('./routes/api/posts');
const ProfileRoutes = require('./routes/api/profile');
const urlPrefix = '/api'

connectDB();
app.use(express.json({ extended: false }))
app.use(`${urlPrefix}/users`, UserRoutes);
app.use(`${urlPrefix}/auth`, AuthRoutes);
app.use(`${urlPrefix}/profile`, ProfileRoutes);
app.use(`${urlPrefix}/posts`, PostsRoutes);

//serve static assets in production
if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})