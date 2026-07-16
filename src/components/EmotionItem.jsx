import './EmotionItem.css';
const EmotionItem = ({ id, name, img, onClick, isSelected }) => {
    const handleOnClick = () => {
        onClick(id);
    }

    return (
        <>
            <div className={`EmotionItem ${isSelected ? `EmotionItem_on_${id}` : `EmotionItem_off`}`}
                onClick={handleOnClick}>
                <img alt={`emotion${id}`}
                    src={img} />
                <span>{name}</span>
            </div >
        </>
    );
}
export default EmotionItem;