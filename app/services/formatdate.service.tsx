import moment from 'moment'

var moments = require('moment');
require("moment/min/locales.min");
moment.locale('en');

export function _formatDate(data:any) {
    return moments(data).format('MMMM Do, h:mm a')
}



export function toDateKey(date: Date) {
    return Number(moment(date).format('YYYYMMDD'))
  }