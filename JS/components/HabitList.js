const HabitList = {
    template: `
        <div>
            <h2>Mis Habitos</h2>
            <ul class="habit-list" v-if="habitos.length">
                <li v-for="habito in habitos" :key="habito.id" class="habit-item">
                    <span class="habit-text">{{ habito.texto }}</span>
                    <div class="habit-actions">
                        <button @click="verDetalle(habito.id)" class="btn-detail">Ver Detalle</button>
                        <button @click="eliminar(habito.id)" class="btn-delete">Eliminar</button>
                    </div>
                </li>
            </ul>
            <p v-else class="no-habits">No hay habitos registrados. ¡Agrega uno para comenzar!</p>
        </div>
    `,
    props: {
        habitos: {
            type: Array,
            required: true
        }
    },
    methods: {
        eliminar(id) {
            if (confirm('¿Estás seguro de que quieres eliminar este hábito?')) {
                this.$emit('eliminar-habito', id);
            }
        },
        verDetalle(id) {
            this.$emit('ver-detalle', id);
        }
    }
};