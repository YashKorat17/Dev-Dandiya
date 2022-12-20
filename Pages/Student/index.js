import {
  useRef, useEffect, useState
} from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, StatusBar, Modal, Pressable } from 'react-native';
import DatePicker from "react-native-date-picker";

// import Contacts from "react-native-contacts";
import Icon from 'react-native-vector-icons/Ionicons';
import DropDownList from './Component/dropdown';
import CameraModal from './Component/modal';


const Student = () => {


  const name = useRef();
  const mobile = useRef();
  const gender = useRef('Male');
  const fee = useRef();
  const cash = useRef('Pending');
  const batch = useRef();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [value, setValue] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const payment_type = [
    {
      value: "Cash",
      label: "Cash",
      icon: "cash-outline",
    },
    {
      value: "Online",
      label: "Online",
      icon: "card-outline",
    },
    {
      value: "Pending",
      label: "Pending",
      icon: "time-outline",
    }
  ];

  const gender_list = [
    { label: "Male", value: "Male", icon: "man-outline" },
    { label: "Female", value: "Female", icon: "woman-outline" },
  ];








  return (
    <View style={styles.container} >
      <Text style={styles.studenttext}>Add Student </Text>

      {/* image button */}
      <View style={styles.imagebuttonContainer}>
        <TouchableOpacity
          style={styles.imagebutton}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Icon name="person-add-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>

      < TextInput
        placeholder="Name"
        ref={name}
        style={styles.input}
      />
      <TextInput
        placeholder="Mobile No"
        ref={mobile}
        style={styles.input}
      />

      <View>
        <TextInput
          placeholder="Fee"
          ref={fee}
          style={styles.input}
        />
        <View style={styles.premium}>

          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Yearly</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Monthly</Text>
          </Pressable>
        </View>

      </View>

      <View style={styles.payemntView}>
        <DropDownList
          style={styles.dropdown}
          dropdownFontColor={styles.dropdownFontColor}
          list={payment_type}
          placeholderStyle={styles.dropdownFontColor}
          value={cash}
          key={"payment_type"}
        />


        <TextInput
          placeholder="Batch Code"
          ref={batch}
          style={styles.input}
        />
      </View>
      <TouchableOpacity onPress={
        () => {
          setOpen(true);
        }
      }
        style={styles.submitbtn}
      >
        <Text>{
          date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear()
        } </Text>
      </TouchableOpacity>
      < DatePicker
        modal
        mode="date"
        open={open}
        date={date}
        onConfirm={(date) => {
          setDate(date);
          setOpen(false);
          console.log(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />

      <DropDownList
        style={styles.dropdown}
        dropdownFontColor={styles.dropdownFontColor}
        list={gender_list}
        placeholderStyle={styles.dropdownFontColor}
        value={gender}
        key={"gender"}
      />
      <TouchableOpacity

        style={styles.submitbtn}
      >
        <Text>Submit</Text>

      </TouchableOpacity>

      <CameraModal setModalVisible={setModalVisible} modalVisible={modalVisible} />
    </View>

  );

}

export default Student;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight,
    padding: 8,

  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    fontWeight: "500",
  },
  submitbtn: {
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "blue",
    height: 50,
    width: 150,
    margin: 10,
    borderRadius: 10,
  },
  studenttext: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  payemntView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdown: {
    width: "50%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    color: "black",

  },
  dropdownFontColor: {
    color: "black",
  },
  imagebuttonContainer: {
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',

  },
  imagebutton: {
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "rgba(199,195,201,0.5)",
    height: 150,
    width: 150,
    margin: 10,
    borderRadius: 100,
  },
  premium: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 120,
    marginLeft: 10,
    marginBottom: 10,
    borderRadius: 10,
  },


});
