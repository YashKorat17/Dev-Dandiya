import React from 'react'
import {
    View,
    Text
} from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import Icon  from 'react-native-vector-icons/Ionicons';


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

const DropDownList = ({style,placeholderStyle,dropdownFontColor,list,value}) => {
    return <Dropdown
        style={style}
        placeholderStyle={placeholderStyle}

        itemTextStyle={dropdownFontColor}
        selectedTextStyle={dropdownFontColor}
        // iconStyle={iconStyle}
        data={list}
        // // search
        maxHeight={300}
        placeholder={value.current.valueOf()}
        valueField='value'
        labelField='label'

        value={value}
        onChange={item => {
          value.current.value = item.value;
          console.log(value.current.value);

        }}

        renderItem={renderItem}

        renderRightIcon={() => {
          return (
            <Icon name="chevron-down-outline" size={20} color="black" />
          );
        }}

      />
  
}

export default DropDownList
