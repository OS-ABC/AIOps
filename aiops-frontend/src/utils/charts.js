/**
 * 各种画echarts图表的方法都封装在这里
 * 注意：这里echarts没有采用按需引入的方式，只是为了方便学习
 */

import echarts from 'echarts'
const install = function(Vue) {
    Object.defineProperties(Vue.prototype, {
        $chart: {
            get() {
                return {
                    logChart: function (id) {
                        this.chart = echarts.init(document.getElementById(id));
                        this.chart.clear();
                        var titles = ['syslog', 'DataNode(slave1)', 'DataNode(slave2)', 'NodeManager(slave1)', 
                        'NodeManager(slave2)', 'NameNode(master)', 'ResourceManager(master)']
                        var start = new Date()-0
                        var xdata = []
                        for(var i=7;i>=1;i--){
                            var x = new Date(start-24*3600*1000*i)
                            xdata.push((x.getMonth()+1)+"-"+x.getDate())
                        }
                        var series = []
                        for(let i=0;i<titles.length;i++){
                            var randData = []
                            for(let j=0;j<xdata.length;j++){
                                var y = parseInt(Math.random()*10, 0)
                                randData.push(y)
                            }
                            series.push({
                                name: titles[i],
                                data: randData,
                                type: 'line'
                            })
                        }
                        const option = {
                            title: {
                                text: '过去一周各模块异常个数统计'
                            },
                            tooltip: {
                                trigger: 'axis'
                            },
                            legend: {
                                data: titles,
                                orient: 'vertical',
                                right: 0,
                                bottom: '25%'
                            },
                            grid: {
                                left: 0,
                                right: '30%',
                                bottom: '5%',
                                containLabel: true
                            },
                            toolbox: {
                                feature: {
                                    saveAsImage: {},
                                    dataView: {
                                        show: true,
                                        readOnly: false
                                    },
                                }
                            },
                            xAxis: {
                                boundaryGap: false,
                                data: xdata
                            },
                            yAxis: {
                                type: 'value'
                            },
                            series: series
                        };

                        this.chart.setOption(option);
                    },
                }
            }
        }
    })
}

export default {
    install
}
