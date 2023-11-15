import React from 'react';
import Women from '../images/women.jpg';
import Men from '../images/mensnewo.jpg';
import Kids from '../images/Kids.jpg';


const Category = () => {
    return (
        <div className='categoryContainer'>
            <div className='category'>
                <img src={Women} alt="Women category" width={300} height={300} style={{ borderRadius: "50%" }} />
                <span className='categorySpan'>Women's Clothing</span>
            </div>
            <div className='category'>

                <img src={Men} alt="Men's category" width={300} height={300} style={{ borderRadius: "50%" }} />
                <span className='categorySpan'>Men's Clothing</span>

            </div>
            <div className='category'>
                <img src={Kids} alt="Women category" width={300} height={300} style={{ borderRadius: "50%" }} />
                <span className='categorySpan'>Kid's Clothing</span>
            </div>
        </div>
    );
};

export default Category;