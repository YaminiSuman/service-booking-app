import { FlatList } from "react-native";

import ProfessionalListItem from "../components/ui/ProfessionalListItem";
import EmptyListDialog from "../components/ui/EmptyListDialog";

function ProfessionalList({ route }) {
  const professionalDetail = route.params.workerDetails;
  const selectedDate = route.params.selectedDate;
  const selectedStartTime = route.params.selectedStartTime;
  const selectedEndTime = route.params.selectedEndTime;
  const category = route.params.category;

  if (professionalDetail.length) {

    return (
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
    );
  } else {
    return <EmptyListDialog />;
  }
}

export default ProfessionalList;
