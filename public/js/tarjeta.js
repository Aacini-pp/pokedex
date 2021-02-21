
        Vue.component("tarjeta",{
            template:
            `
            <div id="tarjeta"> 
               
                


                <article  class="card container mt-12">
                <img class="card-header" src="/img/bg-pattern-card.svg" alt="imagen header card">
                <div class="card-body">
                    <img class="card-body-img" :src="['https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/'+pokemonSlc.id+'.svg' ]" alt="imagen demachop">
                    <h1 class="card-body-title">
                        <blackns>{{pokemonSlc.nombre}}</blackns>
                        
                        <span>{{pokemonSlc.id}}</span>
                    </h1>
                    <p class="card-body-text"> 
                       
                        <img :src="[pokemonSlc.spriteFrente]" title="machop frente" alt="imagen de machop frente">
                        <img :src="[pokemonSlc.spriteDetras]" title="machop atraz" alt="imagen de machop atras"></p>
                </div>
                <h2 class="mov">Movimientos</h2>
                <div class="card-footer">
                    <div class="card-footer-social">
                        <h3>{{pokemonSlc.movimientos[0] }}</h3>
                        <p>Moviemiento</p>
                    </div>
                    <div class="card-footer-social">
                        <h3> {{pokemonSlc.movimientos[1] }} </h3>
                        <p>Moviemiento</p>
                    </div>
                    <div class="card-footer-social">
                        <h3> {{pokemonSlc.movimientos[2] }} </h3>
                        <p>Moviemiento    </p>
                    </div>
                </div>
                </article>
            


            </div>
           `,computed:{
               ...Vuex.mapState(['pokemonSlc'])

           },methods:{
               ...Vuex.mapMutations(['llenarCursos']),
               ...Vuex.mapActions(['obtenerCursos'])
           }
        });