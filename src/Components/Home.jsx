import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useDispatch, useSelector } from "react-redux";
import { retrieveItems } from "../redux/itemActions";
import ParentCard from "../miniComponents/ParentCard";
import AuctionCard from "../miniComponents/AuctionCard";
import { Link, useLocation, useParams } from "react-router-dom";
import useSearch from "../context/searchContext";

function Home() {
  const { currentUser } = useContext(AuthContext);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { cetagory } = useParams();
  const { searchQuery } = useSearch();

  useEffect(() => {
    dispatch(retrieveItems());
  }, [dispatch]);

  const ItemsInStore = useSelector((state) => state.auctionDataReducer.auctionItems);

  const allItems = searchQuery
    ? Object.values(ItemsInStore).map((category) =>
      category.filter((item) =>
        item.itemTitle.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
    : ItemsInStore;

  return (
    <>
      <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 text-center my-4">
        Auction Items
      </h2>

      {pathname === '/' ? (
        <ParentCard className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {Object.values(allItems).map((category) =>
            category
              .filter((item) => item.itemOwner !== currentUser.uid)
              .map((item) => (
                <Link
                  key={item.key}
                  to={`/allItems/${item.key}`}
                  className="block hover:bg-gray-100 transition-colors duration-200 p-2 rounded-lg"
                >
                  <AuctionCard
                    id={item.key}
                    category={item.category}
                    itemOwner={item.itemOwner}
                    itemTitle={item.itemTitle}
                    description={item.description}
                    startingBid={item.startingBid}
                    images={item.imgUrls}
                    className="shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
                  />
                </Link>
              ))
          )}
        </ParentCard>
      ) : allItems[cetagory] && allItems[cetagory].filter((item) => item.itemOwner !== currentUser.uid).length > 0 ? (
        <ParentCard className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {allItems[cetagory]
            .filter((item) => item.itemOwner !== currentUser.uid)
            .map((item) => (
              <Link
                key={item.key}
                to={`/allItems/${item.key}`}
                className="block hover:bg-gray-100 transition-colors duration-200 p-2 rounded-lg"
              >
                <AuctionCard
                  id={item.key}
                  category={item.category}
                  itemOwner={item.itemOwner}
                  itemTitle={item.itemTitle}
                  description={item.description}
                  startingBid={item.startingBid}
                  images={item.imgUrls}
                  className="shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
                />
              </Link>
            ))}
        </ParentCard>
      ) : (
        <div className="flex justify-center items-center h-[70vh]">
          <p className="text-lg font-semibold text-red-600">No Items Found</p>
        </div>
      )
      }
      {searchQuery  && allItems.flat().length===0 && (
        <div className="flex flex-col justify-center items-center h-[70vh] bg-gray-50">
          <p className="text-lg font-semibold text-gray-800">
            No search results for <span className="text-red-600">"{searchQuery}"</span>
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Try adjusting your search or explore other categories.
          </p>
        </div>
      )}


    </>
  );
}

export default Home;
