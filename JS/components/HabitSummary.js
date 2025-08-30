const HabitSummary = {
    template: `
        <div class="summary">
            <h1>Rastreador de Habitos</h1>
            <p v-if="habitos.length">Total de hábitos: {{ habitos.length }}</p>
            <p v-else>¡Comienza a construir buenos hábitos hoy!</p>
        </div>
    `,
    props: {
        habitos: {
            type: Array,
            required: true
        }
    }
};