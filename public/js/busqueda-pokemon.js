
        Vue.component("busqueda-pokemon",{
            template:
            `
        
    <div >    
            <div id="contenedorBusqueda"  class="card-header "> 
                



                <div class="container justify-content-center">
                <div class=""> 
                    <h1 class="text-center">Busqueda pokemon </h1>
                </div>
                <div class="row ">

                    <div class="col-5 ">
                        <label class="text-right" > Numero o nombre de Pokemon: </label >
                    </div>

                    <div class="col-5  ">
                        <label class="text-right" > Numero de elementos: </label >
                    </div>
                    <div class="col-2 ">
                        
                    </div>
                </div>    
                <div class="row ">
                    
                    <div class="col-5 ">
                        <input type="text" class="form-control" placeholder="Numero o nombre pokemon" v-model="palabraIngresado"  >
                    </div>
                    
                    <div class="col-5 ">
                        <input type="number" class="form-control" placeholder="Numero pokemons"  v-model="numeroIngresado" >
                    </div>
                    <div class="col-2">
                        <button class="btn btn-success" @click="solicitud"   >Buscar pokemons </button>
                    </div>
                </div>
            </div>
            

            

            <div class="row text-center" >
                <h1  v-if="resultadosPokemon.length" >Resultados pokemon </h1>
                

            </div>  

            <div class="row text-center" >
            <ul class="list-group">
                    
                    <li class="list-group-item list-group-item-danger" v-for="item of errores " >
                    {{item}}  
                               
                    </li>
                </ul>
            </div>  
            <div class="row" id="resuldatos"  v-if="resultadosPokemon.length">
                


                <div class="card text-center">
                    <div class="card-header">
                        <ul  class="nav nav-tabs card-header-tabs justify-content-center" >
                            <li v-for="item of resultadosPokemon " @click="selcItem(item)"  class="nav-item"  > 
                                <a class="nav-link" href="#tarjeta">
                                
                                <div class="bg-image hover-overlay ripple shadow-1-strong rounded" data-mdb-ripple-color="light">
                                 <img :src="[item.spriteFrente]" > 
                                 </div > 
                                 {{item.nombre}}  
                                </a>
                            </li>

                        </ul>
                    </div>
                </div>    
               



                
            </div> 
            
        </div >             

         





                <tarjeta> </tarjeta>
            </div>
           `,
            data(){
                return {
                    palabraIngresado :1,
                    numeroIngresado :1,


                };
            },computed:{
               ...Vuex.mapState(['pokemonSlc','resultadosPokemon','errores'])

           },methods: {
            solicitud (e) {

              //  console.log("algo"+this.palabraIngresado+this.numeroIngresado)
                //this.$store.commit('updateMessage', e.target.value)
                const parametros= { busqueda:this.palabraIngresado, numero:this.numeroIngresado }
                this.$store.commit('llenarPokemons',parametros);
                return false;
             },
             selcItem(e){
                   
                   this.$store.commit('cambiarPokemonActual',e);
             }
            }
        });