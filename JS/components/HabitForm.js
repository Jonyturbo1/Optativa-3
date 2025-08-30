const HabitForm = {
    template: `
        <div class="habit-form">
            <input 
                type="text" 
                v-model="nuevoHabito" 
                placeholder="Agregar nuevo hábito (ej: Beber 2L de agua)"
                @keyup.enter="agregar"
            >
            <button @click="agregar">Agregar</button>
        </div>
    `,
    data() {
        return {
            nuevoHabito: ''
        };
    },
    methods: {
        agregar() {
            if (this.nuevoHabito.trim() !== '') {
                this.$emit('agregar-habito', this.nuevoHabito);
                this.nuevoHabito = '';
            }
        }
    }
};