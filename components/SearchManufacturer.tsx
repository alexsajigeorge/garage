"use client";
import { useState, Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { SearchManufacturerProps } from "@/types";
import Image from "next/image";
import { manufacturers } from "@/constants";

const SearchManufacturer = ({
  manufacturer,
  setManufacturer,
}: SearchManufacturerProps) => {
    const [query, setQuery] = useState('');

    const filteredManufacturers = query === "" ? manufacturers : manufacturers.filter((item)=>(
        item.toLocaleLowerCase().replace(/\s+/g, "")
        .includes(query.toLocaleLowerCase().replace(/\s+/g, "")
    )))

  return (
    <div className="search-manufacturer">
      <Combobox>
        <div className="relative w-full">
          <Combobox.Button className=" absolute top-[14px] left-4">
            <Image src="/car-logo.svg" width={20} height={20} alt="car-logo" />
          </Combobox.Button>
          <Combobox.Input className="search-manufacturer__input" placeholder="Volkswagen" displayValue={(manufacturer:string)=>manufacturer}
          onChange={(e)=> setQuery(e.target.value)}
          />
          <Transition
          as={Fragment}
          leave=" transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={()=> setQuery('')}
          >
            <Combobox.Options>
                {filteredManufacturers.length === 0 && query !== "" && (
                    <Combobox.Options
                    value={query}
                    className="search-manufacturer__option"
                    >
                        create "{query}"
                    </Combobox.Options>
                )}
            </Combobox.Options>

          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchManufacturer;
