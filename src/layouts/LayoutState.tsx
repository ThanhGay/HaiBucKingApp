import React, { useEffect } from 'react';
import { View } from 'react-native';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  getTokenInStorage,
  getUserInStorage,
} from '@/redux/features/authSlice';
import {
  getListTicket,
  getListTicketNotUse,
} from '@/redux/features/ticketSlice';
import { getListNotification } from '@/redux/features/userSlice';
import { getComingSoon, getNowPlaying } from '@/redux/features/movieSlice';

interface LayoutStateProps {
  children: React.ReactNode;
}

const LayoutState: React.FC<LayoutStateProps> = ({ children }) => {
  const { token } = useAppSelector((state) => state.authState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getNowPlaying());
      dispatch(getComingSoon());
      dispatch(getListNotification({ token }));
      dispatch(getListTicket({ token }));
      dispatch(getListTicketNotUse({ token }));
    } else {
      dispatch(getUserInStorage());
      dispatch(getTokenInStorage());
    }
  }, [token]);

  return <View style={{ flex: 1 }}>{children}</View>;
};

export default LayoutState;
