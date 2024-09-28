import axios from 'axios'
import { auctionActions } from './slices'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";



const baseurl = 'https://auctionex-62baa-default-rtdb.firebaseio.com'

export const postItem = async (data) => {
    const storage = getStorage()
    const imgUrls = []
    const imageFiles = data.images
    try {
        for (let i = 0; i < imageFiles.length; i++) {
            const imageFile = imageFiles[i]
            const storageRef = ref(storage, `images/${imageFile.name}`)
            const snapshot = await uploadBytes(storageRef, imageFile)
            const downloadURL = await getDownloadURL(snapshot.ref)
            imgUrls.push(downloadURL);
        }
        console.log(imgUrls)
        const updatedData = { ...data, imgUrls }
        await axios.post(`https://auctionex-62baa-default-rtdb.firebaseio.com/auctionitems/${(data.category).toLowerCase()}.json`, { ...data, imgUrls })
        console.log('Data added', updatedData)
    }
    catch (error) {
        alert('something went wrong', error)
    }
}

export const retrieveItems = () => {
    return async (dispatch) => {
        let allItems
        await axios.get(`${baseurl}/auctionitems.json`)
            .then(resp => allItems = resp.data)
            .catch(err => console.log(err))

        //    console.log(allItems)
        let formateditems = {}

        for (let ceta in allItems) {
            const allitems = allItems[ceta]
            const items = []
            for (let item in allitems) {
                // console.log(item)
                items.push({ key: item, ...allitems[item] })
            }
            formateditems[ceta] = items
        }
        //    console.log(formateditems)

        dispatch(auctionActions.setItems(formateditems))


    }

}

export const placeBid = async (bid, item, bidder, cetagory) => {
    try {
        await axios.put(`${baseurl}/auctionitems/${cetagory.toLowerCase()}/${item}/startingBid.json`, bid)
        await axios.post(`${baseurl}/auctionitems/${cetagory.toLowerCase()}/${item}/recendBids.json`, {item: item, user:bidder, bid:bid})
        .then(resp=>console.log('Bid Places'))
        .catch(err =>console.log('Somthing went wrong. try agin placing the bid'))


    }
    catch (err) {
        alert('something went wrong', err)
    }
}

export const deleteItem =async (id, cetagory) =>{
    console.log(id, cetagory)
    await axios.delete(`${baseurl}/auctionitems/${cetagory.toLowerCase()}/${id}.json`)
    .then(resp=> console.log('deleted'))
    .catch(err => console.log('could not deleet', err))
}

// export const retriveRecentBids = (item, cetagory)=>{
//     return async (dispatch) => {
//         let allBids, formatedBidsData = []
//         await axios.get(`${baseurl}/auctionitems/${cetagory.toLowerCase()}/${item}/recendBids.json`)
//         .then(resp => allBids = resp.data)
//         .catch(err=>alert('Something went wrong while getting Bids'))
//         // console.log(allBids) 
        
//         Object.values(allBids).map(item=> formatedBidsData.push(item))


//         dispatch(auctionActions.setBids(formatedBidsData))
        


//     }
// }


