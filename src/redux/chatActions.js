import axios from 'axios'
import { auctionActions } from './slices';

export const sendMessage = async (itemId, message, senderId, category) => {
    try {
        const response = await axios.post(
            `https://auctionex-62baa-default-rtdb.firebaseio.com/auctionitems/${category.toLowerCase()}/${itemId}/chats.json`,
            {
                senderId,
                message,
                timestamp: new Date().toISOString(),
            }
        );
        console.log("Data added", JSON.stringify({
            senderId,
            message,
            timestamp: new Date().toISOString(),
        }))
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};

export const getMessages = (itemId, category) => {
    return async (dispatch) => {
            let chats = {}
            await axios.get(
            `https://auctionex-62baa-default-rtdb.firebaseio.com/auctionitems/${category.toLowerCase()}/${itemId}/chats.json`)
            .then(response => chats = response.data)
            .catch(err=>console.log(err))

            dispatch(auctionActions.setChats(Object.values(chats)))

    }
}