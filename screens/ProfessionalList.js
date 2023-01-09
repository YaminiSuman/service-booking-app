import { View,FlatList,StyleSheet } from "react-native";

import { Colors } from "../constants/styles";
import ProfessionalListItem from "../components/ui/ProfessionalListItem";
import EmptyListDialog from "../components/ui/EmptyListDialog";

// import {
//   BannerAd,
//   BannerAdSize,
//   TestIds,
// } from "react-native-google-mobile-ads";

// const adUnitId = __DEV__
//   ? TestIds.BANNER
//   : "ca-app-pub-2257380265518883/4897486343";

function ProfessionalList({ route }) {
  const professionalDetail = route.params.workerDetails;
  const selectedDate = route.params.selectedDate;
  const selectedStartTime = route.params.selectedStartTime;
  const selectedEndTime = route.params.selectedEndTime;
  const category = route.params.category;

  if (professionalDetail?.length) {

    return (
      <View style={styles.container}>
        <FlatList
          data={professionalDetail}
          renderItem={(itemData) => (
            <ProfessionalListItem
              {...itemData.item}
              selectedDate={selectedDate}
              selectedStartTime={selectedStartTime}
              selectedEndTime={selectedEndTime}
              category={category}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  } else {
    return <EmptyListDialog />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary100,
  },
});

export default ProfessionalList;
