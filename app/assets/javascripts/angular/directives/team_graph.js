angular.module('fantasy_app')
  .directive('teamGraph', function(stats_names){
    return {
      scope: {
        items: '=',
        stat:  '='
      },
      link: function(scope, elem, attrs) {

        scope.$watch('items', function(newvalue) {
          makeGraph(scope.items);
          if (! scope.items || Object.keys(scope.items).length == 0) { return }
        }, true);

        function series(data) {
          var series = []
          data.map(function(d) {
            var temp_obj = {};
            if(d[scope.stat] > 0) {
              temp_obj.name = d.full_name;
              temp_obj.y = parseInt(d[scope.stat]);
              series.push(temp_obj);
            }
          });
          return series.sort(function(a, b) { return a.y - b.y });
        }

        function makeGraph(data) {
          $('#team_graph_container_' + scope.stat).highcharts({
            chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              type: 'pie'
            },
            title: {
              text: stats_names[scope.stat]
            },
            tooltip: {
              pointFormat: '{series.name}: <b>{point.y} {point.percentage:.1f}%</b>'
            },
            plotOptions: {
              pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                  enabled: true,
                  formatter: function(){
                    if(this.point.percentage < 1) {return null;}
                    return '<b>'+this.point.name+'</b>:'+this.point.y+' '+Math.round(this.point.percentage*10)/10+'%'
                  },
                  style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                  }
                }
              }
            },
            series: [{
              name: stats_names[scope.stat],
              colorByPoint: true,
              data: series(data)
            }]
          });
        } //end makeGraph()
      } //end link
    } //end return val
  } //end directive
);

