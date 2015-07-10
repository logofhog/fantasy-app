angular.module('fantasy_app')
  .directive('teamGraph', function(){
    return {
      scope: {
        items: '='
      },
      link: function(scope, elem, attrs) {

        console.log('making the graph')

        scope.$watch('items', function(newvalue) {
          console.log(scope.items);
          if (! scope.items || Object.keys(scope.items).length == 0) { return }
        }, true);

        $('#team_graph_container').highcharts({
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
          },
          title: {
            text: 'Browser market shares January, 2015 to May, 2015'
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                  enabled: true,
                  format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                  style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                  }
                }
            }
          },
          series: [{
            name: "Brands",
            colorByPoint: true,
            data: [{
              name: "Microsoft Internet Explorer",
              y: 6.33
            }, {
              name: "Chrome",
              y: 24.03
            }, {
              name: "Firefox",
                y: 10.38
            }, {
                name: "Safari",
                y: 4.77
            }, {
                name: "Opera",
                y: 0.91
            }, {
                name: "Proprietary or Undetectable",
                y: 0.2
            }]
          }]
        });
      }
    }
  }
);

