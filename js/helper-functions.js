const fetchData = async function (endPoint) {
    try {
        const response = await fetch(endPoint);
        if (!response.ok) {
            throw new Error('Something went wrong');
        }
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.log(err);
    }
};

export default fetchData;
