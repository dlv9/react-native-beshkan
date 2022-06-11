import React from 'react';
import { View, Text, ScrollView, TextInput, TouchableNativeFeedback, useColorScheme } from 'react-native';
import { PreviewCart } from '../../components';
import { GetPrimaryColor } from '../../theme/colors';

import { generateCoverUrl } from '../../utils';
import { useIntro } from './hooks';


export const IntroScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';


  const {
    url,
    videoInfo,
    setUrl,
    getInfo,
    download,
  } = useIntro();

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic" style={{ backgroundColor: isDarkMode ? GetPrimaryColor('main') : '#fff' }}>

      <View style={{ alignItems: 'center', paddingHorizontal: 20 }}>
        <TextInput style={{ width: '80%', color: '#ffff', borderColor: GetPrimaryColor('dark'), borderWidth: 1, padding: 5 }} value={url} onChangeText={setUrl} />

        <TouchableNativeFeedback onPress={getInfo}>
          <Text>Get Info</Text>
        </TouchableNativeFeedback>
      </View>
      {!!videoInfo && <View style={{ alignItems: 'center' }}>
        <PreviewCart
          imageUrl={generateCoverUrl(videoInfo.directory)}
          title={videoInfo.title}
          duration={''}
          onDownload={download} />
      </View>}

    </ScrollView>
  );
};
