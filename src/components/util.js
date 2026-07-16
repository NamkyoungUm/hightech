import emotion1 from '../assets/emotion1.png'
import emotion2 from '../assets/emotion2.png'
import emotion3 from '../assets/emotion3.png'
import emotion4 from '../assets/emotion4.png'
import emotion5 from '../assets/emotion5.png'

export const getEmotionImgById = (emotionId) => {
    switch (emotionId) {
        case 1: return emotion1;
        case 2: return emotion2;
        case 3: return emotion3;
        case 4: return emotion4;
        case 5: return emotion5;
        default: return null;
    }
}

export const emotionList = [
    { id: 1, name: "완전 좋은 하루", img: getEmotionImgById(1) },
    { id: 2, name: "좋은 하루", img: getEmotionImgById(2) },
    { id: 3, name: "그럭저럭한 하루", img: getEmotionImgById(3) },
    { id: 4, name: "나쁜 하루", img: getEmotionImgById(4) },
    { id: 5, name: "최악의 하루", img: getEmotionImgById(5) }
]


export const getFormattedDate = (targetDate) => {
    let year = targetDate.getFullYear();
    let month = targetDate.getMonth() + 1;
    let date = targetDate.getDate();
    if (month < 10) month = `0${month}`;
    if (date < 10) date = `0${date}`;
    return `${year}-${month}-${date}`;
}

export const getMonthRangeByDate = (date) => {
    const beginTimeStamp = new Date(date.getFullYear(), date.getMonth(), 1);
    const endTimeStamp = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59);
    return { beginTimeStamp, endTimeStamp }
}