<template>
  <el-container class="container">
      <el-header class="header">
        <h1>智能运维平台</h1>
      </el-header> 

    <el-container>
      <el-aside class="aside">
        <!-- 侧边栏导航  -->
        <!-- unique-opened只展开一个 -->
        <!-- router开启路由模式 -->
        <el-menu :unique-opened="true" :router="true" class="menu"
          background-color="#334154"
          text-color="#fff"
          active-text-color="#ffd04b"
          :default-active="'/' +this.$route.path.split('/')[1]+'/'+this.$route.path.split('/')[2]+'/'+this.$route.path.split('/')[3]"
          >
          <el-submenu :index="' '+item1.order" v-for="item1 in menuData" :key="item1.path">
            <!--表示可以展开的一组 -->
            <template slot="title" @click="clickTitle">
              <!--图标 -->
              <i class="el-icon-location"></i>
              <!--文字 -->
              <span>{{item1.name}}</span>
            </template>
            <el-menu-item
              class="menuItem"
              @click="clickMenuItem"
              v-for="item2 in item1.children"
              :key="item2.path"
              :index="item2.path"
            >
              <i class="el-icon-location"></i>
              <!--图标 -->
              <span>{{item2.name}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  components: {
    // ManageSysHome,
  },
  data() {
    return {
      style: {
        display: "block",
      },
      menuData: [
        {
          name: "日志异常检测",
          order: "1",
          path:'logInfo',
          children: [
            {
              path: "/home/log/LogInfo",
              name: "日志",
            },
          ],
        },
        {
          name: "知识图谱检索",
          order: "2",
          path:'KG',
          children: [
            {
              path: "/home/KG/FaultCorrectKG",
              name: "故障修复知识图谱",
            },
            {
              path: "/home/KG/HadoopKG",
              name: "Hadoop知识图谱",
            }
          ],
        }
      ],
    };
  },
  methods: {
    
    clickMenuItem() {
      console.log("....");
      this.style.display = "none";
    },
    //回到首页
    clickTitle() {
      this.style.display = "block";
    },
  },

  mounted: function(){
    console.log(this.$route.path.split('/')); 
  }
};
</script>
<style scoped>
.container {
  height: 100vh;
  font-size: 15px;
}
.header {
  background: #ffffff;
  color: #000000;
  box-shadow: 5px 5px 5px #dfdcdc;
}
.aside {
  background: #334154;
  color: #fff;
  /* height: 100%; */
}
.menu {
  background: none;
  color: #fff;
}
.main {
  /* height: 100%; */
  color: #212121;
}
.headerlogo {
  line-height: 60px;
  margin-top: 10px;
}
.rightsection {
  line-height: 60px;
  text-align: center;
}
</style>