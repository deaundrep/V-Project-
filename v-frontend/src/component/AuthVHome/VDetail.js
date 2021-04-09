import React, { Component } from 'react'
import axios from "axios"

const recipeID = "7902536d";
const recipeKey = "35a44083dfc972140e0e16dd7a6d8388";

export class VDetail extends Component {
    state = {
      isLoading: false,
      recipeData: null,
      

    }

    componentDidMount = async () => {
        this.setState({
            isLoading: true,

        })
        try {
            let payload = await axios.get(
                `https://api.edamam.com/search?q=${this.props.match.params.recipe}&app_id=${recipeID}&app_key=${recipeKey}` 
            )
            let secRecipe = payload.data.hits.filter((item) =>{
              return this.props.match.params.recipe === item.recipe.label;
             })
             
            this.setState({
              recipeData: secRecipe[0],
                isLoading: false,
            })
            //console.log(payload)

        } catch (e) {
            console.log(e)
        }
    }

   oneRecipe = () => {
     

   }
    
    render() {
      console.log(this.props.match.params.recipe)
      console.log(this.state.recipeData)
      return (
        <>
          {this.state.recipeData ? (
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                <img className="card-image" src={this.state.recipeData.recipe.image} alt="food" />
                </div>
                <div className="col-md-6">
                  <h1>{this.state.recipeData.recipe.label}</h1>
                  <li>{this.state.recipeData.recipe.ingredientLines}</li>
                  <br></br>
                  <h5>Health Label</h5>
                  <p>{this.state.recipeData.recipe.healthLabels}</p>

                </div>

  
                
                  
                    
  
              
                      
                  
                </div>
              </div>
          ) : (
            <div>...Loading</div>
          )}
        </>
      );
    }
  }
export default VDetail

