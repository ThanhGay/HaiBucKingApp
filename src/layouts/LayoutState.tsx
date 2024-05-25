import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  getListComingSoon,
  getListNotification,
  getListNowPlaying,
  getListTicket,
} from '@/redux/features/userSlice';
import {
  getTokenInStorage,
  getUserInStorage,
} from '@/redux/features/authSlice';

interface LayoutStateProps {
  children: React.ReactNode;
}

const LayoutState: React.FC<LayoutStateProps> = ({ children }) => {
  const { token } = useAppSelector((state) => state.authState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getListNowPlaying());
      dispatch(getListComingSoon());
      dispatch(getListNotification({ token }));
      dispatch(getListTicket({ token }));
    } else {
      dispatch(getUserInStorage());
      dispatch(getTokenInStorage());
    }
  }, [token]);

  return <View style={{ flex: 1 }}>{children}</View>;
};

export default LayoutState;
