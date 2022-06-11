import { View, Text, useColorScheme, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { GetPrimaryColor } from '../../theme/colors';
import { usePlayer } from '../../context';

export const Files = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const { files, play } = usePlayer()

    console.log(files);
    

    return (
        <View style={{ flex: 1, backgroundColor: isDarkMode ? GetPrimaryColor('main') : '#fff' }}>
            <FlatList style={{ flex: 1 }} data={files} renderItem={({ item, index }) => (<View style={{ width: '100%' }}>
                <TouchableOpacity style={{ padding: 5 }} onPress={() => { play!(index) }}><Text>{item.title}</Text></TouchableOpacity>
            </View>)} />
        </View>
    )
}