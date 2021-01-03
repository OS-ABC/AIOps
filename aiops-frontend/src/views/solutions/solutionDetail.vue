<template>
    <div>
        <div class="div-top">
            <el-row type="flex">
                <el-col type="flex" :span="3"><div class="grid-content-name">异常日志窗口ID：</div></el-col>
                <el-col :span="6"><div class="grid-content-value">{{JSON.parse(this.$route.query.logRow).id}}</div></el-col>
            </el-row>
            <el-row>
                <el-col :span="3"><div class="grid-content-name">异常开始时间：</div></el-col>
                <el-col :span="6"><div class="grid-content-value">{{JSON.parse(this.$route.query.logRow).startTime}}</div></el-col>
                <el-col :span="3"><div class="grid-content-name">异常结束时间：</div></el-col>
                <el-col :span="6"><div class="grid-content-value">{{JSON.parse(this.$route.query.logRow).endTime}}</div></el-col>
            </el-row>
            <el-row>
                <el-col :span="3"><div class="grid-content-name">所属模块：</div></el-col>
                <el-col :span="6"><div class="grid-content-value">{{JSON.parse(this.$route.query.logRow).service}}</div></el-col>
                <el-col :span="3"><div class="grid-content-name">所属主机：</div></el-col>
                <el-col :span="6"><div class="grid-content-value">{{JSON.parse(this.$route.query.logRow).host}}</div></el-col>
            </el-row>
        </div>
        <div class="div-main">
          <el-row>
            <el-col :span="2"><div class="grid-content-name"> 异常原因:</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="24"><div class="grid-content-value"> {{JSON.parse(this.$route.query.row).exceptionReason}}</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="24"><div class="grid-content-name"> 异常解决方案:</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="24"><div class="grid-content-value"> {{JSON.parse(this.$route.query.row).solution}}</div></el-col>
          </el-row>
        </div>
        <div class="div-footer">
           <el-row>
              相关知识：
           </el-row>
          <el-collapse accordion v-loading="loading">
            <el-collapse-item v-for="(item,index) in collapseList" :key="index" :name="index">
              <template slot="title"><span>{{item.name}}</span></template>
              <div>
                {{item.detail}}<el-button size = "mini" type="text" @click="gotoDetail(item)">了解更多</el-button>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
    </div>
</template>

<script>
export default {
   data() {
    return {
      collapseList: [],
      loading: true
    };
  },
  methods: {
    gotoDetail(item) {
        console.log(item)
        this.$router.push({name:'HadoopKG', query:{uuid:item.uuid, name:item.name}})
    },
  },
  created: function(){
    this.$http.post('http://121.36.99.228:8080/getenitiy',{txt:JSON.parse(this.$route.query.row).solution},{emulateJSON:true}).then(result=>{
     console.log(result);
      if (result.status == 200 && result.body.data != null) {
        this.collapseList = result.body.data.node;
      }
      this.loading = false;
    });
  }
};
</script>
  
<style>
.el-row {
  margin-bottom: 30px;
}
.div-top .el-col {
  border-radius: 0px;
  min-height: 20px !important;
}

.div-main .el-col {
  border-radius: 0px;
  min-height: 20px !important;
}

.grid-content-name {
  border-radius: 0px;
  min-height: 36px;
  color: #848289;
  font-weight: bold;
}
.grid-content-value {
  border-radius: 0px;
  min-height: 36px;
  color: #534f4b;
}
.div-top {
  margin-top: 30px;
  margin-left: 20px;
  margin-right: 50px;
}

.div-main {
  margin-top: 0px;
  margin-left: 20px;
  margin-right: 50px;
}

.div-main .el-row {
  margin-bottom: 10px;
}
.div-main .grid-content-name {
  border-radius: 0px;
  min-height: 20px;
   color: #848289;
}

.div-main .grid-content-value {
  border-radius: 0px;
  min-height: 20px;
   color: #534f4b;
}

.div-footer {
  padding: 15px;
  box-shadow: 2px 2px 10px #e7e5e5;
  margin-top: 30px;
  margin-left: 20px;
  margin-right: 50px;
}
.div-footer .el-row {
  margin-bottom: 35px;
}

</style>