import { FlatList } from "react-native";

import ProfessionalDetailItem from "../components/ui/ProfessionalDetailItem";

function renderProfessionalDetail(itemData) {
  return <ProfessionalDetailItem {...itemData.item} />;
}

function ProfessionalList({ route }) {
  const professionalDetail = route.params.workerDetails;
  // const workerDetail = [
  //   {
  //     cost: "25",
  //     created_at: "06-11-2022 12:21",
  //     id: 5,
  //     is_active: true,
  //     profession_type: 3,
  //     professional_user_name: "Yamini",
  //     rating: 5,
  //     updated_at: "06-11-2022 12:21",
  //     user: 1,
  //   },
  //   {
  //     cost: "55",
  //     created_at: "06-11-2022 12:21",
  //     id: 6,
  //     is_active: true,
  //     profession_type: 3,
  //     professional_user_name: "Gaurav",
  //     rating: 5,
  //     updated_at: "06-11-2022 12:21",
  //     user: 1,
  //   },
  // ];
  return (
    <FlatList
      data={professionalDetail}
      renderItem={renderProfessionalDetail}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ProfessionalList;
