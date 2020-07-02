import moment, { duration } from 'moment'

var moments = require('moment');
require("moment/min/locales.min");
moment.locale('en');

export function _formatDate(data: any) {
    return moments.unix(data).format('h:mm a')
}

export function _formatShortDate(data: any){
return moments.unix(data).format('Do MMMM YYYY')

}

export function toDateKey(date: Date) {
    return Number(moment(date).format('YYYYMMDD'))
}
export function _formatDateTime(data: any) {
    return moment.unix(data).fromNow()
}

export function _formatDateFromDate(date: Date) {
    const dataTwo = Number(moment(date).format('X'))
    return moment.unix(dataTwo).fromNow()
}