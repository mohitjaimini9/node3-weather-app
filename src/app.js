const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Mohit"
    });
})

app.get('/about', (req, res)=> {
    res.render('about', {
        title: "About me",
        name: "Mohit"
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: "This is help page.",
        title: "Help",
        name: "Mohit"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error : "Please enter the location"
        })
    }

    geocode(req.query.address, (error, {longitude, lattitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        
        forecast(lattitude, longitude, (err, forecastData) => {
            if(err) {
                return res.send (err);
            }

            return res.send({
                forecast : forecastData,
                location,
                Address : req.query.address
            });

        })

    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        errorMessage : "Help article not found",
        name : "Mohit"
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        errorMessage: "Page not found.",
        name : "Mohit"
    });
})

app.listen(port, () => {
    console.log(`Running on port ${port}`);
})