<template>
  <div id="calendario">
    <div class="app-container">
      <div class="app-container">
        <el-select v-model="selectedView" placeholder="Select">
          <el-option
            v-for="(options, index) in viewModeOptions"
            :key="index"
            :label="options.title"
            :value="options.value"
          />
        </el-select>
        <el-divider direction="vertical" />
        <span @click="onClickNavi($event)">
          <el-button-group>
            <button
              type="button"
              class="el-button el-button--button el-button--small is-round el-icon-arrow-left"
              data-action="move-prev"
            />
            <button
              type="button"
              class="el-button el-button--button el-button--small is-round"
              data-action="move-today"
            >
              Hoy
            </button>
            <button
              type="button"
              class="el-button el-button--button el-button--small is-round el-icon-arrow-right"
              data-action="move-next"
            />
          </el-button-group>
        </span>
        <el-divider content-position="left">
          <el-tag type="info" effect="dark">
            <span class="render-range">{{ dateRange | moment('LLLL') }}</span>
          </el-tag>
        </el-divider>

      </div>
      <calendar
        ref="tuiCal"
        :use-detail-popup="useDetailPopup"
        :view="selectedView"
        :calendars="calendarList"
        :schedules="scheduleList"
        :theme="theme"
        :template="template"
        :task-view="true"
        :schedule-view="true"
        :month="month"
        :week="week"
        :timezones="timezones"
        :disable-dbl-click="disableDblClick"
        :is-read-only="isReadOnly"
        @clickSchedule="onClickSchedule"
        @clickDayname="onClickDayname"
        @beforeDeleteSchedule="onBeforeDeleteSchedule"
        @afterRenderSchedule="onAfterRenderSchedule"
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
import myTheme from './../scripts/mis-temas'

const today = new Date()

const getDate = (type, start, value, operator) => {
  start = new Date(start)
  type = type.charAt(0).toUpperCase() + type.slice(1)

  if (operator === '+') {
    start[`set${type}`](start[`get${type}`]() + value)
  } else {
    start[`set${type}`](start[`get${type}`]() - value)
  }

  return start
}
const DIAS_DE_SEMANA = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']

