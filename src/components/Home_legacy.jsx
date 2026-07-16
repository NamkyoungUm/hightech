import { useSearchParams } from "react-router-dom";
import Button from "./Button";
import Header from "./Header";
import Editor from "./Editor";

const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    console.log(searchParams);
    console.log(searchParams.get("sort"));

    return (
        <>
            <div>
                <Header
                    title={"Home"}
                    leftchild={
                        <Button text={"긍정버튼"} type="positive" onClick={() => { alert("Home긍정버튼클릭") }} />
                    }
                    rightchild={
                        <Button text={"부정버튼"} type="negative" onClick={() => { alert("Home부정버튼클릭") }} />
                    } />
                <div>
                    <Editor initData=
                        {{
                            date: new Date().getTime(),
                            emotionId: 1,
                            content: "이전에 작성한 내용"
                        }}
                        onSubmit={() => { alert("작성완료 버튼 클릭!") }} />
                </div>
            </div>
        </>
    );
}
export default Home;