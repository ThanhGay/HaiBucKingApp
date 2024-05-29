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

export const apiGetTicketNotUse = (args: {
  token: string;
}): Promise<{ status: boolean; data: Array<any>; msg: string }> => {
  const { token } = args;
  const url = `${Ticket_URL}/my-tickets-not-use`;
  return getWithToken({ url, token });
};

// tạo id hóa đơn
// export const apiCreateInvoice = (args: {
//   token: string;
// }): Promise<{ status: string; data: Array<any>; msg: string }> => {
//   const { token } = args;
//   const url = `${Ticket_URL}/create-invoice`;
//   return postWithToken({ url, token });
// };

// đặt vé
// export const apiBookTicket = (args: {
//   invoiceId: number;
//   startTime: string;
//   seats: Array<string>;
//   roomId: string;
//   token: string;
// }) => {
//   const { token } = args;
//   const url = `${Ticket_URL}/book-tickets`;
//   const form = JSON.stringify({
//     Invoice_Id: args.invoiceId,
//     StartTime: args.startTime,
//     Seat_Id: args.seats,
//     Room_Id: args.roomId,
//   });
//   return postWithToken({ url, data: form, token });
// };

// hủy đặt vé
// export const apiCancelBooking = (args: {
//   token: string;
//   invoiceId: number;
// }): Promise<{ status: boolean; data: Array<any>; msg: string }> => {
//   const { token, invoiceId } = args;
//   const url = `${Ticket_URL}/delete-ticket=${invoiceId}`;
//   return getWithToken({ url, token });
// };

// hủy hóa đơn
// export const apiCancelInvoice = (args: {
//   token: string;
//   invoiceId: number;
// }): Promise<{ status: boolean; data: Array<any>; msg: string }> => {
//   const { token, invoiceId } = args;
//   const url = `${Ticket_URL}/delete-invoice=${invoiceId}`;
//   return getWithToken({ url, token });
// };

// lấy giá tiền của vé
export const apiGetInvoiceMoney = (args: {
  token: string;
  invoiceId: number;
}): Promise<{ status: boolean; data: Array<any>; msg: string }> => {
  const { token, invoiceId } = args;
  const url = `${Ticket_URL}/detail-ticket=${invoiceId}`;
  return getWithToken({ url, token });
};

// hoàn tất đặt vé (lưu vào database)
export const apiSaveInvoice = (args: {
  token: string;
  invoiceId: number;
  invoiceDate: string;
  movieName: string;
  duration: number;
  category: string;
  poster: string;
  startTime: string;
  roomId: string;
  seatId: string;
  price: number;
}): Promise<{ status: boolean; data: Array<any>; msg: string }> => {
  const { token } = args;
  const form = JSON.stringify({
    Invoice_Id: args.invoiceId,
    InvoiceDate: args.invoiceDate,
    Movie_Name: args.movieName,
    Duration: args.duration,
    CategoryList: args.category,
    Poster: args.poster,
    StartTime: args.startTime,
    Room_Id: args.roomId,
    Seat_Id: args.seatId,
    Price: args.price,
  });
  const url = `${Ticket_URL}/save-invoice`;
  return postWithToken({ url, data: form, token });
};

// lấy danh sách ghế đã đặt theo thời gian lịch chiếu
export const apiGetReservedSeat = async (args: {
  startTime: string;
}): Promise<{ status: boolean; data: Array<any>; msg: string }> => {
  const url = `${Ticket_URL}/seats`;
  const form = JSON.stringify({
    StartTime: args.startTime,
  });
  const data = axiosClient
    .post(url, form)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log('error in fetch api get reserved seat', error);
    });

  return data ?? {};
};

//
export const apiGetNotification = async (args: {
  token: string;
}): Promise<{ status: boolean; data: Array<any>; msg: string }> => {
  const url = `${Ticket_URL}/notification`;
  return getWithToken({ url, token: args.token });
};

export const apiCreateTransaction = async (args: {
  token: string;
  startTime: string;
  seatId: Array<any>;
  roomId: string;
}): Promise<{ status: boolean; data: any; msg: string }> => {
  const { startTime, seatId, roomId, token } = args;
  const url = `${Ticket_URL}/transaction-invoice`;
  const form = JSON.stringify({
    StartTime: startTime,
    Seat_Id: seatId,
    Room_Id: roomId,
  });
  return postWithToken({ url, data: form, token });
};

// decision
// 0 - rollback , 1 - commit
export const apiActiveTransaction = async (args: {
  decision: number;
}): Promise<{ status: boolean; data: string; msg: string }> => {
  const url = `${Ticket_URL}/active-transaction`;
  const form = JSON.stringify({
    decision: args.decision,
  });

  const data = axiosClient
    .post(url, form)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log('error in fetch api active transaction', error);
    });

  return data ?? {};
};
