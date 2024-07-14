import React, { useContext, useEffect, useState } from 'react';
import './Category.css';
import { DesignContext } from '../../Context/DesignContext';

const Category = (props) => {
  const { all_designs, setAllDesigns } = useContext(DesignContext);
  const [localVotes, setLocalVotes] = useState({});

  useEffect(() => {
    const initialVotes = {};
    all_designs.forEach((design) => {
      initialVotes[design._id] = design.votes;
    });
    setLocalVotes(initialVotes);
  }, [all_designs]);

  const voteDesign = async (designId) => {
    try {
      const response = await fetch('http://localhost:4000/increasevotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'), // Assuming token is stored in localStorage
        },
        body: JSON.stringify({ id: designId }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to increase votes');
      }
  
      const updatedDesign = await response.json();
      console.log('Updated votes:', updatedDesign.votes);
  
      // Update local state for votes
      setLocalVotes((prevVotes) => ({
        ...prevVotes,
        [designId]: updatedDesign.votes,
      }));
  
      // Update all_designs context or state if necessary
      setAllDesigns((prevDesigns) =>
        prevDesigns.map((design) =>
          design._id === designId ? { ...design, votes: updatedDesign.votes } : design
        )
      );
    } catch (error) {
      console.error('Error voting:', error.message);
      // Handle error gracefully, show error message to the user if needed
    }
  };
  

  // Function to sort designs by votes in descending order
  const sortDesignsByVotes = () => {
    const sortedDesigns = [...all_designs].sort((a, b) => b.votes - a.votes);
    return sortedDesigns;
  };

  return (
    <div className="category">
      <p>
        <span>Showing 1-12</span> out of 30 results
      </p>

      <div className="designcategory-products">
        {sortDesignsByVotes().map((item, index) => {
          if (props.category === item.category.toLowerCase()) {
            return (
              <div className="designcategory-product" key={index}>
                <img src={item.image} alt="" />
                <div className="designcategory-product-info">
                  <p>{item.name}</p>
                  <p>{item.gender}</p>
                  <p>{item.category}</p>
                  <p>Votes: {localVotes[item._id] || item.votes}</p>
                  <button onClick={() => voteDesign(item._id)}>
                    Vote
                  </button>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Category;
