angular.module('fantasy_app')
  .directive('stackedBarChart', function(playerStatUtils, $compile){
    return {
      scope: {
        options: '='
        },
      template: "<div id='container'></div>",
      link: function(scope, elem, attrs) {
        scope.$watch('options', function(newvalue) {
          makeChart();
        });

        function makeChart() {
          if (! scope.options) {
            return
          }

          var options = scope.options;

          var chart = new Highcharts.Chart({
            chart: {
              renderTo: 'container',
              type: 'bar',
              height: '700',
              events: {
                load: stickHeader(scope)
              }
            },
            title: {text: options.title_text},
            xAxis: { categories: options.categories},
            legend: {
              reversed: true
            },
            plotOptions: {
              series: {
                stacking: 'normal',
                pointPadding: 0,
                groupPadding: 0.1
              }
            },
            series: options.series,
            tooltip: options.tooltip
          }); //end HighChart.Chart
        }//end makeChart
      }
    }

    function stickHeader(scope){
      var fhHeight = 0;
      var ft = $('.flexitr');
      var width = $('.flexitable').parent().width();
      var win = $(window);
      var header_height = 68;
      var children = $('.flexitr').children().clone();
      var child_widths;
      var getWidths = function() {
        child_widths = $.map($('.flexitr').children(), function(c, i) {
          var a = window.getComputedStyle(c).width
          return a
        });
      }

      getWidths();

      $compile(children)(scope.$parent);
      $('.flexitrcopy').empty();
      children.appendTo($('.flexitrcopy'));
      var setWidths = function(){
        $.each($('.flexitrcopy').children(), function(i, e) {
          angular.element(e).css('width', child_widths[i]);
        });
      }

      setWidths();
      $('.flexitrcopy').addClass('sticky');
      $('.flexitrcopy').css('width', width);

      var widths_updated = false;

      $(window).scroll(function() {

        if (!widths_updated) {
          var tf = window.getComputedStyle($('.flexitr').children()[0]).width;
          var ts = window.getComputedStyle($('.flexitrcopy').children()[0]).width;
          if (tf != ts) {
            widths_updated = true;
            getWidths();
            setWidths();
          }
        }

        var ftr = $('.flexitr');

        if(fhHeight==0 && (ft.offset().top != 0) && (ft.offset().top - win.scrollTop() - header_height) <=  0) {
          fhHeight = ftr.height();
          $('.flexitrcopy').show();
        }
        else if(fhHeight!=0 && fhHeight!=-1 &&
          (ft.offset().top - win.scrollTop() - header_height > 0))  {
            fhHeight = 0;
          $('.flexitrcopy').hide();
        }
      });
    }
  });


            //  keeping this for advanced stat functionality
//            series: [
//              {name: 'Passing Yards',
//               data: getData('passing_yds').map(function(p) {return p/25})
//              },
//              {name: 'Passing TDs',
//               data: getData('passing_tds').map(function(p) {return p*4})
//              },
//              {name: 'Interceptions',
//               data: getData('passing_int').map(function(p) {return p*-1})
//              },
//              {name: 'Rushing Yards',
//               data: getData('rushing_yds').map(function(p) {return p/10})
//              },
//              {name: 'Rushing TDs',
//               data: getData('rushing_tds').map(function(p) {return p*6})
//              },
//              {name: 'Receiving TDs',
//               data: getData('receiving_tds').map(function(p) {return p*6})
//              },
//              {name: 'Receiving Yards',
//               data: getData('receiving_yds').map(function(p) {return p/10})
//              },
//              {name: 'Receptions ',
//               data: getData('receiving_rec').map(function(p) {return p/2})
//              }
//            ]


//          function getData(stat) {
//            var data = scope.items.map(function(player) { return parseInt(player[stat])});
//            return data
//          }

        // Apply the theme
//        Highcharts.setOptions(Highcharts.theme);
