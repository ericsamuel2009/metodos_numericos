<template>
  <div id="pagosEfectuados">
    <div class="app-container">
      <el-descriptions
        class="margin-top"
        title="With border"
        :column="3"
        border
      >
        <template slot="extra">
          <el-button type="primary" size="small">Operation</el-button>
        </template>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user" />
            Username
          </template>
          kooriookami
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone" />
            Telephone
          </template>
          18100000000
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline" />
            Place
          </template>
          Suzhou
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets" />
            Remarks
          </template>
          <el-tag size="small">School</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building" />
            Address
          </template>
          No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script src="@/views/pagosEfectuados/scripts/listarPagosEfectuados.js"></script>
<style src="@/views/pagosEfectuados/styles/listarPagosEfectuados.css"></style>
