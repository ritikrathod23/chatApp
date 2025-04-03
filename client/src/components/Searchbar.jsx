import React from "react";
import { useState } from "react";
import useGetConversations from "../hooks/useGetConversations";
import { useConversationsContext } from "../contexAPI/useCovesation";
import toast, { Toaster } from 'react-hot-toast';

function Searchbar() {
  const [ search, setSearch ] = useState('')
  const [searchResult, setSearchResult] = useState([]);
  const {conversations} = useGetConversations()
  const {selected, setSelected}  = useConversationsContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!conversations) return
    const filteredResults = conversations.filter((item) => 
      item.name?.toLowerCase().includes(search.toLowerCase())
    );
    

    console.log("searchResult", filteredResults);
    setSearchResult(filteredResults);
    setSelected(filteredResults[0])
    setSearch('')

    if(filteredResults.length === 0 ){toast.error('User not found')}
      
 
  }

  return (
    <>
      <Toaster position="top center " />
        <div className="hidden md:block w-64 max-w-lg ml-4 bg-white rounded-full shadow-xl">
          <form onSubmit={handleSubmit} >
            <div className="flex items-center px-3.5 py-2 text-gray-400 group hover:ring-1 hover:ring-gray-300 focus-within:!ring-2 ring-inset focus-within:!ring-teal-500 rounded-md">
              <svg
                className="mr-2 h-5 w-5 stroke-slate-400"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <input
                className="block w-full appearance-none bg-transparent text-base text-gray-700 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                placeholder="Find anything..."
                aria-label="Search components"
                id="headlessui-combobox-input-:r5n:"
                role="combobox"
                type="text"
                aria-expanded="false"
                aria-autocomplete="list"
                value={search}
                onChange={((e) => setSearch(e.target.value))}
              //   style="caret-color: rgb(107, 114, 128)"
              />
            </div>
          </form>
        </div>
    </>
  );
}

export default Searchbar;
