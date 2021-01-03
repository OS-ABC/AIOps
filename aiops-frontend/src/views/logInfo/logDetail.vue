<template>
    <div>
        <el-row>
            <el-form :inline="true" :model="formData" class="demo-form-inline">
                <el-form-item label="ID">
                    <el-input v-model="formData.id" readonly></el-input>
                </el-form-item>
                <br/>
                <el-form-item label="开始时间">
                    <el-input v-model="formData.startTime" readonly></el-input>
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-input v-model="formData.endTime" readonly></el-input>
                </el-form-item>
                <br/>
                <el-form-item label="所属主机">
                    <el-input v-model="formData.host" readonly></el-input>
                </el-form-item>
                <el-form-item label="所属模块">
                    <el-input v-model="formData.service" readonly></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">解决方案</el-button>
                </el-form-item>
            </el-form>
            <el-table
                :data="logData[this.$route.query.index].data.filter(data => !search || data.log.toLowerCase().includes(search.toLowerCase())).slice((currentPage-1)*pagesize,currentPage*pagesize)"
                style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="table-expand">
                            <el-form-item label="原始日志">
                                <span>{{ props.row.log }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                prop="time"
                label="时间"
                >
                </el-table-column>
                <el-table-column
                prop="level"
                label="等级"
                >
                </el-table-column>                
                <el-table-column
                align="right">
                    <!-- eslint-disable-next-line -->
                    <template slot="header" slot-scope="scope">
                        <el-input
                        v-model="search"
                        size="mini"
                        placeholder="输入关键字搜索"/>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[5, 10, 20, 40]" 
                    :page-size="pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="logData[this.$route.query.index].data.length">
            </el-pagination>
        </el-row>
        <el-row>
        </el-row>
    </div>
</template>
<script>
export default {
    data() {
        console.log(this.$route.query.index);
        return {
            readonly: true,
            formData: JSON.parse(this.$route.query.row),
            currentPage:1, //初始页
            pagesize:10,    //    每页的数据
            search: ''
        }
    },
    methods: {
        onSubmit() {
            console.log('submit')
        },
        handleSizeChange: function (size) {
                this.pagesize = size;
                console.log(this.pagesize)  //每页下拉显示数据
        },
        handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                console.log(this.currentPage)  //点击第几页
        },
    },
    computed: {
        logData() {
            return this.$store.state.logData;
        },
    },
}
</script>
<style>
.el-table .cell {
    white-space: pre-line;
}

</style>
<style scoped>
    .el-input__inner {
        border: 0px;
    }
    .table-expand {
        font-size: 0;
    }
    .table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>