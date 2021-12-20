import {useMoralisDapp} from "providers/MoralisDappProvider/MoralisDappProvider"
import { Menu } from "antd";
import React from "react";
import glStyles from "./gstyles"

const Categories = ({categories}) => {
    const { setSelectedCategory } = useMoralisDapp();

    function selectCategory(categoryId) { // Take the categoryId variable as a param/prop for the category that is selected/will be selected
        const setSelectedCategory = categories.filter((category) => category["categoryId"] === categoryId);
        setSelectedCategory(selectCategory[0]);
    }
    return (
        <div className="col-lg-3">
            <Menu
            onClick={(e) => selectCategory(e.key)}
            style={{ ...glStyles.card, padding: "10 px 0"}} // Content of gstyles.js, except a different padding
            mode="inline">
                <Menu.ItemGroup key="categories" title="Categories">
                    {categories.map((category) => (
                        <Menu.Item key={category["categoryId"]}>{category["category"]}</Menu.Item>
                    ))}
                </Menu.ItemGroup>
            </Menu>
        </div>
    )
}

export default Categories