import { useSearchParams, Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { DiaryStateContext } from "../App";
import { getMonthRangeByDate } from './util';
import Button from "./Button";
import Header from "./Header";
import Editor from "./Editor";
import DiaryList from "./DiaryList";
import graphIcon from '../assets/graph_heart.jpg';

const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    console.log(searchParams);
    console.log(searchParams.get("sort"));

    const data = useContext(DiaryStateContext);

    // 필터링한 일기를 저장할 state 준비하기 
    const [filteredData, setFilteredData] = useState([]);

    const [pivotDate, setPivotDate] = useState(new Date());
    const headerTitle = `${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`;

    const onDecreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
    }
    const onIncreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
    }

    useEffect(() => {
        if (data.length >= 1) {
            const { beginTimeStamp, endTimeStamp } = getMonthRangeByDate(pivotDate);
            setFilteredData(
                data.filter((it) => beginTimeStamp <= it.date && it.date <= endTimeStamp)
            );
        }
        else {
            setFilteredData([]);
        }
    }, [data, pivotDate]);

    return (
        <>
            <div>
                <Header
                    title={
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {headerTitle}
                            {/* 이미지를 Link로 감싸서 graph 페이지로 이동 */}
                            <Link to={`/graph?month=${headerTitle}`}>
                                <img
                                    src={graphIcon}
                                    alt="graph"
                                    style={{ width: '50px', height: '50px', cursor: 'pointer' }}
                                />
                            </Link>
                        </div>}
                    leftchild={<Button text="<" onClick={onDecreaseMonth} />}
                    rightchild={<Button text=">" onClick={onIncreaseMonth} />} />
                <DiaryList data={filteredData} />
            </div>
        </>
    );
}
export default Home;