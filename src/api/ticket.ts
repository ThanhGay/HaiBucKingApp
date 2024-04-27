import axiosClient from '../utils/axiosClient';
import { LOCALHOST, PORT } from '../../port';
import { getWithToken, postWithToken } from '@/utils';

const Ticket_URL = `http://${LOCALHOST}:${PORT}/ticket`;

// Tất cả vé của tôi
export const apiGetListTicket = (args: {
  token: string;
}): Promise<{ status: boolean; data: Array<any>; msg: string }> => {
  const { token } = args;
  const url = `${Ticket_URL}/my-tickets`;
  return getWithToken({ url, token });
};

// tạo id hóa đơn
export const apiCreateInvoice = (args: {
  token: string;
}): Promise<{ status: string; data: Array<any>; msg: string }> => {
  const { token } = args;
  const url = `${Ticket_URL}/create-invoice`;
  return getWithToken({ url, token });
};

// đặt vé
export const apiBookTicket = (args: {
  Invoice_Id: string;
  StartTime: string;
  Seat_Id: Array<string>;
  Room_Id: string;
  token: string;
}) => {
  const { token } = args;
  const url = `${Ticket_URL}/book-tickets`;
  const form = JSON.stringify({
    Invoice_Id: args.Invoice_Id,
    StartTime: args.StartTime,
    Seat_Id: args.Seat_Id,
    Room_Id: args.Room_Id,
  });
  return postWithToken({ url, data: form, token });
};

// hủy đặt vé
export const apiCancelBooking = (args: {
  token: string;
  invoiceId: string;
}): Promise<{ status: boolean; data: Array<any>; msg: string }> => {
  const { token, invoiceId } = args;
  const url = `${Ticket_URL}/delete-ticket=${invoiceId}`;
  return getWithToken({ url, token });
};

// hủy hóa đơn
export const apiCancelInvoice = (args: {
  token: string;
  invoiceId: string;
}): Promise<{ status: boolean; data: Array<any>; msg: string }> => {
  const { token, invoiceId } = args;
  const url = `${Ticket_URL}/delete-invoice=${invoiceId}`;
  return getWithToken({ url, token });
};

// lấy giá tiền của vé
export const apiGetInvoiceMoney = (args: {
  token: string;
  invoiceId: string;
}): Promise<{ status: boolean; data: Array<any>; msg: string }> => {
  const { token, invoiceId } = args;
  const url = `${Ticket_URL}/detail-ticket=${invoiceId}`;
  return getWithToken({ url, token });
};

// hoàn tất đặt vé (lưu vào database)
export const apiSaveInvoice = (args: {
  token: string;
  invoiceId: number;
  movieName: string;
  duration: number;
  category: string;
  startTIme: string;
  roomId: string;
  seatId: string;
  price: number;
}): Promise<{ status: boolean; data: Array<any>; msg: string }> => {
  const { token } = args;
  const form = JSON.stringify({
    Invoice_Id: args.invoiceId,
    Movie_Name: args.movieName,
    Duration: args.duration,
    CategoryList: args.category,
    StartTime: args.startTIme,
    Room_Id: args.roomId,
    Seat_Id: args.seatId,
    Price: args.price,
  });
  const url = `${Ticket_URL}/save-invoice`;
  return postWithToken({ url, data: form, token });
};
