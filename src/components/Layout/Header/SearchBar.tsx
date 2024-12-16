1|import React, { useCallback, useState } from 'react';
2|import { Search } from 'lucide-react';
3|import { useProductStore } from '../../../store/productStore';
4|import { debounce } from '../../../utils/debounce';
5|
6|export function SearchBar() {
7|  const setSearchQuery = useProductStore(state => state.setSearchQuery);
8|  const [inputValue, setInputValue] = useState('');
9|
10|  const debouncedSearch = useCallback(
11|    debounce((value: string) => {
12|      setSearchQuery(value);
13|    }, 300),
14|    []
15|  );
16|
17|  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
18|    const value = e.target.value;
19|    setInputValue(value);
20|    debouncedSearch(value);
21|  };
22|
23|  return (
24|    <div className="relative flex-1 max-w-2xl">
25|      <div className="relative">
26|        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
27|        <input
28|          type="search"
29|          placeholder="Search products..."
30|          value={inputValue}
31|          onChange={handleChange}
32|          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
33|                   bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white 
34|                   focus:ring-2 focus:ring-blue-500 focus:border-transparent"
35|        />
36|      </div>
37|    </div>
38|  );
39|}
40|
