import React, { useState } from "react";
import SafeAreaWrap from "../components/SafeAreaWrap";
import Header from "./components/Header";
import PremiumCard from "./components/PremiumCard";
import Tasks from "./components/Tasks";
import { ScrollView } from "react-native";
import AddTaskModal from "../components/AddTaskModal";

type HomeProp = {
  navigation: any;
};

const Home = ({ navigation }: HomeProp) => {
  const [addTaskModalVisible, setAddTaskModalVisible]: any = useState(false);
  return (
    <SafeAreaWrap>
      <>
        <Header />
        <PremiumCard />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Tasks
            navigation={navigation}
            setAddTaskModalVisible={setAddTaskModalVisible}
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
