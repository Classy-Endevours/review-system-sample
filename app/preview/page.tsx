"use client";

import { Render } from "@measured/puck";
import config from "../../config";
import { PDFContainer } from "../components/PDFContainer";

function Preview() {
    const newData = typeof window !== "undefined" && JSON.parse(localStorage.getItem("puck") as string);

    return <PDFContainer>
        <Render config={config} data={newData} />;
    </PDFContainer>
}

export default Preview;