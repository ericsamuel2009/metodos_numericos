<template>
  <el-row id="panelGroup" :gutter="40" class="panel-group">
    <router-link v-for="main in arrayIntegrales[0].children" :key="main.path" :to="{name : main.name}">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div :id="`metodo-${returnID(main.meta.titleDashboard)}`" class="card-panel" @click="handleSetLineChartData('newVisitis')">
          <div class="card-panel-icon-wrapper icon-people">
            <i style="font-size: 3em;" :class="`mdi ${main.meta.icon}`" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              {{ main.meta.titleDashboard }}
            </div>
          </div>
        </div>
      </el-col>
    </router-link>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: function() {
    return {
      integrales: []
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    },
    returnID(title) {
      return title.replaceAll(' ', '_')
    }
    // resolvePath(routePath) {
    //   if (isExternal(routePath)) {
    //     return routePath
    //   }
    //   if (isExternal(this.basePath)) {
    //     return this.basePath
    //   }
    //   return path.resolve(this.basePath, routePath)
    // }
  },
  computed: {
    ...mapGetters('permission', [
      'permission_routes'
    ]),
    arrayIntegrales() {
      return this.permission_routes.filter(x => (!(x.hidden) && x.alwaysShow))
    }
  },
  filters: {
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
