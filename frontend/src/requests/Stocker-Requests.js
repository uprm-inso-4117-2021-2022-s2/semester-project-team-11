import { hosts } from '../../src/config/hosts';

export async function fetchUserStocks(id, setFunction) {
    try{
        const response = await fetch(`${hosts['heroku']}/stocker/stock/savedStocks/${id}`)
        const data = await response.json()
        setFunction(data.map(d => d.symbol[0]))
    }
    catch(e){
        console.log("Error");
        console.log(e)
    }
}