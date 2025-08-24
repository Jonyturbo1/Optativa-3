const app = Vue.createApp({
    data() {
        return {
            tareas: [
                {texto: 'Tomate', completed: false},
                {texto: 'Carne', completed: false},
                {texto: 'Pimienta', completed: false}
            ],
            nuevaTarea: ''
        };
    },
    methods: {
        agregarTarea() {
            if(this.nuevaTarea.trim() !== '') {
                this.tareas.push({ texto: this.nuevaTarea, completed: false });
                this.nuevaTarea = ''; //Limpiar el campo de entrada
            }
        },
        eliminarTarea(index) {
            this.tareas.splice(index, 1); //Eliminar tarea en el indice
        }
    }
});
app.mount('#app');