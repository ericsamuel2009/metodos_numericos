<template>
  <div id="informe">
    <div class="app-container">
      <div class="app-container">

        <el-button-group>
          <el-button type="primary" icon="el-icon-arrow-left" data-action="move-prev" round />
          <el-button type="primary" data-action="move-today" round>Hoy</el-button>
          <el-button type="primary" icon="el-icon-arrow-right" round data-action="move-prev" />
        </el-button-group>
      </div>
      <calendar
        :calendars="calendarList"
        :schedules="scheduleList"
        :view="view"
        :taskView="taskView"
        :scheduleView="scheduleView"
        :theme="theme"
        :week="week"
        :timezones="timezones"
        :disableDblClick="disableDblClick"
        :isReadOnly="isReadOnly"
        :template="template"
        :useCreationPopup="useCreationPopup"
        :useDetailPopup="useDetailPopup"
        @afterRenderSchedule="onAfterRenderSchedule"
        @beforeCreateSchedule="onBeforeCreateSchedule"
        @beforeDeleteSchedule="onBeforeDeleteSchedule"
        @beforeUpdateSchedule="onBeforeUpdateSchedule"
        @clickDayname="onClickDayname"
        @clickSchedule="onClickSchedule"
        @clickTimezonesCollapseBtn="onClickTimezonesCollapseBtn"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
/* eslint-disable */
import 'tui-date-picker/dist/tui-date-picker.css'
import 'tui-time-picker/dist/tui-time-picker.css'
import 'tui-calendar/dist/tui-calendar.css'
import { Calendar } from '@toast-ui/vue-calendar'
import { validarStatus } from '@/validators/shared.validator'
import myTheme from './../scripts/mis-temas';
export default {
  name: 'Informe',
  components: {
    calendar: Calendar
  },
  data() {
    return {
      calendarList: [
        {
          id: '0',
          name: 'home'
        },
        {
          id: '1',
          name: 'office'
        }
      ],
      scheduleList: [],
      view: 'month',
      taskView: false,
      scheduleView: ['Juguetes'],
      theme: myTheme,
      week: {
        narrowWeekend: true,
        showTimezoneCollapseButton: true,
        timezonesCollapsed: false
      },
      month: {
        visibleWeeksCount: 6,
        startDayOfWeek: 1
      },
      timezones: [
        {
          timezoneOffset: 540,
          displayLabel: 'GMT+09:00',
          tooltip: 'Seoul'
        },
        {
          timezoneOffset: -420,
          displayLabel: 'GMT-08:00',
          tooltip: 'Los Angeles'
        },
        {
          timezoneOffset: 300,
          displayLabel: 'GMT-08:00',
          tooltip: 'Bogota'
        }
      ],
      disableDblClick: true,
      isReadOnly: false,
      template: {
        milestone: function(schedule) {
          return `<span style="color:red;">${schedule.title}</span>`
        },
        milestoneTitle: function() {
          return 'MILESTONE'
        }
      },
      useCreationPopup: true,
      useDetailPopup: true
    }
  },
  created(){
    this.consultarPagosEfectuados();
  },
  computed: {
    ...mapGetters('pagosEfectuados', ['gListPagosEfectuados'])
  },
  methods: {
    ...mapActions('pagosEfectuados', ['getListPagosEfectuados']),
    async consultarPagosEfectuados(){
      await this.getListPagosEfectuados({
        filter: { },
        pageNumber: 0,
        pageSize: 50
      })
      const { response, status } = this.gListPagosEfectuados
      if (validarStatus(status)) return false
      this.scheduleList = response?.content.map( c => {
        return {
          id: c.referencia,
          calendarId: c.referencia,
          title: c.conceptos.titulo,
          category: 'allday',
          // category: c.conceptos.titulo,
          dueDateClass: '',
          start: c.fechapago,
          end: c.fechapago
        }
      })
      
      // this.scheduleList = [
      //   {
      //     id: '1',
      //     calendarId: '1',
      //     title: 'my schedule',
      //     category: 'time',
      //     dueDateClass: '',
      //     start: '2022-05-18T22:30:00+09:00',
      //     end: '2022-05-20T02:30:00+09:00'
      //   },
      //   {
      //     id: '2',
      //     calendarId: '1',
      //     title: 'second schedule',
      //     category: 'time',
      //     dueDateClass: '',
      //     start: '2022-05-01T17:30:00+09:00',
      //     end: '2022-05-05T17:31:00+09:00'
      //   }
      // ],
      console.log(this.scheduleList)
    },
    onAfterRenderSchedule(e) {
        console.log("🚀 ~ file: index.vue ~ line 119 ~ onAfterRenderSchedule ~ e", e)
        // implement your code
    },
    onBeforeCreateSchedule(e) {
        console.log("🚀 ~ file: index.vue ~ line 123 ~ onBeforeCreateSchedule ~ e", e) // CUANDO SE GUARDA DESDE EL FORMULARIO
        // implement your code
    },
    onBeforeDeleteSchedule(e) {
        console.log("🚀 ~ file: index.vue ~ line 127 ~ onBeforeDeleteSchedule ~ e", e)
        // implement your code
    },
    onBeforeUpdateSchedule(e) {
        console.log("🚀 ~ file: index.vue ~ line 131 ~ onBeforeUpdateSchedule ~ e", e) //CUANDO SE ARRASTRA Y SE SUELTA ACCIONA ESTE METODO
        // implement your code
    },
    onClickDayname(e) {
        console.log("🚀 ~ file: index.vue ~ line 135 ~ onClickDayname ~ e", e)
        // implement your code
    },
    onClickSchedule(e) {
        console.log("🚀 ~ file: index.vue ~ line 139 ~ onClickSchedule ~ e", e) // CUANDO SE DA UN CLICK EN UN SCHEDULER
        // implement your code
    },
    onClickTimezonesCollapseBtn(e) {
        console.log("🚀 ~ file: index.vue ~ line 143 ~ onClickTimezonesCollapseBtn ~ e", e)
        // implement your code
    }
  }
}
</script>

<style></style>
