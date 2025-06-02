import fs from "fs"
import path from "path";
import { TestData } from "../interface/testData.interface";

export async function loadJSONTestData() {
    // const environment = `${process.env.ENV}` || 'qa';
    const environment = `${process.env.EXEC_ENV}`;
    const directoryPath = path.join(__dirname, '../../test-data', environment)

    const jsonData: TestData = {};
    fs.readdirSync(directoryPath).forEach(file => {
        if (path.extname(file) === '.json') {
            const filePath = path.join(directoryPath, file);
            const fileContent: TestData = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
            Object.assign(jsonData, fileContent) //merge the content in a single object
        }
    });
    return jsonData;
}