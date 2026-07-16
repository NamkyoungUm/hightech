import './DiaryList.css'
import Button from './Button';
import DiaryItem from './DiaryItem';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DiaryList = ({ data }) => {

    const sortOptionList = [
        { value: "latest", name: "최신 순" },
        { value: "oldest", name: "오래된 순" }
    ]

    const [sortType, setSortType] = useState("latest");
    const [sortedData, setSortedData] = useState([]);

    const onChangeSortType = (e) => {
        setSortType(e.target.value);
    }

    const navigate = useNavigate();
    const onClickNew = () => {
        navigate("/new");
    }

    const goGraph = () => { navigate("/graph") }

    useEffect(() => {
        // 정렬함수 정의
        const compare = (a, b) => {
            if (sortType == "latest") return Number(b.date) - Number(a.date);
            else if (sortType == "oldest") return Number(a.date) - Number(b.date);
        }

        const copyList = JSON.parse(JSON.stringify(data)); //깊은복사
        copyList.sort(compare);  //정렬해서 copyList에 넣음 
        setSortedData(copyList); //정렬결과를 sortedData에 반영 
    }, [data, sortType]);


    return (
        <>
            <div className='DiaryList'>
                <div className='menu_wrapper'>
                    <div className='left_col'>
                        <select value={sortType} onChange={onChangeSortType}>
                            {sortOptionList.map((it, idx) => (
                                <option key={idx} value={it.value}>
                                    {it.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='right_col'>
                        <Button type={'positive'}
                            text={'새 일기 쓰기'}
                            onClick={onClickNew} />
                    </div>
                    <div className='right_col'>
                        <Button type={'negative'}
                            text={'감정별 그래프'}
                            onClick={goGraph} />
                    </div>
                </div>
                <div className='list_wrapper'>
                    {sortedData.map((it) => <DiaryItem key={it.id} {...it} />)}
                </div>
            </div>
        </>
    );
}
export default DiaryList;