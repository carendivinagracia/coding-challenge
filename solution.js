const { promises } = require('fs');

function getLargestNum(collection) {
    let largestNum = 0;

    collection.forEach((val) => {
        if (val > largestNum) {
            largestNum = val;
        }
    });

    return largestNum;
}

function getLargestNumbersDirections(groupedCollection, largestNum) {
    const largestNumbersDirections = [];
    const castLargestNumStr = largestNum.toString();

    groupedCollection.forEach((collection, rowIndex) => {
        if (collection.includes(castLargestNumStr)) {
            const largestNumRowIndex = collection.indexOf(castLargestNumStr);
            let largestNumDirection = {
                rowIndex,
                largestNumRowIndex,
                north: 0,
                south: 0,
                east: 0,
                west: 0,
            };
            
            largestNumDirection.north = groupedCollection[rowIndex - 1] ? 
                parseInt(groupedCollection[rowIndex - 1][largestNumRowIndex]) : 0;
            largestNumDirection.south = groupedCollection[rowIndex + 1] ? 
                parseInt(groupedCollection[rowIndex + 1][largestNumRowIndex]) : 0;
            largestNumDirection.east = groupedCollection[rowIndex][largestNumRowIndex + 1] ? 
                parseInt(groupedCollection[rowIndex][largestNumRowIndex + 1]) : 0;
            largestNumDirection.west = groupedCollection[rowIndex][largestNumRowIndex - 1] ? 
                parseInt(groupedCollection[rowIndex][largestNumRowIndex - 1]) : 0;

            largestNumbersDirections.push(largestNumDirection);
        }
    });

    return largestNumbersDirections;
};

async function generateBestMapRoute(filename) {
    try {
        const contents = await promises.readFile(filename, 'utf-8');
        const arr = contents.split(/\n/);

        const groupArrByRow = arr.map((val) => val.split(" "));
        groupArrByRow.splice(0, 1);

        const concatenatedRows = [];
        groupArrByRow.forEach((row) => {
            const rowIntArr = row.map((rowVal => parseInt(rowVal)));
            concatenatedRows.push(...rowIntArr);
        });

        const largestNum = getLargestNum(concatenatedRows);
        const largestNumbersDirections = getLargestNumbersDirections(groupArrByRow, largestNum);

        console.log(largestNumbersDirections);
    } catch (err) {
        console.log(err);
    }
}

generateBestMapRoute('./instructions/map.txt');