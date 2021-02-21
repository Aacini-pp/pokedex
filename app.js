require('dotenv').config();
const express = require("express");
const app = express();
const maint_port = process.env.MAIN_PORT
const bodyParser = require("body-parser");
const Pokedex = require("./src/index.js");


const ultimoPokemon =150;

P = new Pokedex({
    protocol: 'https',
    hostName: 'pokeapi.co',
    versionPath: '/api/v2/'
});


app.set("views","./views");//mpath
app.set("view engine","pug");// especificamos que utilizamos motor pug

//Se declara que la App podra extraer parametros
app.use(bodyParser.json()) //Formato JSON
app.use(bodyParser.urlencoded({extended: true}))//Encoded

//app.use(bodyParser());

app.use(express.static('public')); //recursos estaticos


let pokemon={
    id:0,
    nombre:"",
    spriteFrente:"",
    spriteDetras:"",
    movimientos:[],
};


app.post("/pokemon/", function(req,res){ 
    let poke;
    let errores= [];
    nRandom = Math.trunc(Math.random() * (ultimoPokemon+1 - 1)) + 1; //un numero aleatorio de poquemon por si lo necesitamos
     //si no se especifica un pokemon o dumero de estos poner por defecto aleatorio
    
    let qPokemon = (! req.body.pokemon ) ?  (nRandom): ( req.body.pokemon );
    let qNoItems =(! req.body.noitems ) ?  1: ( req.body.noitems );

        //si el pokemon escogido es mayor  que el ultimo poner aleatorio  y mandar mensaje de error
    if(qPokemon> ultimoPokemon  || qPokemon<1 ){
        qPokemon  =nRandom;
        errores.push("Pokemon fuera de rango");// marcar error
        console.log("Pidio un pokemon mayor")
    }

    if(qNoItems> ultimoPokemon || qNoItems<1  ){ //mas items que pokemones
        qNoItems  =ultimoPokemon;
        errores.push("Numero de items fuera de rango");// marcar error
        console.log("se pide mas o menos items de lso posibles");
    }


    if( (typeof qPokemon) =='string'   ){ //pasar las consultas a minusculas si es texto
        qPokemon=qPokemon.toLowerCase() 
        console.log("convirtiendo a minusculas")
    }

    
    let respuesta ={ items:[  ], consulta:{pokemon:qPokemon,items:qNoItems,query:req.body}, errores:[] };
    let primerPokemMostrado =0;
    
   
        
        (async () => {
            try {
                for (let i = 0; i < qNoItems; i++) {


                    //si es la primer consulta poner el solicitado si no primerpokemon + i
                    let consultaPokeon = (primerPokemMostrado==0 )? qPokemon : (primerPokemMostrado+i) ;
                    poke = await P.getPokemonByName(consultaPokeon)
                    //console.log(poke);
                    // console.log(i);
                    
                
                    pokemon ={id:0, nombre:"", spriteFrente:"", spriteDetras:"", movimientos:[], };
                    //nombre del Pokemon, id, sprite de frente y detrás (shiny o normal, macho o hembra) y un movimiento. 
                    pokemon.id = poke.id;

                    //modificar el numero de consulta si sepide mas pokemons de lso que hay
                    if(primerPokemMostrado ==0 &&  (  parseInt( poke.id,10 )+ parseInt(qNoItems) -1 ) >  ultimoPokemon ){
                        
                        console.log("El numero total de pokemon es mas de los que hay, se te mostrara hasta el ultimo posible");
                        errores.push("El numero total de pokemon es mas de los que hay, se te mostrara hasta el ultimo posible");// marcar error
                        qNoItems = ultimoPokemon-parseInt( poke.id );


                    }

                    primerPokemMostrado = (primerPokemMostrado ==0 )?  poke.id: primerPokemMostrado; //si no se ha definido el primer pokemon  setearlos

                    



                    pokemon.nombre= poke.name;
                    pokemon.spriteFrente = poke.sprites.front_default;
                    pokemon.spriteDetras = poke.sprites.back_default;
                    pokemon.movimientos=[];
                    poke.moves.forEach(element => {
                        pokemon.movimientos.push( element.move.name)
                    });

                    respuesta.items.push(pokemon);

                    //set errores
                    respuesta.errores=errores;

                    //console.log(i,respuesta.items);
               } 
                res.end(JSON.stringify(respuesta));
            } catch (error) {
                //console.log(error)
                //process.exit(1);
            }
        })()

    


});







app.get("/",function (req,res) {


        (async () => {
            try {
                let nRandom = Math.trunc(Math.random() * (ultimoPokemon+1 - 1)) + 1;
                poke = await P.getPokemonByName(nRandom)
                
                pokemon ={id:0, nombre:"", spriteFrente:"", spriteDetras:"", movimientos:[], };

                   //nombre del Pokemon, id, sprite de frente y detrás (shiny o normal, macho o hembra) y un movimiento. 
                 pokemon.id = poke.id;
                 pokemon.nombre= poke.name;
                 pokemon.spriteFrente = poke.sprites.front_default;
                 pokemon.spriteDetras = poke.sprites.back_default;
                 pokemon.movimientos=[];
                 poke.moves.forEach(element => {
                    pokemon.movimientos.push( element.move.name)
                 });

                 res.render("pokemon",pokemon);
            } catch (error) {
                console.log(error)
                //process.exit(1);
            }
        })()    

    
});




app.listen(maint_port);