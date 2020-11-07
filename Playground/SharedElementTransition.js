import { View, FlatList } from 'react-native'
import Container from '../App/Components/Container'
import { Images } from '../App/Theme'



let { bikeSketchOne, bikeSketchTwo, bikeSketchThree} = Images;

let DATA = [
    {text: "Some text here", subtext: "Some subtext", image: bikeSketchOne},
    {text: "Some text here", subtext: "Some subtext", image: bikeSketchTwo},
    {text: "Some text here", subtext: "Some subtext", image: bikeSketchThree}
]

function List({navigation}) {

    function renderItem({item}) {
        return (

        )
    }

    return (
        <Container>
            <FlatList
                style={[styles.cardsContainer, style]}
                contentContainerStyle={styles.cardsContentContainer}
                data={data}
                showsVerticalScrollIndicator={true}
                renderItem={renderItem}
                keyExtractor={(item, index) => String(index)}
                numColumns={1}
            />
        </Container>
    )
}


//export nav Stack
