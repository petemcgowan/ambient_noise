import React from 'react'
import { View, useWindowDimensions } from 'react-native'

import RoundedButton from './RoundedButton'

interface FooterProps {
    backgroundColor: string
    leftButtonLabel: string | null
    leftButtonPress: () => void | null
    rightButtonLabel: string
    rightButtonPress: () => void
}

const Footer = ({
    backgroundColor,
    leftButtonLabel,
    leftButtonPress,
    rightButtonLabel,
    rightButtonPress,
}: FooterProps) => {
    const windowWidth = useWindowDimensions().width
    const HEIGHT = windowWidth * 0.15
    const FOOTER_PADDING = windowWidth * 0.1

    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: leftButtonLabel ? 'space-between' : 'flex-end',
                height: HEIGHT,
                backgroundColor,
                opacity: 0.7,
                alignItems: 'center',
                paddingHorizontal: FOOTER_PADDING,
            }}
        >
            {leftButtonLabel && (
                <RoundedButton
                    label={leftButtonLabel}
                    onPress={leftButtonPress}
                />
            )}
            <RoundedButton
                label={rightButtonLabel}
                onPress={rightButtonPress}
            />
        </View>
    )
}

export default Footer
