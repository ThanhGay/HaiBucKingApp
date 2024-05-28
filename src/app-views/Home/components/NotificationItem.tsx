import { View, Text } from 'react-native'
import React from 'react'
import colors from '@/utils/colors'
import { formatDate } from '@/utils/hooks'

export default function NotificationItem({data}: {data: any}) {
  return (
    <View style= {{flex: 1, borderBottomWidth: 1, borderColor: colors.white,paddingVertical: 12}}>
            <Text style={{color: colors.whiteText, fontSize: 20}}>
        Đừng quên bạn có lịch xem{' '}
        <Text style={{color: colors.primary, fontSize: 20, fontWeight: '600'}}>{data.Movie_Name}</Text>{' '}
        vào lúc <Text style={{color: colors.primary, fontSize: 20, fontWeight: '600'}}>{data.Time}</Text>{' '}
        ngày <Text style={{color: colors.primary, fontSize: 20, fontWeight: '600'}}>{formatDate(data.Date)}</Text>
      </Text>
    </View>
  )
}