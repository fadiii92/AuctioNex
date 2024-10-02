import { useContext, useEffect, useMemo } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useDispatch, useSelector } from "react-redux";
import { retrieveItems } from "../redux/itemActions";
import ParentCard from "../miniComponents/ParentCard";
import AuctionCard from "../miniComponents/AuctionCard";
import { Link, useLocation, useParams } from "react-router-dom";

function Home() {
  const { currentUser } = useContext(AuthContext);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { cetagory } = useParams();

  useEffect(() => {
    dispatch(retrieveItems());
  }, [dispatch]);

  const allItems = useSelector((state) => state.auctionDataReducer.auctionItems);

  const allItemsStored = useMemo(() => {
    return allItems;
  }, [allItems]);

  

  return (
    <>
      <h1>Welcome to AuctioNex</h1>
      {currentUser && <p>You are logged in as: {currentUser.email}</p>}
      {pathname === '/' ? (
        <ParentCard>
          {Object.values(allItemsStored).map((category) => 
            category.filter((item) => item.itemOwner !== currentUser.uid).map((item) => (
              <Link key={item.key} to={`/allItems/${item.key}`}>
                <AuctionCard
                  id={item.key}
                  category={item.category}
                  itemOwner={item.itemOwner}
                  itemTitle={item.itemTitle}
                  description={item.description}
                  startingBid={item.startingBid}
                  images={item.imgUrls}
                />
              </Link>
            ))
          )}
        </ParentCard>
      ) : allItemsStored[cetagory] && allItemsStored[cetagory].filter((item) => item.itemOwner !== currentUser.uid).length > 0 ? (
        <ParentCard>
          {allItemsStored[cetagory]
           .filter((item) => item.itemOwner !== currentUser.uid)
          .map((item) => (
            <Link key={item.key} to={`/allItems/${item.key}`}>
              <AuctionCard
                id={item.key}
                category={item.category}
                itemOwner={item.itemOwner}
                itemTitle={item.itemTitle}
                description={item.description}
                startingBid={item.startingBid}
                images={item.imgUrls}
              />
            </Link>
          ))}
        </ParentCard>
      ) : (
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <p className="text-lg font-semibold text-red-600">No Items Found</p>
        </div>
      )}
    </>
  );
}

export default Home;
