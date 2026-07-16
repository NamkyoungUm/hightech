import './App.css'
import { getEmotionImgById } from './components/util';
import { Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Edit from './components/Edit';
import New from './components/New';
import Diary from './components/Diary';
import Graph from './components/Graph';
import { mockData } from './components/mockData'
import React, { useReducer, useRef, useState, useEffect } from 'react';

// 정적인 상태 : data (diary 데이터)
export const DiaryStateContext = React.createContext();
// 동적인 상태 : CRUD 기능 관련
export const DiaryDispatchContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE": {
      const newData = [action.data, ...state];
      localStorage.setItem("diary", JSON.stringify(newData));
      return newData;
    }

    case "UPDATE": {
      const newData = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it);
      localStorage.setItem("diary", JSON.stringify(newData));
      return newData;
    }

    case "DELETE": {
      const newData = state.filter((it) => it.id !== action.targetId);
      localStorage.setItem("diary", JSON.stringify(newData));
      return newData;
    }

    case "INIT": {
      const initData = JSON.parse(localStorage.getItem("diary"));
      if (initData) return initData;
      return action.data;
    }

    default: return state;
  }
}

const App = () => {

  //초기데이터가 로딩되어있는지 여부 체크  
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const [data, dispatch] = useReducer(reducer, []);

  const idRef = useRef(5);
  const onCreate = (date, content, emotionId) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current,
        date: new Date(date).getTime(),
        content,
        emotionId
      }
    });
    idRef.current += 1;
  }
  const onUpdate = (targetId, date, content, emotionId) => {
    dispatch({
      type: "UPDATE",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotionId
      }
    });
  }
  const onDelete = (targetId) => {
    dispatch({
      type: "DELETE",
      targetId
    });
  }

  // 처음 App 시작시에 초기화
  useEffect(() => {
    dispatch({
      type: "INIT",
      data: mockData
    })
    setIsDataLoaded(true);
  }, []);

  if (!isDataLoaded) return <div>데이터 로딩중</div>;

  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/new' element={<New />}></Route>
            <Route path='/diary/:id' element={<Diary />}></Route>
            <Route path='/edit/:id' element={<Edit />}></Route>
            <Route path='/graph' element={<Graph />}></Route>
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>);
}

export default App
