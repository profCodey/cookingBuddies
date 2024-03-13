import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {config} from 'dotenv';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import { connectDB } from './config/db.js';
import recipeRouter from './routes/recipe.routes.js'
import authRouter from './routes/auth.routes.js'

config();

const app = express();

connectDB()
    .then(() => {
   app.listen(process.env.PORT || 8000, () => {
     console.log(`Server is running on port ${process.env.PORT}`);
   });
    }).catch((error) => {
    console.log("Error connecting to mongoDB", error)
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
    })
)

app.use("/api/recipe", recipeRouter);
app.use("/api/auth", authRouter);

// app.use(function (req, res, next) {
//   if (!req.user)
//     return next(createError(401, "Please login to view this page."));
//   next();
// });

// app.use(function (err, req, res, next) {
//     console.error(err.message);
//     if (!err.statusCode) err.statusCode = 500;
//     res.status(err.statusCode).send(err.message);
// }
// );

// app.use((req, res, next) => {
//     if (req.headersSent) {
//         return next();
//     }
//     res.status(404).json({
//         message: "Resource not found",
//     });
// })





export default app;