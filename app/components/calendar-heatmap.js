import Component from '@ember/component';
import moment from 'moment';

// Import the D3 packages we want to use
import { select } from 'd3-selection'
import { scaleLinear, scale } from 'd3-scale'
import { max } from 'd3-array';
import { time, timeDays, timeMonths } from 'd3-time';

export default Component.extend({

  init() {
    this._super()
    // polyfill for Array.find() method
    /* jshint ignore:start */
    if (!Array.prototype.find) {
      Array.prototype.find = function (predicate) {
        if (this === null) {
          throw new TypeError('Array.prototype.find called on null or undefined');
        }
        if (typeof predicate !== 'function') {
          throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
          value = list[i];
          if (predicate.call(thisArg, value, i, list)) {
            return value;
          }
        }
        return undefined;
      };
    }
    /* jshint ignore:end */
  },

  didReceiveAttrs() {
    var now = moment().endOf('day').toDate();
    var yearAgo = moment().startOf('day').subtract(1, 'year').toDate();
    var chartData = timeDays(yearAgo, now).map(function (dateElement) {
      return {
        date: dateElement,
        // count: (dateElement.getDay() !== 0 && dateElement.getDay() !== 6) ? Math.floor(Math.random() * 60) : Math.floor(Math.random() * 10)
        count: Math.floor(Math.random() * 50)
      };
    });
    var heatmap = this.calendarHeatmap()
      .data(chartData)
      .selector('.container')
      .tooltipEnabled(true)
      .colorRange(['#3a8354', '#e74141'])
      .onClick(function (data) {
        console.log('data', data);
      });
    heatmap();  // render the chart
  },

  calendarHeatmap: function() {
    // defaults
    var width = 800;
    var height = 200;
    var legendWidth = 150;
    var selector = 'body';
    var SQUARE_LENGTH = 11;
    var SQUARE_PADDING = 2;
    var MONTH_LABEL_PADDING = 6;
    var now = moment().endOf('day').toDate();
    var yearAgo = moment().startOf('day').subtract(1, 'year').toDate();
    var startDate = null;
    var counterMap= {};
    var data = [];
    var mmax = null;
    var colorRange = ['#e74141', '#3a8354'];
    var tooltipEnabled = true;
    var tooltipUnit = 'contribution';
    var legendEnabled = true;
    var onClick = null;
    var weekStart = 0; //0 for Sunday, 1 for Monday
    var locale = {
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      days: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      No: 'No',
      on: 'on',
      Less: 'Less',
      More: 'More'
    };
    // var v = Number(D3.version.split('.')[0]);
    var v = 4;

    // setters and getters
    chart.data = function (value) {
      if (!arguments.length) { return data; }
      data = value;

      counterMap= {};

      data.forEach(function (element, index) {
        var key = moment(element.date).format( 'YYYY-MM-DD' );
        var counter = counterMap[key] || 0;
        counterMap[key] = counter + element.count;
      });

      return chart;
    };

    chart.mmax = function (value) {
      if (!arguments.length) { return mmax; }
      mmax = value;
      return chart;
    };

    chart.selector = function (value) {
      if (!arguments.length) { return selector; }
      console.log(value);
      selector = value;
      return chart;
    };

    chart.startDate = function (value) {
      if (!arguments.length) { return startDate; }
      yearAgo = value;
      now = moment(value).endOf('day').add(1, 'year').toDate();
      return chart;
    };

    chart.colorRange = function (value) {
      if (!arguments.length) { return colorRange; }
      colorRange = value;
      return chart;
    };

    chart.tooltipEnabled = function (value) {
      if (!arguments.length) { return tooltipEnabled; }
      tooltipEnabled = value;
      return chart;
    };

    chart.tooltipUnit = function (value) {
      if (!arguments.length) { return tooltipUnit; }
      tooltipUnit = value;
      return chart;
    };

    chart.legendEnabled = function (value) {
      if (!arguments.length) { return legendEnabled; }
      legendEnabled = value;
      return chart;
    };

    chart.onClick = function (value) {
      if (!arguments.length) { return onClick(); }
      onClick = value;
      return chart;
    };

    chart.locale = function (value) {
      if (!arguments.length) { return locale; }
      locale = value;
      return chart;
    };

    function chart() {

      select(chart.selector()).selectAll('svg.calendar-heatmap').remove(); // remove the existing chart, if it exists

      var dateRange = ((time && time.days) || timeDays)(yearAgo, now); // generates an array of date objects within the specified range
      var monthRange = ((time && time.months) || timeMonths)(moment(yearAgo).startOf('month').toDate(), now); // it ignores the first month if the 1st date is after the start of the month
      var firstDate = moment(dateRange[0]);
      if (chart.data().length == 0) {
        mmax = 0;
      } else if (mmax === null) {
        mmax = max(chart.data(), function (d) { return d.count; }); // max data value
      }

      // color range
      // var color = ((scale && scale.linear) || scaleLinear)()
      //   .range(chart.colorRange())
      //   .domain([0, mmax]);
      function color(count) {
        return (count > 10) ? '#56d777' : '#dc5953';
      }

      var tooltip;
      var dayRects;

      drawChart();

      function drawChart() {
        var svg = select(chart.selector())
          .style('position', 'relative')
          .append('svg')
          .attr('width', width)
          .attr('class', 'calendar-heatmap')
          .attr('height', height)
          .style('padding', '36px');

        dayRects = svg.selectAll('.day-cell')
          .data(dateRange);  //  array of days for the last yr

        var enterSelection = dayRects.enter().append('rect')
          .attr('class', 'day-cell')
          .attr('width', SQUARE_LENGTH)
          .attr('height', SQUARE_LENGTH)
          .attr('fill', function(d) { return color(countForDate(d)); })
          .attr('x', function (d, i) {
            var cellDate = moment(d);
            var result = cellDate.week() - firstDate.week() + (firstDate.weeksInYear() * (cellDate.weekYear() - firstDate.weekYear()));
            return result * (SQUARE_LENGTH + SQUARE_PADDING);
          })
          .attr('y', function (d, i) {
            return MONTH_LABEL_PADDING + formatWeekday(d.getDay()) * (SQUARE_LENGTH + SQUARE_PADDING);
          });

        if (typeof onClick === 'function') {
          (v === 3 ? enterSelection : enterSelection.merge(dayRects)).on('click', function(d) {
            var count = countForDate(d);
            onClick({ date: d, count: count});
          });
        }

        if (chart.tooltipEnabled()) {
          (v === 3 ? enterSelection : enterSelection.merge(dayRects)).on('mouseover', function(d, i) {
            tooltip = select(chart.selector())
              .append('div')
              .attr('class', 'day-cell-tooltip')
              .html(tooltipHTMLForDate(d))
              .style('left', function () { return Math.floor(i / 7) * SQUARE_LENGTH + 'px'; })
              .style('top', function () {
                return formatWeekday(d.getDay()) * (SQUARE_LENGTH + SQUARE_PADDING) + MONTH_LABEL_PADDING * 2 + 'px';
              });
          })
            .on('mouseout', function (d, i) {
              tooltip.remove();
            });
        }

        if (chart.legendEnabled()) {
          var colorRange = [color(0)];
          for (var i = 3; i > 0; i--) {
            colorRange.push(color(mmax / i));
          }

          var legendGroup = svg.append('g');
          legendGroup.selectAll('.calendar-heatmap-legend')
            .data(colorRange)
            .enter()
            .append('rect')
            .attr('class', 'calendar-heatmap-legend')
            .attr('width', SQUARE_LENGTH)
            .attr('height', SQUARE_LENGTH)
            .attr('x', function (d, i) { return (width - legendWidth) + (i + 1) * 13; })
            .attr('y', height + SQUARE_PADDING)
            .attr('fill', function (d) { return d; });

          legendGroup.append('text')
            .attr('class', 'calendar-heatmap-legend-text calendar-heatmap-legend-text-less')
            .attr('x', width - legendWidth - 13)
            .attr('y', height + SQUARE_LENGTH)
            .text(locale.Less);

          legendGroup.append('text')
            .attr('class', 'calendar-heatmap-legend-text calendar-heatmap-legend-text-more')
            .attr('x', (width - legendWidth + SQUARE_PADDING) + (colorRange.length + 1) * 13)
            .attr('y', height + SQUARE_LENGTH)
            .text(locale.More);
        }

        dayRects.exit().remove();
        var monthLabels = svg.selectAll('.month')
          .data(monthRange)
          .enter().append('text')
          .attr('class', 'month-name')
          .text(function (d) {
            return locale.months[d.getMonth()];
          })
          .attr('x', function (d, i) {
            var matchIndex = 0;
            dateRange.find(function (element, index) {
              matchIndex = index;
              return moment(d).isSame(element, 'month') && moment(d).isSame(element, 'year');
            });

            return Math.floor(matchIndex / 7) * (SQUARE_LENGTH + SQUARE_PADDING);
          })
          .attr('y', 0);  // fix these to the top

        locale.days.forEach(function (day, index) {
          index = formatWeekday(index);
          if (index % 2) {
            svg.append('text')
              .attr('class', 'day-initial')
              .attr('transform', 'translate(-8,' + (SQUARE_LENGTH + SQUARE_PADDING) * (index + 1) + ')')
              .style('text-anchor', 'middle')
              .attr('dy', '2')
              .text(day);
          }
        });
      }

      function pluralizedTooltipUnit (count) {
        if ('string' === typeof tooltipUnit) {
          return (tooltipUnit + (count === 1 ? '' : 's'));
        }
        for (var i in tooltipUnit) {
          var _rule = tooltipUnit[i];
          var _min = _rule.min;
          var _max = _rule.max || _rule.min;
          _max = _max === 'Infinity' ? Infinity : _max;
          if (count >= _min && count <= _max) {
            return _rule.unit;
          }
        }
      }

      function tooltipHTMLForDate(d) {
        var dateStr = moment(d).format('ddd, MMM Do YYYY');
        var count = countForDate(d);
        // return '<span><strong>' + (count ? count : locale.No) + ' ' + pluralizedTooltipUnit(count) + '</strong> ' + locale.on + ' ' + dateStr + '</span>';
        return '<span><strong>' + (count ? count : locale.No) + ' ' + '</strong> ' + locale.on + ' ' + dateStr + '</span>';
      }

      function countForDate(d) {
        var key= moment(d).format( 'YYYY-MM-DD' );
        return counterMap[key] || 0;
      }

      function formatWeekday(weekDay) {
        if (weekStart === 1) {
          if (weekDay === 0) {
            return 6;
          } else {
            return weekDay - 1;
          }
        }
        return weekDay;
      }

      var daysOfChart = chart.data().map(function (day) {
        return day.date.toDateString();
      });

    }

    return chart;
  }

});
