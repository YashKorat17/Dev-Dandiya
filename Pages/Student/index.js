import {
  useRef, useEffect, useState
} from 'react';
import { View, Text, TextInput,  TouchableOpacity, StyleSheet,   Pressable, Image,ScrollView } from 'react-native';
import DatePicker from "react-native-date-picker";
import Icon from 'react-native-vector-icons/Ionicons';
import DropDownList from './Component/dropdown';
import ModalPage from './Component/ModalPage';
import axios from 'axios';


const Student = ({navigation,route}) => {

  const name = useRef();
  const mobile = useRef();
  const gender = useRef('Male');
  const fee = useRef();
  const cash = useRef('Pending');
  const [batch, setBatch] = useState('');
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [hover, setHover] = useState(name);

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

const [image,setImage] = useState(null);
  
  useEffect(() => {
    if (route.params?.image) {
      setImage(route.params?.image);
      console.log(route.params?.image); 
    }
  }, [route.params?.image]);

  useEffect(() => {
    loaddata();
  }, []);
  

  const loaddata = async() => {
    await axios.get('http://192.168.1.204:8000/api/v1/studentdata/batch')
      .then((res) => {
        setBatch(res.data["batch"]);
      })
      .catch((err) => {
        console.log(err);
      })
    }





  return (
    <View style={styles.container} >
      <ScrollView style={{
        flex: 1,
        width: '100%',
        height: '100%',
      }}>
      <View style={styles.imagebuttonContainer}>
        <TouchableOpacity
          style={styles.imagebutton}
          onPress={() => {
            setModalVisible(true);
            // navigation.navigate('Camera');
          }}
        >
          {image == null?<Icon name="person-add-outline" size={80} color="black" />:<Image source={{uri:`data:image/png;base64,${image}`}} style={{width:150,height:150,borderRadius:150/2,
          resizeMode:'cover'
          

        }} 
          
          />}
        </TouchableOpacity>
      </View>

      < TextInput
        placeholder="Name"
        ref={name}
        style={[styles.input, { borderColor: hover == 'name' ? "rgba(110, 5, 166,1)" : '#000',borderWidth:hover == 'name' ? 2 : 1 }]}
        placeholderTextColor="#000"
        onFocus={() => setHover('name')}
        onBlur={() => setHover('')}
      />
      <TextInput
        placeholder="Mobile No"
        ref={mobile}
        style={[styles.input, { borderColor: hover == 'mobile' ? "rgba(110, 5, 166,1)" : '#000',borderWidth:hover == 'mobile' ? 2 : 1 }]}
        placeholderTextColor="#000"
        onFocus={() => setHover('mobile')}
        onBlur={() => setHover('')}
      />

      <View>
        <TextInput
          placeholder="Fee"
          ref={fee}
          style={[styles.feeInput, { borderColor: hover == 'fee' ? "rgba(110, 5, 166,1)" : '#000',borderWidth:hover == 'fee' ? 2 : 1 }]}
          placeholderTextColor="#000"
          onFocus={() => setHover('fee')}
          onBlur={() => setHover('')}
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
          value={batch}
          style={[styles.batchcodeinput, { borderColor: hover == 'batch' ? "rgba(110, 5, 166,1)" : '#000',borderWidth:hover == 'batch' ? 2 : 1 }]}
          placeholderTextColor="#000"
          onFocus={() => setHover('batch')}
          onBlur={() => setHover('')}
          onChangeText={(text) => setBatch(text)}
/>
      </View>
      <View style={styles.datepicker}>

      <DropDownList
        style={styles.dropdown}
        dropdownFontColor={styles.dropdownFontColor}
        list={gender_list}
        placeholderStyle={styles.dropdownFontColor}
        value={gender}
        key={"gender"}
      />
      <TouchableOpacity onPress={
        () => {
          setOpen(true);
        }
      }
        style={styles.datebtn}
      >
        <Text style={styles.datebtntext}>{
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
      </View>
      <TouchableOpacity

        style={styles.submitbtn}
      >
        <Text style={{
          color: "white",
          fontSize: 20,
          fontWeight: "600",

        }}>Submit</Text>

      </TouchableOpacity>

    <ModalPage modalVisible={modalVisible} setModalVisible={setModalVisible} setImage={setImage} navigation={navigation}/>
    </ScrollView>
    </View>
);

}

export default Student;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // paddingTop: StatusBar.currentHeight,
    padding: 8,
    backgroundColor: "white",

  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    fontWeight: "500",
    color: "black",
  },
  feeInput: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    fontWeight: "500",
    color: "black",
  },

  submitbtn: {
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "rgba(166, 5, 102,1)",
    height: 50,
    width: "95%",
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
    justifyContent: "space-around",
    alignItems: "center",
  },
  batchcodeinput: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    borderRadius: 10,
    fontWeight: "500",
    color: "black",
    width: "45%",
  },
  dropdown: {
    width: "45%",
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
    backgroundColor: "rgba(199,195,201,0.3)",
    height: 150,
    width: 150,
    margin: 10,
    borderRadius: 100,
    borderColor: "rgba(199,195,201,0.3)",
    borderWidth: 2,
    borderStyle: "dashed",
  },
  premium: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 120,
    marginLeft: 15,
    marginBottom: 10,
    marginTop: 5,
    borderRadius: 10,
  },
  datepicker: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: 'center',
    width: "100%",
    marginBottom: 10,
  },
  datebtn: {
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    width: "45%",
    height: 50,
    borderRadius: 10,
    borderWidth: 2,
  borderColor: "rgba(110, 5, 166,1)",
  },

  datebtntext: {
    color: "black",
    fontSize: 16,
    fontWeight: "500",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  },
    

});
