Vue.component('person', {
    props: ['name', 'family'],
    template: `
    <div>
        {{ name }}
        {{ bond }}
    </div>
    `,
    computed: {
        bond(){
            return this.family ? 'Relative' : 'Friend'
        }
        
    }
})

Vue.component('people', {
    template: `
    <div>
        <person v-for="personne in relations">
            <person :name="personne.name" :family="personne.family"></person>
        </person>
    </div>
    `,
    data() { 
        return { 
            relations: [
                {name: 'Chris', family: false},
                {name: 'Cedric', family: true},
                {name: 'Amelie', family: false},
                {name: 'Jade', family: true},
                {name: 'Estelle', family: false},
            ]
        }
    }
})

new Vue({
    el: '#root',

})