import React, { useState } from 'react';
import './Login.css';
import { validateUser } from '../../../service/UserService';

const useStateWithLocalStorage = localStorageKey => {
    const [value, setValue] = React.useState(
        localStorage.getItem(localStorageKey) || []
    );

    React.useEffect(() => {
        localStorage.setItem(localStorageKey, value);
    }, [value]);

    return [value, setValue];
};

const Login = (props) => {
    const [data, setData] = useStateWithLocalStorage("currentUser");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleChange = event => {
        switch (event.target.name) {
            case "email": setEmail(event.target.value);
                break;
            case "password": setPassword(event.target.value);
                break;
        }        
    }

    const handleSubmit = event => {
        //event.preventDefault();

        try {
            const response = validateUser(email, password);
            if (response.status === 200) {
                setData(response.data);
                console.log('Date fetched! -> ' + response.data);
                alert('Login Successful!!');
            }
        } catch (error) {
            alert('Login Unsuccessful!!');
            throw error;
        }
    }

    return (
        <div className="container fadeInDown">
            <div className="d-flex justify-content-center">
                <div className="user_card">
                    <div className="d-flex justify-content-center">
                        <div className="brand_logo_container">
                            <img src="https://icon-library.com/images/health-food-icon/health-food-icon-17.jpg" className="brand_logo" alt="Logo" />
                        </div>
                    </div>
                    <div className="d-flex justify-content-center form_container">
                        <form onSubmit={handleSubmit}>
                            <div className="input-group mb-3">
                                <input type="text" name="email" className="form-control input_user" value={email} placeholder="username" onChange={handleChange} />
                            </div>
                            <div className="input-group mb-2">
                                <input type="password" name="password" className="form-control input_pass" value={password} placeholder="password" onChange={handleChange} />
                            </div>
                            <div className="d-flex justify-content-center mt-3 login_container">
                                <button type="submit" name="submit" className="btn login_btn">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;