import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
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
            onlyVegan: false
        };
    }

    async componentDidMount() {
        let randomTitle = ["vegan", "veggie"];
        let randomSelectedTitle = Math.floor(Math.random() * randomTitle.length);
        this.setState({
            isLoading: true,
        });

        try {
            let vData = `https://api.edamam.com/search?q=${this.state.vInput}&app_id=${recipeID}&app_key=${recipeKey}&health=vegetarian`;
            let payload = await axios.get(vData);
            console.log(payload);
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
            console.log(payload);
            if (vData.data?.Response === "False") {
                this.setState({
                    isLoading: false,
                    isError: true,
                    errorMessage:
                        "Sorry, No such food exists. Please search another one",
                });
                return;
            }
            this.setState({
                vArray: vData.data.Search,
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
                let vData = await axios.get(
                    `https://api.edamam.com/search?q=&app_id=${recipeID}&app_key=${recipeKey}${this.state.vInput}`
                );
                if (vData.data?.Response === "False") {
                    this.setState({
                        isLoading: false,
                        isError: true,
                        errorMessage:
                            "Sorry, No such food exists. Please search another one",
                    });
                    return;
                }
                this.setState({
                    vArray: vData.data.Search,
                    isLoading: false,
                    vInput: "",
                });
            } catch (e) { }
        }
    };
    showVArrayList = () => {
        return this.state.vArray.map((item) => {
            return (
                <div className="col-sm-4" key={item.imdbID}>
                    <div className="card">
                        <div>
                            <img
                                className="card-img-top"
                                src={item.Poster}
                                alt={item.Title}
                                style={{ width: 250, height: 250 }}
                            />
                        </div>
                        <Link
                            to={{
                                pathname: `/v-detail/${item.Title}`,
                            }}
                        >
                            <h5 className="card-title">{item.Title}</h5>
                        </Link>
                    </div>
                </div>
            );
        });
    };
    render() {
        return (
            <div style={{ marginTop: 50, textAlign: "center" }}>
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
                >
                    Search
        </button>
                <div>
                    {this.state.isError && (
                        <span style={{ color: "red" }}>{this.state.errorMessage}</span>
                    )}
                </div>
                {this.state.isLoading ? (
                    <div>knn</div>
                ) : (
                        <div className="row">{this.showVArrayList()}</div>
                    )}
            </div>
        );
    }
}
export default AuthVHome;

