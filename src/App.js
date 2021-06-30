import React, { useEffect, useState} from "react";
import axios from "axios";
import Pagination from "react-js-pagination";
import "./App.css";
import "bootstrap/less/bootstrap.less"

export default function App() {
  const [userInfo, setUserInfo] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    axios
        .get(`https://reqres.in/api/users?page=${activePage}`)
        .then(res => {
          setUserInfo(
              res.data
          );
          setIsLoading(
              true
          )

        });
  },[])

  const  handlePageChange = pageNumber => {
    console.log(`active page is ${pageNumber}`);
    axios
        .get(
            `https://reqres.in/api/users?page=${pageNumber}`
        )
        .then(res => {
          setUserInfo(
              res.data,
          );
          setIsLoading(
              true
          )
        });
    setActivePage(pageNumber );
  };

  return (
      <div className="App">
        <h1 className="header">Hello ReqRes users!</h1>
        <div className="flex">
          {isLoading && userInfo.data.map((user) => {
            return (
                <div key={user.id}>
                  <img key={user.avatar} src={user.avatar} />

                  <p>
                    <strong>{user.first_name} {user.last_name}</strong>
                  </p>
                  <p><a href={`mailto:${user.email}`}> {user.email}</a></p>
                </div>
            );
          })}

        </div>
        <div className="pagination">
          <Pagination
              activePage={activePage}
              itemsCountPerPage={6}
              totalItemsCount={12}
              pageRangeDisplayed={1}
              onChange={handlePageChange}
          />
        </div>
      </div>
  );

}
