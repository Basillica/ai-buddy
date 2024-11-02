import { Router, Route, Routes } from "@solidjs/router";
import "./App.css";

import { SignInPage, ManageUserPage, InviteUserPage, UserProfilePage } from "./pages/user";
import { BasePage, HomePage, StudyPlansPage } from "./pages/general";
import { NotFoundPage, NotAllowed } from "./pages/utils";
import { MainPageIot, SubPageIot } from "./pages/iot";

function App() {
    return (
        <div class="container">
            <Router>
                <Routes>
                    <Route path="/" element={<SignInPage />}></Route>
                    <Route path="/home" element={<BasePage />}>
                        <Route path={"/"} element={<HomePage />}></Route>
                        <Route path={"/:id"} element={<StudyPlansPage />}></Route>

                        <Route path={"/invite"} element={<InviteUserPage />}></Route>
                        <Route path={"/profile"} element={<UserProfilePage />}></Route>
                        <Route path="/account">
                            <Route path={"/manage"} element={<ManageUserPage />}></Route>
                            <Route path={"/invite"} element={<InviteUserPage />}></Route>
                            <Route path={"/profile"} element={<UserProfilePage />}></Route>
                        </Route>
                        <Route path={"/iot"}>
                            <Route path={"/main"} element={<MainPageIot />}></Route>
                            <Route path={"/sub"} element={<SubPageIot />}></Route>
                        </Route>
                    </Route>
                    <Route path="*" element={<NotFoundPage />} />
                    <Route path="not-allowed" element={<NotAllowed />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
