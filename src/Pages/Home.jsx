import Header from '../Components/Header';
import Slide from '../Components/Slide';
// import Category from '../Components/Category';
// import Products from './Products';
import Product from '../Components/Product';
import Footer from '../Components/Footer';



const Home = () => {

    // const { loggedUser } = useContext(UserContext);
    // console.log(loggedUser);
    return (
        <div>
            {/* <p>
                {loggedUsers}
            </p> */}
            <Header />
            <Slide />
            {/* <div className='category'>
                <span className='homeSpan' style={{ color: '#0199cb', fontSize: '25px' }}>Category</span>
            </div> */}
            {/* <Category /> */}
            <div className='category'>
                <span className='homeSpan' style={{ color: '#0199cb', fontSize: '25px' }}>Products</span>
            </div>
            <Product />
            <Footer />

        </div>
    );
};

export default Home;