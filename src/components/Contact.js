const Contact = () => {
  return (
    <div>
        <h1 className="font-bold text-3xl p-4 m-4">Contact Us Page</h1>
        <form className="border border-black rounded-lg ">
          <input type="text" placeholder="Name" className="p-2 w-full" />
          <input type="email" placeholder="Email" className="p-2 w-full mt-4" />
          <textarea placeholder="Message" className="p-2 w-full mt-4" />
          <button type="submit" className="p-2 w-full mt-4 bg-orange-500 text-white rounded hover:bg-orange-600 transition duration-300">
            Send Message
          </button>
        </form>
    </div>
  )
}

export default Contact
