<template>
  <div>
    <div class="div-top">
      <el-row type="flex">
        <el-col :span="3"
          ><div class="grid-content-name">异常日志窗口ID：</div></el-col
        >
        <el-col :span="6"><div class="grid-content-value">{{JSON.parse(this.$route.query.row).id}}</div></el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="3"
          ><div class="grid-content-name">异常开始时间：</div></el-col
        >
        <el-col :span="6"
          ><div class="grid-content-value">{{JSON.parse(this.$route.query.row).startTime}}</div></el-col
        >
        <el-col :span="3"
          ><div class="grid-content-name">异常结束时间：</div></el-col
        >
        <el-col :span="6"
          ><div class="grid-content-value">{{JSON.parse(this.$route.query.row).endTime}}</div></el-col
        >
      </el-row >
      <el-row type="flex">
        <el-col :span="3"
          ><div class="grid-content-name">所属模块：</div></el-col
        >
        <el-col :span="6"><div class="grid-content-value">{{JSON.parse(this.$route.query.row).service}}</div></el-col>
        <el-col :span="3"
          ><div class="grid-content-name">所属主机：</div></el-col
        >
        <el-col :span="6"
          ><div class="grid-content-value">{{JSON.parse(this.$route.query.row).host}}</div></el-col>
      </el-row>
    </div>
    <div class="div-table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column
          type="index"
          align="center"
          show-overflow-tooltip
          label="序号"
          width="100"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="exceptionReason"
          label="故障原因"
          width="250"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="solution"
          label="解决方案"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="vote"
          label="方案投票数"
          width="100"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="weight"
          label="方案推荐值"
          width="100"
        ></el-table-column>
        <el-table-column align="center" label="操作" width="120"
          ><template slot-scope="scope"
            ><el-button size = "mini" type="text" @click="gotoDetail(scope.row)"
              >查看详情</el-button
            ></template
          ></el-table-column
        >
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },

  mounted: function () {
    console.log(this.$route.path.split('/'));
    console.log(this.$route.path);
    console.log(this.$route.path.split('/')[2]);
    this.getLogSolutions();
  },
  methods: {
    gotoDetail(row) {
      console.log(row);
      const logRow = this.$route.query.row
      this.$router.push({ name: "SolutionDetail", query: {row: JSON.stringify(row),logRow:logRow}});
    },
    getLogSolutions() {
    //   const index = JSON.parse(this.$route.query.row).id
      console.log(this.$route.query.row);
      console.log(JSON.parse(this.$route.query.row))
      const index = "1";
      console.log(index);
      const re1 = [
        {
          exceptionReason: "",
          serialNumber: "1",
          solution:
            "Assuming you already fixed this since you submitted 10 months ago, but try the full hdfs input:\nhdfs://server:port/input/1901",
          vote: "-2",
          weight: "0.31",
        },
        {
          exceptionReason:
            "Here is a good description of the problem and its cause:\nhttps://community.hortonworks.com/answers/37414/view.html\nFor us running the command hdfs debug recoverLease -path <path-of-the-file> -retries 3 solved the problem.",
          serialNumber: "2",
          solution:
            "Here is a good description of the problem and its cause:\nhttps://community.hortonworks.com/answers/37414/view.html\nFor us running the command hdfs debug recoverLease -path <path-of-the-file> -retries 3 solved the problem.",
          vote: "3",
          weight: "0.25",
        },
        {
          exceptionReason:
            "There are some files that opened by flume but never closed (I am not sure about the reason).",
          serialNumber: "3",
          solution:
            "I got the same issue with you. There are some files that opened by flume but never closed (I am not sure about the reason). You need to find the name of them by the command:\n\nhdfs fsck /directory/of/locked/files/ -files -openforwrite\n\nThen just removing them. \nOr you can try to recover files as command hdfs debug recoverLease -path <path-of-the-file> -retries 3 that Joe23 suggested.",
          vote: "1",
          weight: "0.25",
        },
        {
          exceptionReason: "",
          serialNumber: "4",
          solution:
            "It is very hard to determine if the file in any HDFS folder is unclosed or not. You probably have to do a hdfs cat test on them. Or you can regularly check for lost file blocks (every hour or after every restart of cluster).",
          vote: "0",
          weight: "0.25",
        },
        {
          exceptionReason:
            "But I'm curious to hear more about \n\nbut I've experienced major performance problems on Tez \n\nsince in my org, Tez has been beating mapred in most use cases.\nIf you can share your problem (as a new question), I'll try to follow up.",
          serialNumber: "5",
          solution:
            "I've never used Ambari but can you try hand-editing mapred-site.xml and adding mapreduce.job.counters.max entry before bringing up the cluster? \nAnother option is Tez like you already mentioned.\nBut I'm curious to hear more about \n\nbut I've experienced major performance problems on Tez \n\nsince in my org, Tez has been beating mapred in most use cases.  If you can share your problem (as a new question), I'll try to follow up.",
          vote: "0",
          weight: "0.22",
        },
        {
          exceptionReason: "",
          serialNumber: "6",
          solution:
            'This  <property> is setting  in mapred-site.xml  here is  another similar question   ,\ngive you other ways  to try \uff0cbut I don\'t know whether it will works \ncreate job-local.xml and set the <property>  \uff0cuse \n con.get("mapreduce.job.counters.limit")`  in your project . or   to  con.set("mapreduce.job.counters.limit", "200"); \nif you have changed  your  setting in your  mapred-site.xml  please check  it works.',
          vote: "0",
          weight: "0.22",
        },
        {
          exceptionReason:
            "To solve the issue, \n\nRead the file contents and store it into a variable.\nThis process worked fine for me and solved the issue.",
          serialNumber: "7",
          solution:
            "To solve the issue, \n\nRead the file contents and store it into a variable. \nAdd new content that you wish to append to this variable. \nRe-create the file and write your contents back to it.\n\nThis process worked fine for me and solved the issue.\nAPPEND operation is expensive and if you're trying to attempt it in parallel, then this issue my arise. Hence re-create file and re-write the contents to it rather than appending.",
          vote: "1",
          weight: "0.19",
        },
        {
          exceptionReason:
            'This problem is caused by some bug in hadoop "append code".\nYou can read more about that in this article:\nappend content to a file in HDFS\nThere is also provided solution for this issue.',
          serialNumber: "8",
          solution:
            'This problem is caused by some bug in hadoop "append code". You can read more about that in this article:\nappend content to a file in HDFS\nThere is also provided solution for this issue. You can also call close() method on fs after create file, and get FileSystem again right before append operation. Works fine for me, but it\'s up to You.',
          vote: "0",
          weight: "0.19",
        },
        {
          exceptionReason: "",
          serialNumber: "9",
          solution:
            "you can set the speculative action to false \njob.setSpeculativeExecution(false);\n\nor can create a file to some temporary location with the timestamp or any other variable things in path and merge the result to base path later",
          vote: "0",
          weight: "0.19",
        },
        {
          exceptionReason:
            "You get a result from your first query: select * from customers because Hive doesn't use map reduce to get result\nAre you sure about your hadoop configuration ?",
          serialNumber: "10",
          solution:
            "You get a result from your first query: select * from customers because Hive doesn't use map reduce to get result\nAre you sure about your hadoop configuration ?\nDid you configure Hosts File ?\nHow to configure hosts file for Hadoop ecosystem",
          vote: "0",
          weight: "0.19",
        },
        {
          exceptionReason: "",
          serialNumber: "11",
          solution:
            "check your hosts file and host file\nit should be match other wise it will through error like you\nsudo gedit /etc/hosts\n======\nhosts\n======\n127.0.0.1   localhost\n127.0.0.1   orienit\n\n\nsudo gedit /etc/hostname\n\nhostname\n========\norienit",
          vote: "-1",
          weight: "0.19",
        },
      ];
      const re2 = [
        {
          exceptionReason: "",
          serialNumber: "1",
          solution:
            "For me these steps worked\n\nstop-all.sh\nhadoop namenode -format\nstart-all.sh",
          vote: "69",
          weight: "0.41",
        },
        {
          exceptionReason: "",
          serialNumber: "2",
          solution:
            "Hi Edit your conf/core-site.xml and change localhost to 0.0.0.0. Use the conf below. That should work.\n<configuration>\n  <property>\n <name>fs.default.name</name>\n <value>hdfs://0.0.0.0:9000</value>\n</property>",
          vote: "24",
          weight: "0.41",
        },
        {
          exceptionReason:
            "From the netstat output you can see the process is listening on address 127.0.0.1\n\nfrom the exception message you can see that it tries to connect to address 127.0.1.1\n\nfurther in the exception it's mentionend\n\non this page you find\n\nCheck that there isn't an entry for your hostname mapped to 127.0.0.1 or 127.0.1.1 in /etc/hosts (Ubuntu is notorious for this)\n\nso the conclusion is to remove this line in your /etc/hosts",
          serialNumber: "3",
          solution:
            "From the netstat output you can see the process is listening on address 127.0.0.1\ntcp        0      0 127.0.0.1:9000          0.0.0.0:*  ...\n\nfrom the exception message you can see that it tries to connect to address 127.0.1.1\njava.net.ConnectException: Call From marta-komputer/127.0.1.1 to localhost:9000 failed ...\n\nfurther in the exception it's mentionend\nFor more details see:  http://wiki.apache.org/hadoop/ConnectionRefused\n\non this page you find\n\nCheck that there isn't an entry for your hostname mapped to 127.0.0.1 or 127.0.1.1 in /etc/hosts (Ubuntu is notorious for this)\n\nso the conclusion is to remove this line in your /etc/hosts\n127.0.1.1       marta-komputer",
          vote: "6",
          weight: "0.41",
        },
        {
          exceptionReason: "",
          serialNumber: "4",
          solution:
            "I had the similar prolem with OP. As the terminal output suggested, I went to \nhttp://wiki.apache.org/hadoop/ConnectionRefused \nI tried to change my /etc/hosts file as suggested here, i.e. remove 127.0.1.1 as OP suggested it will create another error. \nSo in the end, I leave it as is. The following is my /etc/hosts \n127.0.0.1       localhost.localdomain   localhost\n127.0.1.1       linux\n# The following lines are desirable for IPv6 capable hosts\n::1     ip6-localhost ip6-loopback\nfe00::0 ip6-localnet\nff00::0 ip6-mcastprefix\nff02::1 ip6-allnodes\nff02::2 ip6-allrouters\n\nIn the end, I found that my namenode did not started correctly, i.e.\nWhen you type sudo netstat -lpten | grep java in the terminal, there will not be any JVM process running(listening) on port 9000.\nSo I made two directories for namenode and datanode respectively(if you have not done so). You don't have to put where I put it, please replace it based on your hadoop directory.\n i.e.\nmkdir -p /home/hadoopuser/hadoop-2.6.2/hdfs/namenode\nmkdir -p /home/hadoopuser/hadoop-2.6.2/hdfs/datanode\n\nI reconfigured my hdfs-site.xml.\n<configuration>\n    <property>\n        <name>dfs.replication</name>\n        <value>1</value>\n    </property>\n   <property>\n        <name>dfs.namenode.name.dir</name>\n        <value>file:/home/hadoopuser/hadoop-2.6.2/hdfs/namenode</value>\n    </property>\n    <property>\n        <name>dfs.datanode.data.dir</name>\n        <value>file:/home/hadoopuser/hadoop-2.6.2/hdfs/datanode</value>\n    </property>\n</configuration>\n\nIn terminal, stop your hdfs and yarn with script stop-dfs.sh and stop-yarn.sh. They are located in your hadoop directory/sbin. In my case, it's /home/hadoopuser/hadoop-2.6.2/sbin/.\nThen start your hdfs and yarn with script start-dfs.sh and start-yarn.sh\nAfter it is started, type jps in your terminal to see if your JVM processes are running correctly. It should show the following.\n15678 NodeManager\n14982 NameNode\n15347 SecondaryNameNode\n23814 Jps\n15119 DataNode\n15548 ResourceManager\n\nThen try to use netstat again to see if your namenode is listening to port 9000\nsudo netstat -lpten | grep java\n\nIf you successfully set up the namenode, you should see the following in your terminal output.\ntcp        0      0 127.0.0.1:9000          0.0.0.0:*               LISTEN      1001       175157      14982/java\nThen try to type the command hdfs dfs -mkdir /user/hadoopuser\nIf this command executes sucessfully, now you can list your directory in the HDFS user directory by hdfs dfs -ls /user",
          vote: "3",
          weight: "0.41",
        },
        {
          exceptionReason:
            "My hadoop-hdfs-zkfc-[hostname].log showed:\n\n2017-04-14 11:46:55,351 WARN org.apache.hadoop.ha.HealthMonitor:\n  Transport-level exception trying to monitor health of NameNode at\n  HOST/192.168.1.55:9000: java.net.ConnectException: Connection refused\n  Call From HOST/192.168.1.55 to HOST:9000 failed on connection\n  exception: java.net.ConnectException: Connection refused; For more\n  details see:  http://wiki.apache.org/hadoop/ConnectionRefused\n\nsolution:\n\nbefore\n\nafter",
          serialNumber: "5",
          solution:
            "For me it was that I could not cluster my zookeeper.\nhdfs haadmin -getServiceState 1\nactive\n\nhdfs haadmin -getServiceState 2\nactive\n\nMy hadoop-hdfs-zkfc-[hostname].log showed:\n\n2017-04-14 11:46:55,351 WARN org.apache.hadoop.ha.HealthMonitor:\n  Transport-level exception trying to monitor health of NameNode at\n  HOST/192.168.1.55:9000: java.net.ConnectException: Connection refused\n  Call From HOST/192.168.1.55 to HOST:9000 failed on connection\n  exception: java.net.ConnectException: Connection refused; For more\n  details see:  http://wiki.apache.org/hadoop/ConnectionRefused\n\nsolution:\nhdfs-site.xml\n  <property>\n    <name>dfs.namenode.rpc-bind-host</name>\n      <value>0.0.0.0</value>\n  </property>\n\nbefore\nnetstat -plunt\n\ntcp        0      0 192.168.1.55:9000        0.0.0.0:*               LISTEN      13133/java\n\nnmap localhost -p 9000\n\nStarting Nmap 6.40 ( http://nmap.org ) at 2017-04-14 12:15 EDT\nNmap scan report for localhost (127.0.0.1)\nHost is up (0.000047s latency).\nOther addresses for localhost (not scanned): 127.0.0.1\nPORT     STATE  SERVICE\n9000/tcp closed cslistener\n\nafter\nnetstat -plunt\ntcp        0      0 0.0.0.0:9000            0.0.0.0:*               LISTEN      14372/java\n\nnmap localhost -p 9000\n\nStarting Nmap 6.40 ( http://nmap.org ) at 2017-04-14 12:28 EDT\nNmap scan report for localhost (127.0.0.1)\nHost is up (0.000039s latency).\nOther addresses for localhost (not scanned): 127.0.0.1\nPORT     STATE SERVICE\n9000/tcp open  cslistener",
          vote: "3",
          weight: "0.41",
        },
        {
          exceptionReason:
            "In /etc/hosts:\n\nAdd this line:\n\nyour-ip-address    your-host-name\nexample: 192.168.1.8    master\nIn /etc/hosts:\n\nDelete the line with 127.0.1.1 (This will cause loopback)\nIn your core-site, change localhost to your-ip or your-hostname\n\nNow, restart the cluster.",
          serialNumber: "6",
          solution:
            "In /etc/hosts:\n\nAdd this line:\n\nyour-ip-address    your-host-name\nexample: 192.168.1.8    master\nIn /etc/hosts:\n\nDelete the line with 127.0.1.1 (This will cause loopback)\nIn your core-site, change localhost to your-ip or your-hostname\n\nNow, restart the cluster.",
          vote: "3",
          weight: "0.41",
        },
        {
          exceptionReason: "",
          serialNumber: "7",
          solution:
            "Make sure HDFS is online. Start it by $HADOOP_HOME/sbin/start-dfs.sh\nOnce you do that, your test with telnet localhost 9001should work.",
          vote: "2",
          weight: "0.41",
        },
        {
          exceptionReason: "",
          serialNumber: "8",
          solution:
            "Check your firewall setting\n and  set \n  <property>\n  <name>fs.default.name</name>\n  <value>hdfs://MachineName:9000</value>\n  </property>\n\nreplace localhost to machine name",
          vote: "1",
          weight: "0.41",
        },
        {
          exceptionReason:
            "Connection refused problem might also be due to no active DataNode.\nUPDATED:\nFor this error:\n\n15/03/01 00:59:34 INFO client.RMProxy: Connecting to ResourceManager at /0.0.0.0:8032\n  java.net.ConnectException: Call From marta-komputer.home/192.168.1.8 to marta-komputer:9000 failed on connection exception:     java.net.ConnectException: Connection refused; For more details see:    http://wiki.apache.org/hadoop/ConnectionRefused\n\nAdd these lines in yarn-site.xml:\n\nRestart the hadoop processes.",
          serialNumber: "9",
          solution:
            "hduser@marta-komputer:/usr/local/hadoop$ jps\n11696 ResourceManager\n11842 NodeManager\n11171 NameNode\n11523 SecondaryNameNode\n12167 Jps\n\nWhere is your DataNode? Connection refused problem might also be due to no active DataNode. Check datanode logs for issues.\nUPDATED:\nFor this error:\n\n15/03/01 00:59:34 INFO client.RMProxy: Connecting to ResourceManager at /0.0.0.0:8032\n  java.net.ConnectException: Call From marta-komputer.home/192.168.1.8 to marta-komputer:9000 failed on connection exception:     java.net.ConnectException: Connection refused; For more details see:    http://wiki.apache.org/hadoop/ConnectionRefused\n\nAdd these lines in yarn-site.xml:\n<property>\n<name>yarn.resourcemanager.address</name>\n<value>192.168.1.8:8032</value>\n</property>\n<property>\n<name>yarn.resourcemanager.scheduler.address</name>\n<value>192.168.1.8:8030</value>\n</property>\n<property>\n<name>yarn.resourcemanager.resource-tracker.address</name>\n<value>192.168.1.8:8031</value>\n</property>\n\nRestart the hadoop processes.",
          vote: "1",
          weight: "0.41",
        },
        {
          exceptionReason: "",
          serialNumber: "10",
          solution:
            "Your issue is a very interesting one. Hadoop setup could be frustrating some time due to the complexity of the system and many moving parts involved. I think the issue you faced is definitely a firewall one.\nMy hadoop cluster has similar setup. With a firewall rule added with command:\n sudo iptables -A INPUT -p tcp --dport 9000 -j REJECT\n\nI'm able to see the exact issue:\n15/03/02 23:46:10 INFO client.RMProxy: Connecting to ResourceManager at  /0.0.0.0:8032\njava.net.ConnectException: Call From mybox/127.0.1.1 to localhost:9000 failed on connection exception: java.net.ConnectException: Connection refused; For more details see:  http://wiki.apache.org/hadoop/ConnectionRefused\n     at sun.reflect.NativeConstructorAccessorImpl.newInstance0(Native Method)\n\nYou can verify your firewall settings with command:\n/usr/local/hadoop/etc$ sudo iptables -L\nChain INPUT (policy ACCEPT)\ntarget     prot opt source               destination         \nREJECT     tcp  --  anywhere             anywhere             tcp dpt:9000 reject-with icmp-port-unreachable\n\nChain FORWARD (policy ACCEPT)\ntarget     prot opt source               destination         \n\nChain OUTPUT (policy ACCEPT)\ntarget     prot opt source               destination   \n\nOnce the suspicious rule is identified, it could be deleted with a command like:\n sudo iptables -D INPUT -p tcp --dport 9000 -j REJECT \n\nNow, the connection should go through.",
          vote: "0",
          weight: "0.41",
        },
        {
          exceptionReason: "",
          serialNumber: "11",
          solution:
            "In my experaince\n15/02/22 18:23:04 WARN util.NativeCodeLoader: Unable to load native-hadoop\nlibrary for your platform... using builtin-java classes where applicable\n\nYou may have 64 bit version OS, and hadoop installation 32bit. refer this\njava.net.ConnectException: Call From marta-komputer/127.0.1.1 to\nlocalhost:9000 failed on connection exception: java.net.ConnectException: \nconnection refused; For more details see:   \nhttp://wiki.apache.org/hadoop/ConnectionRefused\n\nthis problem refers to your ssh public key authorization. please provide details about your ssh set up.\nPlease refer this link to check the complete steps. \nalso provide info if\ncat $HOME/.ssh/authorized_keys\n\nreturns any result or not.",
          vote: "0",
          weight: "0.41",
        },
        {
          exceptionReason:
            "I resolved the same issue by adding this property to hdfs-site.xml",
          serialNumber: "12",
          solution:
            "I resolved the same issue by adding this property to hdfs-site.xml\n<property>\n  <name>fs.default.name</name>\n  <value>hdfs://localhost:9000</value>\n  </property>",
          vote: "0",
          weight: "0.41",
        },
        {
          exceptionReason:
            "I am also facing same issue in Hortonworks \nAt the time I restart the Ambari agents and servers then the issue has been resolved.",
          serialNumber: "13",
          solution:
            "I am also facing same issue in Hortonworks \nAt the time I restart the Ambari agents and servers then the issue has been resolved.\n systemctl stop ambari-agent \nsystemctl stop ambari-server\n\nSource :Full Article With Resolution\n systemctl start ambari-agent\nsystemctl start ambari-server",
          vote: "0",
          weight: "0.41",
        },
        {
          exceptionReason:
            "I was getting the same issue and found that OpenSSH service was not running and it was causing the issue.",
          serialNumber: "14",
          solution:
            "I was getting the same issue and found that OpenSSH service was not running and it was causing the issue. After starting the SSH service it worked.\nTo check if SSH service is running or not:\nssh localhost\n\nTo start the service, if OpenSSH is already installed:\nsudo /etc/init.d/ssh start",
          vote: "0",
          weight: "0.41",
        },
        {
          exceptionReason: "",
          serialNumber: "15",
          solution:
            "Stop it by-: stop-all.sh \nformat the namenode-: hadoop namenode -format\nagain start-: start-all.sh",
          vote: "-2",
          weight: "0.41",
        },
        {
          exceptionReason: "",
          serialNumber: "16",
          solution:
            "1.check whether hadoop nodes can ssh each other or not.\n2.check address and ports of hadoop daemon in all of config files be like each other.\n3.check /etc/hosts of all nodes.\nthis is a useful link for check whether you have launched the cluster correctly:\ncluster setup\nI got it! your /etc/hosts are not correct. you should remove 127.0.1.1 line. I mean they should be like this:\n127.0.0.1       localhost\n192.168.1.101    master\n192.168.1.103    slave1\n192.168.1.104    slave2\n192.168.1.105    slave3\n\nand copy-paste for all slaves like this. and additionally slaves should be able to ssh each other, too.",
          vote: "7",
          weight: "0.41",
        },
        {
          exceptionReason:
            "You get a result from your first query: select * from customers because Hive doesn't use map reduce to get result\nAre you sure about your hadoop configuration ?",
          serialNumber: "17",
          solution:
            "You get a result from your first query: select * from customers because Hive doesn't use map reduce to get result\nAre you sure about your hadoop configuration ?\nDid you configure Hosts File ?\nHow to configure hosts file for Hadoop ecosystem",
          vote: "0",
          weight: "0.41",
        },
        {
          exceptionReason: "",
          serialNumber: "18",
          solution:
            "check your hosts file and host file\nit should be match other wise it will through error like you\nsudo gedit /etc/hosts\n======\nhosts\n======\n127.0.0.1   localhost\n127.0.0.1   orienit\n\n\nsudo gedit /etc/hostname\n\nhostname\n========\norienit",
          vote: "-1",
          weight: "0.41",
        },
        {
          exceptionReason:
            "So when running a INSERT query on Hive, when it tried to run map reduce job it was failing with above error.\nStarting yarn services mentioned above fixed the issue for me.",
          serialNumber: "19",
          solution:
            "Check if your ResourceManager and NodeManager services are up and running using jps command. In my case only NameNode and DataNode services were up and above were not running. So when running a INSERT query on Hive, when it tried to run map reduce job it was failing with above error.\nStarting yarn services mentioned above fixed the issue for me.",
          vote: "2",
          weight: "0.39",
        },
        {
          exceptionReason: "",
          serialNumber: "20",
          solution:
            "You most probably have speculative execution on, and two different attempts for reduce task 1 are trying to write to the path /home/users/mlakshm/alop176/data-r-00001. This probably succeeds for smaller tasks as they finish before hadoop speculatively executes a second attempt.\nI see your implementation of MultipleOutputs is custom (com.a.MultipleOutputs), you should be writing all HDFS data to the tasks working directory and letting the OutputComitter move it to the final output directory upon output commit. If you're able to, pastebin the code and we can take a look.",
          vote: "3",
          weight: "0.34",
        },
      ];
      const re3 = [
        {
          exceptionReason:
            "You get a result from your first query: select * from customers because Hive doesn't use map reduce to get result\nAre you sure about your hadoop configuration ?",
          serialNumber: "1",
          solution:
            "You get a result from your first query: select * from customers because Hive doesn't use map reduce to get result\nAre you sure about your hadoop configuration ?\nDid you configure Hosts File ?\nHow to configure hosts file for Hadoop ecosystem",
          vote: "0",
          weight: "0.26",
        },
        {
          exceptionReason: "",
          serialNumber: "2",
          solution:
            "check your hosts file and host file\nit should be match other wise it will through error like you\nsudo gedit /etc/hosts\n======\nhosts\n======\n127.0.0.1   localhost\n127.0.0.1   orienit\n\n\nsudo gedit /etc/hostname\n\nhostname\n========\norienit",
          vote: "-1",
          weight: "0.26",
        },
        {
          exceptionReason: "",
          serialNumber: "3",
          solution:
            "For me these steps worked\n\nstop-all.sh\nhadoop namenode -format\nstart-all.sh",
          vote: "69",
          weight: "0.25",
        },
        {
          exceptionReason: "",
          serialNumber: "4",
          solution:
            "Hi Edit your conf/core-site.xml and change localhost to 0.0.0.0. Use the conf below. That should work.\n<configuration>\n  <property>\n <name>fs.default.name</name>\n <value>hdfs://0.0.0.0:9000</value>\n</property>",
          vote: "24",
          weight: "0.25",
        },
        {
          exceptionReason:
            "From the netstat output you can see the process is listening on address 127.0.0.1\n\nfrom the exception message you can see that it tries to connect to address 127.0.1.1\n\nfurther in the exception it's mentionend\n\non this page you find\n\nCheck that there isn't an entry for your hostname mapped to 127.0.0.1 or 127.0.1.1 in /etc/hosts (Ubuntu is notorious for this)\n\nso the conclusion is to remove this line in your /etc/hosts",
          serialNumber: "5",
          solution:
            "From the netstat output you can see the process is listening on address 127.0.0.1\ntcp        0      0 127.0.0.1:9000          0.0.0.0:*  ...\n\nfrom the exception message you can see that it tries to connect to address 127.0.1.1\njava.net.ConnectException: Call From marta-komputer/127.0.1.1 to localhost:9000 failed ...\n\nfurther in the exception it's mentionend\nFor more details see:  http://wiki.apache.org/hadoop/ConnectionRefused\n\non this page you find\n\nCheck that there isn't an entry for your hostname mapped to 127.0.0.1 or 127.0.1.1 in /etc/hosts (Ubuntu is notorious for this)\n\nso the conclusion is to remove this line in your /etc/hosts\n127.0.1.1       marta-komputer",
          vote: "6",
          weight: "0.25",
        },
        {
          exceptionReason: "",
          serialNumber: "6",
          solution:
            "I had the similar prolem with OP. As the terminal output suggested, I went to \nhttp://wiki.apache.org/hadoop/ConnectionRefused \nI tried to change my /etc/hosts file as suggested here, i.e. remove 127.0.1.1 as OP suggested it will create another error. \nSo in the end, I leave it as is. The following is my /etc/hosts \n127.0.0.1       localhost.localdomain   localhost\n127.0.1.1       linux\n# The following lines are desirable for IPv6 capable hosts\n::1     ip6-localhost ip6-loopback\nfe00::0 ip6-localnet\nff00::0 ip6-mcastprefix\nff02::1 ip6-allnodes\nff02::2 ip6-allrouters\n\nIn the end, I found that my namenode did not started correctly, i.e.\nWhen you type sudo netstat -lpten | grep java in the terminal, there will not be any JVM process running(listening) on port 9000.\nSo I made two directories for namenode and datanode respectively(if you have not done so). You don't have to put where I put it, please replace it based on your hadoop directory.\n i.e.\nmkdir -p /home/hadoopuser/hadoop-2.6.2/hdfs/namenode\nmkdir -p /home/hadoopuser/hadoop-2.6.2/hdfs/datanode\n\nI reconfigured my hdfs-site.xml.\n<configuration>\n    <property>\n        <name>dfs.replication</name>\n        <value>1</value>\n    </property>\n   <property>\n        <name>dfs.namenode.name.dir</name>\n        <value>file:/home/hadoopuser/hadoop-2.6.2/hdfs/namenode</value>\n    </property>\n    <property>\n        <name>dfs.datanode.data.dir</name>\n        <value>file:/home/hadoopuser/hadoop-2.6.2/hdfs/datanode</value>\n    </property>\n</configuration>\n\nIn terminal, stop your hdfs and yarn with script stop-dfs.sh and stop-yarn.sh. They are located in your hadoop directory/sbin. In my case, it's /home/hadoopuser/hadoop-2.6.2/sbin/.\nThen start your hdfs and yarn with script start-dfs.sh and start-yarn.sh\nAfter it is started, type jps in your terminal to see if your JVM processes are running correctly. It should show the following.\n15678 NodeManager\n14982 NameNode\n15347 SecondaryNameNode\n23814 Jps\n15119 DataNode\n15548 ResourceManager\n\nThen try to use netstat again to see if your namenode is listening to port 9000\nsudo netstat -lpten | grep java\n\nIf you successfully set up the namenode, you should see the following in your terminal output.\ntcp        0      0 127.0.0.1:9000          0.0.0.0:*               LISTEN      1001       175157      14982/java\nThen try to type the command hdfs dfs -mkdir /user/hadoopuser\nIf this command executes sucessfully, now you can list your directory in the HDFS user directory by hdfs dfs -ls /user",
          vote: "3",
          weight: "0.25",
        },
        {
          exceptionReason:
            "My hadoop-hdfs-zkfc-[hostname].log showed:\n\n2017-04-14 11:46:55,351 WARN org.apache.hadoop.ha.HealthMonitor:\n  Transport-level exception trying to monitor health of NameNode at\n  HOST/192.168.1.55:9000: java.net.ConnectException: Connection refused\n  Call From HOST/192.168.1.55 to HOST:9000 failed on connection\n  exception: java.net.ConnectException: Connection refused; For more\n  details see:  http://wiki.apache.org/hadoop/ConnectionRefused\n\nsolution:\n\nbefore\n\nafter",
          serialNumber: "7",
          solution:
            "For me it was that I could not cluster my zookeeper.\nhdfs haadmin -getServiceState 1\nactive\n\nhdfs haadmin -getServiceState 2\nactive\n\nMy hadoop-hdfs-zkfc-[hostname].log showed:\n\n2017-04-14 11:46:55,351 WARN org.apache.hadoop.ha.HealthMonitor:\n  Transport-level exception trying to monitor health of NameNode at\n  HOST/192.168.1.55:9000: java.net.ConnectException: Connection refused\n  Call From HOST/192.168.1.55 to HOST:9000 failed on connection\n  exception: java.net.ConnectException: Connection refused; For more\n  details see:  http://wiki.apache.org/hadoop/ConnectionRefused\n\nsolution:\nhdfs-site.xml\n  <property>\n    <name>dfs.namenode.rpc-bind-host</name>\n      <value>0.0.0.0</value>\n  </property>\n\nbefore\nnetstat -plunt\n\ntcp        0      0 192.168.1.55:9000        0.0.0.0:*               LISTEN      13133/java\n\nnmap localhost -p 9000\n\nStarting Nmap 6.40 ( http://nmap.org ) at 2017-04-14 12:15 EDT\nNmap scan report for localhost (127.0.0.1)\nHost is up (0.000047s latency).\nOther addresses for localhost (not scanned): 127.0.0.1\nPORT     STATE  SERVICE\n9000/tcp closed cslistener\n\nafter\nnetstat -plunt\ntcp        0      0 0.0.0.0:9000            0.0.0.0:*               LISTEN      14372/java\n\nnmap localhost -p 9000\n\nStarting Nmap 6.40 ( http://nmap.org ) at 2017-04-14 12:28 EDT\nNmap scan report for localhost (127.0.0.1)\nHost is up (0.000039s latency).\nOther addresses for localhost (not scanned): 127.0.0.1\nPORT     STATE SERVICE\n9000/tcp open  cslistener",
          vote: "3",
          weight: "0.25",
        },
        {
          exceptionReason:
            "In /etc/hosts:\n\nAdd this line:\n\nyour-ip-address    your-host-name\nexample: 192.168.1.8    master\nIn /etc/hosts:\n\nDelete the line with 127.0.1.1 (This will cause loopback)\nIn your core-site, change localhost to your-ip or your-hostname\n\nNow, restart the cluster.",
          serialNumber: "8",
          solution:
            "In /etc/hosts:\n\nAdd this line:\n\nyour-ip-address    your-host-name\nexample: 192.168.1.8    master\nIn /etc/hosts:\n\nDelete the line with 127.0.1.1 (This will cause loopback)\nIn your core-site, change localhost to your-ip or your-hostname\n\nNow, restart the cluster.",
          vote: "3",
          weight: "0.25",
        },
        {
          exceptionReason: "",
          serialNumber: "9",
          solution:
            "Make sure HDFS is online. Start it by $HADOOP_HOME/sbin/start-dfs.sh\nOnce you do that, your test with telnet localhost 9001should work.",
          vote: "2",
          weight: "0.25",
        },
        {
          exceptionReason: "",
          serialNumber: "10",
          solution:
            "Check your firewall setting\n and  set \n  <property>\n  <name>fs.default.name</name>\n  <value>hdfs://MachineName:9000</value>\n  </property>\n\nreplace localhost to machine name",
          vote: "1",
          weight: "0.25",
        },
        {
          exceptionReason:
            "Connection refused problem might also be due to no active DataNode.\nUPDATED:\nFor this error:\n\n15/03/01 00:59:34 INFO client.RMProxy: Connecting to ResourceManager at /0.0.0.0:8032\n  java.net.ConnectException: Call From marta-komputer.home/192.168.1.8 to marta-komputer:9000 failed on connection exception:     java.net.ConnectException: Connection refused; For more details see:    http://wiki.apache.org/hadoop/ConnectionRefused\n\nAdd these lines in yarn-site.xml:\n\nRestart the hadoop processes.",
          serialNumber: "11",
          solution:
            "hduser@marta-komputer:/usr/local/hadoop$ jps\n11696 ResourceManager\n11842 NodeManager\n11171 NameNode\n11523 SecondaryNameNode\n12167 Jps\n\nWhere is your DataNode? Connection refused problem might also be due to no active DataNode. Check datanode logs for issues.\nUPDATED:\nFor this error:\n\n15/03/01 00:59:34 INFO client.RMProxy: Connecting to ResourceManager at /0.0.0.0:8032\n  java.net.ConnectException: Call From marta-komputer.home/192.168.1.8 to marta-komputer:9000 failed on connection exception:     java.net.ConnectException: Connection refused; For more details see:    http://wiki.apache.org/hadoop/ConnectionRefused\n\nAdd these lines in yarn-site.xml:\n<property>\n<name>yarn.resourcemanager.address</name>\n<value>192.168.1.8:8032</value>\n</property>\n<property>\n<name>yarn.resourcemanager.scheduler.address</name>\n<value>192.168.1.8:8030</value>\n</property>\n<property>\n<name>yarn.resourcemanager.resource-tracker.address</name>\n<value>192.168.1.8:8031</value>\n</property>\n\nRestart the hadoop processes.",
          vote: "1",
          weight: "0.25",
        },
        {
          exceptionReason: "",
          serialNumber: "12",
          solution:
            "Your issue is a very interesting one. Hadoop setup could be frustrating some time due to the complexity of the system and many moving parts involved. I think the issue you faced is definitely a firewall one.\nMy hadoop cluster has similar setup. With a firewall rule added with command:\n sudo iptables -A INPUT -p tcp --dport 9000 -j REJECT\n\nI'm able to see the exact issue:\n15/03/02 23:46:10 INFO client.RMProxy: Connecting to ResourceManager at  /0.0.0.0:8032\njava.net.ConnectException: Call From mybox/127.0.1.1 to localhost:9000 failed on connection exception: java.net.ConnectException: Connection refused; For more details see:  http://wiki.apache.org/hadoop/ConnectionRefused\n     at sun.reflect.NativeConstructorAccessorImpl.newInstance0(Native Method)\n\nYou can verify your firewall settings with command:\n/usr/local/hadoop/etc$ sudo iptables -L\nChain INPUT (policy ACCEPT)\ntarget     prot opt source               destination         \nREJECT     tcp  --  anywhere             anywhere             tcp dpt:9000 reject-with icmp-port-unreachable\n\nChain FORWARD (policy ACCEPT)\ntarget     prot opt source               destination         \n\nChain OUTPUT (policy ACCEPT)\ntarget     prot opt source               destination   \n\nOnce the suspicious rule is identified, it could be deleted with a command like:\n sudo iptables -D INPUT -p tcp --dport 9000 -j REJECT \n\nNow, the connection should go through.",
          vote: "0",
          weight: "0.25",
        },
        {
          exceptionReason: "",
          serialNumber: "13",
          solution:
            "In my experaince\n15/02/22 18:23:04 WARN util.NativeCodeLoader: Unable to load native-hadoop\nlibrary for your platform... using builtin-java classes where applicable\n\nYou may have 64 bit version OS, and hadoop installation 32bit. refer this\njava.net.ConnectException: Call From marta-komputer/127.0.1.1 to\nlocalhost:9000 failed on connection exception: java.net.ConnectException: \nconnection refused; For more details see:   \nhttp://wiki.apache.org/hadoop/ConnectionRefused\n\nthis problem refers to your ssh public key authorization. please provide details about your ssh set up.\nPlease refer this link to check the complete steps. \nalso provide info if\ncat $HOME/.ssh/authorized_keys\n\nreturns any result or not.",
          vote: "0",
          weight: "0.25",
        },
        {
          exceptionReason:
            "I resolved the same issue by adding this property to hdfs-site.xml",
          serialNumber: "14",
          solution:
            "I resolved the same issue by adding this property to hdfs-site.xml\n<property>\n  <name>fs.default.name</name>\n  <value>hdfs://localhost:9000</value>\n  </property>",
          vote: "0",
          weight: "0.25",
        },
        {
          exceptionReason:
            "I am also facing same issue in Hortonworks \nAt the time I restart the Ambari agents and servers then the issue has been resolved.",
          serialNumber: "15",
          solution:
            "I am also facing same issue in Hortonworks \nAt the time I restart the Ambari agents and servers then the issue has been resolved.\n systemctl stop ambari-agent \nsystemctl stop ambari-server\n\nSource :Full Article With Resolution\n systemctl start ambari-agent\nsystemctl start ambari-server",
          vote: "0",
          weight: "0.25",
        },
        {
          exceptionReason:
            "I was getting the same issue and found that OpenSSH service was not running and it was causing the issue.",
          serialNumber: "16",
          solution:
            "I was getting the same issue and found that OpenSSH service was not running and it was causing the issue. After starting the SSH service it worked.\nTo check if SSH service is running or not:\nssh localhost\n\nTo start the service, if OpenSSH is already installed:\nsudo /etc/init.d/ssh start",
          vote: "0",
          weight: "0.25",
        },
        {
          exceptionReason: "",
          serialNumber: "17",
          solution:
            "Stop it by-: stop-all.sh \nformat the namenode-: hadoop namenode -format\nagain start-: start-all.sh",
          vote: "-2",
          weight: "0.25",
        },
        {
          exceptionReason:
            "So when running a INSERT query on Hive, when it tried to run map reduce job it was failing with above error.\nStarting yarn services mentioned above fixed the issue for me.",
          serialNumber: "18",
          solution:
            "Check if your ResourceManager and NodeManager services are up and running using jps command. In my case only NameNode and DataNode services were up and above were not running. So when running a INSERT query on Hive, when it tried to run map reduce job it was failing with above error.\nStarting yarn services mentioned above fixed the issue for me.",
          vote: "2",
          weight: "0.24",
        },
        {
          exceptionReason: "",
          serialNumber: "19",
          solution:
            "To start it,go to hadoop's sbin dir and then type the command\nmr-jobhistory-server.sh start historyserver --config $HADOOP_CONF_DIR\n\n$HADOOP_CONF_DIR is the directory where hadoop's config files like hdfs-site.xml etc. reside.",
          vote: "7",
          weight: "0.20",
        },
        {
          exceptionReason:
            "So starting the JobHistoryServer would eliminate this issue.",
          serialNumber: "20",
          solution:
            "Found the solution.\nThe line:\nCaused by: java.net.ConnectException: Call From localhost.localdomain/127.0.0.1 to 0.0.0.0:10020 failed on connection exception: java.net.ConnectException: Connection refused; For more details see:  http://wiki.apache.org/hadoop/ConnectionRefused\n\ncomes when JobHistoryServer is not up.\nSo starting the JobHistoryServer would eliminate this issue.\nTo start it, go to hadoop's sbin dir and then the command:  \nmr-jobhistory-server.sh start\n\nDo a jps to check if JobHistoryServer is up, and then re-execute your Pig commands.",
          vote: "3",
          weight: "0.20",
        },
        {
          exceptionReason: "",
          serialNumber: "21",
          solution:
            "Updated command(as of 2017):\n./mr-jobhistory-daemon.sh --config $HADOOP_CONF_DIR start historyserver\n\ncheck\njps",
          vote: "0",
          weight: "0.20",
        },
      ];
      const re4 = [
        {
          exceptionReason: "",
          serialNumber: "1",
          solution:
            "You can try lowering the threshold for triggering safe mode by temporarily setting the following options to low values:\ndfs.safemode.threshold.pct\ndfs.namenode.safemode.threshold-pct\n\nAlso, the NameNode might not go back to safe mode immediately after leaving. In my case, I was able to clean up stuff by chaining the hdfs dfsadmin -safemode leave and hdfs dfs -rm commands together, e.g.\nsudo su hdfs\nhdfs dfsadmin -safemode leave; hdfs dfs -rm -skipTrash /path/to/stuff/to/delete",
          vote: "3",
          weight: "0.21",
        },
        {
          exceptionReason: "",
          serialNumber: "2",
          solution:
            "It is important to know that HDFS simply uses the disk space of the harddrive. So if on a single node system HDFS is fill then the local disk is also full.\nTry if you can cleanup files by removing non hdfs files  (for example /var/log/...)",
          vote: "2",
          weight: "0.21",
        },
        {
          exceptionReason:
            'I resolved the issue.\nFileNotFoundException - from Hive side (when Tez execution engine executes DAG)\n\nProblem scenario-\n\nWe just upgraded the hive version from 0.13.0 to 2.1.0.\nDifferent thoughts to resolve the issue -\n\nFirst thought was, two threads was working on same piece because of NN intelligence.\nFinally the root cause lies in a application layer code itself.\nSo if there is any concurrent jobs in Application layer code (ETL), and are doing operation(rename/delete/move) on same table, then it may lead to this problem.\nAnd, in our case, 2 concurrent jobs are doing "INSERT OVERWRITE" on same table, that leads to delete metadata file of 1 mapper, that is causing this issue.',
          serialNumber: "3",
          solution:
            'I resolved the issue. Let me explain in detail.\nExceptions that is coming -\n\nLeaveExpirtedException - from HDFS side.\nFileNotFoundException - from Hive side (when Tez execution engine executes DAG)\n\nProblem scenario-\n\nWe just upgraded the hive version from 0.13.0 to 2.1.0. And, everything was working fine with previous version. Zero runtime exception.\n\nDifferent thoughts to resolve the issue -\n\nFirst thought was, two threads was working on same piece because of NN intelligence. But as per below settings\nset mapreduce.map.speculative=false\nset mapreduce.reduce.speculative=false\n\nthat was not possible. \n\nthen, I increase the count from 1000 to 100000 for below settings -\nSET hive.exec.max.dynamic.partitions=100000; \nSET hive.exec.max.dynamic.partitions.pernode=100000;\n\nthat also didn\'t work.\n\nThen the third thought was, definitely in a same process, what mapper-1 was created was deleted by another mapper/reducer. But, we didn\'t found any such logs in Hveserver2, Tez logs.\nFinally the root cause lies in a application layer code itself. In hive-exec-2.1.0 version, they introduced new configuration property \n"hive.exec.stagingdir":".hive-staging"\n\nDescription of above property -\n\nDirectory name that will be created inside table locations in order to\n  support HDFS encryption. This is replaces ${hive.exec.scratchdir} for\n  query results with the exception of read-only tables. In all cases\n  ${hive.exec.scratchdir} is still used for other temporary files, such\n  as job plans.\n\nSo if there is any concurrent jobs in Application layer code (ETL), and are doing operation(rename/delete/move) on same table, then it may lead to this problem.\nAnd, in our case, 2 concurrent jobs are doing "INSERT OVERWRITE" on same table, that leads to delete metadata file of 1 mapper, that is causing this issue.\nResolution -\n\nMove the metadata file location to outside table(table lies in S3).\nDisable HDFS encryption (as mentioned in Description of stagingdir property.)\nChange into your Application layer code to avoid concurrency issue.\n\nRelated question - Why hive_staging file is missing in AWS EMR',
          vote: "1",
          weight: "0.19",
        },
        {
          exceptionReason:
            "What happens using this approach is that the error is clearly visible if you are having some problem setting the datanodes on the network and also many posts on stackoverflow suggest that namenode requires some time to start-off, therefore, it should be given some time to start before starting the datanodes.\nAlso, in this case I was having problem with different ids of namenode and datanodes for which I had to change the ids of the datanode with same id as the namenode.",
          serialNumber: "4",
          solution:
            "The solution that worked for me was to run namenode and datanode one by one and not together using bin/start-all.sh. What happens using this approach is that the error is clearly visible if you are having some problem setting the datanodes on the network and also many posts on stackoverflow suggest that namenode requires some time to start-off, therefore, it should be given some time to start before starting the datanodes. Also, in this case I was having problem with different ids of namenode and datanodes for which I had to change the ids of the datanode with same id as the namenode.\nThe step by step procedure will be:\n\nStart the namenode bin/hadoop namenode. Check for errors, if any.\nStart the datanodes bin/hadoop datanode. Check for errors, if any.\nNow start the task-tracker, job tracker using 'bin/start-mapred.sh'",
          vote: "26",
          weight: "0.18",
        },
        {
          exceptionReason: "",
          serialNumber: "5",
          solution:
            "Look at your namenode (probably http://localhost:50070) and see how many datanodes it says you have.  \nIf it is 0, then either your datanode isn't running or it isn't configured to connect to the namenode.  \nIf it is 1, check to see how much free space it says there is in the DFS.  It may be that the data node doesn't have anywhere it can write data to (data dir doesn't exist, or doesn't have write permissions).",
          vote: "8",
          weight: "0.18",
        },
        {
          exceptionReason: "Doing this solved this error for me.",
          serialNumber: "6",
          solution:
            "Although solved, I'm adding this for future readers. Cody's advice of inspecting the start of namenode and datanode was useful, and further investigation led me to delete the hadoop-store/dfs directory. Doing this solved this error for me.",
          vote: "4",
          weight: "0.18",
        },
        {
          exceptionReason:
            'I had the same problem, I took a look at the datanode logs and there was a warning saying that the dfs.data.dir had incorrect permissions... so I just changed them and everything worked, which is kind of weird.\nSpecifically, my "dfs.data.dir" was set to "/home/hadoop/hd_tmp", and the error I got was:\n\nSo I simply executed these commands:\n\nI stopped all the demons with "bin/stop-all.sh"\nChange the permissions of the directory with "chmod -R 755 /home/hadoop/hd_tmp"\nI gave format again to the namenode with "bin/hadoop namenode -format".',
          serialNumber: "7",
          solution:
            'I had the same problem, I took a look at the datanode logs and there was a warning saying that the dfs.data.dir had incorrect permissions... so I just changed them and everything worked, which is kind of weird.\nSpecifically, my "dfs.data.dir" was set to "/home/hadoop/hd_tmp", and the error I got was:\n...\n...\nWARN org.apache.hadoop.hdfs.server.datanode.DataNode: Invalid directory in dfs.data.dir: Incorrect permission for /home/hadoop/hd_tmp/dfs/data, expected: rwxr-xr-x, while actual: rwxrwxr-x\nERROR org.apache.hadoop.hdfs.server.datanode.DataNode: All directories in dfs.data.dir are invalid.\n...\n...\n\nSo I simply executed these commands:\n\nI stopped all the demons with "bin/stop-all.sh"\nChange the permissions of the directory with "chmod -R 755 /home/hadoop/hd_tmp"\nI gave format again to the namenode with "bin/hadoop namenode -format".\nI re-started the demons "bin/start-all.sh"\nAnd voil\u00e0, the datanode was up and running! (I checked it with the command "jsp", where a process named DataNode was shown).\n\nAnd then everything worked fine.',
          vote: "3",
          weight: "0.18",
        },
        {
          exceptionReason:
            "In my case, I wrongly set one destination for dfs.name.dir and dfs.data.dir.",
          serialNumber: "8",
          solution:
            "In my case, I wrongly set one destination for dfs.name.dir and dfs.data.dir. The correct format is\n <property>\n <name>dfs.name.dir</name>\n <value>/path/to/name</value>\n </property>\n\n <property>\n <name>dfs.data.dir</name>\n <value>/path/to/data</value>\n </property>",
          vote: "1",
          weight: "0.18",
        },
        {
          exceptionReason:
            "I removed the extra properties in the hdfs-site.xml and then this issue was gone.",
          serialNumber: "9",
          solution:
            "I removed the extra properties in the hdfs-site.xml and then this issue was gone. Hadoop needs to improve on their error messages. I tried each of the above solutions and none worked.",
          vote: "1",
          weight: "0.18",
        },
        {
          exceptionReason:
            'Usually, this situation occur because there are some mistakes in the three *-site.xml files under HADOOP_INSTALL/conf and hosts file.\nIn my case, the cause is unable to resolve the hostname.\nI solved the problem simply by adding "IP_Address  hostname" to /etc/hosts.',
          serialNumber: "10",
          solution:
            'I encountered the same problem. When I looked at localhost:50070, under the cluster summary, all properties were shown as 0 except "DFS Used% 100". Usually, this situation occur because there are some mistakes in the three *-site.xml files under HADOOP_INSTALL/conf and hosts file.\nIn my case, the cause is unable to resolve the hostname. I solved the problem simply by adding "IP_Address  hostname" to /etc/hosts.',
          vote: "0",
          weight: "0.18",
        },
        {
          exceptionReason: "",
          serialNumber: "11",
          solution:
            "In my case I had to delete:\n/tmp/hadoop-<user-name> folder and format and start using sbin/start-dfs.sh\nsbin/start-yarn.sh",
          vote: "0",
          weight: "0.18",
        },
        {
          exceptionReason: "",
          serialNumber: "12",
          solution:
            "I've actually duplicated a vm to create the slave machines which lead to a situation where all nodes had same UUID. So (as discussed here) I shutdown the services in the slave:\nhadoop-daemon.sh stop datanode\nyarn-daemon.sh stop nodemanager\n\nThen, I deleted the datanode and namenode directories (in dfs.datanode.data.dir and dfs.namenode.data.dir respectively). Then, restarted the datanode and namenode. Now I can see the datanode up and running:\n$ jps\n17135 NodeManager\n17290 DataNode\n18221 Jps",
          vote: "8",
          weight: "0.16",
        },
        {
          exceptionReason: "",
          serialNumber: "13",
          solution:
            "Assuming you already fixed this since you submitted 10 months ago, but try the full hdfs input:\nhdfs://server:port/input/1901",
          vote: "-2",
          weight: "0.16",
        },
      ];

      if (index == "1") {
        this.tableData = re1;
      } else if (index == "2") {
        this.tableData = re2;
      } else if (index == "3") {
        this.tableData = re3;
      } else {
        this.tableData = re4;
      }
    },
  },
};
</script>
<style>
.div-top .el-row {
  margin-bottom: 30px !important;
}
.div-top .el-col {
  border-radius: 0px;
  min-height: 20px !important;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
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
.row-bg {
  padding: 10px;
  background-color: #75777b;
}
.div-top {
  margin-top: 30px;
  margin-left: 20px;
  margin-right: 50px;
}
.div-table {
  box-shadow: 2px 2px 10px #e7e5e5;
  margin-top: 0px;
  margin-left: 20px;
  margin-right: 50px;
  background-color: #f9fafc;
}
.el-tooltip__popper {
  max-width: 600px;
}
</style>