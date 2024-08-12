import { useEffect, useState } from "react";
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: Company;
  address: Address;
}
interface Address {
  street: string;
  zipcode: string;
  suite: string;
  city: string;
  geo: Geo;
}
interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface Geo {
  lat: String;
  lng: String;
}

interface UserPost {
  userId: string;
  id: number;
  title: string;
  body: string;
}
interface GetApiProps {
  onErrorHandel: (error: string) => void;
}

const GetApi = ({ onErrorHandel }: GetApiProps) => {
  let [users, SetUsers] = useState<User[]>([]);
  let [postId, setPostId] = useState<number>(0);
  let [titleForPost, setTitleForPost] = useState<UserPost[]>([]);

  useEffect(() => {
    setTimeout(async () => {
      /*fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((json) => SetUsers(json));*/

      try {
        let res = await fetch("https://jsonplaceholder.typicode.com/users");

        switch (res.status) {
          case 200:
            let data: User[] = await res.json();
            SetUsers(data);
            break;
          case 404:
            throw new Error("Error 404 not found");

          case 500:
            throw new Error("Error 500 server not available");

          default:
            throw new Error(
              "We have error in your connection plese try again later"
            );
        }
      } catch (error: any) {
        onErrorHandel(error.message || "An unexpected error occurred.");
      }

      // ---------------------------------------------------------
      /*try {
        let response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        if (response.ok) {
          let data = await response.json();
          SetUsers(data);

          console.log("Promise resolved and HTTP status is successful");
        } else {
          if (response.status === 404) throw new Error("404, Not found");
          if (response.status === 500)
            throw new Error("500, internal server error");
          // برای هر خطای سرور دیگر
          throw new Error(response.status.toString());
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }*/

      //--------------------------------------------------------------------------
    }, 2000);
    // برای این تایمر گزاشتم که بشه لود شدن را دید
  }, []);

  useEffect(() => {
    if (postId == 0) {
    } else {
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${postId}`)
        .then((response) => response.json())
        .then((json) => setTitleForPost(json));
    }
  }, [postId]);

  function setUpPostId(id: number) {
    setPostId(id);
  }

  return (
    <div className="">
      {users.length == 0 ? (
        <p>loading ...</p>
      ) : (
        <div className="flex flex-wrap  justify-around bg-slate-400 font-serif ">
          {users.map((item) => (
            <div className="w-1/4 ml-1 mb-6">
              <p
                className="bg-yellow-300 p-2 rounded-lg mb-1  text-center
              "
              >
                Name: {item.name}
              </p>
              <p className="bg-red-400 p-2 rounded-lg mb-1 text-center ">
                Email: {item.email}
              </p>
              <p className="bg-slate-600 p-2 text-slate-50 rounded-lg  mb-1 text-center ">
                PhoneNumber: {item.phone}
              </p>
              <button
                disabled={postId === item.id ? true : false}
                onClick={() => setUpPostId(item.id)}
                className={`${
                  postId === item.id ? "opacity-50" : ""
                } bg-green-300 p-2  rounded-lg w-full  text-center `}
              >
                post show
              </button>

              {postId === item.id ? (
                <div className="mb-3">
                  {titleForPost.map((item) => (
                    <p className=" text-white hover:bg-slate-500 text-center ">
                      {item.title}
                    </p>
                  ))}
                </div>
              ) : (
                <></>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetApi;
