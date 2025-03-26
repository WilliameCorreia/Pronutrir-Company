import React, { useRef, useCallback, memo } from 'react';
import Carousel, { ParallaxImage, AdditionalParallaxProps } from 'react-native-snap-carousel';
import {
    View,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Platform,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

// Mock data - array of objects with title and urlImg properties
// Interface for carousel item data
interface CarouselItem {
    title: string;
    urlImg: string;
}

// Mock data with typed array
const imagensTeste: CarouselItem[] = [
    {
        title: "Aplicativo Móvel",
        urlImg: "https://firebasestorage.googleapis.com/v0/b/apppronutrir-e0737.appspot.com/o/postagemInicial%2FmockuperCelularPerson.png?alt=media&token=e00de833-f2ba-44b2-b1ea-7ce7af4a4417"
    },
    {
        title: "Múltiplos Dispositivos",
        urlImg: "https://firebasestorage.googleapis.com/v0/b/apppronutrir-e0737.appspot.com/o/postagemInicial%2FmockuperDispositivosPerson.png?alt=media&token=6c95c69e-fc01-4b34-a427-1c6b16f3fcf4"
    }
];

// Memoized carousel item component
const CarouselItem = memo(({ item, parallaxProps, carouselRef }: {
    item: CarouselItem,
    parallaxProps: AdditionalParallaxProps,
    carouselRef: any
}) => {
    return (
        <TouchableOpacity style={styles.item}>
            <ParallaxImage
                source={{ uri: item.urlImg }}
                containerStyle={styles.imageContainer}
                showSpinner={true}
                style={styles.image}
                parallaxFactor={0}
                carouselRef={carouselRef}
                {...parallaxProps}
            />
        </TouchableOpacity>
    );
});

const CarouselHome: React.FC = () => {
    // Make sure to properly type the ref
    const carouselRef = useRef<Carousel<CarouselItem>>(null);

    // Memoized renderItem function to prevent recreation on each render
    const renderItem = useCallback(({ item }: { item: CarouselItem }, parallaxProps?: AdditionalParallaxProps) => {
        return (
            <CarouselItem
                item={item}
                parallaxProps={parallaxProps || {}}
                carouselRef={carouselRef.current}
            />
        );
    }, []);

    return (
        <View style={styles.container}>
            <Carousel
                layout={'default'}
                ref={carouselRef}
                sliderWidth={screenWidth}
                sliderHeight={screenWidth}
                itemWidth={screenWidth - 70}
                data={imagensTeste}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                hasParallaxImages={true}
                autoplayInterval={10000}
                autoplay={true}
                useScrollView={false}
                removeClippedSubviews={true}
                shouldOptimizeUpdates={true}
                enableMomentum={false}
                lockScrollWhileSnapping={true}
            />
        </View>
    );
};

// Export as memo to prevent unnecessary rerenders of the entire component
export default memo(CarouselHome);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        //width: screenWidth - 60,
        //height: screenWidth - 60,
        alignItems: 'center',
        backgroundColor: 'red',
    },
    imageContainer: {
        flex: 1,
        width: '90%',
        height: '100%',
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'transparent',
        borderRadius: 20,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
    btnNext: {

    }
});
