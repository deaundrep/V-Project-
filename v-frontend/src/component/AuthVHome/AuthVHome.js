import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

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
        let randomTitle = ["vegan", "veggie", "vegetarian ", "vegetable"];
        let randomSelectedTitle = Math.floor(Math.random() * randomTitle.length);
        this.setState({
            isLoading: true,
        });
        try {
            let vData = await axios.get(
                `https://www.edamam.com//?apikey=b90a2f8b3a1bcb7ba21d19d4c285f715	
&s=${randomTitle[randomSelectedTitle]}`,
                {
                    cancelToken: source.token,
                }
            );
            this.setState({
                vArray: vData.data.Search,
                isLoading: false,
                vInput: "",
            });
        } catch (e) {
            console.log(e);
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
            let vData = await axios.get(
                `https://www.edamam.com//?apikey=b90a2f8b3a1bcb7ba21d19d4c285f715	
&s=${this.state.vInput}`
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
                    `https://www.edamam.com//?apikey=b90a2f8b3a1bcb7ba21d19d4c285f715	
&s=${this.state.vInput}`
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
                    name="VInput"
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
                    <div>...Loading</div>
                ) : (
                        <div className="row">{this.showVArrayList()}</div>
                    )}
            </div>
        );
    }
}
export default AuthVHome;

