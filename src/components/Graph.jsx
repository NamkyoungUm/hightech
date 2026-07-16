import React, { useMemo, useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import { mockData } from './mockData.js';
import { emotionList } from './util.js';
import Header from './Header.jsx';
import Button from './Button.jsx';
import './Graph.css';
import { useNavigate, useSearchParams } from "react-router-dom";

// 1. 모달 컴포넌트 수정: 메시지 객체를 받아서 스타일링하도록 변경
const EmotionModal = ({ isOpen, onClose, emotionInfo }) => {
    if (!isOpen || !emotionInfo) return null;

    const { name, color } = emotionInfo;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <p>
                    이번 달은{' '}
                    {/* 2. 감정 이름에 해당 색상 적용 */}
                    <span style={{ color: color, fontWeight: 'bold' }}>
                        "{name}"
                    </span>{' '}
                    감정을 가장 많이 느끼셨네요?
                </p>
                <button onClick={onClose}>확인</button>
            </div>
        </div>
    );
};

const Graph = () => {
    const colorMap = {
        1: '#64c964',
        2: '#9dd772',
        3: '#FDCE17',
        4: '#fd8446',
        5: '#fd565f'
    };

    const navigate = useNavigate();
    const goBack = () => { navigate(-1); }

    const [searchParams] = useSearchParams();
    const monthParam = searchParams.get('month');

    const [headerDisplayMonth, setHeaderDisplayMonth] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 3. 최다 감정 정보 상태 관리 변경 (이름과 색상을 담은 객체)
    const [topEmotionInfo, setTopEmotionInfo] = useState(null);

    const chartData = useMemo(() => {
        if (!monthParam) return [['Emotion', 'Count', { role: 'style' }]];

        const match = monthParam.match(/(\d+)년 (\d+)월/);
        if (!match) return [['Emotion', 'Count', { role: 'style' }]];

        const year = parseInt(match[1], 10);
        const month = parseInt(match[2], 10) - 1;
        const startOfMonth = new Date(year, month, 1).getTime();
        const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59, 999).getTime();

        const filteredDataForMonth = mockData.filter((it) => {
            return it.date >= startOfMonth && it.date <= endOfMonth;
        });

        if (filteredDataForMonth.length === 0) {
            // 데이터가 없을 경우 정보 초기화
            setTopEmotionInfo(null);
            return [['Emotion', 'Count', { role: 'style' }]];
        }

        const counts = filteredDataForMonth.reduce((acc, curr) => {
            const emotion = emotionList.find((e) => e.id === curr.emotionId);
            const key = emotion ? emotion.name : `기타(${curr.emotionId})`;

            if (!acc[key]) {
                acc[key] = {
                    count: 0,
                    color: emotion ? colorMap[emotion.id] : '#CCCCCC',
                    id: emotion ? emotion.id : null // ID도 저장해두면 유용함
                };
            }
            acc[key].count += 1;
            return acc;
        }, {});

        // 4. 최다 감정 계산 및 정보 저장
        let maxCount = 0;
        let mostFrequentEmotionKey = null;

        Object.keys(counts).forEach(key => {
            if (counts[key].count > maxCount) {
                maxCount = counts[key].count;
                mostFrequentEmotionKey = key; // 예: "행복", "슬픔"
            }
        });

        // 최다 감정 정보(이름과 색상) 상태 업데이트
        if (mostFrequentEmotionKey && counts[mostFrequentEmotionKey]) {
            setTopEmotionInfo({
                name: mostFrequentEmotionKey,
                color: counts[mostFrequentEmotionKey].color
            });
        } else {
            setTopEmotionInfo(null);
        }


        const formattedData = [['Emotion', 'Count', { role: 'style' }]];
        Object.keys(counts).forEach((key) => {
            formattedData.push([key, counts[key].count, counts[key].color]);
        });

        return formattedData;

    }, [monthParam]);

    useEffect(() => {
        if (monthParam) {
            setHeaderDisplayMonth(`${monthParam}의 `);
        }
    }, [monthParam]);


    const options = {
        title: `${headerDisplayMonth}감정별 일기 개수`,
        hAxis: { title: '감정' },
        vAxis: { title: '개수', viewWindow: { min: 0 } },
        legend: { position: 'none' },
        enableInteractivity: true,
    };


    return (
        <>
            <div>
                <Header
                    title={`${headerDisplayMonth}감정별 그래프`}
                    leftchild={<Button text={'< 뒤로 가기'} onClick={goBack} />}
                />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
                {/* 5. 조건부 버튼 텍스트 변경 */}
                <button
                    onClick={() => { if (topEmotionInfo) setIsModalOpen(true); }}
                    disabled={!topEmotionInfo}
                >
                    {topEmotionInfo ? `이번 달 나의 주된 감정 "${topEmotionInfo.name}" 확인하기` : "이번 달 나의 주된 감정 확인하기"}
                </button>
            </div>

            <div style={{ width: '100%', height: '400px' }}>
                {chartData.length <= 1 ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        해당 월의 데이터가 없습니다.
                    </div>
                ) : (
                    <Chart
                        chartType="ColumnChart"
                        width="100%"
                        height="100%"
                        data={chartData}
                        options={options}
                    />
                )}
            </div>

            {/* 6. 모달 컴포넌트 props 변경 */}
            <EmotionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                emotionInfo={topEmotionInfo} // 이름과 색상이 담긴 객체 전달
            />
        </>
    );
}

export default Graph;