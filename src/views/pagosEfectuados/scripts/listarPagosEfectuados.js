// import { mapActions, mapState } from "vuex";
// import AgregarPagosEfectuados from '@/components/pagosEfectuados/agregarPagosEfectuados';
// import { validacionTablaVacia, validarFechaVacia } from "@/validators/pagosEfectuadosValidator";
const VALIDAR_ESTATUS = {
    STATUS_100 : /(1[0-9])\w+/g,
    STATUS_200 : /(2[0-9])\w+/g,
    STATUS_300 : /(3[0-9])\w+/g,
    STATUS_400 : /(4[0-9])\w+/g,
    STATUS_500 : /(5[0-9])\w+/g
}
export default {
    name:"ListarPagosRecibidos",
    data:()=>({
        datosEfectuados: [],
        esPagosEfectuadosVisible: false,
        carga: false,
        fechaPago: null,
        ArregloGrupos: [],
        ArregloConceptos: []
    }),
    methods:{
        ...mapActions('pagosEfectuados', ['getListPagosEfectuados','getSavePagosEfectuados']),
        cambioFecha() {
            console.log("asl;dmsja");
        },
        async facturar(){ 
            if (validacionTablaVacia(this.datosEfectuados) && validarFechaVacia(this.fechaPago)) {
             for (const filePush of await this.datosEfectuados) {
                filePush.fechaPago = this.$moment(this.fechaPago).format();
                filePush.concepto = filePush.concepto.idSC;
                filePush.grupo = filePush.grupo.id;
             }
            await this.getSavePagosEfectuados( this.datosEfectuados )
            this.datosEfectuados = [];
            this.fechaPago = null;
            }
        },
        agregarPagoEfectuado() {
            this.esPagosEfectuadosVisible = true;
        },
        verOpcion(){
            console.log("VER");
        },
        editOpcion() {
            console.log("EDITAR");
        },
        eliminarOpcion(valorSeleccionado) {
            this.datosEfectuados.splice( this.datosEfectuados.indexOf( valorSeleccionado ), 1);
            this.datosEfectuados = [ ...this.datosEfectuados, ];
        },
        agregarNuevoPagoEfectuado(payload) {
            if (payload) {
            let esExistente = this.datosEfectuados.filter( datosEfectuadosResponse => (datosEfectuadosResponse.grupo.id == payload.form?.grupo &&  datosEfectuadosResponse.concepto.idSC == payload.form?.concepto))
            if (esExistente.length > 0) {
                if (confirm(`EL GRUPO ${ esExistente[0].grupo?.titulo.toUpperCase()} CON EL CONCEPTO ${ esExistente[0].concepto?.titulo.toUpperCase()} YA ESTA REGISTRADO, SI ACEPTAS SE SUMA EL MONTO. EN CASO CONTRARIO SE CANCELA EL REGISTRO ACTUAL`)) {
                    this.datosEfectuados.map( nuevoDatosEfectuadosResponse => {
                        if (nuevoDatosEfectuadosResponse.grupo?.id == esExistente[0].grupo?.id && nuevoDatosEfectuadosResponse.concepto?.idSC == esExistente[0].concepto?.idSC) {
                            nuevoDatosEfectuadosResponse.comentario = nuevoDatosEfectuadosResponse.comentario  + ", " + payload.form?.comentario
                            return nuevoDatosEfectuadosResponse.monto = parseInt(nuevoDatosEfectuadosResponse.monto) + parseInt(payload.form?.monto);
                        }
                    })
                }
                this.esPagosEfectuadosVisible = false;
                return
            }
            if (payload?.form) {
                payload.form.grupo = this.descripcionGrupo( payload );
                payload.form.concepto = this.descripcionConcepto( payload );
                this.datosEfectuados.push(payload.form);
            }
        }
            this.esPagosEfectuadosVisible = false;
        },
        // existeRegistro( datosEfectuados ){
        //     return datosEfectuados.filter( b => (b.grupo.id == payload.form?.grupo && b.concepto.id == payload.form?.concepto))
        // },
        descripcionGrupo( grupo ) {
            return grupo?.aGrupos.find( gruposResponse => gruposResponse.id == grupo.form?.grupo);
        },
        descripcionConcepto( concepto ) {
            return concepto?.aConcepto.find( concetoResponse => concetoResponse.idSC == concepto.form?.concepto)
        },
    },
    filters:{
        toCurrency( valorACurrency ) {
            let currency = parseInt(valorACurrency)
            if ([NaN,undefined,null,''].includes(currency))  return "$ "+0; 
            var formatter = new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0
            });
            return formatter.format(currency);
        },
        separarAPuntoYComa(valorASeparaPorComa) {
            if(!valorASeparaPorComa) return
            return valorASeparaPorComa.split(" ; ").join(",")
        },
        quitarPunto(valor) {
            if( !valor ) return
            return valor.split(".").join("")
        },
        camelCase( valor ) {
            if( !valor ) return
            return valor.split(" ").map( palabra  => {
                return palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
            }).join(" ");
        },
        uppercase( valorlowerToUpper ){
            return valorlowerToUpper.toUpperCase();
        },
        limiteCaracteresFiltro(valorProveedor) {
            if(!valorProveedor) return
            return (valorProveedor.length <= 44 )? valorProveedor : valorProveedor.substr(0,44) + "..."
        },
    },
    components: {
        "PagosEfectuados": AgregarPagosEfectuados
    },
    computed:{
        ...mapState('pagosEfectuados', ['pagosEfectuadosList']),
        soloMes() {
            if(!this.fechaPago) return
            return this.$moment(this.fechaPago).format("MMMM")
        },
        valorTotal() {
            if (!this.datosEfectuados || this.datosEfectuados.length == 0) return
            return this.datosEfectuados.reduce(
                (PreviousCurrency, currentCurrency) =>
                parseInt(currentCurrency.monto) + (PreviousCurrency ? PreviousCurrency : 0),0)
        }
    },
    async created() {
        // this.carga = true
        // await this.getListPagosEfectuados();
        // const { data, status } = this.pagosEfectuadosList;
        // if (data || status.toString().match(VALIDAR_ESTATUS.STATUS_200)) {
        //     this.datos = data;
        // }
        // this.carga = false
    }
}