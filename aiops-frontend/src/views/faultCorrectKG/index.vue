<template>
  <div>
    <el-form :inline="true" :model="kg_search_data" class="form-search">
      <el-form-item label="故障描述" size="medium">
        <el-input
          v-model="kg_search_data.des_keyword"
          placeholder="关键词"
        ></el-input>
      </el-form-item>
      <el-form-item label="故障日志" size="medium" class="log-input">
        <el-input
          v-model="kg_search_data.log_fragment"
          placeholder="关键片段"
        ></el-input>
      </el-form-item>
      <el-form-item size="medium">
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item label="节点筛选" size="mini">
        <el-radio-group v-model="selected_node_type">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="故障编号"></el-radio-button>
          <el-radio-button label="故障描述"></el-radio-button>
          <el-radio-button label="故障日志"></el-radio-button>
          <el-radio-button label="故障原因"></el-radio-button>
          <el-radio-button label="解决方案"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="显示节点个数" size="mini" class="node-number-select">
        <el-radio-group v-model="select_node_number">
          <el-radio :label="100"></el-radio>
          <el-radio :label="500"></el-radio>
          <el-radio :label="1000"></el-radio>
          <el-radio :label="2000"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="关系筛选" size="mini">
        <el-checkbox-group v-model="checklist_relation_type">
          <el-checkbox label="has_description"></el-checkbox>
          <el-checkbox label="has_log"></el-checkbox>
          <el-checkbox label="has_reason"></el-checkbox>
          <el-checkbox label="has_solution"></el-checkbox>
          <el-checkbox label="same_templates"></el-checkbox>
          <el-checkbox label="similarity"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <div class="node-explain">
      <img src="../../assets/fault_correct_kg_node_explain.png" />
    </div>
    <div ref="faultCorrectKg" class="kg-content">
      <SeeksRelationGraph ref="seeksRelationGraph" :options="graphOptions">
        <div slot="node" slot-scope="{ node }">
          <el-popover placement="right" width="500" trigger="click">
            <div>
              <p>类型：{{ node.data.type }}</p>
              <hr />
              <p>名称：{{ node.data.name }}</p>
              <div v-if="node.data.type == '解决方案'">
                <hr />
                <p>得票数：{{ node.data.vote }}</p>
              </div>
              <div v-if="node.data.type != '故障编号'" class="node-content">
                <hr />
                <p>内容：</p>
                <el-scrollbar>
                  <div
                    class="log-or-solution"
                    v-html="node.data.content"
                    v-if="
                      node.data.type == '故障日志' ||
                      node.data.type == '解决方案'
                    "
                  ></div>
                  <p v-else>{{ node.data.content }}</p>
                </el-scrollbar>
              </div>
            </div>
            <div slot="reference" style="cursor: pointer">
              <i class="node-icon" :class="node.data.myicon" />
            </div>
          </el-popover>
        </div>
      </SeeksRelationGraph>
    </div>
  </div>
</template>

