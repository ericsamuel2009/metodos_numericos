import { mapActions, mapState } from "vuex";
import AgregarPagosRecibidos from '@/components/pagosRecibidos/agregarPagosRecibidosForm';
import { validacionTablaVacia, validarFechaVacia } from '@/validators/pagosRecibidosValidator'

export default {
    name:"pagosRecibidos",
    data:()=>({
        aPagosRecibidos: [],
        page: 1,
        max: 5,
        carga: false,
        fechaPago: null,
        agregarNuevoIngreso : false,
        editActive: false,
        edit: null,
        editProp: {}
    }),
    methods:{
        ...mapActions('pagosRecibidos', ['getSavePagosRecibidos']),
        async facturar(){ 
            if (validacionTablaVacia(this.aPagosRecibidos) && validarFechaVacia(this.fechaPago)) {
                for (const filePush of await this.aPagosRecibidos) filePush.fechaPago = this.fechaPago;
                console.table(this.aPagosRecibidos);
                await this.getSavePagosRecibidos(this.aPagosRecibidos);
                this.aPagosRecibidos = []
                this.fechaPago = null;
            }
        },
        verOpcion(){
            console.log("VER");
        },
        editOpcion() {
            console.log("EDITAR");
        },
        eliminarOpcion(valorSeleccionado) {
            this.aPagosRecibidos.splice( this.aPagosRecibidos.indexOf( valorSeleccionado ), 1);
            this.aPagosRecibidos = [ ...this.aPagosRecibidos, ];
        },
        nuevoIngreso() {
            this.agregarNuevoIngreso = true;
        },
        accionTrigger(payload) {
            console.table({payload});
            if (payload) {
                this.aPagosRecibidos.push(payload)
            }
            this.agregarNuevoIngreso = false;
        }
    },
    filters:{
        toCurrency( valorACurrency ) {
            let currency = parseInt(valorACurrency)
            var formatter = new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0
            });
            return formatter.format(currency);
        } 
    },
    computed:{
        ...mapState('pagosRecibidos', ['pagosRecibidosResponseList']),
        soloMes() {
            if(!this.fechaPago) return
            return this.$moment(this.fechaPago).format("MMMM")
        },
    },
    components:{
        "AgregarPago" : AgregarPagosRecibidos
    }
}