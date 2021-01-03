<template>
  <div style="padding: 20px">
    <!--统计信息栏-->
    <el-row :gutter="20" class="cards-row">
      <el-col :span="8" align="middle">
        <el-card class="box-card" body-style="text-align:center;">
          <div slot="header" class="clearfix">
            <span>监控服务个数</span>
          </div>
          <div class="text item">
            <span style="color: #409eff">7</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8" align="middle">
        <el-card class="box-card" body-style="text-align:center;">
          <div slot="header" class="clearfix">
            <span>今日异常窗口个数</span>
          </div>
          <div class="text item">
            <span style="color: #f56c6c">5</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8" align="middle">
        <el-card class="box-card" body-style="text-align:center;">
          <div slot="header" class="clearfix">
            <span>本周异常窗口个数</span>
          </div>
          <div class="text item">
            <span style="color: #e6a23c">50</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!--图表栏-->
    <el-row class="charts-row">
      <el-col :span="22" :offset="1">
        <el-card class="item">
          <div id="logChart" style="height: 300px; width: 100%"></div>
        </el-card>
      </el-col>
    </el-row>
    <!--表格栏-->
    <el-row>
      <el-form :inline="true" :model="formData" class="demo-form-inline">
        <el-form-item label="服务">
          <el-select v-model="formData.service" placeholder="请选择">
            <el-option label="syslog" value="syslog"></el-option>
            <el-option label="NodeManager" value="NodeManager"></el-option>
            <el-option
              label="ResourceMananger"
              value="ResourceManager"
            ></el-option>
            <el-option label="DataNode" value="DataNode"></el-option>
            <el-option label="NameNode" value="NameNode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            v-model="formData.time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="ID"> </el-table-column>
        <el-table-column prop="host" label="主机"> </el-table-column>
        <el-table-column prop="service" label="服务"> </el-table-column>
        <el-table-column prop="startTime" label="开始时间"> </el-table-column>
        <el-table-column prop="endTime" label="结束时间"> </el-table-column>
        <el-table-column prop="operation" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleDetail(scope.$index, scope.row)"
              >详情</el-button
            >
            <el-button
              size="mini"
              type="text"
              @click="handleSolution(scope.$index, scope.row)"
              >解决方案</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "LogInfo",
  data() {
    return {
      formData: {
        service: "",
        time: [new Date(2021, 1, 1, 10, 10), new Date(2021, 1, 1, 10, 11)],
      },
      tableData: [
        {
          id: 1,
          host: "119.3.185.185",
          service: "syslog",
          startTime: "2020-12-27 10:01:46",
          endTime: "2020-12-27 10:01:50",
        },
        {
          id: 2,
          host: "119.3.185.185",
          service: "syslog",
          startTime: "2020-12-27 10:30:00",
          endTime: "2020-12-27 10:30:04",
        },
        {
          id: 3,
          host: "119.3.185.185",
          service: "NodeManager",
          startTime: "2020-12-27 10:31:14",
          endTime: "2020-12-27 10:31:18",
        },
        {
          id: 4,
          host: "119.3.185.185",
          service: "NameNode",
          startTime: "2020-12-27 10:41:14",
          endTime: "2020-12-27 10:41:18",
        },
      ],
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.drawLogChart();
    });
  },
  methods: {
    drawLogChart() {
      this.$chart.logChart("logChart");
    },
    handleDetail(index, row) {
      this.$router.push({
        name: "LogDetail",
        query: {
          row: JSON.stringify(row),
          index: index,
        },
      });
    },
    handleSolution(index, row) {
      console.log(row);
      this.$router.push({
        name: "Solutions",
        query: { row: JSON.stringify(row) },
      });
    },
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>
<style>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  min-height: 100px;
}
</style>
<style scoped>
.cards-row {
  height: 150px;
}
.text {
  font-size: 30px;
}
.item {
  margin-bottom: 18px;
}
.clearfix {
  color: #000000;
  text-align: center;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 300px;
}
.charts-row {
  height: 300px;
}
#logChart {
  height: 300px;
  width: 300px;
}
</style>