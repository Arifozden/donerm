import { useSelector } from "react-redux"

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile Page</h1>
      <form className="flex flex-col gap-3">
        <img src={currentUser.avatar} alt="profile" className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2" />
        <input type="text" placeholder="username" id="username" className="border p-3 rounded-lg" />
        <input type="email" placeholder="e-mail" id="email" className="border p-3 rounded-lg" />
        <input type="text" placeholder="password" id="password" className="border p-3 rounded-lg" />
        <button className="bg-blue-700 text-white rounded-lg p-3 uppercase hover:opacity-90 disabled:opacity-75">update</button>
      </form>
      <div className="flex mt-4 justify-center">
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg  mr-10 w-40">Delete Account</button>
        <button className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg w-40">Sign Out</button>
      </div>
    </div>
  )
}
