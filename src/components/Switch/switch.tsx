import React, { useState } from 'react';
import { View, Switch, StyleSheet } from 'react-native';
import useTheme from '../../hooks/useTheme';

const SwitchPerson = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    //const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const { toggleSwitch } = useTheme();

    function setValue() {
        toggleSwitch();
        setIsEnabled(!isEnabled);
    }

    return (
        <View style={styles.container}>
            <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={setValue}
                value={isEnabled}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default SwitchPerson;