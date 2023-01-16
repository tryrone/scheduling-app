import React, { useEffect, useState } from "react";
import SafeAreaWrap from "../components/SafeAreaWrap";
import Header from "./components/Header";
import PremiumCard from "./components/PremiumCard";
import Tasks from "./components/Tasks";
import { ScrollView } from "react-native";
import AddTaskModal from "../components/AddTaskModal";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { app } from "../../firebaseConfig";
import {
  getLocalData,
  getLocalLoginData,
  returnOnlyDataForCurrentWeek,
} from "../utils";
import appLogger from "../logger";

type HomeProp = {
  navigation: any;
};

const Home = ({ navigation }: HomeProp) => {
  const [addTaskModalVisible, setAddTaskModalVisible]: any = useState(false);
  const [tasksForTheWeek, setTasksForTheWeek]: any = useState([]);
  const db = getFirestore(app);

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "tasks"));

    const user = await getLocalLoginData();

    const taskData: any[] = querySnapshot?.docs?.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    if (taskData?.length === 0 || !querySnapshot) {
      const localData = await getLocalData();
      const thisWeekData = returnOnlyDataForCurrentWeek(localData);
      const userDataFromId = thisWeekData?.filter(
        (week) => week?.user_id === user?.user_id
      );
      setTasksForTheWeek(userDataFromId);
    } else {
      const thisWeekData = returnOnlyDataForCurrentWeek(taskData);
      const userDataFromId = thisWeekData?.filter(
        (week) => week?.user_id === user?.user_id
      );
      setTasksForTheWeek(userDataFromId);
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
