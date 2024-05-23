import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import { getFormatedDate } from 'react-native-modern-datepicker';
import colors from '@/utils/colors';
import { apiGetCategory, apiPutEditMovie } from '@/api/admin';
import { useAppSelector } from '@/redux/hooks';

const Categori = ({ data, onPress }: { data: any; onPress: () => void }) => {
  const [choose, setChoose] = useState(false);

  const handleSubmit = () => {
    setChoose(!choose);
    onPress();
  };

  return (
    <View
      style={{
        borderColor: choose ? colors.primary : colors.whiteText,
        backgroundColor: choose ? colors.primary : '#1C1C1C',
        borderWidth: 1,
        flex: 1,
        margin: 5,
        borderRadius: 18,
      }}
    >
      <TouchableOpacity onPress={handleSubmit}>
        <Text
          style={{
            color: choose ? colors.black : colors.whiteText,
            textAlign: 'center',
            fontSize: 18,
          }}
        >
          {data.Category_Name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
function EditMovie() {
  const { token } = useAppSelector((state) => state.authState);
  const [movieId, setMovieId] = useState('');
  const [movieName, setMovieName] = useState('');
  const [duration, setDuration] = useState<number>(0);
  const [censorship, setCensorship] = useState<number>(0);
  const [language, setLanguage] = useState('');
  const [poster, setPoster] = useState('');
  const [description, setDescription] = useState('');
  const [release, setRelease] = useState('');
  const [openRelease, setOpenRelease] = useState(false);

  //List category
  const [listCategory, setListCategory] = useState<Array<any>>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataRes = await apiGetCategory();
        if (dataRes.status) {
          const newData = dataRes.data.map(
            (item: { Category_Id: any; Category_Name: any }) => ({
              Category_Id: item.Category_Id,
              Category_Name: item.Category_Name,
            }),
          );
          // Set listMovie với dữ liệu mới

          setListCategory(newData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // maxx

  const [expiration, setExpiration] = useState('');
  const [openExpiration, setOpenExpiration] = useState(false);

  // Min date
  const handleChangeRelease = (newDate: any) => {
    setRelease(newDate);
  };
  const handleConfirmRelease = () => {
    setOpenRelease(!openRelease);
    console.log('release: ', release);
  };

  // Expiration

  const handleChangeExpiration = (newDate: any) => {
    setExpiration(newDate);
  };
  const handleConfirmExpiration = () => {
    setOpenExpiration(!openExpiration);
    console.log('Expiration: ', expiration);
  };

  // Category
  const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
  const handleCategoryPress = (category: any) => {
    const isSelected = selectedCategories.some(
      (item) => item.Category_Id === category.Category_Id,
    );
    if (isSelected) {
      setSelectedCategories(
        selectedCategories.filter(
          (item) => item.Category_Id !== category.Category_Id,
        ),
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  let Category_Id: any[] = [];
  const handleSubmit = async () => {
    if (selectedCategories.length > 0) {
      const sortedSelectedCategories = selectedCategories.sort(
        (a, b) => a.Category_Id - b.Category_Id,
      );
      Category_Id = sortedSelectedCategories.map(
        (category) => category.Category_Id,
      );
      console.log('Selected Categories:', Category_Id);
    } else {
      console.log('Selected Categories: []');
    }
    const dataRes = await apiPutEditMovie({
      movieId: movieId,
      movieName: movieName,
      duration: duration,
      censorship: censorship,
      language: language,
      release: release,
      expiration: expiration,
      poster: poster,
      description: description,
      categoryId: Category_Id,
      token,
    });
    console.log(dataRes);

    if (dataRes.status) {
      console.log('1', dataRes.msg);
    } else {
      console.log('0', dataRes.error);
    }
  };

  return (
    <View style={{ backgroundColor: colors.black, flex: 1 }}>
      {/* id, name */}
      <View style={{ flexDirection: 'row', gap: 20, marginTop: 10 }}>
        <View
          style={{
            height: 50,
            borderColor: colors.whiteText,
            borderWidth: 1,
            flex: 2,
          }}
        >
          <TextInput
            style={{ fontSize: 18, color: colors.whiteText }}
            placeholder="Movie Id"
            placeholderTextColor={colors.grayText}
            onChangeText={(text: string) => {
              setMovieId(text);
            }}
          />
        </View>
        <View
          style={{
            height: 50,
            borderColor: colors.whiteText,
            borderWidth: 1,
            flex: 5,
          }}
        >
          <TextInput
            style={{ fontSize: 18, color: colors.whiteText }}
            placeholder="Movie Name"
            placeholderTextColor={colors.grayText}
            onChangeText={(text: string) => {
              setMovieName(text);
            }}
          />
        </View>
      </View>
      {/* dur, censo */}
      <View style={{ flexDirection: 'row', gap: 20, marginTop: 20 }}>
        <View
          style={{
            flex: 2,
            height: 50,
            borderColor: colors.whiteText,
            borderWidth: 1,
          }}
        >
          <TextInput
            style={{ color: colors.whiteText, fontSize: 18 }}
            placeholder="Duration"
            placeholderTextColor={colors.grayText}
            keyboardType="phone-pad"
            onChangeText={(text: string) => {
              setDuration(Number(text));
            }}
          />
        </View>
        <View style={{ flexDirection: 'row', flex: 5, gap: 20 }}>
          <View
            style={{
              flex: 1,
              height: 50,
              borderColor: colors.whiteText,
              borderWidth: 1,
            }}
          >
            <TextInput
              style={{ color: colors.whiteText, fontSize: 18 }}
              placeholder="Censorship"
              placeholderTextColor={colors.grayText}
              keyboardType="phone-pad"
              onChangeText={(text: string) => {
                setCensorship(Number(text));
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              height: 50,
              borderColor: colors.whiteText,
              borderWidth: 1,
            }}
          >
            <TextInput
              style={{ color: colors.whiteText, fontSize: 18 }}
              placeholder="Language"
              placeholderTextColor={colors.grayText}
              onChangeText={(text: string) => {
                setLanguage(text);
              }}
            />
          </View>
        </View>
      </View>
      {/* Release, Expiration */}
      <View style={{ marginTop: 20, flexDirection: 'row', gap: 20 }}>
        <TouchableOpacity
          style={{
            borderColor: colors.whiteText,
            borderWidth: 1,
            height: 50,
            justifyContent: 'center',
            flex: 1,
          }}
          onPress={() => setOpenRelease(!openRelease)}
        >
          <Text
            style={{
              color: !!release.length ? colors.whiteText : colors.grayText,
              fontSize: 18,
              marginLeft: 4,
            }}
          >
            {!!release.length ? release : 'Release'}
          </Text>
        </TouchableOpacity>
        {!!release.length && (
          <TouchableOpacity
            style={{
              borderColor: colors.whiteText,
              borderWidth: 1,
              height: 50,
              justifyContent: 'center',
              flex: 1,
            }}
            onPress={() => setOpenExpiration(!openExpiration)}
          >
            <Text
              style={{
                color: !!expiration.length ? colors.whiteText : colors.grayText,
                fontSize: 18,
                marginLeft: 4,
              }}
            >
              {!!expiration.length ? expiration : 'Expiration'}
            </Text>
          </TouchableOpacity>
        )}
        <ModalDate
          open={openRelease}
          min={getFormatedDate(new Date(), 'YYYY/MM/DD')}
          handleChange={handleChangeRelease}
          handleComfirn={handleConfirmRelease}
        ></ModalDate>
        <ModalDate
          open={openExpiration}
          min={release}
          handleChange={handleChangeExpiration}
          handleComfirn={handleConfirmExpiration}
        ></ModalDate>
      </View>
      {/* Poster */}
      <View
        style={{ borderWidth: 1, borderColor: colors.whiteText, marginTop: 20 }}
      >
        <TextInput
          style={{ color: colors.whiteText, fontSize: 18 }}
          placeholder="Poster"
          placeholderTextColor={colors.grayText}
          onChangeText={(text: string) => {
            setPoster(text);
          }}
        ></TextInput>
      </View>
      <View
        style={{ borderWidth: 1, borderColor: colors.whiteText, marginTop: 20 }}
      >
        <TextInput
          style={{
            color: colors.whiteText,
            fontSize: 18,
            textAlignVertical: 'top',
          }}
          placeholder="Description"
          placeholderTextColor={colors.grayText}
          multiline={true}
          numberOfLines={6}
          onChangeText={(text: string) => {
            setDescription(text);
          }}
        ></TextInput>
      </View>
      {/* Flatlist */}
      <FlatList
        style={{ marginTop: 20 }}
        data={listCategory}
        renderItem={({ item }) => (
          <Categori data={item} onPress={() => handleCategoryPress(item)} />
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
      ></FlatList>
      <StatusBar backgroundColor={colors.black} barStyle="light-content" />
      <View
        style={{
          borderColor: colors.primary,
          backgroundColor: colors.primary,
          borderWidth: 1,
          height: 50,
          justifyContent: 'center',
          borderRadius: 64,
        }}
      >
        <TouchableOpacity onPress={handleSubmit}>
          <Text
            style={{
              color: colors.black,
              fontSize: 20,
              fontWeight: '600',
              textAlign: 'center',
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function ModalDate({
  open,
  min,
  handleChange,
  handleComfirn,
}: {
  open: boolean;
  min?: any;
  handleChange(newDate: any): void;
  handleComfirn(): void;
}) {
  return (
    <Modal
      visible={open}
      animationType="slide"
      transparent={true}
      style={{ alignSelf: 'flex-end' }}
    >
      <View
        style={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          flex: 1,
          gap: 10,
        }}
      >
        <DatePicker
          style={{ alignSelf: 'flex-start' }}
          mode="calendar"
          minimumDate={min}
          onDateChange={handleChange}
        />
        <TouchableOpacity
          style={{
            borderRadius: 30,
            borderColor: 'white',
            backgroundColor: colors.primary,
            paddingHorizontal: 50,
            paddingVertical: 10,
          }}
          onPress={handleComfirn}
        >
          <Text style={{ color: colors.black, fontSize: 30 }}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

export default EditMovie;
