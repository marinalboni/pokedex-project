const axios = require('axios');
const { sendActivationMail } = require('../config/mailer.config');

// HOME (LIST)
module.exports.home = (req, res, next) => {
    const { page } = req.params;
    const limit = 20;
    const offset = page * limit;
    const previousPage = offset > 0;    

    let previousBtn = Number(page) - 1;
    let nextBtn = Number(page) + 1;
    
    
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    .then((response) => {
        const pokemons = response.data;        
        const maxPage = Math.floor(pokemons.count / limit);
        const nextPage = Number(page) === maxPage ? false : true;
        console.log(maxPage, page);

        if (Number(page) > maxPage || Number(page) < 0) {
            res.render('home', { error: `Sorry we don't have pokemons :(` })
        } else {
             res.render('home', { offset, previousPage, nextPage, previousBtn, nextBtn, pokemons: pokemons.results })
        }       
    })
    .catch((error) => {
        console.log('There was an ERROR: ', error);
    });    
}

module.exports.detail = (req, res, next) => {
    const { name } = req.params;

    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then((pokemons) => {
        console.log(pokemons.data)
        res.render('pokemons/detail', { name, pokemons: pokemons.data })
    })
    .catch((error) => {
        console.log('There was an ERROR: ', error);
    });
}