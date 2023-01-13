import React, { useEffect, useState } from "react";
import SafeAreaWrap from "../components/SafeAreaWrap";
import Header from "./components/Header";
import PremiumCard from "./components/PremiumCard";
import Tasks from "./components/Tasks";
import { ScrollView } from "react-native";
import AddTaskModal, { TaskDataProp } from "../components/AddTaskModal";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { app } from "../../firebaseConfig";
import { getLocalData, returnOnlyDataForCurrentWeek } from "../utils";

type HomeProp = {
  navigation: any;
};

const Home = ({ navigation }: HomeProp) => {
  const [addTaskModalVisible, setAddTaskModalVisible]: any = useState(false);
  const [tasksForTheWeek, setTasksForTheWeek]: any = useState([]);
  const db = getFirestore(app);

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "tasks"));

    const taskData: any[] = querySnapshot?.docs?.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    if (taskData?.length === 0 || !querySnapshot) {
      const localData = await getLocalData();
      const thisWeekData = returnOnlyDataForCurrentWeek(localData);
      setTasksForTheWeek(thisWeekData);
    } else {
      const thisWeekData = returnOnlyDataForCurrentWeek(taskData);
      setTasksForTheWeek(thisWeekData);
    }
  };

  useEffect(() => {
    getData();
  }, [addTaskModalVisible]);

  return (
    <SafeAreaWrap>
      <>
        <Header />
        <PremiumCard />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Tasks
            navigation={navigation}
            setAddTaskModalVisible={setAddTaskModalVisible}
            currentWeekData={tasksForTheWeek}
          />
        </ScrollView>
      </>
      <AddTaskModal
        visible={addTaskModalVisible}
        setVisible={setAddTaskModalVisible}
      />
    </SafeAreaWrap>
  );
};

export default Home;
