import './Button.css'
const Button = ({ text, type = "default", onClick }) => {
    return (
        <>
            <button className={`Button Button_${type}`}
                onClick={onClick}>{text}</button>
        </>
    );
}

export default Button;