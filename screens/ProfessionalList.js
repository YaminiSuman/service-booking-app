import { FlatList } from "react-native";

import ProfessionalListItem from "../components/ui/ProfessionalListItem";

function ProfessionalList({ route }) {

  const professionalDetail = route.params.workerDetails;
  const selectedDate = route.params.selectedDate;
  const selectedStartTime = route.params.selectedStartTime;
  const selectedEndTime = route.params.selectedEndTime;
  return (
    <FlatList
      data={professionalDetail}
      renderItem={(itemData) => (
        <ProfessionalListItem
          {...itemData.item}
          selectedDate={selectedDate}
          selectedStartTime={selectedStartTime}
          selectedEndTime={selectedEndTime}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ProfessionalList;
