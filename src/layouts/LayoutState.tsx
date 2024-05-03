import React, { useEffect } from 'react';
import { View } from 'react-native';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  getListComingSoon,
  getListNotification,
  getListNowPlaying,
  getListTicket,
} from '@/redux/features/userSlice';

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
    }
  }, [token]);

  return <View style={{ flex: 1 }}>{children}</View>;
};

export default LayoutState;
