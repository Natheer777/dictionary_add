import './Search.css';
import { useState } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import axios from 'axios';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [keyboardInput, setKeyboardInput] = useState('');
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const handleSearch = () => {
    const data = JSON.stringify({ Page: 0, Term: searchQuery, Mode: 0 });
    const proxyUrl = 'https://a-lokl.onrender.com/https://shinjikai.app/rpc/SearchWords';

    const config = {
      method: 'post',
      url: proxyUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios.request(config)
      .then((response) => {
        const jsonData = response.data;
        console.log('Response Data:', jsonData);

        if (jsonData) {
          setSearchResults(jsonData.Items || []);
          setTotalResults(jsonData.TotalResults || 0);
          setTotalPages(jsonData.TotalPages || 0);

          axios.post('https://dictionary-backend-zrxn.onrender.com/insertWords', { words: jsonData.Items })
            .then((response) => {
              console.log('Data inserted:', response.data);
            })
            .catch((error) => {
              console.error('Error inserting data:', error);
            });
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setSearchResults([]);
        setTotalResults(0);
        setTotalPages(0);
      });
  };

  const handleClear = () => {
    setSearchQuery('');
    setSearchResults([]);
    setKeyboardInput('');
    setTotalResults(0);
    setTotalPages(0);
  };

  const handleMessage = () => {
    alert('تم إرسال الرسالة!');
  };

  const onChange = (input) => {
    setKeyboardInput(input);
    setSearchQuery(input);
  };

  const handleKeyPress = (button) => {
    if (button === "{space}") {
      setKeyboardInput((prevInput) => prevInput + " ");
      setSearchQuery((prevQuery) => prevQuery + " ");
    }
  };

  return (
    <>
      <div className="App">
        <div className="container pt-5">
          <h1 className='text-center mb-5'>إدخال بيانات جديدة الى ملف الاكسل</h1>
          <div className="SearchWord">
            <input
              type="text"
              id="searchQuery"
              name="searchQuery"
              value={searchQuery}
              placeholder="ادخل كلمة البحث هنا"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button id="searchButton" onClick={handleSearch}>بحث</button>
            {/* <button id="clearButton" onClick={handleClear}>مسح</button> */}
          </div>

          <div className="search-info">
            <div>عدد نتائج البحث: {totalResults}</div>
            <div>عدد الصفحات: {totalPages}</div>
            <div>الكلمة التي تم البحث عنها : {searchQuery}</div>
          </div>

          <Keyboard
            layoutName="default"
            onChange={onChange}
            onKeyPress={handleKeyPress}
            layout={{
              default: [
                'ض ص ث ق ف غ ع ه خ ح ج د',
                'ش س ي ب ل ا ت ن م ك ط',
                'ئ ء ؤ ر لا ى ة و ز ظ',
                'ذ 1 2 3 4 5 6 7 8 9 0 {bksp}',
                '{space}'
              ]
            }}
            display={{
              '{bksp}': 'حذف',
              '{space}': 'مسافة'
            }}
          />
<div className='edite'>
  <a href="https://dictionary-backend-zrxn.onrender.com/edite" target='_blank'>
  <button>
التعديل على البيانات
  </button>
  </a>
</div>
          <table className="mt-5 pb-5">
            <thead>
              <tr>
                <th>ID</th>
                <th>Kana</th>
                <th>Meaning Summary</th>
                <th>Short Meaning Summary</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.length === 0 ? (
                <tr><td colSpan="4">لم يتم العثور على نتائج</td></tr>
              ) : (
                searchResults.map((item) => (
                  <tr key={item.Id}>
                    <td>{item.Id}</td>
                    <td>{item.Kana}</td>
                    <td>{item.MeaningSummary}</td>
                    <td>{item.ShortMeaningSummary}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

      
      </div>
              </div>
    </>
  );
}