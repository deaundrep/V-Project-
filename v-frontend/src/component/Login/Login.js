import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import { checkIsUserLoggedIn } from "../lib/helper";
import "./Login.css"


export class Login extends Component {
    state = {
        email: "",
        password: "",
    };

    componentDidMount() {
        if (checkIsUserLoggedIn()) {
            this.props.history.push("/v-home");
        } else {
            this.props.history.push("/login");
        }
    }

    handleLogin = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    handleLoginSubmit = async (event) => {
        event.preventDefault();

        try {
            let result = await axios.post("http://localhost:3003/users/login", {
                email: this.state.email,
                password: this.state.password,
            });

            localStorage.setItem("jwtToken", result.data.jwtToken);

            let decodedJWTToken = jwtDecode(result.data.jwtToken);

            this.props.handleUserLogin(decodedJWTToken);

            this.props.history.push("/v-home");
        } catch (e) {
            toast.error(e.response.data, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    render() {
        const { email, password } = this.state;
        return (
            <div className=" text-center">
                <main className=" form-signin">
                    <form onSubmit={this.handleLoginSubmit}>
                    <img class="mb-4" src="https://manfonhealth.files.wordpress.com/2013/01/nutrition.jpg" alt="300" width="300" height="300"></img>
                        <h1 className="h3 mb-3 fw-normal">Please login</h1>

                <label htmlFor="inputEmail" className=" form-floating"  >
                Email address:
                </label>
        <input
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Email address"
            required
            autoFocus
            name="email"
            value={email}
            onChange={this.handleLogin}

            />
        
        <label htmlFor="inputPassword" className="form-floating">
            Password:
            </label>
                        <input
                            type="text"
                            id="inputPassword"
                            className="form-control"
                            placeholder="Password"
                            required
                            name="password"
                            value={password}
                            onChange={this.handleLogin}
                        />
                        <button className="w-100 btn btn-lg btn-success" type="submit">
                            Login
            </button>

                    </form>
                </main>
                
            </div>
        );
    }
}

export default Login;