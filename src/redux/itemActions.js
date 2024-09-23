import axios from 'axios'
import {auctionActions} from './slices'


const baseurl = 'https://auctionex-62baa-default-rtdb.firebaseio.com'

export const postItem =async (data) => {
    try{
        await axios.post(`https://auctionex-62baa-default-rtdb.firebaseio.com/auctionitems/${(data.category).toLowerCase()}.json`, data)
        console.log('Data added', data)
    }
    catch(error){
        alert('something went wrong', error)
    }
}

export const retrieveItems = () => {
    return async (dispatch) =>{
        let allItems
        await axios.get(`${baseurl}/auctionitems.json`)
       .then(resp => allItems = resp.data) 
       .catch(err=>console.log(err))

    //    console.log(allItems)
       let formateditems = {}

       for(let ceta in allItems){
        const allitems = allItems[ceta]
        const items = []
        for(let item in allitems){
            // console.log(allitems[item])
            items.push({key: item ,...allitems[item]})
        }
        formateditems[ceta] = items
       }
    //    console.log(formateditems)

       dispatch(auctionActions.setItems(formateditems))


    }

}