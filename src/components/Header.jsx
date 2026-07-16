import './Header.css'
const Header = ({ leftchild, title, rightchild }) => {
    return (
        <>
            <div className='Header'>
                <div className='header_left'>{leftchild}</div>
                <div className='header_title'>{title}</div>
                <div className='header_right'>{rightchild}</div>
            </div>
        </>
    );

}
export default Header;