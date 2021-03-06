import React from "react";
import axios from "axios";
import {store} from "../redux/store";
import {connect} from "react-redux";
import {showShadowModal, showInfoWindow} from "../redux/actions";
import Header from "./Header";
import ConfirmWindow from "./windows/ConfirmWindow";
import InfoWindow from "./windows/InfoWindow";
import LoadingWindow from "./windows/LoadingWindow";
import ShadowModal from "./windows/ShadowModal";
import CookiesWindow from "./windows/CookiesWindow";
import Login from "./Login";
import TaskList from "./TaskList";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.knockKnock = this.knockKnock.bind(this);
        this.loadingWindow = React.createRef();
        this.login = React.createRef();
        this.taskList = React.createRef();
    }

    knockKnock(path, func, sendData) {
        //TODO make refactor on knockKnock, maybe it may need to some changes
        const req = axios.default;
        this.loadingWindow.current.showWindow();
        req.post(path, sendData)
            .then((response) => {
                this.loadingWindow.current.hideWindow();
                if (response.headers['content-type'] === 'application/json') {
                    func(response);
                }
            })
            .catch((error) => {
                this.loadingWindow.current.hideWindow();
                console.log(error);
                console.log(error.response);
                if (error.response.status === 401 && error.config.url === '/user_login') {
                    func(error.response);
                } else if (error.response.status === 401 && error.config.url !== '/auth_check') {
                    console.log(error.config.url);
                    this.login.current.forceLogOut();
                    this.props.dispatch(showInfoWindow(true, localisation['error_messages']['authorisation_error']));
                } else if (error.response.status === 403) {
                    store.dispatch(showShadowModal(true));
                    store.dispatch(showInfoWindow(true, error.response.data['error_message']));
                }
                else if (error.response.status) {
                    func(error.response);
                }
                // func(error.response);
            })
    }

    render() {
        return (
            <div className={'app'} id={'app'}>
                <Header login={this.login} taskList={this.taskList}/>
                <ConfirmWindow/>
                <InfoWindow/>
                <LoadingWindow ref={this.loadingWindow}/>
                <CookiesWindow/>
                <Login app={this} ref={this.login}/>
                <TaskList app={this} login={this.login} ref={this.taskList}/>
                <ShadowModal/>
            </div>
        )
    }
}

export default connect()(App);