<script>
import SeeksRelationGraph from "relation-graph";
export default {
  name: "faultCorrectKG",
  components: { SeeksRelationGraph },
  data() {
    return {
      kg_search_data: {
        des_keyword: "",
        log_fragment: "",
      },
      select_node_number: 100,
      selected_node_type: "全部",
      checklist_relation_type: ["has_description", "has_template"],
      graphOptions: {
        allowSwitchLineShape: true,
        allowSwitchJunctionPoint: true,
        defaultJunctionPoint: "border",
        defaultNodeFontColor: "white",
        defaultNodeWidth: 30,
        defaultNodeHeight: 30,
        defaultLineShape: 1,
        defaultLineColor: "#666666",
        layouts: [
          {
            label: "自动布局",
            layoutName: "force",
            layoutClassName: "seeks-layout-force",
          },
        ],
      },
    };
  },
  mounted() {
    this.showSeeksGraph();
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    showSeeksGraph(query) {
      console.log(query);
      var __graph_json_data = {
        nodes: [
          {
            id: "11",
            color: "#CC0033",
            borderColor: "#FF0033",
            data: {
              myicon: "el-icon-error",
              type: "故障编号",
              name: "fault-1",
              content: "无",
            },
          },
          {
            id: "12",
            color: "#3300FF",
            borderColor: "#0066CC",
            data: {
              myicon: "el-icon-tickets",
              type: "故障描述",
              name: "description of fault-1",
              content: "could not delete files from dfs as safe mode is on",
            },
          },
          {
            id: "13",
            color: "#996633",
            borderColor: "#CC9933",
            data: {
              myicon: "el-icon-warning",
              type: "故障日志",
              name: "log-1 of fault-1",
              content:
                "<pre><code>SafeModeException: Cannot create directory /user/cloudera/.Trash/Current. Name node is in safe mode. Resources are low on NN. Please add or free up more resources then turn off safe mode manually. NOTE: If you turn off safe mode before adding resources, the NN will immediately return to safe mode.. (error 403)</code></pre>",
            },
          },
          {
            id: "14",
            color: "#00CC33",
            borderColor: "#66FF66",
            data: {
              myicon: "el-icon-s-opportunity",
              type: "解决方案",
              name: "solution-1 of fault-1",
              vote: "3",
              content:
                "<p>You can try lowering the threshold for triggering safe mode by temporarily setting the following options to low values:</p>\n\
\n\
<pre><code>dfs.safemode.threshold.pct\n\
dfs.namenode.safemode.threshold-pct\n\
</code></pre>\n\
\n\
<p>Also, the NameNode might not go back to safe mode immediately after leaving. In my case, I was able to clean up stuff by chaining the <code>hdfs dfsadmin -safemode leave</code> and <code>hdfs dfs -rm</code> commands together, e.g.</p>\n\
\n\
<pre><code>sudo su hdfs\n\
hdfs dfsadmin -safemode leave; hdfs dfs -rm -skipTrash /path/to/stuff/to/delete\n\
</code></pre>",
            },
          },
          {
            id: "15",
            color: "#9900CC",
            borderColor: "#CC66FF",
            data: {
              myicon: "el-icon-question",
              type: "故障原因",
              name: "reason-1 of fault-1",
              content:
                "So if on a single node system HDFS is fill then the local disk is also full.",
            },
          },
          {
            id: "155",
            color: "#00CC33",
            borderColor: "#66FF66",
            data: {
              myicon: "el-icon-s-opportunity",
              type: "解决方案",
              name: "solution-2 of fault-1 for reason-1",
              vote: "2",
              content:
                "<p>It is important to know that HDFS simply uses the disk space of the harddrive. So if on a single node system HDFS is fill then the local disk is also full.</p>\n\
\n\
<p>Try if you can cleanup files by removing non hdfs files  (for example /var/log/...)</p>",
            },
          },
          {
            id: "21",
            color: "#CC0033",
            borderColor: "#FF0033",
            data: {
              myicon: "el-icon-error",
              type: "故障编号",
              name: "fault-2",
              content: "无",
            },
          },
          {
            id: "22",
            color: "#3300FF",
            borderColor: "#0066CC",
            data: {
              myicon: "el-icon-tickets",
              type: "故障描述",
              name: "description of fault-2",
              content: "java.net.NoRouteToHostException no route to host",
            },
          },
          {
            id: "23",
            color: "#996633",
            borderColor: "#CC9933",
            data: {
              myicon: "el-icon-warning",
              type: "故障日志",
              name: "log-1 of fault-2",
              content:
                "<pre><code>2016-10-19 12:47:09,725 INFO [main] org.apache.hadoop.metrics2.impl.MetricsConfig: loaded properties from hadoop-metrics2.properties\n\
2016-10-19 12:47:09,786 INFO [main] org.apache.hadoop.metrics2.impl.MetricsSystemImpl: Scheduled snapshot period at 10 second(s).\n\
2016-10-19 12:47:09,786 INFO [main] org.apache.hadoop.metrics2.impl.MetricsSystemImpl: MapTask metrics system started\n\
2016-10-19 12:47:09,796 INFO [main] org.apache.hadoop.mapred.YarnChild: Executing with tokens:\n\
2016-10-19 12:47:09,796 INFO [main] org.apache.hadoop.mapred.YarnChild: Kind: mapreduce.job, Service: job_1476893269614_0006, Ident: (org.apache.hadoop.mapreduce.security.token.JobTokenIdentifier@18aabe9c)\n\
2016-10-19 12:47:09,878 INFO [main] org.apache.hadoop.mapred.YarnChild: Sleeping for 0ms before retrying again. Got null now.\n\
2016-10-19 12:47:29,958 INFO [main] org.apache.hadoop.ipc.Client: Retrying connect to server: slave1/192.168.1.33:37159. Already tried 0 time(s); maxRetries=45\n\
2016-10-19 12:47:30,961 INFO [main] org.apache.hadoop.ipc.Client: Retrying connect to server: slave1/192.168.1.33:37159. Already tried 0 time(s); retry policy is RetryUpToMaximumCountWithFixedSleep(maxRetries=10, sleepTime=1000 MILLISECONDS)\n\
2016-10-19 12:47:31,962 INFO [main] org.apache.hadoop.ipc.Client: Retrying connect to server: slave1/192.168.1.33:37159. Already tried 1 time(s); retry policy is RetryUpToMaximumCountWithFixedSleep(maxRetries=10, sleepTime=1000 MILLISECONDS)\n\
2016-10-19 12:47:32,963 INFO [main] org.apache.hadoop.ipc.Client: Retrying connect to server: slave1/192.168.1.33:37159. Already tried 2 time(s); retry policy is RetryUpToMaximumCountWithFixedSleep(maxRetries=10, sleepTime=1000 MILLISECONDS)\n\
2016-10-19 12:47:36,971 INFO [main] org.apache.hadoop.ipc.Client: Retrying connect to server: slave1/192.168.1.33:37159. Already tried 3 time(s); retry policy is RetryUpToMaximumCountWithFixedSleep(maxRetries=10, sleepTime=1000 MILLISECONDS)\n\
2016-10-19 12:47:37,975 INFO [main] org.apache.hadoop.ipc.Client: Retrying connect to server: slave1/192.168.1.33:37159. Already tried 4 time(s); retry policy is RetryUpToMaximumCountWithFixedSleep(maxRetries=10, sleepTime=1000 MILLISECONDS)\n\
2016-10-19 12:47:38,976 INFO [main] org.apache.hadoop.ipc.Client: Retrying connect to server: slave1/192.168.1.33:37159. Already tried 5 time(s); retry policy is RetryUpToMaximumCountWithFixedSleep(maxRetries=10, sleepTime=1000 MILLISECONDS)\n\
2016-10-19 12:47:46,992 INFO [main] org.apache.hadoop.ipc.Client: Retrying connect to server: slave1/192.168.1.33:37159. Already tried 6 time(s); retry policy is RetryUpToMaximumCountWithFixedSleep(maxRetries=10, sleepTime=1000 MILLISECONDS)\n\
2016-10-19 12:47:47,993 INFO [main] org.apache.hadoop.ipc.Client: Retrying connect to server: slave1/192.168.1.33:37159. Already tried 7 time(s); retry policy is RetryUpToMaximumCountWithFixedSleep(maxRetries=10, sleepTime=1000 MILLISECONDS)\n\
2016-10-19 12:47:48,994 INFO [main] org.apache.hadoop.ipc.Client: Retrying connect to server: slave1/192.168.1.33:37159. Already tried 8 time(s); retry policy is RetryUpToMaximumCountWithFixedSleep(maxRetries=10, sleepTime=1000 MILLISECONDS)\n\
2016-10-19 12:47:50,999 INFO [main] org.apache.hadoop.ipc.Client: Retrying connect to server: slave1/192.168.1.33:37159. Already tried 9 time(s); retry policy is RetryUpToMaximumCountWithFixedSleep(maxRetries=10, sleepTime=1000 MILLISECONDS)\n\
2016-10-19 12:47:51,002 WARN [main] org.apache.hadoop.mapred.YarnChild: Exception running child : java.net.NoRouteToHostException: No Route to Host from  master1/192.168.1.30 to slave1:37159 failed on socket timeout exception: java.net.NoRouteToHostException: Aucun chemin d'accès pour atteindre l'hôte cible; For more details see:  http://wiki.apache.org/hadoop/NoRouteToHost\n\
    at sun.reflect.NativeConstructorAccessorImpl.newInstance0(Native Method)\n\
    at sun.reflect.NativeConstructorAccessorImpl.newInstance(NativeConstructorAccessorImpl.java:57)\n\
    at sun.reflect.DelegatingConstructorAccessorImpl.newInstance(DelegatingConstructorAccessorImpl.java:45)\n\
    at java.lang.reflect.Constructor.newInstance(Constructor.java:526)\n\
    at org.apache.hadoop.net.NetUtils.wrapWithMessage(NetUtils.java:791)\n\
    at org.apache.hadoop.net.NetUtils.wrapException(NetUtils.java:757)\n\
    at org.apache.hadoop.ipc.Client.call(Client.java:1475)\n\
    at org.apache.hadoop.ipc.Client.call(Client.java:1408)\n\
    at org.apache.hadoop.ipc.WritableRpcEngine$Invoker.invoke(WritableRpcEngine.java:243)\n\
    at com.sun.proxy.$Proxy9.getTask(Unknown Source)\n\
    at org.apache.hadoop.mapred.YarnChild.main(YarnChild.java:132)\n\
Caused by: java.net.NoRouteToHostException: Aucun chemin d'accès pour atteindre l'hôte cible\n\
    at sun.nio.ch.SocketChannelImpl.checkConnect(Native Method)\n\
    at sun.nio.ch.SocketChannelImpl.finishConnect(SocketChannelImpl.java:739)\n\
    at org.apache.hadoop.net.SocketIOWithTimeout.connect(SocketIOWithTimeout.java:206)\n\
    at org.apache.hadoop.net.NetUtils.connect(NetUtils.java:530)\n\
    at org.apache.hadoop.net.NetUtils.connect(NetUtils.java:494)\n\
    at org.apache.hadoop.ipc.Client$Connection.setupConnection(Client.java:614)\n\
    at org.apache.hadoop.ipc.Client$Connection.setupIOstreams(Client.java:713)\n\
    at org.apache.hadoop.ipc.Client$Connection.access$2900(Client.java:375)\n\
    at org.apache.hadoop.ipc.Client.getConnection(Client.java:1524)\n\
    at org.apache.hadoop.ipc.Client.call(Client.java:1447)\n\
    ... 4 more\n\
</code></pre>",
            },
          },
          {
            id: "24",
            color: "#996633",
            borderColor: "#CC9933",
            data: {
              myicon: "el-icon-warning",
              type: "故障日志",
              name: "log-2 of fault-2",
              content:
                "<pre><code>I/O error constructing remote block reader.\n\
java.io.IOException: Got error for OP_READ_BLOCK, status=ERROR, self=/192.168.1.33:56208, remote=/192.168.1.30:50010, for file /user/admin/.staging/job_1476893269614_0001/libjars/hive-hbase-handler-1.1.0-cdh5.8.2.jar, for pool BP-1641388066-192.168.1.30-1476615377122 block 1073751347_10539\n\
    at org.apache.hadoop.hdfs.RemoteBlockReader2.checkSuccess(RemoteBlockReader2.java:467)\n\
    at org.apache.hadoop.hdfs.RemoteBlockReader2.newBlockReader(RemoteBlockReader2.java:432)\n\
    at org.apache.hadoop.hdfs.BlockReaderFactory.getRemoteBlockReader(BlockReaderFactory.java:881)\n\
    at org.apache.hadoop.hdfs.BlockReaderFactory.getRemoteBlockReaderFromTcp(BlockReaderFactory.java:759)\n\
    at org.apache.hadoop.hdfs.BlockReaderFactory.build(BlockReaderFactory.java:376)\n\
    at org.apache.hadoop.hdfs.DFSInputStream.blockSeekTo(DFSInputStream.java:662)\n\
    at org.apache.hadoop.hdfs.DFSInputStream.readWithStrategy(DFSInputStream.java:889)\n\
    at org.apache.hadoop.hdfs.DFSInputStream.read(DFSInputStream.java:942)\n\
    at java.io.DataInputStream.read(DataInputStream.java:100)\n\
    at org.apache.hadoop.io.IOUtils.copyBytes(IOUtils.java:85)\n\
    at org.apache.hadoop.io.IOUtils.copyBytes(IOUtils.java:59)\n\
    at org.apache.hadoop.io.IOUtils.copyBytes(IOUtils.java:119)\n\
    at org.apache.hadoop.fs.FileUtil.copy(FileUtil.java:369)\n\
    at org.apache.hadoop.yarn.util.FSDownload.copy(FSDownload.java:265)\n\
    at org.apache.hadoop.yarn.util.FSDownload.access$000(FSDownload.java:61)\n\
    at org.apache.hadoop.yarn.util.FSDownload$2.run(FSDownload.java:359)\n\
    at org.apache.hadoop.yarn.util.FSDownload$2.run(FSDownload.java:357)\n\
    at java.security.AccessController.doPrivileged(Native Method)\n\
    at javax.security.auth.Subject.doAs(Subject.java:415)\n\
    at org.apache.hadoop.security.UserGroupInformation.doAs(UserGroupInformation.java:1693)\n\
    at org.apache.hadoop.yarn.util.FSDownload.call(FSDownload.java:356)\n\
    at org.apache.hadoop.yarn.util.FSDownload.call(FSDownload.java:60)\n\
    at java.util.concurrent.FutureTask.run(FutureTask.java:262)\n\
    at java.util.concurrent.Executors$RunnableAdapter.call(Executors.java:471)\n\
    at java.util.concurrent.FutureTask.run(FutureTask.java:262)\n\
    at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1145)\n\
    at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:615)\n\
    at java.lang.Thread.run(Thread.java:745)\n\
</code></pre>",
            },
          },
          {
            id: "25",
            color: "#996633",
            borderColor: "#CC9933",
            data: {
              myicon: "el-icon-warning",
              type: "故障日志",
              name: "log-3 of fault-2",
              content:
                "<pre><code>Failed to connect to /192.168.1.30:50010 for block, add to deadNodes and continue. java.io.IOException: Got error for OP_READ_BLOCK, status=ERROR, self=/192.168.1.33:56208, remote=/192.168.1.30:50010, for file /user/admin/.staging/job_1476893269614_0001/libjars/hive-hbase-handler-1.1.0-cdh5.8.2.jar, for pool BP-1641388066-192.168.1.30-1476615377122 block 1073751347_10539\n\
java.io.IOException: Got error for OP_READ_BLOCK, status=ERROR, self=/192.168.1.33:56208, remote=/192.168.1.30:50010, for file /user/admin/.staging/job_1476893269614_0001/libjars/hive-hbase-handler-1.1.0-cdh5.8.2.jar, for pool BP-1641388066-192.168.1.30-1476615377122 block 1073751347_10539\n\
    at org.apache.hadoop.hdfs.RemoteBlockReader2.checkSuccess(RemoteBlockReader2.java:467)\n\
    at org.apache.hadoop.hdfs.RemoteBlockReader2.newBlockReader(RemoteBlockReader2.java:432)\n\
    at org.apache.hadoop.hdfs.BlockReaderFactory.getRemoteBlockReader(BlockReaderFactory.java:881)\n\
    at org.apache.hadoop.hdfs.BlockReaderFactory.getRemoteBlockReaderFromTcp(BlockReaderFactory.java:759)\n\
    at org.apache.hadoop.hdfs.BlockReaderFactory.build(BlockReaderFactory.java:376)\n\
    at org.apache.hadoop.hdfs.DFSInputStream.blockSeekTo(DFSInputStream.java:662)\n\
    at org.apache.hadoop.hdfs.DFSInputStream.readWithStrategy(DFSInputStream.java:889)\n\
    at org.apache.hadoop.hdfs.DFSInputStream.read(DFSInputStream.java:942)\n\
    at java.io.DataInputStream.read(DataInputStream.java:100)\n\
    at org.apache.hadoop.io.IOUtils.copyBytes(IOUtils.java:85)\n\
    at org.apache.hadoop.io.IOUtils.copyBytes(IOUtils.java:59)\n\
    at org.apache.hadoop.io.IOUtils.copyBytes(IOUtils.java:119)\n\
    at org.apache.hadoop.fs.FileUtil.copy(FileUtil.java:369)\n\
    at org.apache.hadoop.yarn.util.FSDownload.copy(FSDownload.java:265)\n\
    at org.apache.hadoop.yarn.util.FSDownload.access$000(FSDownload.java:61)\n\
    at org.apache.hadoop.yarn.util.FSDownload$2.run(FSDownload.java:359)\n\
    at org.apache.hadoop.yarn.util.FSDownload$2.run(FSDownload.java:357)\n\
    at java.security.AccessController.doPrivileged(Native Method)\n\
    at javax.security.auth.Subject.doAs(Subject.java:415)\n\
    at org.apache.hadoop.security.UserGroupInformation.doAs(UserGroupInformation.java:1693)\n\
    at org.apache.hadoop.yarn.util.FSDownload.call(FSDownload.java:356)\n\
    at org.apache.hadoop.yarn.util.FSDownload.call(FSDownload.java:60)\n\
    at java.util.concurrent.FutureTask.run(FutureTask.java:262)\n\
    at java.util.concurrent.Executors$RunnableAdapter.call(Executors.java:471)\n\
    at java.util.concurrent.FutureTask.run(FutureTask.java:262)\n\
    at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1145)\n\
    at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:615)\n\
    at java.lang.Thread.run(Thread.java:745)\n\
</code></pre>",
            },
          },
          {
            id: "26",
            color: "#9900CC",
            borderColor: "#CC66FF",
            data: {
              myicon: "el-icon-question",
              type: "故障原因",
              name: "reason-1 of fault-2",
              content:
                "You get a result from your first query: select * from customers because Hive doesn't use map reduce to get result Are you sure about your hadoop configuration ?",
            },
          },
          {
            id: "27",
            color: "#00CC33",
            borderColor: "#66FF66",
            data: {
              myicon: "el-icon-s-opportunity",
              type: "解决方案",
              name: "solution-1 of fault-2 for reason-1",
              vote: "0",
              content:
                '<p>You get a result from your first query: select * from customers because Hive doesn\'t use map reduce to get result</p>\n\
\n\
<p>Are you sure about your hadoop configuration ?\n\
Did you configure Hosts File ?</p>\n\
\n\
<p><a href="https://stackoverflow.com/questions/22193051/how-to-configure-hosts-file-for-hadoop-ecosystem">How to configure hosts file for Hadoop ecosystem</a></p>',
            },
          },
          {
            id: "28",
            color: "#00CC33",
            borderColor: "#66FF66",
            data: {
              myicon: "el-icon-s-opportunity",
              type: "解决方案",
              name: "solution-2 of fault-2",
              vote: "-1",
              content:
                "<p>check your hosts file and host file\n\
it should be match other wise it will through error like you</p>\n\
\n\
<pre><code>sudo gedit /etc/hosts\n\
======\n\
hosts\n\
======\n\
127.0.0.1   localhost\n\
127.0.0.1   orienit\n\
\n\
\n\
sudo gedit /etc/hostname\n\
\n\
hostname\n\
========\n\
orienit\n\
</code></pre>",
            },
          },
          {
            id: "31",
            color: "#CC0033",
            borderColor: "#FF0033",
            data: {
              myicon: "el-icon-error",
              type: "故障编号",
              name: "fault-3",
              content: "无",
            },
          },
          {
            id: "32",
            color: "#3300FF",
            borderColor: "#0066CC",
            data: {
              myicon: "el-icon-tickets",
              type: "故障描述",
              name: "description of fault-3",
              content:
                "INFO org.apache.hadoop.ipc.Client: Retrying connect to server: nn1.hcluster.com/192.168.155.131:9000. Already tri ed 0 time(s)",
            },
          },
          {
            id: "33",
            color: "#996633",
            borderColor: "#CC9933",
            data: {
              myicon: "el-icon-warning",
              type: "故障日志",
              name: "log-1 of fault-3",
              content:
                "<pre><code>Below is the log for datanode,\n\
\n\
2015-11-14 19:54:22,622 INFO org.apache.hadoop.hdfs.server.datanode.DataNode: STARTUP_MSG:\n\
/************************************************************\n\
STARTUP_MSG: Starting DataNode\n\
STARTUP_MSG:   host = dn2.hcluster.com/192.168.155.133\n\
STARTUP_MSG:   args = []\n\
STARTUP_MSG:   version = 1.2.1\n\
STARTUP_MSG:   build = https://svn.apache.org/repos/asf/hadoop/common/branches/branch-1.2 -r 1503152; compiled by 'mattf' on Mon Jul 22 1\n\
5:23:09 PDT 2013\n\
STARTUP_MSG:   java = 1.8.0_65\n\
************************************************************/\n\
2015-11-14 19:54:23,447 INFO org.apache.hadoop.metrics2.impl.MetricsConfig: loaded properties from hadoop-metrics2.properties\n\
2015-11-14 19:54:23,485 INFO org.apache.hadoop.metrics2.impl.MetricsSourceAdapter: MBean for source MetricsSystem,sub=Stats registered.\n\
2015-11-14 19:54:23,486 INFO org.apache.hadoop.metrics2.impl.MetricsSystemImpl: Scheduled snapshot period at 10 second(s).\n\
2015-11-14 19:54:23,486 INFO org.apache.hadoop.metrics2.impl.MetricsSystemImpl: DataNode metrics system started\n\
2015-11-14 19:54:23,876 INFO org.apache.hadoop.metrics2.impl.MetricsSourceAdapter: MBean for source ugi registered.\n\
2015-11-14 19:54:25,720 INFO org.apache.hadoop.ipc.Client: Retrying connect to server: nn1.hcluster.com/192.168.155.131:9000. Already tri\n\
ed 0 time(s); retry policy is RetryUpToMaximumCountWithFixedSleep(maxRetries=10, sleepTime=1 SECONDS)\n\
2015-11-14 19:54:27,723 INFO org.apache.hadoop.ipc.Client: Retrying connect to server: nn1.hcluster.com/192.168.155.131:9000. Already tri\n\
ed 1 time(s); retry policy is RetryUpToMaximumCountWithFixedSleep(maxRetries=10, sleepTime=1 SECONDS)\n\
2015-11-14 19:54:28,726 INFO org.apache.hadoop.ipc.Client: Retrying connect to server: nn1.hcluster.com/192.168.155.131:9000. Already tri\n\
ed 2 time(s); retry policy is RetryUpToMaximumCountWithFixedSleep(maxRetries=10, sleepTime=1 SECONDS)\n\
2015-11-14 19:54:29,729 INFO org.apache.hadoop.ipc.Client: Retrying connect to server: nn1.hcluster.com/192.168.155.131:9000. Already tri\n\
ed 3 time(s); retry policy is RetryUpToMaximumCountWithFixedSleep(maxRetries=10, sleepTime=1 SECONDS)\n\
2015-11-14 19:54:30,733 INFO org.apache.hadoop.ipc.Client: Retrying connect to server: nn1.hcluster.com/192.168.155.131:9000. Already tri\n\
ed 4 time(s); retry policy is RetryUpToMaximumCountWithFixedSleep(maxRetries=10, sleepTime=1 SECONDS)\n\
2015-11-14 19:54:31,753 INFO org.apache.hadoop.ipc.Client: Retrying connect to server: nn1.hcluster.com/192.168.155.131:9000. Already tri\n\
ed 5 time(s); retry policy is RetryUpToMaximumCountWithFixedSleep(maxRetries=10, sleepTime=1 SECONDS)\n\
2015-11-14 19:54:32,755 INFO org.apache.hadoop.ipc.Client: Retrying connect to server: nn1.hcluster.com/192.168.155.131:9000. Already tri\n\
ed 6 time(s); retry policy is RetryUpToMaximumCountWithFixedSleep(maxRetries=10, sleepTime=1 SECONDS)\n\
2015-11-14 19:54:33,758 INFO org.apache.hadoop.ipc.Client: Retrying connect to server: nn1.hcluster.com/192.168.155.131:9000. Already tri\n\
ed 7 time(s); retry policy is RetryUpToMaximumCountWithFixedSleep(maxRetries=10, sleepTime=1 SECONDS)\n\
2015-11-14 19:54:34,762 INFO org.apache.hadoop.ipc.Client: Retrying connect to server: nn1.hcluster.com/192.168.155.131:9000. Already tri\n\
ed 8 time(s); retry policy is RetryUpToMaximumCountWithFixedSleep(maxRetries=10, sleepTime=1 SECONDS)\n\
2015-11-14 19:54:35,764 INFO org.apache.hadoop.ipc.Client: Retrying connect to server: nn1.hcluster.com/192.168.155.131:9000. Already tri\n\
ed 9 time(s); retry policy is RetryUpToMaximumCountWithFixedSleep(maxRetries=10, sleepTime=1 SECONDS)\n\
2015-11-14 19:54:35,922 ERROR org.apache.hadoop.hdfs.server.datanode.DataNode: java.io.IOException: Call to nn1.hcluster.com/192.168.155.\n\
131:9000 failed on local exception: java.net.NoRouteToHostException: No route to host\n\
        at org.apache.hadoop.ipc.Client.wrapException(Client.java:1150)\n\
        at org.apache.hadoop.ipc.Client.call(Client.java:1118)\n\
        at org.apache.hadoop.ipc.RPC$Invoker.invoke(RPC.java:229)\n\
        at com.sun.proxy.$Proxy4.getProtocolVersion(Unknown Source)\n\
        at org.apache.hadoop.ipc.RPC.checkVersion(RPC.java:422)\n\
        at org.apache.hadoop.ipc.RPC.getProxy(RPC.java:414)\n\
        at org.apache.hadoop.ipc.RPC.getProxy(RPC.java:392)\n\
        at org.apache.hadoop.ipc.RPC.getProxy(RPC.java:374)\n\
        at org.apache.hadoop.ipc.RPC.getProxy(RPC.java:453)\n\
        at org.apache.hadoop.ipc.RPC.waitForProxy(RPC.java:335)\n\
        at org.apache.hadoop.ipc.RPC.waitForProxy(RPC.java:300)\n\
        at org.apache.hadoop.hdfs.server.datanode.DataNode.startDataNode(DataNode.java:385)\n\
        at org.apache.hadoop.hdfs.server.datanode.DataNode.<init>(DataNode.java:321)\n\
        at org.apache.hadoop.hdfs.server.datanode.DataNode.makeInstance(DataNode.java:1712)\n\
        at org.apache.hadoop.hdfs.server.datanode.DataNode.instantiateDataNode(DataNode.java:1651)\n\
        at org.apache.hadoop.hdfs.server.datanode.DataNode.createDataNode(DataNode.java:1669)\n\
        at org.apache.hadoop.hdfs.server.datanode.DataNode.secureMain(DataNode.java:1795)\n\
        at org.apache.hadoop.hdfs.server.datanode.DataNode.main(DataNode.java:1812)\n\
Caused by: java.net.NoRouteToHostException: No route to host\n\
        at sun.nio.ch.SocketChannelImpl.checkConnect(Native Method)\n\
        at sun.nio.ch.SocketChannelImpl.finishConnect(SocketChannelImpl.java:717)\n\
        at org.apache.hadoop.net.SocketIOWithTimeout.connect(SocketIOWithTimeout.java:206)\n\
        at org.apache.hadoop.net.NetUtils.connect(NetUtils.java:511)\n\
        at org.apache.hadoop.net.NetUtils.connect(NetUtils.java:481)\n\
        at org.apache.hadoop.ipc.Client$Connection.setupConnection(Client.java:457)\n\
        at org.apache.hadoop.ipc.Client$Connection.setupIOstreams(Client.java:583)\n\
        at org.apache.hadoop.ipc.Client$Connection.access$2200(Client.java:205)\n\
        at org.apache.hadoop.ipc.Client.getConnection(Client.java:1249)\n\
        at org.apache.hadoop.ipc.Client.call(Client.java:1093)\n\
        ... 16 more\n\
\n\
2015-11-14 19:54:35,952 INFO org.apache.hadoop.hdfs.server.datanode.DataNode: SHUTDOWN_MSG:\n\
/************************************************************\n\
SHUTDOWN_MSG: Shutting down DataNode at dn2.hcluster.com/192.168.155.133\n\
************************************************************/</code></pre>",
            },
          },
          {
            id: "34",
            color: "#00CC33",
            borderColor: "#66FF66",
            data: {
              myicon: "el-icon-s-opportunity",
              type: "解决方案",
              name: "solution-1 of fault-3",
              vote: "0",
              content:
                '<p>make sure your Namenode is running fine. Otherwise check the Machine IP and host name in <strong>/etc/hosts</strong> file.  </p>\n\
\n\
<p>Make sure that you have added this hostname <strong>"nn01.hcluster.com"</strong>  there.</p>',
            },
          },
        ],
        links: [
          {
            from: "11",
            to: "12",
            text: "has-description",
            fontColor: "#333333",
          },
          { from: "11", to: "13", text: "has-log", fontColor: "#333333" },
          { from: "11", to: "14", text: "has-solution", fontColor: "#333333" },
          { from: "11", to: "15", text: "has-reason", fontColor: "#333333" },
          { from: "15", to: "155", text: "has-solution", fontColor: "#333333" },

          {
            from: "21",
            to: "22",
            text: "has-description",
            fontColor: "#333333",
          },
          { from: "21", to: "23", text: "has-log", fontColor: "#333333" },
          { from: "21", to: "24", text: "has-log", fontColor: "#333333" },
          { from: "21", to: "25", text: "has-log", fontColor: "#333333" },
          { from: "21", to: "26", text: "has-reason", fontColor: "#333333" },
          { from: "26", to: "27", text: "has-solution", fontColor: "#333333" },
          { from: "21", to: "28", text: "has-solution", fontColor: "#333333" },

          {
            from: "31",
            to: "32",
            text: "has-description",
            fontColor: "#333333",
          },
          { from: "31", to: "33", text: "has-log", fontColor: "#333333" },
          { from: "31", to: "34", text: "has-solution", fontColor: "#333333" },

          {
            from: "12",
            to: "22",
            text: "similarity：0.53",
            fontColor: "#333333",
            isHideArrow: true,
          },
          {
            from: "12",
            to: "32",
            text: "similarity：0.66",
            fontColor: "#333333",
            isHideArrow: true,
          },
          {
            from: "22",
            to: "32",
            text: "similarity：0.48",
            fontColor: "#333333",
            isHideArrow: true,
          },
          {
            from: "15",
            to: "26",
            text: "similarity：0.22",
            fontColor: "#333333",
            isHideArrow: true,
          },

          {
            from: "23",
            to: "24",
            text: "same_templates：50",
            fontColor: "#333333",
            isHideArrow: true,
          },
          {
            from: "23",
            to: "25",
            text: "same_templates：76",
            fontColor: "#333333",
            isHideArrow: true,
          },
          {
            from: "24",
            to: "25",
            text: "same_templates：61",
            fontColor: "#333333",
            isHideArrow: true,
          },
          {
            from: "23",
            to: "33",
            text: "same_templates：126",
            fontColor: "#333333",
            isHideArrow: true,
          },
          {
            from: "24",
            to: "33",
            text: "same_templates：92",
            fontColor: "#333333",
            isHideArrow: true,
          },
          {
            from: "25",
            to: "33",
            text: "same_templates：87",
            fontColor: "#333333",
            isHideArrow: true,
          },
        ],
      };
      this.$refs.seeksRelationGraph.setJsonData(
        __graph_json_data,
        (seeksRGGraph) => {
          // 当图谱初始化完成后需要执行的代码
          console.log(seeksRGGraph);
        }
      );
    },
  },
};
</script>
<style>
hr {
  height: 1px;
  border: none;
  border-top: 1px dashed #999999;
}
.form-search {
  border-bottom: #efefef solid 1px;
}
.log-input {
  margin-left: 30px;
  margin-right: 30px;
}
.log-input .el-input {
  width: 560px;
}
.node-number-select {
  margin-left: 30px;
}
.node-explain {
  position: absolute;
  z-index: 10;
  padding-top: 15px;
  background: white;
}
.node-explain img {
  width: 120px;
}
.kg-content {
  width: calc(100% - 10px);
  height: calc(100vh - 10px);
}
.kg-content .node-icon {
  font-size: 30px;
}
p {
  white-space: pre-line;
  word-break: keep-all;
}
.log-or-solution {
  max-height: 300px;
}
.node-content pre {
  background: #efefef;
  overflow: auto;
}
.node-content code {
  background: #efefef;
  line-height: 28px;
  font-size: 16px;
}
</style>