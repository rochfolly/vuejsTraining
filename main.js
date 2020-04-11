window.Event = new class{
    constructor(){
        this.vue = new Vue();
    }

    fire(event, data = null){
        this.vue.$emit(event, data)
    }

    listen(event, callback){
        this.vue.$on(event, callback)
    }
}

Vue.component('tab', {
    props: { 
        name: { required: true },
        selected: {default: false}
    },
    template: `
    <div v-show="isActive"><slot></slot></div>
    `,
    data() {
        return {
            isActive: false
        };
    },
    mounted() {
        this.isActive = this.selected;
    },
    
})

Vue.component('tabs', {
    template: `
    <div>
        <div class="tabs">
            <ul>

                <li v-for="tab in tabs" :class="{ 'is-active': tab.isActive }" @click=selectTab(tab)>
                    <a href="#">
                        {{ tab.name }}
                    </a> 
                </li>

            </ul>
        </div>
        <div class="tabs-details">
            <slot></slot>
        </div>
    </div>
    `,
    data() {
        return {
            tabs: [],
        }
    },
    created() {
        this.tabs = this.$children
    },
    methods: {
        selectTab(selectedTab){
            this.tabs.forEach(tab => {
                tab.isActive = (selectedTab.name === tab.name)
            });
        }
    },
})

Vue.component('modal', {
    props: ['title'],
    template: `
    <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">{{ title }}</p>
                <button class="delete" aria-label="close" @click="$emit('close')"></button>
            </header>
            <section class="modal-card-body">
                <slot></slot>
            </section>
        </div>
    </div>
    `,
})

Vue.component('temple', {
    props: { index: Number },
    template: `
    <div @click=emitChange() style="border-radius: 100%; width: 200px; height: 200px; background-color:red;" >
    {{ styled }}
    </div>
    `,
    data() {
        return {
            target: this.index,
            colors: ['blue', 'green', 'red', 'yellow', 'brown']
        }
    },
    computed: {
            styled() {
                return "border-radius: 100%; width: 200px; height: 200px; background-color:" + this.colors[this.target]  + ";"
            } 
    },
    created(){
        Event.listen('click', () => {
            this.target = this.target == 4 ? 0 : this.target+1
        })
    },
    methods: {
        emitChange(){
            Event.fire('click')
        }
    }
})

new Vue({
    el: '#root',
    data: {
        showModal: false,
        newPerson: {
            name: '', family: '', description: '', selected: ''
        },
        relations: [
            {name: 'Chris', family: false, description: 'My best friend', selected: true},
            {name: 'Cedric', family: true, description: 'My elder brother', selected: false},
            {name: 'Estelle', family: false, description: 'My best friend', selected: false},
            {name: 'Jade', family: true, description: 'My little sister', selected: false},
            {name: 'Sebastien', family: false, description: 'My best VIE friend', selected: false},
        ],
    },
    methods: {
        addTab(newTab){
            newTab.selected = false
            this.relations.push(this.newPerson)
            this.newPerson = {}
        }
    },
    computed: {
        modalTitle(){
            let title = "You have " +  this.relations.length + " relations"
            return title
        }
    }
})