import axiosClient from '../utils/axiosClient';
import { LOCALHOST, PORT } from '../../port';
import { postWithToken } from '@/utils';
const ReportAdmin_URL = `http://${LOCALHOST}:${PORT}/report`;

// Quyet test API
// Report by time  -- Done 
export const apiGetReportByTime = async (args: {
    minDate: any;
    maxDate: any;
  })=> {
    const url = `${ReportAdmin_URL}/report-by-time`
    const form = JSON.stringify({
        minDate :args.minDate,
        maxDate : args.maxDate
    })
    const data = axiosClient.post(url, form).then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log('error in fetch api showtimes', error);
      });
      return data ?? {};

  };

export const apiGetReportByMovie = async() => {
    const url = `${ReportAdmin_URL}/report-by-movie`
    const data = axiosClient.get(url).then((response) => {
        return response.data
    }).catch((error) => {
        console.log('error in fetch api showtimes', error);
        
    });
    return data ?? {}

}
  
export const apiGetReportByQuarter = async(args: {
    year: number,
    token: string
}) => {
    const url = `${ReportAdmin_URL}/report-by-quarter`
    const form = JSON.stringify({
        year: args.year

})  
    const {token} = args
    return postWithToken({url, data: form, token})
}
