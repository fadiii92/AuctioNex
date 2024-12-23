import axios from 'axios'
import { auctionActions } from './slices'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";



const baseurl = 'https://auctionex-62baa-default-rtdb.firebaseio.com'

const imgConversion = async (images) => {
    try {
      const storage = getStorage();
      const imgUrls = [];
      const imageFiles = images;
    
      for (let i = 0; i < imageFiles.length; i++) {
        const imageFile = imageFiles[i];
        const storageRef = ref(storage, `images/${imageFile.name}`);
    
        const snapshot = await uploadBytes(storageRef, imageFile);
        const downloadURL = await getDownloadURL(snapshot.ref);
         
        imgUrls.push(downloadURL);
      }
        return imgUrls;
    } catch (error) {
      console.error('Error during image conversion:', error);
      throw new Error('Image conversion failed'); 
    }
  };
  

export const postItem = async (data) => {
   
    try {
        const imgUrls =await imgConversion(data.images)
        const updatedData = { ...data, imgUrls }
        await axios.post(`https://auctionex-62baa-default-rtdb.firebaseio.com/auctionitems/${(data.category).toLowerCase()}.json`, { ...data, imgUrls, startingBid:data.startingBid })
        console.log('Data added', updatedData)
    }
    catch (error) {
      throw new Error('Post Item failed'); 
    }
}

export const retrieveItems = () => {
    return async (dispatch) => {
        let allItems
        await axios.get(`${baseurl}/auctionitems.json`)
            .then(resp => allItems = resp.data)
            .catch(err => {throw new Error("Could not retrieve items")})

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
        //    console.log(formateditems.furniture)

        dispatch(auctionActions.setItems(formateditems))


    }

}

export const placeBid = async (bid, item, bidder, cetagory, itemOwner) => {
        await axios.put(`${baseurl}/auctionitems/${cetagory.toLowerCase()}/${item}/startingBid.json`, bid)
        await axios.post(`${baseurl}/auctionitems/${cetagory.toLowerCase()}/${item}/recentBids.json`, {item: item, user:bidder, bid:bid, owner:itemOwner})
        .then(resp=>console.log('Bid Places'))
        .catch(err =>{throw new Error("Could not place Bid, Some thing went wrong")})


}

export const deleteItem =async (id, cetagory) =>{
    console.log(id, cetagory)
    await axios.delete(`${baseurl}/auctionitems/${cetagory.toLowerCase()}/${id}.json`)
    .then(resp=> console.log('deleted'))
    .catch(err => {throw new Error("Could not delete item")})
}


export const editItem = async (item, data) => {
    try {
      let imgUrls, updatedData = data;
      if((data.images).length > 0)
      {
         imgUrls = await imgConversion(data.images);      
         updatedData = { ...data, imgUrls };

      }
  
      await axios.patch(`${baseurl}/auctionitems/${data.category.toLowerCase()}/${item}.json`, updatedData);
      
      console.log('Item edited successfully');
    } catch (err) {
      throw new Error("Could not edit item, something went wrong")
    }
    
    // Log item and data after all operations are complete
    console.log(item, data);
  }



  export const handleWinner =async (winner, cetagory)=>{
    await axios.post(`${baseurl}/auctionitems/${cetagory.toLowerCase()}/${winner.item}/winner.json`, winner)
    .then(resp=>'Winner Decided')
  .catch(err => {throw new Error("Something went wrong, Could not announce winner")})
  }




