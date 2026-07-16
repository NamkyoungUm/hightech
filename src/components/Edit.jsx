import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";
import { setPageTitle } from "./util";

import useDiary from "../hooks/useDiary";
import Header from "./Header";
import Button from "./Button";
import Editor from "./Editor";

const Edit = () => {
    useEffect(() => { setPageTitle("감정 일기장 : 수정"); }, []);
    const { onUpdate, onDelete } = useContext(DiaryDispatchContext);
    const { id } = useParams();
    const data = useDiary(id);
    const navigate = useNavigate();

    const goBack = () => { navigate(-1); }

    const onSubmit = (data) => {
        if (window.confirm("일기를 정말 수정할가요?")) {
            const { date, content, emotionId } = data;
            onUpdate(Number(id), date, content, emotionId);
            navigate("/", { replace: true });
        }
    }

    const onClickDelete = () => {
        if (window.confirm("일기를 정말 삭제할가요? 삭제시 복구가 불가합니다.")) {
            onDelete(Number(id));
            navigate("/", { replace: true });
        }
    }

    if (!data) return <div>일기를 불러오고 있습니다...</div>
    else {
        return (
            <div>
                <Header title={"일기 수정하기"}
                    leftchild={<Button text={"< 뒤로 가기"} onClick={goBack} />}
                    rightchild={<Button text={"삭제하기"} type={"negative"} onClick={onClickDelete} />}
                />
                <Editor initData={data} onSubmit={onSubmit}></Editor>
            </div>
        );
    }

}
export default Edit;