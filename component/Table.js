import React, { useEffect} from "react";
import {
  Text,
  FlatList,
  View,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/action";
import { SafeAreaView } from "react-native-safe-area-context";


let timer = null;

const {width,height } = Dimensions.get("window");

const Table = () => {
  const dispatch = useDispatch();

  const datas = useSelector((state) => state.currencyReducer.data);

  const priceArray = React.useMemo(() => {
    const arrayOfObj = Object.entries(datas).map((e) => ({ [e[0]]: e[1] }));
    

    return arrayOfObj.map((item) => {
        return { symbol: Object.keys(item), price: Object.values(item) };
      });
  }, [datas]);

  const getData = () => {
    timer = setInterval(() => {
      dispatch(fetchData());
    }, 2000);
  };
  useEffect(() => {
    getData();

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {priceArray.length == 0 ? (
        <ActivityIndicator color={"black"} size={"large"} />
      ) : (
        <>
          <View style={styles.header}>
            <Text style={{ fontWeight: "bold" }}>SYMBOL</Text>

            <Text style={{ fontWeight: "bold" }}>PRICE</Text>
          </View>
          <FlatList
            data={priceArray}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    backgroundColor: index % 2 == 0 ? "black" : "#303030",
                    width: "100%",
                    height: height * 0.08,
                    borderWidth: 1,
                    justifyContent: "space-around",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={styles.dataText}>{item.symbol}</Text>
                  </View>

                  <Text style={{ ...styles.dataText, flex: 1 }}>
                    {item.price[0][0]}
                  </Text>
                </View>
              );
            }}
            keyExtractor={(item, index) => index}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default Table;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "white",
    height: height * 0.08,
  },
  dataText: {
    color: "white",
    alignSelf: "center",
    textAlign: "center",
  },
});