export default {
  name: 'calendario',
  components: {
    calendar: Calendar
  },
  data() {
    return {
      viewModeOptions: [
        {
          title: 'Monthly',
          value: 'month'
        },
        {
          title: 'Weekly',
          value: 'week'
        },
        {
          title: 'Daily',
          value: 'day'
        }
      ],
      dateRange: '',
      selectedView: 'month',
      calendarList: [
        {
          id: '0',
          name: 'Private',
          bgColor: '#9e5fff',
          borderColor: '#9e5fff'
        },
        {
          id: '1',
          name: 'Company',
          bgColor: '#00a9ff',
          borderColor: '#00a9ff'
        }
      ],
      scheduleList: [
        {
          id: '1',
          calendarId: '0',
          title: 'TOAST UI Calendar Study',
          category: 'time',
          dueDateClass: '',
          start: today.toISOString(),
          end: getDate('hours', today, 3, '+').toISOString()
        },
        {
          id: '2',
          calendarId: '1',
          title: 'Practice',
          category: 'milestone',
          dueDateClass: '',
          start: getDate('date', today, 1, '+').toISOString(),
          end: getDate('date', today, 1, '+').toISOString(),
          isReadOnly: true
        },
        {
          id: '3',
          calendarId: '1',
          title: 'FE Workshop',
          category: 'allday',
          dueDateClass: '',
          start: getDate('date', today, 2, '-').toISOString(),
          end: getDate('date', today, 1, '-').toISOString(),
          isReadOnly: true
        },
        {
          id: '4',
          calendarId: '1',
          title: 'Report',
          category: 'time',
          dueDateClass: '',
          start: today.toISOString(),
          end: getDate('hours', today, 1, '+').toISOString()
        }
      ],
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
        }
      ],
      theme: myTheme,
      template: {
        milestone(schedule) {
          return `<span style="color:#fff;background-color: ${schedule.bgColor};">${schedule.title}</span>`
        },
        milestoneTitle() {
          return 'Milestonesss'
        },
        allday(schedule) {
          return `${schedule.title}<i class="fa fa-refresh"></i>`
        },
        popupIsAllDay: function() {
            return 'All Day';
        },
        popupSave: function() {
            return 'Guardar';
        },
        popupUpdate: function() {
            return 'Actualizar';
        },
        titlePlaceholder: function() {
            return 'Comentario';
        },
        schedule: function(schedule) {

            // use another functions instead of 'schedule'
            // milestone: function() {...}
            // task: function() {...}
            // allday: function() {...}

            var tpl;

            switch(category) {
                case 'milestone':
                    tpl = '<span class="calendar-font-icon ic-milestone-b"></span> <span style="background-color: ' + schedule.bgColor + '">' + schedule.title + '</span>';
                    break;
                case 'task':
                    tpl = '#' + schedule.title;
                    break;
                case 'allday':
                    tpl = getTimeTemplate(schedule, true);
                    break;
            }

            return tpl;
        },
        popupStateFree: function() {
            return 'Activo';
        },
        popupStateBusy: function() {
            return 'Inactivo';
        },
      },
      month: {
        daynames: DIAS_DE_SEMANA,
        startDayOfWeek: 1
      },
      week: {
        daynames: DIAS_DE_SEMANA,
        startDayOfWeek: 1,
        showTimezoneCollapseButton: true,
        timezonesCollapsed: true
      },
      popupDetailRepeat: function(model) {
          return model.recurrenceRule;
      },
      popupDetailBody: function(model) {
        console.log(model);
          return model.body;
      },
      taskView: true,
      scheduleView: true,
      useDetailPopup: true,
      disableDblClick: true,
      isReadOnly: false
    }
  },
  watch: {
    selectedView(newValue) {
      this.$refs.tuiCal.invoke('changeView', newValue, true)
      this.setRenderRangeText()
    }
  },
  created() {
    this.consultarPagosEfectuados()
  },
  mounted() {
    this.init()
  },
  computed: {
    ...mapGetters('pagosEfectuados', ['gListPagosEfectuados'])
  },
  methods: {
    ...mapActions('pagosEfectuados', ['getListPagosEfectuados']),
    init() {
      this.setRenderRangeText()
    },
    setRenderRangeText() {
      const { invoke } = this.$refs.tuiCal
      const view = invoke('getViewName')
      const calDate = invoke('getDate')
      const rangeStart = invoke('getDateRangeStart')
      const rangeEnd = invoke('getDateRangeEnd')
      let year = calDate.getFullYear()
      let month = calDate.getMonth() + 1
      let date = calDate.getDate()
      let dateRangeText = ''
      let endMonth, endDate, start, end

      switch (view) {
        case 'month':
          dateRangeText = `${year}-${month}`
          break
        case 'week':
          year = rangeStart.getFullYear()
          month = rangeStart.getMonth() + 1
          date = rangeStart.getDate()
          endMonth = rangeEnd.getMonth() + 1
          endDate = rangeEnd.getDate()

          start = `${year}-${month}-${date}`
          end = `${endMonth}-${endDate}`
          dateRangeText = `${start} ~ ${end}`
          break
        default:
          dateRangeText = `${year}-${month}-${date}`
      }
      this.dateRange = dateRangeText
    },
    onClickNavi(event) {
      console.log(event.target)
      if (event.target.tagName === 'BUTTON') {
        const { target } = event
        let action = target.dataset
          ? target.dataset.action
          : target.getAttribute('data-action')
        action = action.replace('move-', '')

        this.$refs.tuiCal.invoke(action)
        this.setRenderRangeText()
      }
    },
    async consultarPagosEfectuados() {
      await this.getListPagosEfectuados({
        filter: {},
        pageNumber: 0,
        pageSize: 50
      })
      const { response, status } = this.gListPagosEfectuados
      if (validarStatus(status)) return false
      // this.scheduleList = response?.content.map((c) => {
      //   return {
      //     id: c.referencia,
      //     calendarId: c.referencia,
      //     title: c.conceptos.titulo,
      //     category: 'allday',
      //     // category: c.conceptos.titulo,
      //     dueDateClass: '',
      //     start: c.fechapago,
      //     end: c.fechapago
      //   }
      // })

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
    onAfterRenderSchedule(res) {
      console.log(
        '🚀 ~ file: index.vue ~ line 119 ~ onAfterRenderSchedule ~ e',
        res
      )
      console.group('onAfterRenderSchedule')
      console.log('Schedule Info : ', res.schedule)
      console.groupEnd()
    },
    onBeforeCreateSchedule(e) {
      console.log(
        '🚀 ~ file: index.vue ~ line 123 ~ onBeforeCreateSchedule ~ e',
        e
      ) // CUANDO SE GUARDA DESDE EL FORMULARIO
      // implement your code
    },
    onBeforeDeleteSchedule(res) {
      console.log(
        '🚀 ~ file: index.vue ~ line 127 ~ onBeforeDeleteSchedule ~ e',
        res
      )
      console.group('onBeforeDeleteSchedule')
      console.log('Schedule Info : ', res.schedule)
      console.groupEnd()

      const idx = this.scheduleList.findIndex(
        (item) => item.id === res.schedule.id
      )
      this.scheduleList.splice(idx, 1)
    },
    onBeforeUpdateSchedule(e) {
      console.log(
        '🚀 ~ file: index.vue ~ line 131 ~ onBeforeUpdateSchedule ~ e',
        res
      ) //CUANDO SE ARRASTRA Y SE SUELTA ACCIONA ESTE METODO
      // implement your code
    },
    onClickDayname(res) {
      console.log('🚀 ~ file: index.vue ~ line 135 ~ onClickDayname ~ e', res)
      // view : week, day
      console.group('onClickDayname')
      console.log(res.date)
      console.groupEnd()
    },
    onClickSchedule(res) {
      console.log('🚀 ~ file: index.vue ~ line 139 ~ onClickSchedule ~ e', res) // CUANDO SE DA UN CLICK EN UN SCHEDULER
      console.group('onClickSchedule')
      console.log('MouseEvent : ', res.event)
      console.log('Calendar Info : ', res.calendar)
      console.log('Schedule Info : ', res.schedule)
      console.groupEnd()
    },
    onClickTimezonesCollapseBtn(timezonesCollapsed) {
      console.log(
        '🚀 ~ file: index.vue ~ line 143 ~ onClickTimezonesCollapseBtn ~ e',
        timezonesCollapsed
      )
      // view : week, day
      console.group('onClickTimezonesCollapseBtn')
      console.log('Is Collapsed Timezone? ', timezonesCollapsed)
      console.groupEnd()

      if (timezonesCollapsed) {
        this.theme['week.timegridLeft.width'] = '100px'
        this.theme['week.daygridLeft.width'] = '100px'
      } else {
        this.theme['week.timegridLeft.width'] = '50px'
        this.theme['week.daygridLeft.width'] = '50px'
      }
    }
  }
}
</script>

<style></style>
