import {
  useRef, useEffect, useState
} from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, StatusBar,Modal,Pressable } from 'react-native';
import DatePicker from "react-native-date-picker";

// import Contacts from "react-native-contacts";
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import CameraModal from './Component/modal';


const Student = () => {


  const name = useRef();
  const mobile = useRef();
  const gender = useRef('Male');
  const fee = useRef();
  const cash = useRef();
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





  const renderItem = (item) => {
    return (
      <View style={{
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Text style={{
          flex: 1,
          fontSize: 16,
          color: 'black',
        }}>{item.value}</Text>
        <Icon
          style={{
            marginRight: 5,
          }}
          color="black"
          name={item.icon}
          size={20}
        />
      </View>
    );
  };



  return (
    <View style={styles.container} >
      <Text style={styles.studenttext}>Add Student </Text>

      {/* image button */}
      <View style={styles.imagebutton}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Icon name="camera" size={30} color="black" />
          <Text style={styles.textStyle}>Add Image</Text>
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
      <Dropdown
        style={styles.dropdown}
        placeholder="Select Payment Mode"
        placeholderStyle={styles.dropdownFontColor}

        itemTextStyle={styles.dropdownFontColor}
        selectedTextStyle={styles.dropdownFontColor}
        data={payment_type}
        value={cash}
        onChange={(value) => {
          cash.current.value = value;
        }}
        maxHeight={300}
        labelField="label"
        valueField="value"
        searchPlaceholder="Search..."

        renderItem={renderItem}
      />


      <TextInput
        placeholder="Batch Code"
        ref={batch}
        style={styles.input}
      />
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

      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.dropdownFontColor}

        itemTextStyle={styles.dropdownFontColor}
        selectedTextStyle={styles.dropdownFontColor}
        iconStyle={styles.iconStyle}
        data={gender_list}
        // search
        maxHeight={300}
        placeholder={gender.current.valueOf()}
        valueField='value'
        labelField='label'

        value={gender}
        onChange={item => {
          gender.current.value = item.value;
          console.log(batch.current.value);

        }}

        renderItem={renderItem}

        renderRightIcon={() => {
          return (
            <Icon name="chevron-down-outline" size={20} color="black" />
          );
        }}

      />
      <TouchableOpacity

        style={styles.submitbtn}
      >
        <Text>Submit</Text>

      </TouchableOpacity>

      <CameraModal setModalVisible={setModalVisible} modalVisible={modalVisible}/>
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
  dropdown: {
    width: "100%",
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


  
});
