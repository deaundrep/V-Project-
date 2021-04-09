import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import  "./VDetail.css";
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
const recipeID = "7902536d";
const recipeKey = "35a44083dfc972140e0e16dd7a6d8388";
export class AuthVHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vInput: "",
            vArray: [],
            isLoading: false,
            isError: false,
            errorMessage: "",
        };
    }
    async componentDidMount() {
        // let randomTitle = ["vegan", "veggie"];
        // let randomSelectedTitle = Math.floor(Math.random() * randomTitle.length);
        this.setState({
            isLoading: true,
        });
        try {
            let vData = `https://api.edamam.com/search?q=${this.state.vInput}&app_id=${recipeID}&app_key=${recipeKey}`;
            let payload = await axios.get(vData);
            //console.log(payload);
            this.setState({
                vArray: payload.data.hits,
                isLoading: false,
                vInput: "",
            })
        } catch (e) {
            console.error(e);
        }
    }
    componentWillUnmount() {
        if (this.state.isLoading) {
            source.cancel("Operation canceled by the user.");
        }
    }
    handleVInput = (event) => {
        this.setState({
            vInput: event.target.value,
            isError: false,
            errorMessage: "",
        });
    };
    handleSearchVClick = async (event) => {
        if (this.state.vInput.length === 0) {
            this.setState({
                isError: true,
                errorMessage: "Sorry, please enter a food title",
                vInput: "",
            });
            return;
        }
        this.setState({
            isLoading: true,
        });
        try {
            let vData = `https://api.edamam.com/search?q=${this.state.vInput}&app_id=${recipeID}&app_key=${recipeKey}`;
            let payload = await axios.get(vData);
            this.setState({
                vArray: payload.data.hits,
                isLoading: false,
                vInput: "",
            });
        } catch (e) { }
    };
    handleSearchOnEnter = async (event) => {
        if (this.state.vInput.length === 0) {
            this.setState({
                isError: true,
                errorMessage: "Sorry, please enter a food title",
            });
            return;
        }
        if (event.key === "Enter") {
            this.setState({
                isLoading: true,
            });
            try {
                let payload = await axios.get(
                    `https://api.edamam.com/search?q=&app_id=${recipeID}&app_key=${recipeKey}${this.state.vInput}`
                    );
                    console.log(payload)
                this.setState({
                    vArray: payload.data.hits,
                    isLoading: false,
                    vInput: "",
                });
            } catch (e) { }
        }
    };
    showVArrayList = () => {
        return this.state.vArray.map((recipe) => {
            console.log(recipe)
            return (
                <div className="col-sm-6" key={recipe.recipe.label}>
                    <div className="card">
                        <div>
                            <img src={recipe.recipe.image} />
                        </div>
                        <Link
                            to={{
                                pathname: `/v-detail/${recipe.recipe.label}`,
                                recipeData: recipe.recipe
                            }}
                        >
                            <h5 className="card-name">{recipe.recipe.label}</h5>
                        </Link>
                    </div>
                </div>
            );
        });
    };
    render() {
        return (
            
            <div 
            style={{ marginTop: 50, textAlign: "center" }}
            
            >
                <h2>Go Green !!! 🌱 </h2>
                <input
                    style={{ width: 450 }}
                    name="vInput"
                    value={this.state.vInput}
                    onChange={this.handleVInput}
                    onKeyPress={this.handleSearchOnEnter}
                />
               
                <br />
                
                <button
                    onClick={this.handleSearchVClick}
                    style={{ margin: "25px 25px" }}
                    className="search"
                   
                >
                    Search
        </button>

        <div className="myImage"> </div>
        
                <div>
                    {this.state.isError && (
                        <span style={{ color: "red" }}>{this.state.errorMessage}</span>
                    )}
                </div>
                {this.state.isLoading ? (
                    <div>...loading</div>
                ) : (
                        <div className="row">{this.showVArrayList()}</div>
                    )}
                    
            </div>
        
        );
    }
}
export default AuthVHome;