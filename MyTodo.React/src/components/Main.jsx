import {useState} from "react";
import TodoInput from "./Todo/TodoInput";
import TodoList from "./Todo/TodoList";
import CategoriesInput from "./Categories/CategoriesInput";
import CategoriesList from "./Categories/CategoriesList";
import {Container, Tab, Tabs} from "react-bootstrap";
import {EVENT_KEY_CATEGORIES, EVENT_KEY_TODOS, TAB_NAME_CATEGORIES, TAB_NAME_TODOS} from "../redux/constants.js";

const Main = () => {
    const [activeTab, setActiveTab] = useState(EVENT_KEY_TODOS);

    return (
        <Container className="main__container mt-5">
            <Tabs classname=""
                  activeKey={activeTab}
                  onSelect={(k) => setActiveTab(k)}
            >
                <Tab eventKey={EVENT_KEY_TODOS} title={TAB_NAME_TODOS}>
                    <TodoInput/>
                    <TodoList/>
                </Tab>
                <Tab eventKey={EVENT_KEY_CATEGORIES} title={TAB_NAME_CATEGORIES}>
                    <CategoriesInput/>
                    <CategoriesList/>
                </Tab>
            </Tabs>
        </Container>
    );
};

export default Main;
