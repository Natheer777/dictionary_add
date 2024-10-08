// import "./Search.css";
// import { useState } from "react";
// import "react-simple-keyboard/build/css/index.css";
// import axios from "axios";

// export default function Search() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [totalResults, setTotalResults] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);

//   const handleSearch = () => {
//     const data = JSON.stringify({ Page: 0, Term: searchQuery, Mode: 0 });
//     const proxyUrl =
//       "https://a-lokl.onrender.com/https://shinjikai.app/rpc/SearchWords";

//     const config = {
//       method: "post",
//       url: proxyUrl,
//       headers: {
//         "Content-Type": "application/json",
//       },
//       data: data,
//     };

//     axios
//       .request(config)
//       .then((response) => {
//         const jsonData = response.data;
//         console.log("Response Data:", jsonData);

//         if (jsonData) {
//           setSearchResults(jsonData.Items || []);
//           setTotalResults(jsonData.TotalResults || 0);
//           setTotalPages(jsonData.TotalPages || 0);

//           axios
//             .post("https://api.ajls.online/insertWords", {
//               words: jsonData.Items,
//             })
//             .then((response) => {
//               console.log("Data inserted:", response.data);
//             })
//             .catch((error) => {
//               console.error("Error inserting data:", error);
//             });
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         setSearchResults([]);
//         setTotalResults(0);
//         setTotalPages(0);
//       });
//   };

//   return (
//     <>
//       <div className="App">
//         <div className="container pt-5">
//           <h1 className="text-center mb-5">
//             إدخال بيانات جديدة الى ملف الاكسل
//           </h1>
//           <div className="SearchWord">
//             <input
//               type="text"
//               id="searchQuery"
//               name="searchQuery"
//               value={searchQuery}
//               placeholder="ادخل كلمة البحث هنا"
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <button id="searchButton" onClick={handleSearch}>
//               بحث
//             </button>
//           </div>

//           <div className="search-info">
//             <div>عدد نتائج البحث: {totalResults}</div>
//             <div>عدد الصفحات: {totalPages}</div>
//             <div>الكلمة التي تم البحث عنها : {searchQuery}</div>
//           </div>

//           <div className="edite">
//             <a
//               href="https://api.ajls.online/edite"
//               target="_blank"
//             >
//               <button>التعديل على البيانات</button>
//             </a>
//           </div>
//           <table className="mt-5 pb-5">
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Kana</th>
//                 <th>Meaning Summary</th>
//                 <th>Short Meaning Summary</th>
//                 <th>Kanji</th>
//                 <th>الكلمة</th>
//                 <th>المعنى</th>
//                 <th>النطق</th>
//                 <th>التعريف</th>
//                 <th>الأمثلة</th>
//                 <th>التصنيف النحوي</th>
//                 <th>الاشتقاقات و التصريفات</th>
//                 <th>الملاحظات الثقافية</th>
//                 <th>المصادر و المراجع</th>
//                 <th>الأمثلة الصوتية</th>
//                 <th>المرادف</th>
//                 <th>العبارات الاصطلاحية</th>
//                 <th>الاستعمالات الشائعة</th>
//                 <th>الرمز و الأصل اللغوي</th>
//                 <th>الصور</th>
//                 <th>التعليمات و الملاحظات</th>
//                 <th>الفئة</th>
//                 <th>الأمثلة السياقية</th>
//                 <th>الاختصارات</th>
//                 <th>التنبيهات النحوية</th>
//               </tr>
//             </thead>
//             <tbody>
//               {searchResults.length === 0 ? (
//                 <tr>
//                   <td colSpan="4">لم يتم العثور على نتائج</td>
//                 </tr>
//               ) : (
//                 searchResults.map((item) => (
//                   <tr key={item.Id}>
//                     <td>{item.Id}</td>
//                     <td>{item.Kana}</td>
//                     <td>{item.MeaningSummary}</td>
//                     <td>{item.ShortMeaningSummary}</td>
//                     <td>
//                       {item.Writings.map((writing, index) => (
//                         <span key={index}>
//                           {writing.Text}
//                           {index < item.Writings.length - 1 && ", "}
//                         </span>
//                       ))}
//                     </td>

