import React from 'react'
import { View, Text } from 'react-native'
import { useSocket } from '../../context';

export const SocketStatus = () => {

    const { status } = useSocket()

    if (!status) {
        return (
            <View style={{ position: 'absolute' }}>
                <Text>connecting</Text>
            </View>
        )
    }

    return null
}
