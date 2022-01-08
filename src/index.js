const express = require('express');
const app = express();
const { userRouter, blogRouter } = require('./routes')
const mongoose = require('mongoose');
const { generateFakeData } = require('../faker2')
const db_config = require('./db-config.json')

const MONGO_URI = `mongodb+srv://godngu:${db_config.password}@mongodbtutorial.ut7nc.mongodb.net/BlogService?retryWrites=true&w=majority`;

const server = async () => {
    try {
        await mongoose.connect(MONGO_URI, {})
        // mongoose.set('debug', true)
        console.log("MongoDB Connected.");
        app.use(express.json())
    
        app.use('/user', userRouter)
        app.use('/blog', blogRouter)
        // app.use('/blog/:blogId/comment', commentRouter)
        
        app.listen(3000, async () => {
            console.log('server listening on port 3000')
            // await generateFakeData(10, 2, 10) // 테스트용 데이터 생성
        })
    } catch(err) {
        console.log(err);
    }
}

server();