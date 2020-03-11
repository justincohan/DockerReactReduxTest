import React from "react";
import Button from "antd/es/button";
import SearchOutlined from "@ant-design/icons/lib/icons/SearchOutlined";
import Input from "antd/es/input";
import {useDispatch} from "react-redux";
import {searchPersons} from "./scheduleActions";


export default function Schedule() {
  const [ searching, setSearching ] = React.useState(false);
  const dispatch = useDispatch();

  let toggle = () => {
    setSearching(!searching);
    console.log(searching);
  };

  let setSearchValue = (value) => {
    dispatch(searchPersons(value));
  };

  return (
    <div>
      People
      {searching}
      {
        searching ? <Input placeholder="Search" onChange={e => setSearchValue(e.target.value)}/>
        : <Button shape="circle" onClick={toggle} icon={<SearchOutlined />} />
      }

    </div>
  );
}
