

        const pokemonDefault= { "id": 151, "nombre": "mew", "spriteFrente": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png", "spriteDetras": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/151.png", "movimientos": [ "pound", "mega-punch", "pay-day", "fire-punch", "ice-punch", "thunder-punch"] };

        
        const store = new Vuex.Store({
            state:{
                resultadosPokemon:[],
                pokemonSlc:pokemonDefault,
                errores:[]
            },mutations:{
                llenarPokemons: async function(state,parametros){
                    //state.cursos = cursosAccion;

                    
                    await axios.post("http://localhost:8081/pokemon",{
                        "pokemon":parametros.busqueda,
                        "noitems":parametros.numero
                    
                    })
                        .then(function (response) {
                        data = response.data;
                        state.resultadosPokemon = data.items;
                        console.log(data);
                        console.log(data.errores);
                        state.errores = data.errores;
                        })
                },cambiarPokemonActual(state,parametro ){
                    console.log(parametro.nombre); 
                    state.pokemonSlc = parametro


                }
            },actions:{
                obtenerCursos: async function( {commit} ){
                    // const data= await fetch("cursos.json");
                    // const cursos = await data.json();
                    commit("llenarPokemons");
                }

            }
        });

        const app = new Vue({
            el:'#app',
            store:store
        });
