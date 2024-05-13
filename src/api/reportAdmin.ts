import axiosClient from '../utils/axiosClient';
import { LOCALHOST, PORT } from '../../port';
import { getWithToken, postWithToken } from '@/utils';
const ReportAdmin_URL = `http://${LOCALHOST}:${PORT}/report`;

// Quyet test API
// Report by time  -- Done
export const apiGetReportByTime = async (args: {
  token: string;
  minDate: any;
  maxDate: any;
}) => {
  const token = args.token;
  const url = `${ReportAdmin_URL}/report-by-time`;
  const form = JSON.stringify({
    minDate: args.minDate,
    maxDate: args.maxDate,
  });
  return postWithToken({ url, data: form, token });
};

export const apiGetReportByMovie = async (args: { token: string }) => {
  const token = args.token;
  const url = `${ReportAdmin_URL}/report-by-movie`;
  return getWithToken({ url, token });
};

export const apiGetReportByQuarter = async (args: {
  token: string;
  year: number;
}) => {
  const url = `${ReportAdmin_URL}/report-by-quarter`;
  const form = JSON.stringify({
    year: args.year,
  });
  const { token } = args;
  return postWithToken({ url, data: form, token });
};
