(function () {

  var global = global || this || self || window;
  var nx = global.nx || require('next-js-core2');
  var _ = nx.compare ||  require('next-compare');
  var dateFormat = require('dateformat');
  var REPLACE_RE = /-/g;
  var DATE_DASH = '/';
  var STRING = 'string';
  var DEFAULT_FORMAT = 'yyyy-mm-dd HH:MM:ss';
  var INVALID_DATE = 'Invalid Date';


  /**
   * dateStr.replace(/\s/g,'T').replace(/\//g,'-');
   * http://www.cnblogs.com/Fooo/p/5284421.html
   * http://blog.csdn.net/sinat_31257007/article/details/49208789
   * @thanks to:
   * http://blog.stevenlevithan.com/archives/date-time-format
   * https://github.com/felixge/node-dateformat
   * bug:
   * safari invalid date
   */

  var NxDate = nx.declare('nx.Date', {
    statics:{
      now: function(){
        return Date.now() || +(new Date());
      },
      create: function(inTarget){
        switch(true){
          case inTarget instanceof Date:
            return inTarget;
          case typeof inTarget === STRING:
            var date = new Date(inTarget);
            return date.toString() === INVALID_DATE
              ? new Date(inTarget.replace(REPLACE_RE, DATE_DASH))
              : date;
          case inTarget == null:
            return new Date();
          default:
            return new Date(inTarget);
        }
      },
      compare: function(inTarget1, inTarget2){
        var timestamp1 = +this.create(inTarget1);
        var timestamp2 = +this.create(inTarget2);
        return nx.compare(timestamp1, timestamp2);
      },
      format: function(inTarget,inFmt){
        var target = this.create(inTarget);
        return dateFormat(target,inFmt || DEFAULT_FORMAT);
      }
    }
  });


  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxDate;
  }

}());
