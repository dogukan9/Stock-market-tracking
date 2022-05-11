import React from "react"
import { Provider} from 'react-redux';
import { store } from './redux/store';
import Table from "./component/Table";
export default function App() {


  return (
    <Provider store={store}>
  
  
    <Table />
    
   
    </Provider>
  );
}
