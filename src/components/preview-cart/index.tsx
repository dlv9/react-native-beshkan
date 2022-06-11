import React, { FC } from 'react'
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'

interface props {
    imageUrl: string;
    title: string;
    duration?: string;
    onDownload?: () => void;
}

export const PreviewCart: FC<props> = (props) => {
    return (
        <ImageBackground source={{ uri: props.imageUrl }} style={{ width: 300, height: 300, justifyContent: 'flex-end', borderRadius: 15, overflow: 'hidden' }} resizeMode={'cover'} >
            <View style={{ paddingVertical: 10, paddingHorizontal: 7, backgroundColor: 'red', borderRadius: 15 }}>
                <View>
                    <Text>{props.title}</Text>
                    <Text>{props?.duration}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={props.onDownload}>
                        <Text>down</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
}