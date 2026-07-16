import { useNavigate, useParams } from "react-router-dom";
import { getFormattedDate, setPageTitle } from "./util";
import useDiary from "../hooks/useDiary";
import Header from "./Header";
import Button from "./Button";
import Viewer from "./Viewer";

const Diary = () => {
    useEffect(() => { setPageTitle("감정 일기장 : 보기"); }, []);
    const { id } = useParams();
    const data = useDiary(id);
    const navigate = useNavigate();

    const goBack = () => { navigate(-1); }
    const goEdit = () => { navigate(`/edit/${id}`) }

    // console.log(id);

    if (!data) return <div>일기를 불러오고 있습니다...</div>
    else {
        const { id, date, content, emotionId } = data;
        const title = `${getFormattedDate(new Date(Number(date)))} 기록`;

        return (
            <div>
                <Header
                    title={title}
                    leftchild={<Button text={'< 뒤로 가기'} onClick={goBack} />}
                    rightchild={<Button text={'수정하기'} onClick={goEdit} />}
                />
                <Viewer emotionId={emotionId} content={content} />
            </div >
        );
    }
}
export default Diary;