//                     <td>{item["الكلمة"]}</td>
//                     <td>{item["المعنى"]}</td>
//                     <td>{item["النطق"]}</td>
//                     <td>{item["التعريف"]}</td>
//                     <td>{item["الأمثلة"]}</td>
//                     <td>{item["التصنيف النحوي"]}</td>
//                     <td>{item["الاشتقاقات و التصريفات"]}</td>
//                     <td>{item["الملاحظات الثقافية"]}</td>
//                     <td>{item["المصادر و المراجع"]}</td>
//                     <td>{item["الأمثلة الصوتية"]}</td>
//                     <td>{item["المرادف"]}</td>
//                     <td>{item["العبارات الاصطلاحية"]}</td>
//                     <td>{item["الاستعمالات الشائعة"]}</td>
//                     <td>{item["الرمز و الأصل اللغوي"]}</td>
//                     <td>{item["الصور"]}</td>
//                     <td>{item["التعليمات و الملاحظات"]}</td>
//                     <td>{item["الفئة"]}</td>
//                     <td>{item["الأمثلة السياقية"]}</td>
//                     <td>{item["الاختصارات"]}</td>
//                     <td>{item["التنبيهات النحوية"]}</td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// }




import "./Search.css";
import { useState } from "react";
import "react-simple-keyboard/build/css/index.css";
import axios from "axios";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const handleSearch = async () => {
    const queries = searchQuery.split(" ").map((query) => query.trim());
    let allResults = [];
    let totalResultsCount = 0;
    let totalPagesCount = 0;

    for (const query of queries) {
      const data = JSON.stringify({ Page: 0, Term: query, Mode: 0 });
      const proxyUrl =
        "https://a-lokl.onrender.com/https://shinjikai.app/rpc/SearchWords";

      const config = {
        method: "post",
        url: proxyUrl,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      try {
        const response = await axios.request(config);
        const jsonData = response.data;

        if (jsonData) {
          // Extract only the Text value from Writings
          const processedItems = jsonData.Items.map((item) => ({
            ...item,
            Writings: typeof item.Writings === 'string'
              ? JSON.parse(item.Writings).map((writing) => writing.Text)
              : item.Writings.map((writing) => writing.Text),
          }));

          allResults = [...allResults, ...processedItems];
          totalResultsCount += jsonData.TotalResults || 0;
          totalPagesCount = Math.max(totalPagesCount, jsonData.TotalPages || 0);

          // تحقق من البيانات المرسلة إلى insertWords
          console.log("Words to insert:", processedItems);

          // إرسال البيانات إلى API insertWords
          try {
            const insertResponse = await axios.post(
              "https://api.ajls.online/insertWords",
              {
                words: processedItems
              },
              {
                headers: {
                  'Content-Type': 'application/json'
                }
              }
          
            );
            console.log("Data inserted:", insertResponse.data);
          } catch (insertError) {
            console.error("Error inserting data:", insertError);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    setSearchResults(allResults);
    setTotalResults(totalResultsCount);
    setTotalPages(totalPagesCount);
  };

  return (
    <>
      <div className="App">
        <div className="container pt-5">
          <h1 className="text-center mb-5">
            إدخال بيانات جديدة الى ملف الاكسل
          </h1>
          <div className="SearchWord">
            <input
              type="text"
              id="searchQuery"
              name="searchQuery"
              value={searchQuery}
              placeholder="ادخل كلمات البحث مفصولة بفواصل"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button id="searchButton" onClick={handleSearch}>
              بحث
            </button>
          </div>

          <div className="search-info">
            <div>عدد نتائج البحث: {totalResults}</div>
            <div>عدد الصفحات: {totalPages}</div>
            <div>الكلمات التي تم البحث عنها : {searchQuery}</div>
          </div>

          {/* <div className="edite">
            <a
              href="https://api.ajls.online/edite"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button>التعديل على البيانات</button>
            </a>
          </div> */}
          <table className="mt-5 pb-5">
            <thead>
              <tr>
                <th>ID</th>
                <th>Kana</th>
                <th>Meaning Summary</th>
                <th>Short Meaning Summary</th>
                <th>Kanji</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.length === 0 ? (
                <tr>
                  <td colSpan="5">لم يتم العثور على نتائج</td>
                </tr>
              ) : (
                searchResults.map((item, index) => (
                  <tr key={`${item.Id}-${index}`}>
                    <td>{item.Id}</td>
                    
                    <td>{item.Kana}</td>
                    <td>{item.MeaningSummary}</td>
                    <td>{item.ShortMeaningSummary}</td>
                    <td>
                      {item.Writings.map((writing, idx) => (
                        <span key={idx}>
                          {writing}
                          {idx < item.Writings.length - 1 && ", "}
                        </span>
                      ))}
                    </td>
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
