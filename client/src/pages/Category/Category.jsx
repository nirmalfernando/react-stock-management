import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import './Category.css';
import { IoFastFoodOutline } from "react-icons/io5";
import { FaMobile } from "react-icons/fa6";
import { GiBookshelf, GiLipstick } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';


const Category = ({ changeActiveTab1 }) => {

  const navigate = useNavigate();

  const handleFoodClick = (e) => {
    navigate()
    e.preventDefault();
    console.log('Login clicked');
  };

  const handleFancyClick = (e) => {
    navigate()
    e.preventDefault();
    console.log('Login clicked');
  };

  const handleStatClick = (e) => {
    navigate()
    e.preventDefault();
    console.log('Login clicked');  };

  const handleMobileClick = () => {
    navigate('/inventory')
    
  };
  

  return (
    <div className="dashboard-container">
      <div className="overview">
        <Card className="card6" onClick={handleMobileClick}>
          <CardContent>
            <Typography variant="h5" component="h2">
              <FaMobile style={{ fontSize: "4rem" }} />Mobile phones and Accessories
            </Typography>
          </CardContent>
        </Card>

        <Card className="card6" onClick={handleStatClick}>
          <CardContent>
            <Typography variant="h5" component="h2">
              <GiBookshelf style={{ fontSize: "4rem" }} />Stationaries
            </Typography>
          </CardContent>
        </Card>

        <Card className="card6" onClick={handleFancyClick}>
          <CardContent>
            <Typography variant="h5" component="h2">
              <GiLipstick style={{ fontSize: "4rem" }} />Fancy item
            </Typography>
          </CardContent>
        </Card>

        <Card className="card6" onClick={handleFoodClick}>
          <CardContent>
            <Typography variant="h5" component="h2">
              <IoFastFoodOutline style={{ fontSize: "4rem" }} />Food court
            </Typography>
          </CardContent>
        </Card>
      </div>
      
    </div>
  );
};

export default Category;
