const MainLayout = {
    template: '#main-layout',
    components: {
        'habit-list': HabitList,
        'habit-form': HabitForm,
        'habit-summary': HabitSummary
    },
    data() {
        return {
            habitos: []
        };
    },
    created() {
        const habitosGuardados = localStorage.getItem('habitos');
        if (habitosGuardados) {
            this.habitos = JSON.parse(habitosGuardados);
        }
    },
    watch: {
        habitos: {
            handler(nuevosHabitos) {
                localStorage.setItem('habitos', JSON.stringify(nuevosHabitos));
            },
            deep: true
        }
    },
    methods: {
        agregarHabito(texto) {
            if (texto.trim() !== '') {
                this.habitos.push({
                    id: Date.now(),
                    texto: texto.trim(),
                    fechaCreacion: new Date().toISOString(),
                    vecesCompletado: 0,
                    historial: []
                });
            }
        },
        eliminarHabito(id) {
            this.habitos = this.habitos.filter(habito => habito.id !== id);
        },
        verDetalle(id) {
            this.$router.push(`/habit/${id}`);
        }
    }
};

const HabitDetail = {
    template: '#habit-detail-page',
    data() {
        return {
            habito: null
        };
    },
    created() {
        this.cargarHabito();
    },
    methods: {
        cargarHabito() {
            const habitos = JSON.parse(localStorage.getItem('habitos') || '[]');
            this.habito = habitos.find(h => h.id === parseInt(this.$route.params.id));
        },
        marcarCompletado() {
            if (this.habito) {
                this.habito.vecesCompletado++;
                this.habito.historial.push(new Date().toISOString());
                
                const habitos = JSON.parse(localStorage.getItem('habitos') || '[]');
                const index = habitos.findIndex(h => h.id === this.habito.id);
                if (index !== -1) {
                    habitos[index] = this.habito;
                    localStorage.setItem('habitos', JSON.stringify(habitos));
                }
                
                alert(`¡Felicidades! Has completado "${this.habito.texto}" hoy.`);
            }
        },
        volver() {
            this.$router.push('/');
        },
        formatFecha(fechaISO) {
            const fecha = new Date(fechaISO);
            return fecha.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
    }
};

const app = Vue.createApp({});

const routes = [
    { path: '/', component: MainLayout },
    { path: '/habit/:id', component: HabitDetail }
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
});

app.use(router);
app.mount('#app');